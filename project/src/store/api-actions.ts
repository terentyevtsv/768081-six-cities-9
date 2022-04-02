import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AuthorizationStatus, HttpCode, SubmitStatus } from '../const';
import { getOffer, getReview } from '../services/adaptor';
import { handleError, getStatusCode } from '../services/error-handle';
import { Hotel } from '../types/offer';
import { AppDispatch, RootState } from '../types/state';
import { AuthInfo } from '../types/auth-info';
import { AuthData } from '../types/auth-data';
import { dropAuthInfo, saveAuthInfo } from '../services/token';
import { loadFavoriteOffers, loadNearOffers, loadOffers, setCurrentOffer, setIsOfferExist } from './offers-data/offers-data';
import { changeAuthorizationStatus } from './user-process/user-process';
import { Favorite } from '../types/favorite';
import { Comment, ReviewContent } from '../types/review';
import { loadOfferReviews } from './reviews-data/reviews-data';
import { changeSubmitStatus } from './rental/rental';
import { AxiosInstance } from 'axios';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Hotel[]>(APIRoute.Offers);
      const offers = data.map((hotel) => getOffer(hotel));
      dispatch(loadOffers(offers));
    } catch (error) {
      dispatch(loadOffers([]));
      handleError(error);
    }
  },
);

export const getAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}>(
  'user/getAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(
        changeAuthorizationStatus(AuthorizationStatus.Auth),
      );
    } catch (error) {
      handleError(error);
      dispatch(
        changeAuthorizationStatus(AuthorizationStatus.NoAuth),
      );
    }
  },
);

export const setAuthAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}>(
  'user/setAuth',
  async (authData: AuthData, {dispatch, extra: api}) => {
    try {
      const { data } = await api.post<AuthInfo>(APIRoute.Login, authData);
      saveAuthInfo(data);

      dispatch(
        changeAuthorizationStatus(AuthorizationStatus.Auth),
      );

      dispatch(fetchOffersAction());
    } catch (error) {
      handleError(error);
      dispatch(
        changeAuthorizationStatus(AuthorizationStatus.NoAuth),
      );
    }
  },
);

export const setIsFavoriteAction = createAsyncThunk<void, Favorite, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}>(
  'offer/setIsFavorite',
  async ({offerId, isFavorite, setIsFavorite}: Favorite, {dispatch, extra: api}) => {
    try {
      await api.post<Hotel>(`${APIRoute.Favorite}/${offerId}/${isFavorite ? 1 : 0}`);
      if (setIsFavorite !== undefined) {
        setIsFavorite(isFavorite);
      }
    } catch (error) {
      const status = getStatusCode(error);
      if (status === HttpCode.Unauthorized) {
        dispatch(
          changeAuthorizationStatus(AuthorizationStatus.NoAuth),
        );
        return;
      }

      handleError(error);
    }
  },
);

export const getFavoriteOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}>(
  'data/getFavoriteOffers',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Hotel[]>(APIRoute.Favorite);
      const offers = data.map((hotel) => getOffer(hotel));

      dispatch(loadFavoriteOffers(offers));
    } catch (error) {
      handleError(error);
      dispatch(
        changeAuthorizationStatus(AuthorizationStatus.NoAuth),
      );
    }
  },
);

export const getOfferAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}>(
  'data/getOffer',
  async (offerId: number, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Hotel>(`${APIRoute.Offers}/${offerId}`);
      const offer = getOffer(data);
      dispatch(setCurrentOffer(offer));
      dispatch(setIsOfferExist(true));
    } catch (error) {
      handleError(error);
      dispatch(setIsOfferExist(false));
    }
  },
);

export const getNearOffersAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}>(
  'data/getNearOffers',
  async (offerId: number, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Hotel[]>(`${APIRoute.Offers}/${offerId}/nearby`);
      const offers = data.map((offer) => getOffer(offer));
      dispatch(loadNearOffers(offers));
    } catch (error) {
      handleError(error);
    }
  },
);

export const getReviewsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}>(
  'data/getReviews',
  async (offerId: number, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<Comment[]>(`${APIRoute.Comments}/${offerId}`);
      const reviews = data.map((comment) => getReview(comment));
      dispatch(loadOfferReviews(reviews));
    } catch (error) {
      handleError(error);
    }
  },
);

export const addReviewAction = createAsyncThunk<void, ReviewContent, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}>(
  'data/addReview',
  async ({offerId, comment, rating}: ReviewContent, {dispatch, extra: api}) => {
    try {
      dispatch(changeSubmitStatus(SubmitStatus.Sending));

      const { data } = await api.post<Comment[]>(
        `${APIRoute.Comments}/${offerId}`,
        {comment, rating},
      );

      dispatch(changeSubmitStatus(SubmitStatus.Sent));

      const reviews = data.map((currentComment) => getReview(currentComment));
      dispatch(loadOfferReviews(reviews));
    } catch (error) {
      handleError(error);
      dispatch(changeSubmitStatus(SubmitStatus.Error));
    }
  },
);

export const removeAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}>(
  'user/removeAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      dropAuthInfo();
      await api.delete(APIRoute.Logout);
      await dispatch(fetchOffersAction());

      dispatch(
        changeAuthorizationStatus(AuthorizationStatus.NoAuth),
      );
    } catch (error) {
      handleError(error);
    }
  },
);
