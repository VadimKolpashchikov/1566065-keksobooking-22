import {isEscEvent} from './util.js'

const taskSuccessMessageTemplate = document.querySelector('#success').content;
const successMessageTemplate = taskSuccessMessageTemplate.querySelector('.success');
const successMessage = successMessageTemplate.cloneNode(true);
const taskErrorMessageTemplate = document.querySelector('#error').content;
const errorMessageTemplate = taskErrorMessageTemplate.querySelector('.error');
const errorMessage = errorMessageTemplate.cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');
const taskLoadingErrorMessageTemplate = document.querySelector('#load-error').content;
const loadingErrorMessageTemplate = taskLoadingErrorMessageTemplate.querySelector('.load-error');
const loadingErrorMessage = loadingErrorMessageTemplate.cloneNode(true);
const loadingErrorButton = loadingErrorMessage.querySelector('.load-error__button');

const showLoadingErrorMessage = () => {
  document.body.append(loadingErrorMessage);
  loadingErrorButton.addEventListener('click', () => {
    loadingErrorMessage.remove();
  });
}

const hideMessage = (type) => {
  type.remove();

  document.removeEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      hideMessage(type);
    }
  });

  document.removeEventListener('click', () => {
    hideMessage(type);
  });
}

const showErrorMessage = () => {
  document.body.append(errorMessage);
  errorButton.addEventListener('click', () => {
    hideMessage(errorMessage)
  });
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      hideMessage(errorMessage);
    }
  });

  document.addEventListener('click', () => {
    hideMessage(errorMessage);
  });
};

const showSuccessMessage = () => {
  document.body.append(successMessage);
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      hideMessage(successMessage);
    }
  });

  document.addEventListener('click', () => {
    hideMessage(successMessage);
  });
};

export{showErrorMessage, showSuccessMessage, showLoadingErrorMessage};
