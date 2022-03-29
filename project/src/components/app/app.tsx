import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import AllRentalOffersPage from '../all-rental-offers-page/all-rental-offers-page';
import FavoritesPage from '../favorites-page/favorites-page';
import NotFoundPage from '../not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import RentalOfferPage from '../rental-offer-page/rental-offer-page';
import SignInPage from '../sign-in-page/sign-in-page';

function App(): JSX.Element {
  return (
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
          <RentalOfferPage/>
        }
      />
      <Route
        path={AppRoute.NotFound}
        element={
          <NotFoundPage/>
        }
      />
    </Routes>
  );
}

export default App;
