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

  getData() {
    return fetch(`${this._url}/ingredients`).then((res) =>
      this._isResponseOk(res)
    );
  }

  createOrder(arr) {
    return fetch(`${this._url}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ingredients: arr,
      }),
    }).then((res) => this._isResponseOk(res));
  }
}

export const api = new Api(url);
