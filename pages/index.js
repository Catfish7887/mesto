// Переменные
const popup = document.querySelector('.popup')
const form = document.querySelector('.popup__form');
const editBtn = document.querySelector('.profile__edit-btn');
const closeBtn = document.querySelector('.popup__close-btn');
let inputName = document.querySelector('.popup__input_type_name');
let inputAbout = document.querySelector('.popup__input_type_about');
let name = document.querySelector('.profile__name');
let about = document.querySelector('.profile__about');


// Функции для popup
function openPopup(){
  popup.classList.add('popup_opened')
};

function closePopup(){
  popup.classList.remove('popup_opened')
};


// Функция для отправки формы
function submit(evt){
  evt.preventDefault();
   name.textContent = inputName.value;
   about.textContent = inputAbout.value;
  closePopup()
};


// Слушатели события
editBtn.addEventListener('click', openPopup)
closeBtn.addEventListener('click', closePopup)
form.addEventListener('submit', submit);

