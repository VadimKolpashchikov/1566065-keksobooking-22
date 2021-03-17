const TIMEOUT = 2000;

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

const showErrorMessage = () => {
  document.body.append(errorMessage);
  errorButton.addEventListener('click', () => {
    errorMessage.remove();
  })
};

const showSuccessMessage = () => {
  document.body.append(successMessage);
  setTimeout(() => {
    successMessage.remove();
  }, TIMEOUT);
};

export{showErrorMessage, showSuccessMessage, showLoadingErrorMessage};
