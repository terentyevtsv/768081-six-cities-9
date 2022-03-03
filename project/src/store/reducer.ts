import { createReducer } from '@reduxjs/toolkit';
import { SortType } from '../const';
import { CityOffers } from '../types/offer';
import { changeCityAction, changeSortOptionAction, fillOffersAction } from './action';

const initialState: CityOffers = {
  city: 'Paris',
  offers: [],
  sortType: SortType.Popular,
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
    });
});


