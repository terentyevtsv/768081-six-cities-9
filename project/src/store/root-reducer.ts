import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { offersData } from './offers-data/offers-data';
import { rental } from './rental/rental';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.OffersData]: offersData.reducer,
  [NameSpace.Rental]: rental.reducer,
  [NameSpace.User]: userProcess.reducer,
});
