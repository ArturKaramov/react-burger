import { api } from "../../utils/api";
import { setCookie, getCookie } from "../../utils/utils";

export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_FAILED = "AUTH_FAILED";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const LOGOUT = "LOGOUT";
export const REFRESH_TOKEN = "REFRESH_TOKEN";

export const loginUser = (obj) => {
  return function (dispatch) {
    dispatch({ type: AUTH_REQUEST });
    api
      .loginUser(obj)
      .then((res) => {
        dispatch({ type: AUTH_SUCCESS, data: res });
        setCookie("token", res.accessToken);
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
        setCookie("token", res.accessToken);
        localStorage.setItem("refresh", res.refreshToken);
      })
      .catch(() => dispatch({ type: AUTH_FAILED }));
  };
};

export const refreshToken = () => {
  return function (dispatch) {
    api
      .refreshToken(localStorage.getItem("refresh"))
      .then((res) => {
        dispatch({ type: REFRESH_TOKEN, data: res });
        setCookie("token", res.accessToken);
        localStorage.setItem("refresh", res.refreshToken);
      })
      .catch((err) => console.error(err));
  };
};

export const logoutUser = () => {
  return function (dispatch) {
    api
      .logoutUser({ token: getCookie("refresh") })
      .then(() => dispatch({ type: LOGOUT }))
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
    api.getUserInfo();
  };
};
