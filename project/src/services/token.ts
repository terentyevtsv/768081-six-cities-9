import { AuthInfo } from '../types/auth-info';

const AUTH_TOKEN_KEY_NAME = 'six-cities';

export const getAuthInfo = (): AuthInfo => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  const authInfo: AuthInfo = token !== null ? JSON.parse(token) :  null;
  return authInfo;
};

export const saveAuthInfo = (authInfo: AuthInfo): void => {
  const authStr = JSON.stringify(authInfo);
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, authStr);
};

export const dropAuthInfo = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};
