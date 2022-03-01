import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { changeCityAction, fillOffersAction } from './action';

type State = {
  city: string,
  offers: Offer[]
}

const initialState: State = {
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


