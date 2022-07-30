import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  constructor(popupSelector, {image, description}){
    this._popupSelector = popupSelector;
    this._imageSelector = this._popupSelector.querySelector('.popup__image');
    this._descriptionSelector = this._popupSelector.querySelector('.popup__image-caption');
    this._image = image;
    this._description = description;
  };
  open(){
    this._imageSelector.src = this._image;
    this._imageSelector.alt = this._description;
    this._descriptionSelector.textContent = this._description;
    super.open()
  };

  close(){
    super.close()
    this._descriptionSelector.textContent = '';
    this._imageSelector.src = '';
    this._imageSelector.alt = '';

  };
};

