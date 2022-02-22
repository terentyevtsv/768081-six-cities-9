import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import AllRentalOffersPage from '../all-rental-offers-page/all-rental-offers-page';
import FavoritesPage from '../favorites-page/favorites-page';
import NotFoundPage from '../not-found-page/not-found-page';
import PrivateRoute from '../../hocs/private-route/private-route';
import RentalOfferPage from '../rental-offer-page/rental-offer-page';
import SignInPage from '../sign-in-page/sign-in-page';
import { Offer } from '../../types/offer';
import { Review } from '../../types/review';

type AppProps = {
  stayPlacesCount: number,
  offers: Offer[],
  reviews: Review[]
};

function App({stayPlacesCount, offers, reviews}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <AllRentalOffersPage
              stayPlacesCount={stayPlacesCount}
            />
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
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
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
    </BrowserRouter>
  );
}

export default App;
