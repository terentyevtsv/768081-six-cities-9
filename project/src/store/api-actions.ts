import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AuthorizationStatus, HTTP_CODE } from '../const';
import { getOffer, getReview } from '../services/adaptor';
import { errorHandle, getStatusCode } from '../services/error-handle';
import { Hotel } from '../types/offer';
import { api, store } from '../types/state';
import { AuthInfo } from '../types/auth-info';
import { AuthData } from '../types/auth-data';
import { dropAuthInfo, saveAuthInfo } from '../services/token';
import { loadFavoriteOffers, loadNearOffers, loadOffers, setCurrentOffer, setIsOfferExist } from './offers-data/offers-data';
import { changeAuthorizationStatus } from './user-process/user-process';
import { Favorite } from '../types/favorite';
import { Comment, ReviewContent } from '../types/review';
import { loadOfferReviews } from './reviews-data/reviews-data';

export const fetchOffersAction = createAsyncThunk(
  'fetchOffers',
  async () => {
    try {
      const {data} = await api.get<Hotel[]>(APIRoute.Offers);
      const offers = data.map((hotel) => getOffer(hotel));
      store.dispatch(loadOffers(offers));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const getAuthAction = createAsyncThunk(
  'getAuth',
  async () => {
    try {
      await api.get(APIRoute.Login);
      store.dispatch(
        changeAuthorizationStatus(AuthorizationStatus.Auth),
      );
    } catch (error) {
      errorHandle(error);
      store.dispatch(
        changeAuthorizationStatus(AuthorizationStatus.NoAuth),
      );
    }
  },
);

export const setAuthAction = createAsyncThunk(
  'setAuth',
  async (authData: AuthData) => {
    try {
      const { data } = await api.post<AuthInfo>(APIRoute.Login, authData);
      saveAuthInfo(data);

      store.dispatch(
        changeAuthorizationStatus(AuthorizationStatus.Auth),
      );

      store.dispatch(fetchOffersAction());
    } catch (error) {
      errorHandle(error);
      store.dispatch(
        changeAuthorizationStatus(AuthorizationStatus.NoAuth),
      );
    }
  },
);

export const setIsFavoriteAction = createAsyncThunk(
  'setIsFavorite',
  async ({offerId, isFavorite}: Favorite) => {
    try {
      await api.post<Hotel>(`${APIRoute.Favorite}/${offerId}/${isFavorite ? 1 : 0}`);
    } catch (error) {
      const status = getStatusCode(error);
      if (status === HTTP_CODE.UNAUTHORIZED) {
        store.dispatch(
          changeAuthorizationStatus(AuthorizationStatus.NoAuth),
        );
        return;
      }

      errorHandle(error);
    }
  },
);

export const getFavoriteOffersAction = createAsyncThunk(
  'getFavoriteOffers',
  async () => {
    try {
      const {data} = await api.get<Hotel[]>(APIRoute.Favorite);
      const offers = data.map((hotel) => getOffer(hotel));

      store.dispatch(loadFavoriteOffers(offers));
    } catch (error) {
      errorHandle(error);
      store.dispatch(
        changeAuthorizationStatus(AuthorizationStatus.NoAuth),
      );
    }
  },
);

export const getOfferAction = createAsyncThunk(
  'getOffer',
  async (offerId: number) => {
    try {
      const {data} = await api.get<Hotel>(`${APIRoute.Offers}/${offerId}`);
      const offer = getOffer(data);
      store.dispatch(setCurrentOffer(offer));
      store.dispatch(setIsOfferExist(true));
    } catch (error) {
      errorHandle(error);
      store.dispatch(setIsOfferExist(false));
    }
  },
);

export const getNearOffersAction = createAsyncThunk(
  'getNearOffers',
  async (offerId: number) => {
    try {
      const {data} = await api.get<Hotel[]>(`${APIRoute.Offers}/${offerId}/nearby`);
      const offers = data.map((offer) => getOffer(offer));
      store.dispatch(loadNearOffers(offers));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const getReviewsAction = createAsyncThunk(
  'getReviews',
  async (offerId: number) => {
    try {
      const { data } = await api.get<Comment[]>(`${APIRoute.Comments}/${offerId}`);
      const reviews = data.map((comment) => getReview(comment));
      store.dispatch(loadOfferReviews(reviews));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const addReviewAction = createAsyncThunk(
  'addReview',
  async ({offerId, comment, rating}: ReviewContent) => {
    try {
      const { data } = await api.post<Comment[]>(
        `${APIRoute.Comments}/${offerId}`,
        {comment, rating},
      );
      const reviews = data.map((currentComment) => getReview(currentComment));
      store.dispatch(loadOfferReviews(reviews));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const removeAuthAction = createAsyncThunk(
  'removeAuth',
  async () => {
    try {
      dropAuthInfo();
      await api.delete(APIRoute.Logout);
      await store.dispatch(fetchOffersAction());

      store.dispatch(
        changeAuthorizationStatus(AuthorizationStatus.NoAuth),
      );
    } catch (error) {
      errorHandle(error);
    }
  },
);
