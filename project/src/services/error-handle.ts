import request from 'axios';
import { HTTP_CODE } from '../const';
import { ErrorType } from '../types/error';
import {toast} from 'react-toastify';

export const errorHandle = (error: ErrorType): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const {response} = error;

  if (response) {
    switch (response.status) {
      case HTTP_CODE.BAD_REQUEST:
        toast.info(response.data.error);
        break;
      case HTTP_CODE.UNAUTHORIZED:
        toast.info(response.data.error);
        break;
      case HTTP_CODE.NOT_FOUND:
        toast.info(response.data.error);
        break;
      default:
        toast.info('Unknown error');
        break;
    }

    return;
  }

  toast.info(error.message);
};

export const getStatusCode = (error: ErrorType): number => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const {response} = error;
  if (response) {
    return response.status;
  }

  return -1;
};
