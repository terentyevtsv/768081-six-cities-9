import { createSelector } from 'reselect';
import { NameSpace, SortType, SubmitStatus } from '../../const';
import { getSortedOffers } from '../../rental';
import { RootState } from '../../types/state';
import { getAllOffers } from '../offers-data/selectors';

export const getCity = (state: RootState): string =>
  state[NameSpace.Rental].city;

export const getSortType = (state: RootState): SortType =>
  state[NameSpace.Rental].sortType;

export const getSubmitStatus = (state: RootState): SubmitStatus =>
  state[NameSpace.Rental].submitStatus;

export const getSortedCityOffers = createSelector(
  [getAllOffers, getCity, getSortType],
  (offers, city, sortType) => {
    const cityOffers = offers
      .filter((offer) => offer.city.name === city);
    return getSortedOffers(cityOffers, sortType);
  },
);
