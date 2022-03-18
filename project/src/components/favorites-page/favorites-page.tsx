import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getFavoriteOffersAction, setIsFavoriteAction } from '../../store/api-actions';
import { Offer } from '../../types/offer';
import Authorization from '../authorization/authorization';
import CityRentalOffers from '../city-rental-offers/city-rental-offers';

type GroupedOffers = {
  [key: string]: Offer[]
}

function FavoritesPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getFavoriteOffersAction());
  }, [dispatch]);

  const groupedOffers: GroupedOffers = {};

  const { favoriteOffers } = useAppSelector(({OFFERS_DATA}) => OFFERS_DATA);

  favoriteOffers.forEach((offer) => {
    const cityName = offer.city.name;
    if (groupedOffers[cityName] === undefined) {
      groupedOffers[cityName] = [];
    }

    groupedOffers[cityName].push(offer);
  });

  const keys = Object.keys(groupedOffers);

  const handleRemoveFavoriteOffer = async (offer: Offer) => {
    await dispatch(setIsFavoriteAction({
      offerId: offer.id,
      isFavorite: false,
    }));
    await dispatch(getFavoriteOffersAction());
  };

  return (
    <div className={`page${keys.length > 0 ? '' : ' page--favorites-empty'}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <Authorization/>
          </div>
        </div>
      </header>

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
                          onRemoveFavoriteOffer={handleRemoveFavoriteOffer}
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
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
