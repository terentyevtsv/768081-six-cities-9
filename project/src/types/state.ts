import {createAPI} from '../services/api';
import { AuthorizationStatus, SortType } from '../const';
import { Offer } from './offer';
import { rootReducer } from '../store/root-reducer';
import { configureStore } from '@reduxjs/toolkit';
import { Review } from './review';

export const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus
};

export type Rental = {
  city: string,
  offers: Offer[],
  sortType: SortType
};

export type OffersData = {
  allOffers: Offer[],
  favoriteOffers: Offer[],
  currentOffer: Offer,
  isOfferExist: boolean,
  nearOffers: Offer[],
  areAllOffersLoaded: boolean
};

export type ReviewsData = {
  offerReviews: Review[],
};
