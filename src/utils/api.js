import { url } from "./data";

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
}

export const api = new Api(url);
