export default class UserInfo{
  constructor(avatar, {userName, about}){
    this._userName = document.querySelector(userName);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar)

  }

  getUserInfo(){
    return{
      name: this._userName.textContent,
      about: this._about.textContent
    };
  }

  renderAvatar(data){
    this._avatar.src = data.avatar
  }

  renderInfo(data){
    this._userName.textContent = data.name
    this._about.textContent = data.about
  }

  setUserInfo(name, about){
    this._userName.textContent = name.value;
    this._about.textContent = about.value;
  }
}
