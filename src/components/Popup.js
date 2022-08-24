export default class Popup {
  constructor(selector){
    this._popupSelector = document.querySelector(selector);
    this._closeButton = this._popupSelector.querySelector('.popup__close-btn');
    this._handleEscClose = this._handleEscClose.bind(this);
  };

  open(){
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  };

  close(){
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  };

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close()
    }
  };


  setEventListeners(){
    this._closeButton.addEventListener('click', () => this.close());

    this._popupSelector.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close()
      };
    });

  };
}
