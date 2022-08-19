import Card from "./Сard";

class UserCard extends Card{
  constructor(item, popupFunction, template){
    super(item, template, popupFunction)
  }

  _deleteCard(){
    this._card.remove();
    this._card = null;
  };

  _addListeners(){
    super._addListeners()
    this._card.querySelector('.place__delete-btn').addEventListener('click', () => this._deleteCard ());
  };
}

export default UserCard
