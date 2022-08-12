import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor(popupSelector, callbackFunc){
    super(popupSelector)
    this._submitFunction = callbackFunc;
    this._form = this._popupSelector.querySelector('.popup__form');
    this._inputs = Array.from(this._popupSelector.querySelectorAll('.popup__input'))
  };

  _getInputValues(){
    this._values = {};
    this._inputs.forEach(input=>{
      this._values[input.name] = input.value
    });
    return this._values;
  }

  close(){
    super.close()
    this._form.reset()
  }

  setEventListeners(){
    super.setEventListeners()

    this._form.addEventListener('submit', (e)=>{
      e.preventDefault();
      this._submitFunction(this._getInputValues())
    });
  }

};
