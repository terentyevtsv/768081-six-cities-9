import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { MouseEvent } from 'react';
import { changeCity } from '../../store/rental/rental';
import { getCity } from '../../store/rental/selectors';

type CityProps = {
  cities: string[]
}

function Cities({cities}: CityProps) {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector(getCity);

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
                    dispatch(changeCity(city));
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
