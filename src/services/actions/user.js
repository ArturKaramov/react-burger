import { api } from "../../utils/api";
import { setCookie, getCookie, deleteCookie } from "../../utils/utils";

export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_FAILED = "AUTH_FAILED";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const PASS_REQUEST = "PASS_REQUEST";
export const PASS_FAILED = "PASS_FAILED";
export const PASS_SUCCESS = "PASS_SUCCESS";
export const NEW_PASS_REQUEST = "NEW_PASS_REQUEST";
export const NEW_PASS_FAILED = "NEW_PASS_FAILED";
export const NEW_PASS_SUCCESS = "NEW_PASS_SUCCESS";
export const LOGOUT = "LOGOUT";
export const REFRESH_TOKEN = "REFRESH_TOKEN";

export const loginUser = (obj) => {
  return function (dispatch) {
    dispatch({ type: AUTH_REQUEST });
    api
      .loginUser(obj)
      .then((res) => {
        dispatch({ type: AUTH_SUCCESS, data: res });
        setCookie("token", res.accessToken, { expires: 1200 });
        localStorage.setItem("refresh", res.refreshToken);
      })
      .catch(() => dispatch({ type: AUTH_FAILED }));
  };
};

export const registerUser = (obj) => {
  return function (dispatch) {
    dispatch({ type: AUTH_REQUEST });
    api
      .createUser(obj)
      .then((res) => {
        dispatch({
          type: AUTH_SUCCESS,
          data: res,
        });
        setCookie("token", res.accessToken, { expires: 1200 });
        localStorage.setItem("refresh", res.refreshToken);
      })
      .catch(() => dispatch({ type: AUTH_FAILED }));
  };
};

export const logoutUser = () => {
  return function (dispatch) {
    api
      .logoutUser({ token: localStorage.getItem("refresh") })
      .then((res) => console.log(res))
      .then(() => {
        dispatch({ type: LOGOUT });
        deleteCookie("token");
        localStorage.setItem("refresh", "");
      })
      .catch((err) => console.error(err));
  };
};

export const updateUser = (obj) => {
  return function (dispatch) {
    api
      .updateUserInfo(obj)
      .then((res) =>
        dispatch({
          type: AUTH_SUCCESS,
          data: res,
        })
      )
      .catch((err) => console.error(err));
  };
};

export const getUserInfo = () => {
  return function (dispatch) {
    api
      .getUserInfo()
      .then((res) =>
        dispatch({
          type: AUTH_SUCCESS,
          data: res,
        })
      )
      .catch((err) => console.error(err));
  };
};

export const refreshToken = () => {
  return function (dispatch) {
    api
      .refreshToken()
      .then((res) => {
        dispatch({ type: REFRESH_TOKEN, data: res });
        setCookie("token", res.accessToken, { expires: 1200 });
        localStorage.setItem("refresh", res.refreshToken);
      })
      .catch((err) => console.error(err));
  };
};

export const resetPassword = (obj) => {
  return function (dispatch) {
    dispatch({ type: PASS_REQUEST });
    api
      .resetPassword(obj)
      .then(() => dispatch({ type: PASS_SUCCESS }))
      .catch(() => dispatch({ type: PASS_FAILED }));
  };
};

export const createNewPassword = (obj) => {
  return function (dispatch) {
    dispatch({ type: NEW_PASS_REQUEST });
    api
      .createNewPassword(obj)
      .then(() => dispatch({ type: NEW_PASS_SUCCESS }))
      .catch(() => dispatch({ type: NEW_PASS_FAILED }));
  };
};
