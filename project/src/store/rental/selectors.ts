import { NameSpace, SortType, SubmitStatus } from '../../const';
import { Offer } from '../../types/offer';
import { RootState } from '../../types/state';

export const getSelectedCityOffers = (state: RootState): Offer[] =>
  state[NameSpace.Rental].offers;

export const getCity = (state: RootState): string =>
  state[NameSpace.Rental].city;

export const getSortType = (state: RootState): SortType =>
  state[NameSpace.Rental].sortType;

export const getSubmitStatus = (state: RootState): SubmitStatus =>
  state[NameSpace.Rental].submitStatus;
