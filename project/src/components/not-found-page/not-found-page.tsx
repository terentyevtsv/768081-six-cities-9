import { Link } from 'react-router-dom';
import { AppRoute, DEFAULT_OFFER } from '../../const';
import { useAppDispatch } from '../../hooks/hooks';
import { setCurrentOffer, setIsOfferExist } from '../../store/offers-data/offers-data';
import Footer from '../footer/footer';
import Header from '../header/header';
import './css/not-found-page.css';

function NotFoundPage() {
  const dispatch = useAppDispatch();

  const onMovingToMainPage = () => {
    handleMovingToMainPage();
  };

  const handleMovingToMainPage = () => {
    dispatch(setIsOfferExist(true));
    dispatch(setCurrentOffer(DEFAULT_OFFER));
  };

  return (
    <div className="page page--not-found">
      <Header onMovingToMainPage={onMovingToMainPage}/>

      <main className="page__main page__main--not-found">
        <div className="container">
          <section>
            <h1 className="visually-hidden">Page is not found</h1>
            <div className="not-found__status-wrapper">
              <b className="not-found__status">Not Found</b>
              <Link
                to={AppRoute.Main}
                onClick={handleMovingToMainPage}
              >
                Go to main page
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer onMovingToMainPage={onMovingToMainPage}/>
    </div>
  );
}

export default NotFoundPage;
