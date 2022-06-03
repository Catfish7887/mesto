
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

// Код для попапа

const name = document.querySelector('.input_type_name')
console.log(name)

