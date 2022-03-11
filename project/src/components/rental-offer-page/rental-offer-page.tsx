import { useLocation } from 'react-router-dom';
import { Review } from '../../types/review';
import SubmitCommentForm from '../submit-comment-form/submit-comment-form';
import { getRatingPercent } from '../../const';
import Reviews from '../reviews/reviews';
import Map from '../map/map';
import { PlaceCardType } from '../../types/offer';
import RentalOfferCards from '../rental-offer-cards/rental-offer-cards';
import './css/map.css';
import { useAppSelector } from '../../hooks/hooks';

type RentalOfferPageProps = {
  reviews: Review[]
};

function RentalOfferPage({reviews}: RentalOfferPageProps) {
  const location = useLocation();
  const offers = useAppSelector(({OFFERS_DATA}) => OFFERS_DATA.allOffers);

  const pathElements = location.pathname.split('/');
  const offerId =  parseInt(pathElements[pathElements.length - 1], 10);
  const [offer] = offers.filter((currentOffer) =>
    currentOffer.id === offerId);

  const nearOffers = offers.slice(0, 3);

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
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="/">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="/">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                offer.images.map((image) =>
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
                offer.isPremium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offer.header}
                </h1>
                <button
                  className={`property__bookmark-button${offer.isFavorite ? ' property__bookmark-button--active' : ''}  button`}
                  type="button"
                >
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${getRatingPercent(offer.rating)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {offer.houseType}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offer.bedroomsCount} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {offer.guestsCount} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {
                    offer.householdItems.map((household) => (
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
                      src={offer.owner.avatarImage}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">
                    {offer.owner.name}
                  </span>
                  {
                    offer.owner.isPro &&
                    <span className="property__user-status">
                      Pro
                    </span>
                  }
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <Reviews reviews={reviews}/>
                <SubmitCommentForm/>
              </section>
            </div>
          </div>
          <div className="cont container">
            <Map
              className="property__map map"
              city={offer.city}
              offers={nearOffers}
              selectedOffer={null}
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
