import { useEffect } from 'react';
import { cities } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fillOffers } from '../../store/rental/rental';
import { CityContent } from '../../types/offer';
import Authorization from '../authorization/authorization';
import Cities from '../cities/cities';
import Loader from '../loader/loader';
import MainCityRentalOffers from '../main-city-rental-offers/main-city-rental-offers';
import NoRentalOffers from '../no-rental-offers/no-rental-offers';

const getCitiesContent = ({currentOffers, cityName, areAllOffersLoaded}: CityContent) => {
  if (!areAllOffersLoaded) {
    return (
      <Loader/>
    );
  }

  return (
    currentOffers.length > 0
      ? (
        <MainCityRentalOffers
          city={currentOffers[0].city}
          cityName={cityName}
          currentOffers={currentOffers}
        />
      )
      : <NoRentalOffers cityName={cityName}/>
  );
};

function AllRentalOffersPage() {
  const dispatch = useAppDispatch();

  const tempState = useAppSelector((state) => state);
  const { offers, city } = tempState.RENTAL;
  const { areAllOffersLoaded, allOffers } = tempState.OFFERS_DATA;

  useEffect(() => {
    const cityOffers = allOffers
      .filter((offer) => offer.city.name === city);
    dispatch(fillOffers(cityOffers));
  }, [allOffers, city, dispatch]);

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
            <Authorization/>
          </div>
        </div>
      </header>

      <main className={`page__main page__main--index${offers.length === 0 ? ' page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <Cities cities={cities}/>
        </div>
        <div className="cities">
          {
            getCitiesContent({
              areAllOffersLoaded,
              cityName: city,
              currentOffers: offers,
            })
          }
        </div>
      </main>
    </div>
  );
}

export default AllRentalOffersPage;
