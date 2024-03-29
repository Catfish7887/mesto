import Popup from "./Popup";

class PopupWithError extends Popup{
  constructor(popupSelector){
    super(popupSelector);
    this._errTextElement = this._popupSelector.querySelector('.popup__error-text');
    this._agreeButton = this._popupSelector.querySelector('.popup__submit-btn')
  };
  open(err){
    super.open()
    this._errTextElement.textContent = err.message;
  };

  close(){
    super.close()
    this._errTextElement.textContent = '';
  };

  setEventListeners(){
    super.setEventListeners();
    this._agreeButton.addEventListener('click', () => this.close())
  }
}


/*
Планируется выводить ошибки в модальное окно, которое будет открываться при возникновении ошибок сервера. Пока что функционал готов не полностью.
Обработка ошибок осуществлена через вывод ошибки в консоль.
 */
