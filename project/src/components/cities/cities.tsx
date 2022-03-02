import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { MouseEvent, useEffect } from 'react';
import { changeCityAction, fillOffersAction } from '../../store/action';
import { Offer } from '../../types/offer';
import { getOffers } from '../../rental';

type CityProps = {
  cities: string[],
  offers: Offer[]
}

function Cities({cities, offers}: CityProps) {
  const selectedCity = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fillOffersAction(getOffers(selectedCity, offers)));
  }, [dispatch, offers, selectedCity]);

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {
          cities.map((city) => (
            <li
              className="locations__item"
              key={city}
            >
              <a
                className={`locations__item-link tabs__item${city === selectedCity ? ' tabs__item--active' : ''}`}
                href="/"
                onClick={
                  (evt: MouseEvent) => {
                    evt.preventDefault();
                    dispatch(changeCityAction(city));
                  }
                }
              >
                <span>{city}</span>
              </a>
            </li>
          ))
        }
      </ul>
    </section>
  );
}

export default Cities;
