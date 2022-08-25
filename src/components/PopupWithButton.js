import Popup from "./Popup";

class PopupWithButton extends Popup{
  constructor(popupSelector, callbackFunc){
    super(popupSelector)
    this._form = this._popupSelector.querySelector('.popup__form')
    this._button = this._popupSelector.querySelector('.popup__submit-btn')
    this._defaultButtonText = this._button.textContent
    this._buttonFunction = callbackFunc;
  }

  open(id, el){
    super.open()
    this._cardId = id
    this._cardEl = el
  }

  close(){
    super.close()
    this.renderError(false)
  }

  setEventListeners(){
    super.setEventListeners()
    this._form.addEventListener('submit', (e)=>{
      e.preventDefault()
      this._buttonFunction(this._cardId, this._cardEl)
    })

  }

  //Добавил обработку ошибок
  renderError(isError){
    if(isError){
      this._button.textContent = 'Ошибка!'
    }else{
      this._button.textContent = this._defaultButtonText
    }
  }

}

export default PopupWithButton
