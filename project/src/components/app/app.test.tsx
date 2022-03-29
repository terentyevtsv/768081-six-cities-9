import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AppRoute, AuthorizationStatus, NameSpace, SortType } from '../../const';
import { makeFakeCity, makeFakeOffers } from '../../utils/mock';
import HistoryRouter from '../history-route/history-route';
import App from './app';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const fakeOffers = makeFakeOffers();
const store = mockStore({
  [NameSpace.Rental]: {
    city: makeFakeCity(),
    offers: fakeOffers,
    sortType: SortType.Popular,
  },
  [NameSpace.OffersData]: {
    areAllOffersLoaded: true,
    favoriteOffers: fakeOffers,
    allOffers: fakeOffers,
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
});

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App/>
    </HistoryRouter>
  </Provider>
);

describe('App routing', () => {
  it('should render AllRentalOffersPage when Auth user navigate to /', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText(/Paris/i)).toBeInTheDocument();
  });

  it('should render AllRentalOffersPage when Auth user navigate to /login', () => {
    history.push(AppRoute.SignIn);

    render(fakeApp);

    expect(screen.getByText(/Paris/i)).toBeInTheDocument();
  });

  it('should render Favorites when route to Auth user favorites', () => {
    history.push(AppRoute.Favorites);

    render(fakeApp);

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });
});
