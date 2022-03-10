import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import AllRentalOffersPage from '../all-rental-offers-page/all-rental-offers-page';
import FavoritesPage from '../favorites-page/favorites-page';
import NotFoundPage from '../not-found-page/not-found-page';
import PrivateRoute from '../../hocs/private-route/private-route';
import RentalOfferPage from '../rental-offer-page/rental-offer-page';
import SignInPage from '../sign-in-page/sign-in-page';
import { Review } from '../../types/review';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

type AppProps = {
  reviews: Review[]
};

function App({reviews}: AppProps): JSX.Element {
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <AllRentalOffersPage/>
          }
        />
        <Route
          path={AppRoute.SignIn}
          element={
            <SignInPage/>
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesPage/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Room}
          element={
            <RentalOfferPage reviews={reviews}/>
          }
        />
        <Route
          path={AppRoute.NotFound}
          element={
            <NotFoundPage/>
          }
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
