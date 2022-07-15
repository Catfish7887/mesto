
const validConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error_visible'
};


class FormValidator {
  constructor(){
    config = validConfig;
  };

  _showInputError(formEl, inputEl, validationMessage, config){
    const errorEl = formEl.querySelector(`.${inputEl.id}-error`);
    errorEl.textContent = validationMessage;
    inputEl.classList.add(config.inputErrorClass);
    errorEl.classList.add(config.errorClass);
  };

  _hideInputError(formEl, inputEl, config){
    const errorEl = formEl.querySelector(`.${inputEl.id}-error`);
    errorEl.classList.remove(config.errorClass);
    inputEl.classList.remove(config.inputErrorClass);
    errorEl.textContent = '';
  };

  _isInputValid(formEl, inputEl, config){
    if(!inputEl.validity.valid){
      this.showInputError(formEl, inputEl, inputEl.validationMessage, config);
    }else{
      this.hideInputError(formEl, inputEl, config);
    };
  };

  _hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };



};
















//Показывает сообщение об ошибке
const showInputError = (formEl, inputEl, validationMessage, config) => {
  const errorEl = formEl.querySelector(`.${inputEl.id}-error`);
  errorEl.textContent = validationMessage;
  inputEl.classList.add(config.inputErrorClass);
  errorEl.classList.add(config.errorClass);
};

//Прячет ошибку
const hideInputError = (formEl, inputEl, config) => {
  const errorEl = formEl.querySelector(`.${inputEl.id}-error`);
  errorEl.classList.remove(config.errorClass);
  inputEl.classList.remove(config.inputErrorClass);
  errorEl.textContent = '';
};

//Проверяет поле на валидность
const isInputValid = (formEl, inputEl, config) => {
  if(!inputEl.validity.valid){
      showInputError(formEl, inputEl, inputEl.validationMessage, config);
  }else{
      hideInputError(formEl, inputEl, config);
  };
};


// Функция переключает состояние кнопки в зависимости от валидности формы
const toggleButtonState = (inputList, buttonEl, config)=>{
  if(hasInvalidInput(inputList)){
    buttonEl.setAttribute('disabled', true)
    buttonEl.classList.add(config.inactiveButtonClass)
  }else{
    buttonEl.removeAttribute('disabled', true)
    buttonEl.classList.remove(config.inactiveButtonClass)
  }
};

//Эта функция нужна для функции toggleButtonState. Она сообщает кнопке, есть ли невалидный инпут в форме
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};


//Здесь я установил слушатели события на все поля форм в документе
const setEvListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonEl = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonEl, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isInputValid(formEl, inputElement, config);
      toggleButtonState(inputList, buttonEl, config);
    });
  });
};

//При открытии модального окна, нужно сбрасывать ошибки
const resetFormError = (popup, config) => {
  const formEl = popup.querySelector(config.formSelector);
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonEl = formEl.querySelector(config.submitButtonSelector);

  inputList.forEach( (inputEl) => {hideInputError(formEl, inputEl, config)});

  toggleButtonState(inputList, buttonEl, config);
};



const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formEl)=>{
      setEvListeners(formEl, config)
      formEl.addEventListener('submit', (e)=>{e.preventDefault();})
  })
};


//Включаю валидацию форм с помощью JS
enableValidation(validConfig);