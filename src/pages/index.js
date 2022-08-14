import './index.css'
import FormValidator from '../components/FormValidator.js'
import {validConfig, initialPlaces} from '../utils/data.js';
import Card from '../components/Сard.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import{nameInput,
  aboutInput,
  formAdd,
  profileEditBtn,
  profileAddBtn,
  formValidators }
from '../utils/constants.js'

const profile = new UserInfo({userName: '.profile__name', about: '.profile__about'})

const popupWithImage = new PopupWithImage('.popup_type_image')
popupWithImage.setEventListeners()

const popupWithFormAdd = new PopupWithForm('.popup_type_add', addPlace)
popupWithFormAdd.setEventListeners()

const popupWithFormEdit = new PopupWithForm('.popup_type_edit', saveProfile)
popupWithFormEdit.setEventListeners()


// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')

    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

const cardList = new Section({
  items: initialPlaces,
  renderer: (item) =>{
    const card = createCard(item)
    cardList.addItem(card)
  }

}, '.places__list')

cardList.renderAll()


function createCard(data) {
  const card = new Card(data, openImagePopup, '.place-template');
  return card.createCard()
};


function addPlace(data){
  const newCard = createCard(data)
  cardList.addItem(newCard)
  // debugger
  popupWithFormAdd.close()
};


//Открыть попап с картинкой
function openImagePopup(name, link){
  popupWithImage.open(name, link)
};

//Открыть попап редактирования профиля
function openEditPopup(){
  popupWithFormEdit.open()
  const values =  profile.getUserInfo()
  aboutInput.value = values.about
  nameInput.value = values.name
  formValidators['editForm'].resetValidation()
};

//Открыть попап добавления места
function openAddPopup(){
  formAdd.reset()
  popupWithFormAdd.open()
  formValidators['cardForm'].resetValidation()
};

//Сохранить изменения профиля
function saveProfile(){
  profile.setUserInfo(nameInput, aboutInput)
  popupWithFormEdit.close()
};

enableValidation(validConfig);

profileEditBtn.addEventListener('click', openEditPopup);
profileAddBtn.addEventListener('click', openAddPopup);

