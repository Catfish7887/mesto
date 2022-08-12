export default class UserInfo{
  constructor({userName, about}){
    this._userName = userName;
    this._about = about;

  }

  getUserInfo(){
    return{
      name: this._userName.innerText,
      about: this._about.innerText
    };
  }

  setUserInfo(name, about){
    this._userName.innerText = name.value;
    this._about.innerText = about.value;
  }
}
