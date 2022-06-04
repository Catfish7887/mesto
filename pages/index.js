// Код для попапа
const popup = document.querySelector('.popup')
const editBtn = document.querySelector('.button_type_edit');
const closeBtn = document.querySelector('.button_type_close');

function popupOpen(){
  popup.classList.remove('popup_hidden')
}

function popupClose(){
  popup.classList.add('popup_hidden')
}

editBtn.addEventListener('click', function() {
  popupOpen()
});

popup.addEventListener('click', function(e){
  if (e.target === e.currentTarget){
    popupClose()
  }
} );

closeBtn.addEventListener('click', function(e){
  if (e.target === e.currentTarget){
    popupClose()
  }
} );

// Код для редактирования

let form = document.querySelector('.form');

let InputName = document.querySelector('.input_type_name');
let InputAbout = document.querySelector('.input_type_about');




function submit(evt){
  evt.preventDefault();
  InputName.getAttribute('value');
  InputAbout.getAttribute('value');
  document.querySelector('.profile__name').textContent = InputName.value;
  document.querySelector('.profile__about').textContent = InputAbout.value;
  popupClose()

}

form.addEventListener('submit', submit);

