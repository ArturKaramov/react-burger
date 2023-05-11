import { url } from "./data";
import { getCookie } from "./utils";

class Api {
  constructor(url) {
    this._url = url;
  }

  _isResponseOk(response) {
    return response.ok
      ? response.json()
      : Promise.reject(`Ошибка: ${response.status}`);
  }

  _request(url, options = "") {
    return options
      ? fetch(url, options).then((res) => this._isResponseOk(res))
      : fetch(url).then((res) => this._isResponseOk(res));
  }

  getData() {
    return this._request(`${this._url}/ingredients`);
  }

  createOrder(arr) {
    return this._request(`${this._url}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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

  refreshToken(obj) {
    return this._request(`${this._url}/auth/token`, {
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
    return this._request(`${this._url}/auth/user`, {
      method: "GET",
      headers: {
        authorization: getCookie("token"),
        "Content-Type": "application/json",
      },
    });
  }

  updateUserInfo(obj) {
    return this._request(`${this._url}/auth/user`, {
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
