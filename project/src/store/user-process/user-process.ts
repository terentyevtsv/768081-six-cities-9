import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { getAuthInfo } from '../../services/token';
import { UserProcess } from '../../types/state';

const initialState: UserProcess =   {
  authorizationStatus: getAuthInfo() !== null
    ? AuthorizationStatus.Auth
    : AuthorizationStatus.Unknown,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    changeAuthorizationStatus: (state, action) => {
      state.authorizationStatus = action.payload;
    },
  },
});

export const {changeAuthorizationStatus} = userProcess.actions;
