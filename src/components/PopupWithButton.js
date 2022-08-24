import Popup from "./Popup";

class PopupWithButton extends Popup{
  constructor(popupSelector, callbackFunc){
    super(popupSelector)
    this._form = this._popupSelector.querySelector('.popup__form')
    this._buttonFunction = callbackFunc;
  }

  open(id, el){
    super.open()
    this._cardId = id
    this._cardEl = el
  }


  setEventListeners(){
    super.setEventListeners()
    this._form.addEventListener('submit', (e)=>{
      e.preventDefault()
      this._buttonFunction(this._cardId)
      this.close()
      this._cardEl.remove()
      this._cardEl = null
    })
  }
}

export default PopupWithButton
