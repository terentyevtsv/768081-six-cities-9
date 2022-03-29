import { makeFakeReviews, ONE_ACTION } from '../../utils/mock';
import { loadOfferReviews, reviewsData } from './reviews-data';

const reviews = makeFakeReviews();

describe('Reducer: reviewsData', () => {
  it('without additional parameters should return initial state', () => {
    expect(reviewsData.reducer(void 0, {type: ONE_ACTION}))
      .toEqual({
        offerReviews: [],
      });
  });

  it('should fill offers reviews after loading reviews', () => {
    const state = {
      offerReviews: [],
    };
    expect(reviewsData.reducer(state, loadOfferReviews(reviews)))
      .toEqual({
        offerReviews: reviews,
      });
  });
});
