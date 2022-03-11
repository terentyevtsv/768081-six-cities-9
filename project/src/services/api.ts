import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getAuthInfo } from './token';

const BACKEND_URL = 'https://9.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const authInfo = getAuthInfo();
      if (authInfo !== null) {
        const { token } = authInfo;
        config.headers['X-Token'] = token;
      }

      return config;
    },
  );

  return api;
};
