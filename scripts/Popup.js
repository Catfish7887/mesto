export default class Popup {
  constructor(selector){
    this._popupSelector = selector;
  };

  open(){
    this._popupSelector.classList.add('popup_opened');
    this._popupSelector.addEventListener('keydown', this._handleEscClose());
  };

  close(){
    this._popupSelector.classList.remove('popup_opened');
    this._popupSelector.removeEventListener('keydown', this._handleEscClose())
  };

  _handleEscClose(e){
    if(e.key === 'Escape'){
      this.close()
    }};

  setEventListeners(){
    this._popupSelector.addEventListener('click', this.close());
    this._popupSelector.addEventListener('mousedown', this.close());

  }
};
