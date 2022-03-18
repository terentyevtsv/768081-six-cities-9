import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Authorization from '../authorization/authorization';
import './css/not-found-page.css';

function NotFoundPage() {
  return (
    <div className="page page--not-found">
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

      <main className="page__main page__main--not-found">
        <div className="container">
          <section>
            <h1 className="visually-hidden">Page is not found</h1>
            <div className="not-found__status-wrapper">
              <b className="not-found__status">Not Found</b>
              <Link to={AppRoute.Main}>Go to main page</Link>
            </div>
          </section>
        </div>
      </main>
      <footer className="footer">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
}

export default NotFoundPage;
