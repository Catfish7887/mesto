import './index.css'
import FormValidator from '../components/FormValidator.js'
import { validConfig, apiConfig } from '../utils/data.js';
import Card from '../components/Сard.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithButton from '../components/PopupWithButton';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';
import {
  nameInput,
  aboutInput,
  formAdd,
  profileEditBtn,
  profileAddBtn,
  formValidators, avatarBtn,
}
  from '../utils/constants.js'
import { data } from 'autoprefixer';



const api = new Api(apiConfig)

const cardList = new Section({renderer: renderNewCard}, '.places__list')

const profile = new UserInfo('.profile__avatar', { userName: '.profile__name', about: '.profile__about' })

const popupWithButton = new PopupWithButton('.popup_type_button', deleteCard)
popupWithButton.setEventListeners()

const popupWithAvatar = new PopupWithForm('.popup_type_avatar', changeAvatar)
popupWithAvatar.setEventListeners()

const popupWithImage = new PopupWithImage('.popup_type_image')
popupWithImage.setEventListeners()

const popupWithFormAdd = new PopupWithForm('.popup_type_add', addPlace)
popupWithFormAdd.setEventListeners()

const popupWithFormEdit = new PopupWithForm('.popup_type_edit', saveProfile)
popupWithFormEdit.setEventListeners()



const getProfileInfo = api.getProfile()
const getCards = api.getInitialCards()

let userId;

Promise.all([getProfileInfo, getCards])
.then(([profileData, cards])=>{

  profile.renderInfo(profileData);
  profile.renderAvatar(profileData);
  getUserId(profileData._id);

  cardList.renderAll(cards.reverse())
}).catch(err=>console.log(err))



function getUserId(promiseData) {
  userId = promiseData;
}


//Вынес логику renderer класса Section в отдельную функцию, чтобы код выглядел аккуратнее.
//Так же заменил ту же самую логику в сабмите формы добавления карточки на эту функцию.
function renderNewCard(data) {
  const card = createCard(data);
  cardList.addItem(card);
}


function createCard(data) {
  const card = new Card(data, openImagePopup, '.card-template', userId, like, openDeletePopup)
  return card.createCard()
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


function deleteCard(cardId, cardEl){
  api.deleteCardById(cardId)
  .then(()=>{
    cardList.removeItem(cardEl)
    popupWithButton.close()
  })
  .catch(err=>console.log(err))
}


function openDeletePopup(id, card){
  popupWithButton.open(id, card)
}


function like(isLiked, cardId, likeCounter, likeButton) {
  if (!isLiked) {
    api.like(cardId).then(res => {
      likeCounter.textContent = res.likes.length
      likeButton.classList.toggle('place__like-btn_active')

    })
    .catch(err =>console.log(err))

  } else {
    api.dislike(cardId).then(res => {
      likeCounter.textContent = res.likes.length
      likeButton.classList.toggle('place__like-btn_active')
    })
    .catch(err =>console.log(err))
}
}

function changeAvatar(data) {
  api.changeAvatar(data)
    .then(data => {
      profile.renderAvatar(data)
      popupWithAvatar.close()
    })
    .catch(err =>console.log(err))
    .finally(()=>popupWithAvatar.showLoading(false))
}


function addPlace(data) {
  api.createCard(data)
    .then(popupWithFormAdd.showLoading(true))
    .then(data => {
      renderNewCard(data)
      popupWithFormAdd.close()
    })
    .catch(err =>console.log(err))
    .finally(()=>popupWithFormAdd.showLoading(false))
};


function openImagePopup(name, link) {
  popupWithImage.open(name, link)
};


function openAvatarPopup() {
  popupWithAvatar.open()
  formValidators['avatarForm'].resetValidation()
}


function openEditPopup() {
  popupWithFormEdit.open()
  const values = profile.getUserInfo()
  popupWithFormEdit.setInputValues(values)
  formValidators['editForm'].resetValidation()
};


//Открыть попап добавления места
function openAddPopup() {
  formAdd.reset()
  popupWithFormAdd.open()
  formValidators['cardForm'].resetValidation()
};


//Сохранить изменения профиля
function saveProfile() {
  api.editProfile({ name: nameInput.value, about: aboutInput.value })
  .then(()=>{
    profile.setUserInfo(nameInput, aboutInput),
    popupWithFormEdit.close()
  })
  .catch(err =>console.log(err))
  .finally(()=>popupWithFormEdit.showLoading(false))

};


enableValidation(validConfig);



avatarBtn.addEventListener('click', openAvatarPopup)
profileEditBtn.addEventListener('click', openEditPopup);
profileAddBtn.addEventListener('click', openAddPopup);


