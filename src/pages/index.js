import './index.css'
import FormValidator from '../components/FormValidator.js'
import {validConfig, apiConfig} from '../utils/data.js';
import Card from '../components/Сard.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithError from '../components/PopupWithError';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';
import UserCard from '../components/UserCard';
import{nameInput,
  aboutInput,
  formAdd,
  profileEditBtn,
  profileAddBtn,
  formValidators, }
from '../utils/constants.js'


const api = new Api(apiConfig)

const profile = new UserInfo('.profile__avatar', {userName: '.profile__name', about: '.profile__about'})

const popupWithError = new PopupWithError('.popup_type_error');
popupWithError.setEventListeners()

const popupWithImage = new PopupWithImage('.popup_type_image')
popupWithImage.setEventListeners()

const popupWithFormAdd = new PopupWithForm('.popup_type_add', addPlace)
popupWithFormAdd.setEventListeners()

const popupWithFormEdit = new PopupWithForm('.popup_type_edit', saveProfile)
popupWithFormEdit.setEventListeners()


// Получаю ID пользователя с помощью запроса информации пользователя
let userId;


function getUserId(promiseData){
  userId = promiseData;
}



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

function createUserCard(data) {
  const card = new UserCard(data, openImagePopup, '.user-card-template');
  return card.createCard()
};

function createServerCard(data){
  debugger
  const card = new Card(data, openImagePopup, '.card-template')
  return card.createCard(userId)
}






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
  api.editProfile({name: nameInput.value, about: aboutInput.value}).catch(err=>popupWithError.open(err))
  profile.setUserInfo(nameInput, aboutInput)
  popupWithFormEdit.close()
};




// Загружаю с сервера данные профиля
api.getProfile()
.then(data=>{
  profile.renderInfo(data)
  profile.renderAvatar(data)
  getUserId(data._id)
  })
.catch(err=>popupWithError.open(err))

// Загружаю с сервера карточки
api.getInitialCards().then(data => {
const cardList = new Section({
    items: data,
    renderer: (item) =>{
      const card = createServerCard(item)
      cardList.addItem(card)
    }

  }, '.places__list')

  cardList.renderAll()
})
.catch(err =>popupWithError.open(err))


enableValidation(validConfig);


profileEditBtn.addEventListener('click', openEditPopup);
profileAddBtn.addEventListener('click', openAddPopup);


