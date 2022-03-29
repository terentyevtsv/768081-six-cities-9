import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { fetchOffersAction, getAuthAction } from './store/api-actions';
import App from './components/app/app';
import { store } from './types/state';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';

store.dispatch(getAuthAction());
store.dispatch(fetchOffersAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer/>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
