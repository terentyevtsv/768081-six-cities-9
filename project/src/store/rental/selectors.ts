import { createSelector } from 'reselect';
import { NameSpace, SortType, SubmitStatus } from '../../const';
import { getSortedOffers } from '../../rental';
import { Offer } from '../../types/offer';
import { RootState } from '../../types/state';
import { getAllOffers } from '../offers-data/selectors';

export const getSelectedCityOffers = (state: RootState): Offer[] =>
  state[NameSpace.Rental].offers;

export const getCity = (state: RootState): string =>
  state[NameSpace.Rental].city;

export const getSortType = (state: RootState): SortType =>
  state[NameSpace.Rental].sortType;

export const getSubmitStatus = (state: RootState): SubmitStatus =>
  state[NameSpace.Rental].submitStatus;

export const getCityOffers = createSelector(
  [getAllOffers, getCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city),
);

export const getSortedCityOffers = createSelector(
  [getSelectedCityOffers, getSortType],
  (offers, sortType) => getSortedOffers(offers, sortType),
);
