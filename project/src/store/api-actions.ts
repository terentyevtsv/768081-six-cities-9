import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AuthorizationStatus, HTTP_CODE } from '../const';
import { getOffer } from '../services/adaptor';
import { errorHandle, getStatusCode } from '../services/error-handle';
import { Hotel } from '../types/offer';
import { api, store } from '../types/state';
import { AuthInfo } from '../types/auth-info';
import { AuthData } from '../types/auth-data';
import { saveAuthInfo } from '../services/token';
import { loadFavoriteOffers, loadOffers } from './offers-data/offers-data';
import { changeAuthorizationStatus } from './user-process/user-process';
import { Favorite } from '../types/favorite';

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

      throw error;
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
    }
  },
);
