import { isEscapeKey } from './util.js';

const DATA_ERROR_SHOW_TIME = 5000;

const successTemplateElement = document.querySelector('#success').content.querySelector('.success');
const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
const dataErrorTemplateElement = document.querySelector('#data-error').content.querySelector('.data-error');

const showMessage = (templateElement, buttonSelector) => {
  const messageElement = templateElement.cloneNode(true);

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

export const showSuccessMessage = () => showMessage(successTemplateElement, '.success__button');

export const showErrorMessage = () => showMessage(errorTemplateElement, '.error__button');

export const showDataErrorMessage = () => {
  const messageElement = dataErrorTemplateElement.cloneNode(true);
  document.body.append(messageElement);
  setTimeout(() => messageElement.remove(), DATA_ERROR_SHOW_TIME);
};
