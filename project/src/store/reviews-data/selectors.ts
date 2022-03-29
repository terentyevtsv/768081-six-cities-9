import { NameSpace } from '../../const';
import { Review } from '../../types/review';
import { RootState } from '../../types/state';

export const getOfferReviews = (state: RootState): Review[] =>
  state[NameSpace.ReviewsData].offerReviews;
