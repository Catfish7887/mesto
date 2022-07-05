// ПЕРЕМЕННЫЕ
//Popup edit
const popupEdit = document.querySelector('.popup_type_edit');
const formEdit = popupEdit.querySelector('.popup__form');
const nameInput = popupEdit.querySelector('#name');
const aboutInput = popupEdit.querySelector('#about');
const btnSave = popupEdit.querySelector('.popup__submit-btn');

//Popup add
const popupAdd = document.querySelector('.popup_type_add');
const formAdd = popupAdd.querySelector('.popup__form');
const placeNameInput = popupAdd.querySelector('#place-name');
const urlInput = popupAdd.querySelector('#url');
const btnAdd = popupAdd.querySelector('.popup__submit-btn');

//Popup image
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupPicture = imagePopup.querySelector('.popup__image');
const imageName = imagePopup.querySelector('.popup__image-caption');


//Элементы профиля
const profileEditBtn = document.querySelector('.profile__edit-btn');
const profileAddBtn = document.querySelector('.profile__add-btn');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
//Карточки с местами
const placeTemplate = document.querySelector('.place-template').content;
const placeList = document.querySelector('.places__list');

//Получаю все элементы с классом '.popup' для того чтобы ниже навесить на них и их дочерние элементы слушатели события
const popups = document.querySelectorAll('.popup')

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
//Создать карточку с местом
function createCard(item){
  const newPlace = placeTemplate.querySelector('.place').cloneNode(true);
  const placeImage = newPlace.querySelector('.place__image');
  const placeName = newPlace.querySelector('.place__name');
  const btnDelete = newPlace.querySelector('.place__delete-btn');
  const btnLike = newPlace.querySelector('.place__like-btn');

  placeName.textContent = item.name;
  placeImage.src = item.link;
  placeImage.alt = item.name

  btnDelete.addEventListener('click', deletePlace);
  btnLike.addEventListener('click', like);
  placeImage.addEventListener('click', () => {openImagePopup(item.name, item.link)});


  return newPlace;
};

//Добавить карточку в DOM
function addToMarkup(el){

  placeList.prepend(el)
};



//Тут отрисовываются на странице карточки, которые должны быть при первой загрузке страницы
initialPlaces.forEach((item) => {
  const newCard = createCard(item)
  addToMarkup(newCard)
});

// Функция для лайка
function like(e){
  e.target.classList.toggle('place__like-btn_active');
};

// Функция для удаления места
function deletePlace(e){
  e.target.closest('.place').remove();
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
  resetFormError(popupEdit, validConfig)
};

//Открыть попап добавления места
function openAddPopup(){
  formAdd.reset()
  openPopup(popupAdd);
  resetFormError(popupAdd, validConfig);
};

//Сохранить изменения профиля
function saveProfile(e){
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup(popupEdit);
};

//Отправка формы нового места
function addPlace(e){
  e.preventDefault();
  const newAddedPlace = {
    name: '',
    link: ''
  }

  newAddedPlace.name = placeNameInput.value;
  newAddedPlace.link = urlInput.value;


  const newCreatedCard = createCard(newAddedPlace);
  addToMarkup(newCreatedCard);
  formAdd.reset();

  closePopup(popupAdd);
  resetFormError(popupAdd, validConfig);
};

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







// Слушатели события
profileEditBtn.addEventListener('click', openEditPopup);
formEdit.addEventListener('submit', saveProfile);
profileAddBtn.addEventListener('click', openAddPopup);
formAdd.addEventListener('submit', addPlace);
