

const validConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error_visible'
};

const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-48',
  headers: {
    authorization : 'addf4328-c45b-4c7d-9a30-f42d0ad04853',
    'content-type': 'application/json'
  }
};


export {validConfig, apiConfig};
