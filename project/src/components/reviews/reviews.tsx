import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getReviewsAction } from '../../store/api-actions';
import ReviewItem from '../review-item/review-item';

type ReviewsProps = {
  offerId: number
};

function Reviews({offerId}: ReviewsProps) {
  const dispatch = useAppDispatch();
  const { offerReviews } = useAppSelector(({REVIEWS_DATA}) => REVIEWS_DATA);
  useEffect(() => {
    dispatch(getReviewsAction(offerId));
  }, [dispatch, offerId]);
  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{offerReviews.length}</span></h2>
      <ul className="reviews__list">
        {
          offerReviews.map((review) => (
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
