import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { UserProcess } from '../../types/state';

const initialState: UserProcess =   {
  authorizationStatus: AuthorizationStatus.Unknown,
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
