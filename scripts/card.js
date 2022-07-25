class Card{
  static _template = document.querySelector('.place-template').content

  constructor(item, popupFunction){
    this._cardImage = item.link
    this._cardName = item.name
    this._function = popupFunction

  };

  _like(){
    this._card.querySelector('.place__like-btn').classList.toggle('place__like-btn_active');
  };

  _deleteCard(){
    this._card.remove()
  };

  _openPopup(){
    this._function(this._cardName, this._cardImage)
  }

  _addListeners(){
    this._card.querySelector('.place__delete-btn').addEventListener('click', ()=>{this._deleteCard()})
    this._card.querySelector('.place__like-btn').addEventListener('click', ()=>{this._like()});
    this._card.querySelector('.place__image').addEventListener('click', ()=>{this._openPopup()})
  };

  createCard(){
    this._card = Card._template.cloneNode(true).children[0];
    this._card.querySelector('.place__name').textContent = this._cardName;
    this._card.querySelector('.place__image').src = this._cardImage;
    this._card.querySelector('.place__image').alt = this._cardName;
    this._addListeners();
    return this._card;


  };




};

export default Card;

