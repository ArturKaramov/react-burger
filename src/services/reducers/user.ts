import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  createNewPassword,
  getUserInfo,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateUser,
} from '../actions/user';
import { deleteCookie, setCookie } from '../../utils/utils';
import { TLoginResponse } from '../types/data';

export type TUserState = {
  authRequest: boolean;
  authSuccess: boolean;
  passRequest: boolean;
  passSuccess: boolean;
  newPassRequest: boolean;
  newPassSuccess: boolean;
  user: { email: string; name: string };
};

const initialState: TUserState = {
  authRequest: false,
  authSuccess: false,
  passRequest: false,
  passSuccess: false,
  newPassRequest: false,
  newPassSuccess: false,
  user: {
    email: '',
    name: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state: TUserState) => {
        state.authRequest = true;
        state.authSuccess = false;
      })
      .addCase(registerUser.rejected, (state: TUserState) => {
        state.authRequest = false;
        state.authSuccess = true;
      })
      .addCase(registerUser.fulfilled, (state: TUserState) => {
        state.authRequest = false;
        state.authSuccess = false;
      })
      .addCase(loginUser.pending, (state: TUserState) => {
        state.passSuccess = false;
        state.newPassSuccess = false;
        state.authRequest = true;
        state.authSuccess = false;
      })
      .addCase(loginUser.rejected, (state: TUserState) => {
        state.authRequest = false;
        state.authSuccess = false;
      })
      .addCase(loginUser.fulfilled, (state: TUserState, action: PayloadAction<TLoginResponse>) => {
        state.authRequest = false;
        state.authSuccess = true;
        state.user = { ...action.payload.user };
        setCookie('token', action.payload.accessToken);
        localStorage.setItem('refresh', action.payload.refreshToken);
      })
      .addCase(logoutUser.fulfilled, (state: TUserState) => {
        deleteCookie('token');
        localStorage.setItem('refresh', '');
        return initialState;
      })
      .addCase(getUserInfo.fulfilled, (state: TUserState, action: PayloadAction<any>) => {
        state.authSuccess = true;
        state.user = action.payload.user;
      })
      .addCase(
        updateUser.fulfilled,
        (
          state: TUserState,
          action: PayloadAction<{ success: boolean; user: { name: string; email: string } }>,
        ) => {
          state.user = action.payload.user;
        },
      )
      .addCase(resetPassword.pending, (state: TUserState) => {
        state.passRequest = true;
        state.passSuccess = false;
      })
      .addCase(resetPassword.rejected, (state: TUserState) => {
        state.passRequest = false;
        state.passSuccess = false;
      })
      .addCase(resetPassword.fulfilled, (state: TUserState) => {
        state.passRequest = false;
        state.passSuccess = true;
      })
      .addCase(createNewPassword.pending, (state: TUserState) => {
        state.newPassRequest = true;
        state.newPassSuccess = false;
      })
      .addCase(createNewPassword.rejected, (state: TUserState) => {
        state.newPassRequest = false;
        state.passSuccess = false;
      })
      .addCase(createNewPassword.fulfilled, (state: TUserState) => {
        state.passSuccess = false;
        state.newPassRequest = false;
        state.newPassSuccess = true;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
