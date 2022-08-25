import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor(popupSelector, callbackFunc){
    super(popupSelector)
    this._submitFunction = callbackFunc;
    this._form = this._popupSelector.querySelector('.popup__form');
    this._inputs = Array.from(this._popupSelector.querySelectorAll('.popup__input'))
    this._submitBtn = this._form.querySelector('.popup__submit-btn')
    this._defaultText = this._submitBtn.textContent
  };


  open(){
    super.open()
  }

  _getInputValues(){
    this._values = {};
    this._inputs.forEach(input=>{
      this._values[input.name] = input.value
    });
    return this._values;
  }

  showLoading(isLoading){
    if(isLoading){
      this._submitBtn.textContent = 'Сохранение...';
    }else{
      this._submitBtn.textContent = this._defaultText;
    };
  };

  close(){
    super.close()
    this._form.reset()
    // this.showLoading(false)
  }


  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }





  setEventListeners(){
    super.setEventListeners()

    this._form.addEventListener('submit', (e)=>{
      e.preventDefault();
      this._submitFunction(this._getInputValues())
      this.showLoading(true)
    });
  }

};
