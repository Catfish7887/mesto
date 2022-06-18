// ПЕРЕМЕННЫЕ
//Popup edit
const editPopup = document.querySelectorAll('.popup')[0];
const editForm = editPopup.querySelector('.popup__form');
const nameInput = editPopup.querySelector('#name');
const aboutInput = editPopup.querySelector('#about');
const saveBtn = editPopup.querySelector('.popup__submit-btn');
const editCloseBtn = editPopup.querySelector('.popup__close-btn');
//Popup add
const addPopup = document.querySelectorAll('.popup')[1];
const addForm = addPopup.querySelector('.popup__form');
const placeNameInput = addPopup.querySelector('#place-name');
const urlInput = addPopup.querySelector('#url');
const addBtn = addPopup.querySelector('.popup__submit-btn');
const addCloseBtn = addPopup.querySelector('.popup__close-btn');
//Popup image
const imagePopup = document.querySelectorAll('.popup')[2];
const imagePopupPicture = imagePopup.querySelector('.popup__place-image');
const imageName = imagePopup.querySelector('popup__image-heading');
const imageCloseBtn = imagePopup.querySelector('.popup__close-btn');
//Элементы профиля
const profileEditBtn = document.querySelector('.profile__edit-btn');
const profileAddBtn = document.querySelector('.profile__add-btn');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
//Карточки с местами
const placeTemplate = document.querySelector('.place-template').content;
const placeList = document.querySelector('.places__list');
// Массив с местами
const initialPlaces = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//ФУНКЦИИ
//Функция для отрисовки мест из массива при первой загрузке сайта
function renderPlace(item){
  const newPlace = placeTemplate.cloneNode(true);
  newPlace.querySelector('.place__delete-btn').addEventListener('click', deletePlace);
  newPlace.querySelector('.place__like-btn').addEventListener('click', like);
  newPlace.querySelector('.place__name').innerText = item.name;
  newPlace.querySelector('.place__image').src = item.link;
  placeList.appendChild(newPlace);
};

// Функция для лайка
function like(e){
  e.target.classList.toggle('place__like-btn_active');
};

// Функция для удаления места
function deletePlace(e){
  e.target.closest('.place').remove();
};

//Открыть попап редактирования профиля
function editProfile(){
  editPopup.classList.add('popup_opened');
  nameInput.value = profileName.innerText;
  aboutInput.value = profileAbout.innerText;
};

//Сохранить изменения профиля
function saveProfile(e){
  e.preventDefault();
  profileName.innerText = nameInput.value;
  profileAbout.innerText = aboutInput.value;
  closeEditPopup()
};

//Закрыть попап изменения профиля
function closeEditPopup(){
  editPopup.classList.remove('popup_opened');
};






// Слушатели события
profileEditBtn.addEventListener('click', editProfile);
saveBtn.addEventListener('click', saveProfile);
editCloseBtn.addEventListener('click', closeEditPopup);
initialPlaces.forEach(renderPlace);
