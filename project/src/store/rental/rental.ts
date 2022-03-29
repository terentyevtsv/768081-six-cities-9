import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, SortType, SubmitStatus } from '../../const';
import { Rental } from '../../types/state';

const initialState: Rental = {
  city: 'Paris',
  offers: [],
  sortType: SortType.Popular,
  submitStatus: SubmitStatus.Sent,
};

export const rental = createSlice({
  name: NameSpace.Rental,
  initialState,
  reducers: {
    changeCity: (state, action) => {
      state.city = action.payload;
    },
    fillOffers: (state, action) => {
      state.offers = action.payload;
    },
    changeSortOption: (state, action) => {
      state.sortType = action.payload;
    },
    changeSubmitStatus: (state, action) => {
      state.submitStatus = action.payload;
    },
  },
});

export const {
  changeCity,
  fillOffers,
  changeSortOption,
  changeSubmitStatus,
} = rental.actions;
