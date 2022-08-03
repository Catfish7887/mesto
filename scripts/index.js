import FormValidator from './FormValidator.js'
import {validConfig, initialPlaces} from './data.js';
import Card from './Card.js';
import Section from './Section.js';


// ПЕРЕМЕННЫЕ
//Popup edit
const popupEdit = document.querySelector('.popup_type_edit');
const formEdit = popupEdit.querySelector('.popup__form');
const nameInput = popupEdit.querySelector('#name');
const aboutInput = popupEdit.querySelector('#about');

//Popup add
const popupAdd = document.querySelector('.popup_type_add');
const formAdd = popupAdd.querySelector('.popup__form');
const placeNameInput = popupAdd.querySelector('#place-name');
const urlInput = popupAdd.querySelector('#url');

//Popup image
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupPicture = imagePopup.querySelector('.popup__image');
const imageName = imagePopup.querySelector('.popup__image-caption');


//Элементы профиля
const profileEditBtn = document.querySelector('.profile__edit-btn');
const profileAddBtn = document.querySelector('.profile__add-btn');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const placeTemplate = document.querySelector('.place-template').content;

const placeList = document.querySelector('.places__list');

const popups = document.querySelectorAll('.popup')

const formValidators = {}

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
  data: initialPlaces,
  renderer: ()=>{}
})

function render(element){
  placeList.prepend(element)
};

function createCard(template,data, func){
  const card = new Card(data, func, template);
  const cardElement = card.createCard();
  return cardElement;
};

function createNewCard(template, data, func){
  const newCard = createCard(template, data, func);
  render(newCard);
};

initialPlaces.forEach(item=>{
  createNewCard(placeTemplate, item, openImagePopup)
});


function addPlace(e){
  e.preventDefault();
  const newData = {}
  newData.name = placeNameInput.value;
  newData.link = urlInput.value;

  createNewCard(placeTemplate, newData, openImagePopup)
  formAdd.reset();

  closePopup(popupAdd);
};


//Открыть попап с картинкой
function openImagePopup(name, link){
  imagePopupPicture.src = link;
  imageName.textContent = name;
  imagePopupPicture.alt = name;
  openPopup(imagePopup);
};

//Открыть попап редактирования профиля
function openEditPopup(){
  openPopup(popupEdit);
  nameInput.value = profileName.innerText;
  aboutInput.value = profileAbout.innerText;
  formValidators['editForm'].resetValidation()
};

//Открыть попап добавления места
function openAddPopup(){
  formAdd.reset()
  openPopup(popupAdd);
  formValidators['cardForm'].resetValidation()
};

//Сохранить изменения профиля
function saveProfile(e){
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup(popupEdit);
};

//Отправка формы нового места

// Функция не является основной логикой страницы. Она улучшает user experience
function closePopupByEsc(e){
  if(e.key === 'Escape'){
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

//Общие функции для попапов
//Открыть попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
};

//Закрыть попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  //Уберу слушатель события, чтобы избежать бага повторным нажатием на клавишу при закрытом попапе
  document.removeEventListener('keydown', closePopupByEsc);
};




// Здесь вешаются слушатели события на все оверлеи попапов и кнопки их закрытия
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    };
    if (evt.target.classList.contains('popup__close-btn')) {
      closePopup(popup)
    };
  });
});

//Включаю валидацию форм
enableValidation(validConfig);



// Слушатели события
profileEditBtn.addEventListener('click', openEditPopup);
formEdit.addEventListener('submit', saveProfile);
profileAddBtn.addEventListener('click', openAddPopup);
formAdd.addEventListener('submit', addPlace);
