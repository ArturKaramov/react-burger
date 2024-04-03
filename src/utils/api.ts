import { url } from './data';
import { setCookie, getCookie } from './utils';

interface IOptions {
  readonly method: string;
  headers: {
    'Content-Type': string;
    authorization?: string;
  };
  readonly body?: string;
}

class Api {
  readonly _url: string;
  constructor(url: string) {
    this._url = url;
  }

  _isResponseOk(response: Response) {
    return response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`);
  }

  _checkForRefresh(response: Response) {
    return response.ok
      ? response.json()
      : response.json().then((err: Response) => Promise.reject(err));
  }

  _request(url: string, options?: IOptions) {
    return options
      ? fetch(url, options).then((res) => this._isResponseOk(res))
      : fetch(url).then((res) => this._isResponseOk(res));
  }

  _refreshToken() {
    return this._request(`${this._url}/auth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: localStorage.getItem('refresh') }),
    })
      .then((res) => {
        setCookie('token', res.accessToken);
        localStorage.setItem('refresh', res.refreshToken);
        return res;
      })
      .catch((err) => console.error(err));
  }

  _requestWithRefresh(url: string, options: IOptions) {
    return fetch(url, options)
      .then((res) => this._checkForRefresh(res))
      .catch((err) =>
        err.message === 'jwt expired'
          ? this._refreshToken().then((res: any) => {
              options.headers.authorization = res.accessToken;
              this._requestWithRefresh(url, options);
            })
          : console.error(err.message),
      );
  }

  getData() {
    return this._request(`${this._url}/ingredients`);
  }

  createOrder(arr: ReadonlyArray<string>) {
    return this._request(`${this._url}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: getCookie('token'),
      },
      body: JSON.stringify({
        ingredients: arr,
      }),
    });
  }

  loginUser(obj: { email: string; password: string }) {
    return this._request(`${this._url}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    });
  }

  createUser(obj: { email: string; password: string; name: string }) {
    return this._request(`${this._url}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    });
  }

  logoutUser() {
    return this._request(`${this._url}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: localStorage.getItem('refresh') }),
    });
  }

  resetPassword(obj: { email: string }) {
    return this._request(`${this._url}/password-reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    });
  }

  createNewPassword(obj: { token: string; password: string }) {
    return this._request(`${this._url}/password-reset/reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    });
  }

  getUserInfo() {
    return this._requestWithRefresh(`${this._url}/auth/user`, {
      method: 'GET',
      headers: {
        authorization: getCookie('token'),
        'Content-Type': 'application/json',
      },
    });
  }

  updateUserInfo(obj: { name: string; email: string; password: string }) {
    return this._requestWithRefresh(`${this._url}/auth/user`, {
      method: 'PATCH',
      headers: {
        authorization: getCookie('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });
  }
}

export const api = new Api(url);
