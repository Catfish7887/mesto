import { data } from "autoprefixer";

class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  };

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(res => this._handleResponce(res))


  };
  like(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(res => this._handleResponce(res))
  }

  dislike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this._handleResponce(res))
  }

  editProfile({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about })
    })
      .then(res => this._handleResponce(res))
  }

  changeAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatar)
    })
      .then(res => this._handleResponce(res))
  }


  getProfile() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(res => this._handleResponce(res))
  };

  deleteCardById(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this._handleResponce(res))
  };

  createCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
      .then(res => this._handleResponce(res))
  };

  _handleResponce(res) {
    if (res.ok) {
      return res.json()
    }
    throw new Error(`Статус ошибки: ${res.status}`)
  }
}

export default Api


