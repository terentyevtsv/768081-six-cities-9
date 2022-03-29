import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AppRoute } from '../../const';
import HistoryRouter from '../history-route/history-route';
import Login from './login';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Login', () => {
  it('should render sign in when user navigate to login url', () => {
    history.push(AppRoute.SignIn);

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <Login/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('login'), 'user');
    userEvent.type(screen.getByTestId('password'), '123456');

    expect(screen.getByDisplayValue(/user/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });
});
