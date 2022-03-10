import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, SortType } from '../const';
import { CityOffers } from '../types/offer';
import { changeAuthorizationStatusAction, changeCityAction, changeSortOptionAction, fillOffersAction, loadOffersAction } from './action';

const initialState: CityOffers = {
  city: 'Paris',
  offers: [],
  allOffers: [],
  sortType: SortType.Popular,
  areAllOffersLoaded: false,
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCityAction, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffersAction, (state, action) => {
      state.offers.length = 0;
      action.payload.forEach((offer) =>
        state.offers.push(offer));
    })
    .addCase(changeSortOptionAction, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(loadOffersAction, (state, action) => {
      state.allOffers = action.payload;
      state.areAllOffersLoaded = true;
    })
    .addCase(changeAuthorizationStatusAction, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});


