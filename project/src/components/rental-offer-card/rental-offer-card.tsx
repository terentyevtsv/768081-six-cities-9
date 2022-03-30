import { memo, MouseEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, BookmarkStatus, getRatingPercent } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchOffersAction, setIsFavoriteAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { Offer, PlaceCardType } from '../../types/offer';

type RentalOfferCardProps = {
  offer: Offer,
  placeCardType: PlaceCardType,
  onMouseOver?: (offer: Offer) => void
};

function RentalOfferCard({offer, placeCardType, onMouseOver}: RentalOfferCardProps) {
  const [isFavorite, setIsFavorite] = useState(offer.isFavorite);
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();

  useEffect(() => {
    setIsFavorite(offer.isFavorite);
  }, [offer.isFavorite]);

  const handleMouseOver = () => {
    if (onMouseOver !== undefined) {
      onMouseOver(offer);
    }
  };

  const handleAddToFavorites = async (evt: MouseEvent) => {
    evt.preventDefault();

    await dispatch(setIsFavoriteAction({
      offerId: offer.id,
      isFavorite: !isFavorite,
      setIsFavorite,
    }));

    await dispatch(fetchOffersAction());

    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.SignIn);
    }
  };

  return (
    <article
      className={`${placeCardType === PlaceCardType.CityPlaceCard ? 'cities__place-card' : 'near-places__card'} place-card`}
      onMouseOver={handleMouseOver}
    >
      {
        offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div
        className={`${placeCardType === PlaceCardType.CityPlaceCard ? 'cities__image-wrapper' : 'near-places__image-wrapper'} place-card__image-wrapper`}
      >
        <Link to={`/offer/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width="260"
            height="200"
            alt="Place im"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={
              `place-card__bookmark-button${
                isFavorite && (authorizationStatus === AuthorizationStatus.Auth)
                  ? ' place-card__bookmark-button--active'
                  : ''
              } button`
            }
            type="button"
            onClick={handleAddToFavorites}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {
                isFavorite && (authorizationStatus === AuthorizationStatus.Auth)
                  ? BookmarkStatus.In
                  : BookmarkStatus.To
              }
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getRatingPercent(offer.rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.header}</Link>
        </h2>
        <p className="place-card__type">{offer.houseType}</p>
      </div>
    </article>
  );
}

export default memo(RentalOfferCard, (prevProps, nextProps) => {
  const isTheSame = prevProps.offer.id === nextProps.offer.id &&
                    prevProps.placeCardType === nextProps.placeCardType &&
                    prevProps.offer.isFavorite === nextProps.offer.isFavorite;
  return isTheSame;
});
