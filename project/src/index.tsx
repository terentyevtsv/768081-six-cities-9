import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//import { fetchOffersAction } from './api-actions';
import App from './components/app/app';
import { reviews } from './mocks/reviews';
import { store } from './types/state';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//store.dispatch(fetchOffersAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer/>
      <App reviews={reviews}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
