import { SortType } from './const';
import { Offer } from './types/offer';

const sortByHighPrice = (offerA: Offer, offerB: Offer) => {
  if (offerA.price < offerB.price) {
    return 1;
  }

  if (offerA.price > offerB.price) {
    return -1;
  }

  return 0;
};

const sortByLowPrice = (offerA: Offer, offerB: Offer) => {
  if (offerA.price > offerB.price) {
    return 1;
  }

  if (offerA.price < offerB.price) {
    return -1;
  }

  return 0;
};

const sortByHighRating = (offerA: Offer, offerB: Offer) => {
  if (offerA.rating < offerB.rating) {
    return 1;
  }

  if (offerA.rating > offerB.rating) {
    return -1;
  }

  return 0;
};

export const getOffers = (
  cityName: string,
  allOffers: Offer[],
  sortType: SortType,
) => {
  const cityOffers = allOffers
    .filter((offer) => offer.city.name === cityName);

  if (sortType === SortType.Popular) {
    return cityOffers;
  }

  switch (sortType) {
    case SortType.HighPriceFirst:
      cityOffers.sort(sortByHighPrice);
      break;

    case SortType.LowPriceFirst:
      cityOffers.sort(sortByLowPrice);
      break;

    case SortType.TopRatedFirst:
      cityOffers.sort(sortByHighRating);
      break;

    default:
      throw new Error('Неизвестный тип сортировки');
  }

  return cityOffers;
};

