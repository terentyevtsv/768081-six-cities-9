import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchOffersAction, getFavoriteOffersAction, setIsFavoriteAction } from '../../store/api-actions';
import { getFavoriteOffers } from '../../store/offers-data/selectors';
import { Offer } from '../../types/offer';
import CityRentalOffers from '../city-rental-offers/city-rental-offers';
import Footer from '../footer/footer';
import Header from '../header/header';

type GroupedOffers = {
  [key: string]: Offer[]
}

function FavoritesPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getFavoriteOffersAction());
  }, [dispatch]);

  const groupedOffers: GroupedOffers = {};

  const favoriteOffers = useAppSelector(getFavoriteOffers);

  favoriteOffers.forEach((offer) => {
    const cityName = offer.city.name;
    if (groupedOffers[cityName] === undefined) {
      groupedOffers[cityName] = [];
    }

    groupedOffers[cityName].push(offer);
  });

  const keys = Object.keys(groupedOffers);

  const onRemoveFavoriteOffer = async (offer: Offer) => {
    await dispatch(setIsFavoriteAction({
      offerId: offer.id,
      isFavorite: false,
    }));
    await dispatch(getFavoriteOffersAction());
    await dispatch(fetchOffersAction());
  };

  return (
    <div className={`page${keys.length > 0 ? '' : ' page--favorites-empty'}`}>
      <Header/>

      <main
        className={`page__main page__main--favorites${keys.length > 0 ? '' : ' page__main--favorites-empty'}`}
      >
        <div className="page__favorites-container container">
          <section className={`favorites${keys.length > 0 ? '' : ' favorites--empty'}`}>
            {
              keys.length > 0 &&
              <>
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {
                    keys.map((cityName) =>
                      (
                        <CityRentalOffers
                          cityName={cityName}
                          offers={groupedOffers[cityName]}
                          key={cityName}
                          onRemoveFavoriteOffer={onRemoveFavoriteOffer}
                        />
                      ))
                  }
                </ul>
              </>
            }
            {
              keys.length === 0 &&
              <>
                <h1 className="visually-hidden">Favorites (empty)</h1>
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
                </div>
              </>
            }
          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default FavoritesPage;
