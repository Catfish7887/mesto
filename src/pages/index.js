import './index.css'
import FormValidator from '../components/FormValidator.js'
import {validConfig, initialPlaces} from '../utils/data.js';
import Card from '../components/Сard.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import{ popupEdit,
  nameInput,
  aboutInput,
  popupAdd,
  formAdd,
  imagePopup,
  profileEditBtn,
  profileAddBtn,
  profileName,
  profileAbout,
  placeTemplate,
  placeList,
  formValidators } from '../utils/constants.js'



const profile = new UserInfo({userName: profileName, about: profileAbout})

const popupWithImage = new PopupWithImage(imagePopup)
popupWithImage.setEventListeners()

const popupWithFormAdd = new PopupWithForm(popupAdd, addPlace)
popupWithFormAdd.setEventListeners()

const popupWithFormEdit = new PopupWithForm(popupEdit, saveProfile)
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
    const card = createCard(placeTemplate, item, openImagePopup)
    cardList.addItem(card)
  }

}, placeList)

cardList.renderAll()


function createCard(template, data, func){
  const card = new Card(data, func, template);
  const cardElement = card.createCard();
  return cardElement;
};


function addPlace(data){
  const newCard = createCard(placeTemplate, data, openImagePopup)
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


//Включаю валидацию форм
enableValidation(validConfig);



// Слушатели события
profileEditBtn.addEventListener('click', openEditPopup);
profileAddBtn.addEventListener('click', openAddPopup);

