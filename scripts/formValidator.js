class FormValidator{
  constructor(config, formEl){
    this._config = config;
    this._formEl = formEl;
    this._inputList = Array.from(this._formEl.querySelectorAll(this._config.inputSelector));
    this._submitButton = this._formEl.querySelector(this._config.submitButtonSelector);
  };

  _showInputError(inputEl, validationMessage){
    const errorEl = this._formEl.querySelector(`.${inputEl.id}-error`);
    errorEl.textContent = validationMessage;
    inputEl.classList.add(this._config.inputErrorClass);
    errorEl.classList.add(this._config.errorClass);
  };

  _hideInputError(inputEl){
    const errorEl = this._formEl.querySelector(`.${inputEl.id}-error`);
    errorEl.classList.remove(this._config.errorClass);
    inputEl.classList.remove(this._config.inputErrorClass);
    errorEl.textContent = '';
  };

  _isInputValid(inputEl){

    if(!inputEl.validity.valid){
      this._showInputError(inputEl, inputEl.validationMessage);
    }else{
      this._hideInputError(inputEl);
    };
  };

  _hasInvalidInput(){
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })

  }

  _toggleButtonState(){
    if(this._hasInvalidInput()){
      this._submitButton.setAttribute('disabled', true)
      this._submitButton.classList.add(this._config.inactiveButtonClass)
    }else{
      this._submitButton.removeAttribute('disabled', true)
      this._submitButton.classList.remove(this._config.inactiveButtonClass)
    };
  };

  enableValidation(){
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', ()=>{

        this._isInputValid(inputElement);
        this._toggleButtonState();

      });
    });
  };

  resetValidation(){
    this._inputList.forEach( (inputEl) => {this._hideInputError(inputEl)});
    this._toggleButtonState();

  }
};

export default FormValidator;

