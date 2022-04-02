import { cities } from '../../const';
import { useAppSelector } from '../../hooks/hooks';
import { getAreAllOffersLoadedStatus } from '../../store/offers-data/selectors';
import { getCity, getSortedCityOffers } from '../../store/rental/selectors';
import { CityContent } from '../../types/offer';
import Cities from '../cities/cities';
import Header from '../header/header';
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
  const city = useAppSelector(getCity);

  const areAllOffersLoaded = useAppSelector(getAreAllOffersLoadedStatus);
  const cityOffers = useAppSelector(getSortedCityOffers);

  return (
    <div className="page page--gray page--main">
      <Header/>

      <main className={`page__main page__main--index${cityOffers.length === 0 ? ' page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <Cities cities={cities}/>
        </div>
        <div className="cities">
          {
            getCitiesContent({
              areAllOffersLoaded,
              cityName: city,
              currentOffers: cityOffers,
            })
          }
        </div>
      </main>
    </div>
  );
}

export default AllRentalOffersPage;
