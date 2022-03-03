import { createAction } from '@reduxjs/toolkit';
import { SortType } from '../const';
import { Offer } from '../types/offer';

export const changeCityAction = createAction<string>('changeCity');
export const fillOffersAction = createAction<Offer[]>('fillOffers');
export const changeSortOptionAction = createAction<SortType>('changeSortOption');
