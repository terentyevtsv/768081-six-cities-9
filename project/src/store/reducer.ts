import { createReducer } from '@reduxjs/toolkit';
import { CityOffers } from '../types/offer';
import { changeCityAction, fillOffersAction } from './action';

const initialState: CityOffers = {
  city: 'Paris',
  offers: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCityAction, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffersAction, (state, action) => {
      action.payload.forEach((offer) =>
        state.offers.push(offer));
    });
});


