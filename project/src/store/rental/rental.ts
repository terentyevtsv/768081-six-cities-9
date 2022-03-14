import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, SortType } from '../../const';
import { Rental } from '../../types/state';

const initialState: Rental = {
  city: 'Paris',
  offers: [],
  sortType: SortType.Popular,
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
  },
});

export const { changeCity, fillOffers, changeSortOption } =  rental.actions;
