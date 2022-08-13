export default class UserInfo{
  constructor({userName, about}){
    this._userName = document.querySelector(userName);
    this._about = document.querySelector(about);

  }

  getUserInfo(){
    return{
      name: this._userName.textContent,
      about: this._about.textContent
    };
  }

  setUserInfo(name, about){
    this._userName.textContent = name.value;
    this._about.textContent = about.value;
  }
}
