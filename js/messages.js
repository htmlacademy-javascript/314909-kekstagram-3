import { isEscapeKey } from './util.js';

const DATA_ERROR_SHOW_TIME = 5000;

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const showMessage = (template, buttonSelector) => {
  const messageElement = template.cloneNode(true);

  function onDocumentKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeMessage();
    }
  }

  const onMessageClick = (evt) => {
    if (evt.target === messageElement || evt.target.closest(buttonSelector)) {
      closeMessage();
    }
  };

  function closeMessage() {
    messageElement.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  }

  messageElement.addEventListener('click', onMessageClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.append(messageElement);
};

export const showSuccessMessage = () => showMessage(successTemplate, '.success__button');

export const showErrorMessage = () => showMessage(errorTemplate, '.error__button');

export const showDataErrorMessage = () => {
  const messageElement = dataErrorTemplate.cloneNode(true);
  document.body.append(messageElement);
  setTimeout(() => messageElement.remove(), DATA_ERROR_SHOW_TIME);
};
