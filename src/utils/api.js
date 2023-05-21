import { url } from "./data";
import { setCookie, getCookie } from "./utils";

class Api {
  constructor(url) {
    this._url = url;
  }

  _isResponseOk(response) {
    return response.ok
      ? response.json()
      : Promise.reject(`Ошибка: ${response.status}`);
  }

  _checkForRefresh(response) {
    return response.ok
      ? response.json()
      : response.json().then((err) => Promise.reject(err));
  }

  _request(url, options = "") {
    return options
      ? fetch(url, options).then((res) => this._isResponseOk(res))
      : fetch(url).then((res) => this._isResponseOk(res));
  }

  _refreshToken() {
    return this._request(`${this._url}/auth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: localStorage.getItem("refresh") }),
    })
      .then((res) => {
        setCookie("token", res.accessToken);
        localStorage.setItem("refresh", res.refreshToken);
      })
      .catch((err) => console.error(err));
  }

  _requestWithRefresh(url, options) {
    return fetch(url, options)
      .then((res) => this._checkForRefresh(res))
      .catch((err) =>
        err.message === "jwt expired"
          ? this._refreshToken().then(() => {
              options.headers.authorization = getCookie("token");
              this._requestWithRefresh(url, options);
            })
          : console.error(err.message)
      );
  }

  getData() {
    return this._request(`${this._url}/ingredients`);
  }

  createOrder(arr) {
    return this._request(`${this._url}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: getCookie("token"),
      },
      body: JSON.stringify({
        ingredients: arr,
      }),
    });
  }

  loginUser(obj) {
    return this._request(`${this._url}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });
  }

  createUser(obj) {
    return this._request(`${this._url}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });
  }

  logoutUser(obj) {
    return this._request(`${this._url}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });
  }

  resetPassword(obj) {
    return this._request(`${this._url}/password-reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });
  }

  createNewPassword(obj) {
    return this._request(`${this._url}/password-reset/reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });
  }

  getUserInfo() {
    return this._requestWithRefresh(`${this._url}/auth/user`, {
      method: "GET",
      headers: {
        authorization: getCookie("token"),
        "Content-Type": "application/json",
      },
    });
  }

  updateUserInfo(obj) {
    return this._requestWithRefresh(`${this._url}/auth/user`, {
      method: "PATCH",
      headers: {
        authorization: getCookie("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
  }
}

export const api = new Api(url);
