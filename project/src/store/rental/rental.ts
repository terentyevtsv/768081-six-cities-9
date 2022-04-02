import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, SortType, SubmitStatus } from '../../const';
import { Rental } from '../../types/state';

const initialState: Rental = {
  city: 'Paris',
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
  changeSortOption,
  changeSubmitStatus,
} = rental.actions;
