class Card{
  constructor(item, popupFunction, template){
    this._image = item.link;
    this._name = item.name;
    this._handleCardClick = popupFunction;
    this._template = document.querySelector(template).content;
    this._data = item
  };

  _getTemplate(){
   return this._template.cloneNode(true).children[0];

  };

  _like(){
    this._likeButton.classList.toggle('place__like-btn_active');
  };

  _deleteCard(){
    this._card.remove();
    this._card = null;
  };

  _openPopup(){
    this._handleCardClick(this._name, this._image);
  };

  _addListeners(){
    // this._card.querySelector('.place__delete-btn').addEventListener('click', () => this._deleteCard ());
    this._likeButton.addEventListener('click', () => this._like ());
    this._cardImage.addEventListener('click', () => this._openPopup ());
  };

  createCard(id){
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector('.place__image');
    this._likeButton = this._card.querySelector('.place__like-btn');
    this._deleteButton = this._card.querySelector('.place__delete-btn')

    if(id === this._data.owner._id){
      this._card.querySelector('.place__name').textContent = this._name;
      this._cardImage.src = this._image;
      this._cardImage.alt = this._name;
      this._card.addEventListener('click', ()=>this._deleteCard())
      this._addListeners();
      return this._card;

    }else{
      this._card.querySelector('.place__name').textContent = this._name;
      this._cardImage.src = this._image;
      this._cardImage.alt = this._name;
      this._deleteButton.remove()
      this._deleteButton = null
      this._addListeners();
      return this._card;
    }

  };

};

export default Card;

