import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, cities, randomInteger } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { changeCity } from '../../store/rental/rental';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import HeaderLogo from '../header-logo/header-logo';
import Login from '../login/login';

const getRandomCity = () => {
  const maxIndex = cities.length - 1;
  const index = randomInteger(0, maxIndex);
  return cities[index];
};

function SignInPage() {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const [randomCity, setRandomCity] = useState('');

  useEffect(() => {
    const city = getRandomCity();
    setRandomCity(city);
  }, []);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} replace/>;
  }

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <HeaderLogo/>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <Login/>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={AppRoute.Main}
                onClick={() => dispatch(changeCity(randomCity))}
              >
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default SignInPage;
