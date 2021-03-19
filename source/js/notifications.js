import {isEscEvent} from './util.js';

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

const closeWithKey = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    hideMessage();
  }
};

const closeWithClick = () => {
  hideMessage();
};

const showLoadingErrorMessage = () => {
  document.body.append(loadingErrorMessage);
  loadingErrorButton.addEventListener('click', () => {
    loadingErrorMessage.remove();
  });
};

const showSuccessMessage = () => {
  document.body.append(successMessage);
  document.addEventListener('keydown', closeWithKey);
  document.addEventListener('click', closeWithClick);

};

const showErrorMessage = () => {
  document.body.append(errorMessage);
  document.addEventListener('keydown', closeWithKey);
  document.addEventListener('click', closeWithClick);
  errorButton.addEventListener('click', () => {
    hideMessage();
  });
};

const hideMessage = () => {
  document.removeEventListener('keydown', closeWithKey);
  document.removeEventListener('click', closeWithClick);
  errorMessage.remove();
  successMessage.remove();
};

export{showErrorMessage, showSuccessMessage, showLoadingErrorMessage};
