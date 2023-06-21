import { api } from "../../utils/api";
import { setCookie, getCookie, deleteCookie } from "../../utils/utils";

import {
  AUTH_REQUEST,
  AUTH_FAILED,
  AUTH_SUCCESS,
  PASS_REQUEST,
  PASS_FAILED,
  PASS_SUCCESS,
  NEW_PASS_REQUEST,
  NEW_PASS_FAILED,
  NEW_PASS_SUCCESS,
  LOGOUT,
} from "../constants";
import { AppDispatch, AppThunk } from "../types";
import { TAuthResponse } from "../types/data";

export interface IAuthRequest {
  readonly type: typeof AUTH_REQUEST;
}

export interface IAuthSuccess {
  readonly type: typeof AUTH_SUCCESS;
  readonly data: TAuthResponse;
}

export interface IAuthFailed {
  readonly type: typeof AUTH_FAILED;
}

export interface IPassRequest {
  readonly type: typeof PASS_REQUEST;
}

export interface IPassSuccess {
  readonly type: typeof PASS_SUCCESS;
}

export interface IPassFailed {
  readonly type: typeof PASS_FAILED;
}

export interface INewPassRequest {
  readonly type: typeof NEW_PASS_REQUEST;
}

export interface INewPassSuccess {
  readonly type: typeof NEW_PASS_SUCCESS;
}

export interface INewPassFailed {
  readonly type: typeof NEW_PASS_FAILED;
}

export interface ILogout {
  readonly type: typeof LOGOUT;
}

export type TUserActions =
  | IAuthRequest
  | IAuthFailed
  | IAuthSuccess
  | IPassRequest
  | IPassSuccess
  | IPassFailed
  | INewPassRequest
  | INewPassSuccess
  | INewPassFailed
  | ILogout;

const authRequestAction = (): IAuthRequest => ({ type: AUTH_REQUEST });
const authFailedAction = (): IAuthFailed => ({ type: AUTH_FAILED });
const authSuccessAction = (data: TAuthResponse): IAuthSuccess => ({
  type: AUTH_SUCCESS,
  data: data,
});
const logoutAction = (): ILogout => ({ type: LOGOUT });
const passRequestAction = (): IPassRequest => ({ type: PASS_REQUEST });
const passSuccessAction = (): IPassSuccess => ({ type: PASS_SUCCESS });
const passFailedAction = (): IPassFailed => ({ type: PASS_FAILED });
const newPassRequestAction = (): INewPassRequest => ({
  type: NEW_PASS_REQUEST,
});
const newPassSuccessAction = (): INewPassSuccess => ({
  type: NEW_PASS_SUCCESS,
});
const newPassFailedAction = (): INewPassFailed => ({ type: NEW_PASS_FAILED });

export const loginUser: AppThunk =
  (obj: { email: string; password: string }) => (dispatch: AppDispatch) => {
    dispatch(authRequestAction());
    api
      .loginUser(obj)
      .then((res) => {
        dispatch(authSuccessAction(res));
        setCookie("token", res.accessToken);
        localStorage.setItem("refresh", res.refreshToken);
      })
      .catch(() => dispatch(authFailedAction()));
  };

export const registerUser: AppThunk =
  (obj: { email: string; password: string; name: string }) =>
  (dispatch: AppDispatch) => {
    dispatch(authRequestAction());
    api
      .createUser(obj)
      .then((res) => {
        dispatch(authSuccessAction(res));
        setCookie("token", res.accessToken);
        localStorage.setItem("refresh", res.refreshToken);
      })
      .catch(() => dispatch(authFailedAction()));
  };

export const logoutUser: AppThunk = () => (dispatch: AppDispatch) => {
  api
    .logoutUser({ token: localStorage.getItem("refresh") })
    .then(() => {
      dispatch(logoutAction());
      deleteCookie("token");
      localStorage.setItem("refresh", "");
    })
    .catch((err) => console.error(err));
};

export const updateUser: AppThunk =
  (obj: { email: string; password: string; name: string }) =>
  (dispatch: AppDispatch) => {
    api
      .updateUserInfo(obj)
      .then((res) => dispatch(authSuccessAction(res)))
      .catch((err) => console.error(err));
  };

export const getUserInfo: AppThunk = () => (dispatch: AppDispatch) => {
  api
    .getUserInfo()
    .then((res) => dispatch(authSuccessAction(res)))
    .catch((err) => {
      console.error(err.message);
    });
};

export const resetPassword: AppThunk =
  (obj: { email: string }) => (dispatch: AppDispatch) => {
    dispatch(passRequestAction());
    api
      .resetPassword(obj)
      .then(() => dispatch(passSuccessAction()))
      .catch(() => dispatch(passFailedAction()));
  };

export const createNewPassword: AppThunk = (obj: {
  password: string;
  token: string;
}) => {
  return (dispatch: AppDispatch) => {
    dispatch(newPassRequestAction());
    api
      .createNewPassword(obj)
      .then(() => dispatch(newPassSuccessAction()))
      .catch(() => dispatch(newPassFailedAction()));
  };
};
