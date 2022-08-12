import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector)
    this._image = this._popupSelector.querySelector('.popup__image');
    this._description = this._popupSelector.querySelector('.popup__image-caption');

  };

  open(name, link){
    super.open()
    this._image.src = link;
    this._image.alt = name;
    this._description.textContent = name;
  };

};

