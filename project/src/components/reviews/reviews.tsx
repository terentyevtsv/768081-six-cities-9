import { useEffect } from 'react';
import { MaxObjectNumber } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getReviewsAction } from '../../store/api-actions';
import { getOfferReviews } from '../../store/reviews-data/selectors';
import { Review } from '../../types/review';
import ReviewItem from '../review-item/review-item';

type ReviewsProps = {
  offerId: number
};

const sortByHighDate = (review1: Review, review2: Review) => {
  if (review1.date < review2.date) {
    return 1;
  }

  if (review1.date > review2.date) {
    return -1;
  }

  return 0;
};

function Reviews({offerId}: ReviewsProps) {
  const dispatch = useAppDispatch();
  const offerReviews = useAppSelector(getOfferReviews);

  const tempReviews = offerReviews.slice(0);
  tempReviews.sort(sortByHighDate);

  useEffect(() => {
    dispatch(getReviewsAction(offerId));
  }, [dispatch, offerId]);
  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{offerReviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {
          tempReviews.slice(0, MaxObjectNumber.ReviewsCount).map((review) => (
            <ReviewItem
              key={review.id}
              review={review}
            />
          ))
        }
      </ul>
    </>
  );
}

export default Reviews;
