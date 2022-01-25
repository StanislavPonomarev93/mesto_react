import type {ApiData} from '../../types/types';

class MestoApi {
  readonly options: ApiData;
  constructor(options: ApiData) {
    this.options = options;
  };
  getUserInfo = () => {
    return fetch(`${this.options.baseUrl}/users/me`, this.options.token)
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(err => console.log(`Ошибка: ${err}`))
  };
  getInitialCards = () => {
    return fetch(`${this.options.baseUrl}/cards`, this.options.token)
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(err => console.log(`Ошибка: ${err}`))
  }
  sendUserInfo = (nameValue: string, aboutValue: string) => {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        name: nameValue,
        about: aboutValue
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(err => console.log(`Ошибка: ${err}`))
  };
  changeAvatar = (avatarValue: string) => {
    return fetch(`${this.options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        avatar: avatarValue
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(err => console.log(`Ошибка: ${err}`))
  };
  addCard = (nameValue: string, linkValue: string) => {
    return fetch(`${this.options.baseUrl}/cards`, {
      method: 'POST',
      headers: this.options.headers,
      body: JSON.stringify({
        name: nameValue,
        link: linkValue
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(err => console.log(`Ошибка: ${err}`))
  };
  deleteCard = (cardId: string) => {
    return fetch(`${this.options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.options.token.headers
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(err => console.log(`Ошибка: ${err}`))
  };
  setLike = (cardId: string) => {
    return fetch(`${this.options.baseUrl}/cards/like/${cardId}`, {
      method: 'PUT',
      headers: this.options.token.headers
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(err => console.log(`Ошибка: ${err}`))
  };
  deleteLike = (cardId: string) => {
    return fetch(`${this.options.baseUrl}/cards/like/${cardId}`, {
      method: 'DELETE',
      headers: this.options.token.headers
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(err => console.log(`Ошибка: ${err}`))
  };
  authorize = (identifier: string, password: string) => {
    return fetch(`${this.options.BASE_URL}/auth/local`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ identifier, password })
    })
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .catch(err => err)
  };
  register = (username: string, password: string, email: string) => {
    return fetch(`${this.options.BASE_URL}/auth/local/register`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password, email })
    })
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .catch(err => err)
  };
}

export const mestoApi = new MestoApi(
  {
    baseUrl: 'https://nomoreparties.co/cohort12',
    BASE_URL: 'https://api.nomoreparties.co',
    token: {
      headers: {
        authorization: 'd4572fc5-fe6c-4e19-8131-2e629bd6f3d0'
      }
    },
    headers: {
      authorization: 'd4572fc5-fe6c-4e19-8131-2e629bd6f3d0',
      'Content-Type': 'application/json'
    }
  }
);