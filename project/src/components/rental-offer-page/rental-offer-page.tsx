import { useLocation, useNavigate } from 'react-router-dom';
import SubmitReviewForm from '../submit-review-form/submit-review-form';
import { AppRoute, AuthorizationStatus, getRatingPercent, OFFER_DEFAULT_ID } from '../../const';
import Reviews from '../reviews/reviews';
import Map from '../map/map';
import { PlaceCardType } from '../../types/offer';
import RentalOfferCards from '../rental-offer-cards/rental-offer-cards';
import './css/map.css';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Authorization from '../authorization/authorization';
import { MouseEvent, useEffect, useState } from 'react';
import { getNearOffersAction, getOfferAction, getReviewsAction, setIsFavoriteAction } from '../../store/api-actions';

function RentalOfferPage() {
  const { pathname } = useLocation();

  const pathElements = pathname.split('/');
  const offerId =  parseInt(pathElements[pathElements.length - 1], 10);

  const dispatch = useAppDispatch();

  const { currentOffer, nearOffers, isOfferExist } = useAppSelector(({OFFERS_DATA}) => OFFERS_DATA);
  const { authorizationStatus } = useAppSelector(({USER}) => USER);

  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(currentOffer.isFavorite);

  useEffect(() => {
    dispatch(getOfferAction(offerId));
    if (!isOfferExist) {
      navigate(AppRoute.NotFound);
      return;
    }
    dispatch(getNearOffersAction(offerId));

    setIsFavorite(currentOffer.isFavorite);
  }, [currentOffer.isFavorite, dispatch, isOfferExist, navigate, offerId]);

  // Нет необходимости рендерить значение по умолчанию
  if (currentOffer.id === OFFER_DEFAULT_ID) {
    return null;
  }

  const handleAddToFavorites = (evt: MouseEvent) => {
    evt.preventDefault();

    dispatch(setIsFavoriteAction({
      isFavorite: !isFavorite,
      offerId,
    }));

    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.SignIn);
      return;
    }

    setIsFavorite(!isFavorite);
  };

  const handleSignOut = () => {
    dispatch(getReviewsAction(offerId));
  };

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <Authorization onSignOut={handleSignOut}/>
          </div>
        </div>
      </header>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                currentOffer.images.map((image) =>
                  (
                    <div
                      className="property__image-wrapper"
                      key={image}
                    >
                      <img
                        className="property__image"
                        src={image}
                        alt="Ph studio"
                      />
                    </div>
                  ))
              }
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {
                currentOffer.isPremium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {currentOffer.header}
                </h1>
                <button
                  className={
                    `property__bookmark-button${
                      isFavorite && (authorizationStatus === AuthorizationStatus.Auth)
                        ? ' property__bookmark-button--active'
                        : ''
                    } button`
                  }
                  type="button"
                  onClick={handleAddToFavorites}
                >
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${getRatingPercent(currentOffer.rating)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {currentOffer.houseType}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {currentOffer.bedroomsCount} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {currentOffer.guestsCount} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{currentOffer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {
                    currentOffer.householdItems.map((household) => (
                      <li
                        className="property__inside-item"
                        key={household}
                      >
                        {household}
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="property__avatar user__avatar"
                      src={currentOffer.owner.avatarImage}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">
                    {currentOffer.owner.name}
                  </span>
                  {
                    currentOffer.owner.isPro &&
                    <span className="property__user-status">
                      Pro
                    </span>
                  }
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {currentOffer.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <Reviews offerId={offerId}/>
                {
                  (authorizationStatus === AuthorizationStatus.Auth) &&
                  <SubmitReviewForm offerId={offerId}/>
                }
              </section>
            </div>
          </div>
          <div className="cont container">
            <Map
              className="property__map map"
              city={currentOffer.city}
              offers={[currentOffer, ...nearOffers]}
              selectedOffer={currentOffer}
            />
          </div>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <RentalOfferCards
              offers={nearOffers}
              placeCardType={PlaceCardType.NearPlaceCard}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default RentalOfferPage;
