import { data } from "autoprefixer";

class Api{
  constructor(config){
    this._url = config.url;
    this._headers = config.headers;
  };

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
    .then(res => this._handleResponce(res))


  };

  editProfile({name, about}){
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name, about})
    })
    .then(res => this._handleResponce(res))
  }

  changeAvatar(avatar){
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatar)
    })
    .then(res => this._handleResponce(res))
  }


  getProfile(){
    return fetch(`${this._url}/users/me`,{
      headers: this._headers
    })
    .then(res=>this._handleResponce(res))
  };

  deleteCardById(id){

  };

  createCard(data){
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(res => this._handleResponce(res))
  };

  _handleResponce(res){
    if(res.ok){
      return res.json()
    }
    throw new Error(res.status)
  }
}

export default Api


