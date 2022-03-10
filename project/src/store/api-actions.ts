import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { getOffer } from '../services/adaptor';
import { errorHandle } from '../services/error-handle';
import { changeAuthorizationStatusAction, loadOffersAction, redirectToRouteAction } from './action';
import { Hotel } from '../types/offer';
import { api, store } from '../types/state';
import { AuthInfo } from '../types/auth-info';
import { AuthData } from '../types/auth-data';
import { saveAuthInfo } from '../services/token';

export const fetchOffersAction = createAsyncThunk(
  'fetchOffers',
  async () => {
    try {
      const {data} = await api.get<Hotel[]>(APIRoute.Offers);
      const offers = data.map((hotel) => getOffer(hotel));
      store.dispatch(loadOffersAction(offers));
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
        changeAuthorizationStatusAction(AuthorizationStatus.Auth),
      );
    } catch (error) {
      errorHandle(error);
      store.dispatch(
        changeAuthorizationStatusAction(AuthorizationStatus.NoAuth),
      );
    }
  },
);

export const setAuthAction = createAsyncThunk(
  'setAuth',
  async (authData: AuthData) => {
    try {
      const tmp = await api.post<AuthInfo>(APIRoute.Login, authData);
      saveAuthInfo(tmp.data);
      store.dispatch(
        changeAuthorizationStatusAction(AuthorizationStatus.Auth),
      );
      store.dispatch(
        redirectToRouteAction(AppRoute.Main),
      );
    } catch (error) {
      errorHandle(error);
      store.dispatch(
        changeAuthorizationStatusAction(AuthorizationStatus.NoAuth),
      );
    }
  },
);
