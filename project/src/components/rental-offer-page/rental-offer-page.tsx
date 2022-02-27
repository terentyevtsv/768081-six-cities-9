import { useLocation } from 'react-router-dom';
import { offers } from '../../mocks/offers';
import { Review } from '../../types/review';
import SubmitCommentForm from '../submit-comment-form/submit-comment-form';
import { getRatingPercent } from '../../const';
import { Link } from 'react-router-dom';
import Reviews from '../reviews/reviews';
import Map from '../map/map';
import { MapType } from '../../types/offer';

type RentalOfferPageProps = {
  reviews: Review[]
};

function RentalOfferPage({reviews}: RentalOfferPageProps) {
  const location = useLocation();
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
          <Map
            city={offer.city}
            offers={nearOffers}
            selectedOffer={null}
            mapType={MapType.OfferMap}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {
                nearOffers.map((nearOffer) => (
                  <article
                    className="near-places__card place-card"
                    key={nearOffer.id}
                  >
                    {
                      nearOffer.isPremium &&
                      <div className="place-card__mark">
                        <span>Premium</span>
                      </div>
                    }
                    <div className="near-places__image-wrapper place-card__image-wrapper">
                      <Link to={`/offer/${nearOffer.id}`}>
                        <img
                          className="place-card__image"
                          src={nearOffer.previewImage}
                          width="260"
                          height="200"
                          alt="Place im"
                        />
                      </Link>
                    </div>
                    <div className="place-card__info">
                      <div className="place-card__price-wrapper">
                        <div className="place-card__price">
                          <b className="place-card__price-value">&euro;{nearOffer.price}</b>
                          <span className="place-card__price-text">&#47;&nbsp;night</span>
                        </div>
                        <button
                          className={`place-card__bookmark-button${nearOffer.isFavorite ? ' place-card__bookmark-button--active' : ''} button`}
                          type="button"
                        >
                          <svg className="place-card__bookmark-icon" width="18" height="19">
                            <use xlinkHref="#icon-bookmark"></use>
                          </svg>
                          <span className="visually-hidden">To bookmarks</span>
                        </button>
                      </div>
                      <div className="place-card__rating rating">
                        <div className="place-card__stars rating__stars">
                          <span style={{width: `${getRatingPercent(nearOffer.rating)}%`}}></span>
                          <span className="visually-hidden">Rating</span>
                        </div>
                      </div>
                      <h2 className="place-card__name">
                        <Link to={`/offer/${nearOffer.id}`}>
                          {nearOffer.header}
                        </Link>
                      </h2>
                      <p className="place-card__type">{nearOffer.houseType}</p>
                    </div>
                  </article>
                ))
              }
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default RentalOfferPage;
