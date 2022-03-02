import { useEffect, useState } from 'react';
import { cities } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getOffers } from '../../rental';
import { fillOffersAction } from '../../store/action';
import { Offer, PlaceCardType } from '../../types/offer';
import Cities from '../cities/cities';
import Map from '../map/map';
import RentalOfferCards from '../rental-offer-cards/rental-offer-cards';

type AllRentalOffersPageProps = {
  offers: Offer[]
};

function AllRentalOffersPage({offers}: AllRentalOffersPageProps) {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const tempState = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const currentOffers = tempState.offers;
  const cityName = tempState.city;

  useEffect(() => {
    dispatch(fillOffersAction(getOffers(cityName, offers)));
  }, [cityName, dispatch, offers]);

  // Временно пока так, потом будет логика пустого списка предложений
  const city = currentOffers.length > 0
    ? currentOffers[0].city
    : offers[0].city;

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active" href="/">
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

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <Cities cities={cities}/>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{currentOffers.length} places to stay in {cityName}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by </span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <RentalOfferCards
                onOfferCardHover={setSelectedOffer}
                placeCardType={PlaceCardType.CityPlaceCard}
                offers={currentOffers}
              />
            </section>
            <div className="cities__right-section">
              <Map
                className="cities__map map"
                city={city}
                offers={currentOffers}
                selectedOffer={selectedOffer}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AllRentalOffersPage;
