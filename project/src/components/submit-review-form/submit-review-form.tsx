import { useState, ChangeEvent, SyntheticEvent, useEffect } from 'react';
import { MAX_REVIEW_LENGTH, MIN_REVIEW_LENGTH, SubmitStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addReviewAction } from '../../store/api-actions';

type SubmitReviewFormProps =  {
  offerId: number
};

function SubmitReviewForm({ offerId }: SubmitReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const dispatch = useAppDispatch();
  const { submitStatus } = useAppSelector(({RENTAL}) => RENTAL);

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(evt.target.value, 10);
    setRating(value);
  };

  const handleCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  const handleSubmitReview = async (evt: SyntheticEvent) => {
    evt.preventDefault();

    await dispatch(addReviewAction({
      comment,
      rating,
      offerId,
    }));
  };

  const isSubmitEnabled = !(
    rating > 0 &&
    comment.length >= MIN_REVIEW_LENGTH &&
    comment.length <= MAX_REVIEW_LENGTH
  );

  useEffect(() => {
    if (submitStatus === SubmitStatus.Sent) {
      setRating(0);
      setComment('');
    }
  }, [submitStatus]);

  const isSending = submitStatus === SubmitStatus.Sending;

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmitReview}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="5"
          id="5-stars"
          type="radio"
          onChange={handleRatingChange}
          checked={rating === 5}
          disabled={isSending}
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="4"
          id="4-stars"
          type="radio"
          onChange={handleRatingChange}
          checked={rating === 4}
          disabled={isSending}
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="3"
          id="3-stars"
          type="radio"
          onChange={handleRatingChange}
          checked={rating === 3}
          disabled={isSending}
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="2"
          id="2-stars"
          type="radio"
          onChange={handleRatingChange}
          checked={rating === 2}
          disabled={isSending}
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="1"
          id="1-star"
          type="radio"
          onChange={handleRatingChange}
          checked={rating === 1}
          disabled={isSending}
        />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleCommentChange}
        minLength={MIN_REVIEW_LENGTH}
        maxLength={MAX_REVIEW_LENGTH}
        disabled={isSending}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitEnabled || isSending}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default SubmitReviewForm;
