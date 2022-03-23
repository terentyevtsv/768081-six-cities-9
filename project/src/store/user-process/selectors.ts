import { NameSpace } from '../../const';
import { RootState } from '../../types/state';

export const getAuthorizationStatus = (state: RootState) =>
  state[NameSpace.User].authorizationStatus;
