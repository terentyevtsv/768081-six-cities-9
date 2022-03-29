import request from 'axios';
import { HttpCode } from '../const';
import { ErrorType } from '../types/error';
import {toast} from 'react-toastify';

export const handleError = (error: ErrorType): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const {response} = error;

  if (response) {
    switch (response.status) {
      case HttpCode.BadRequest:
        toast.info(response.data.error);
        break;
      case HttpCode.Unauthorized:
        toast.info(response.data.error);
        break;
      case HttpCode.NotFound:
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
