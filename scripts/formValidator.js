class FormValidator{
  constructor(config, formEl){
    this._config = config;
    this._formEl = formEl;

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

  _hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })

  }

  _toggleButtonState(inputList, buttonEl){
    if(this._hasInvalidInput(inputList)){
      buttonEl.setAttribute('disabled', true)
      buttonEl.classList.add(this._config.inactiveButtonClass)
    }else{
      buttonEl.removeAttribute('disabled', true)
      buttonEl.classList.remove(this._config.inactiveButtonClass)
    };
  };

  enableValidation(){
    const inputList = Array.from(this._formEl.querySelectorAll(this._config.inputSelector));
    const buttonEl = this._formEl.querySelector(this._config.submitButtonSelector);

    this._toggleButtonState(inputList, buttonEl);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', ()=>{

        this._isInputValid(inputElement);
        this._toggleButtonState(inputList, buttonEl);

      });
    });
  };

  resetFormError(){

    const inputList = Array.from(this._formEl.querySelectorAll(this._config.inputSelector));
    const buttonEl = this._formEl.querySelector(this._config.submitButtonSelector);

    inputList.forEach( (inputEl) => {this._hideInputError(inputEl)});

    this._toggleButtonState(inputList, buttonEl, this._config);

  }
};

export default FormValidator;

