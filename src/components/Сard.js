import { data } from "autoprefixer";

class Card {
  constructor(item, popupFunction, template, userId, likeFunction, deleteFunction) {
    this._ownerId = userId

    this._likeCallback = likeFunction
    this._handleCardClick = popupFunction;
    this._deleteCallback = deleteFunction

    this._data = item
    this._image = item.link;
    this._name = item.name;

    this._template = document.querySelector(template).content;

    this._likes = this._data.likes.length
    this._isLiked = this._data.likes.some(
      (like) => like._id === this._ownerId) // Проверка, есть ли лайк пользователя на карточке. Если есть, то параметр принимает значение true
  };


  _getTemplate() {
    return this._template.cloneNode(true).children[0];

  };


  _like() {
    this._refreshLikeState() //Проверка состояния This._isLiked. Если true, то выполнится метод DELETE у лайка
    this._likeCallback(this._isLiked, this._data._id, this._likeCounter, this._likeButton)
    this._refreshLikeState()
  };


  _deleteCard() {
    this._deleteCallback(this._data._id, this._card)

  };


  _refreshLikeState() {
    if (this._likeButton.classList.contains('place__like-btn_active')) {
      this._isLiked = true
    } else {
      this._isLiked = false
    }
  }


  _openImagePopup() {
    this._handleCardClick(this._name, this._image);
  };


  _addListeners() {
    this._likeButton.addEventListener('click', () => this._like());
    this._cardImage.addEventListener('click', () => this._openImagePopup());
  };


  createCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector('.place__image');
    this._likeButton = this._card.querySelector('.place__like-btn');
    this._deleteButton = this._card.querySelector('.place__delete-btn')
    this._likeCounter = this._card.querySelector('.place__like-count')

    this._card.querySelector('.place__name').textContent = this._name;
    this._cardImage.src = this._image;
    this._cardImage.alt = this._name;
    this._likeCounter.textContent = this._likes

    if (this._ownerId === this._data.owner._id) {
      this._deleteButton.addEventListener('click', () => this._deleteCard())

    } else {
      this._deleteButton.remove()
      this._deleteButton = null

    }

    if (this._isLiked) { this._likeButton.classList.add('place__like-btn_active') }
    this._addListeners();
    return this._card;

  };

};

export default Card;


