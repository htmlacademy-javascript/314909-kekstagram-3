import { isEscapeKey } from './util.js';
import { pristine } from './validate.js';
import { resetScale } from './scale.js';
import { resetEffect } from './effects.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';

const form = document.querySelector('.img-upload__form');
const fileField = form.querySelector('#upload-file');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const hashtagsField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');

const isTextFieldFocused = () => document.activeElement === hashtagsField || document.activeElement === commentField;

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeUploadForm();
  }
}

function openUploadForm() {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUploadForm() {
  form.reset();
  pristine.reset();
  resetScale();
  resetEffect();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }

  blockSubmitButton();

  sendData(new FormData(form))
    .then(() => {
      closeUploadForm();
      showSuccessMessage();
    })
    .catch(showErrorMessage)
    .finally(unblockSubmitButton);
};

fileField.addEventListener('change', openUploadForm);
cancelButton.addEventListener('click', closeUploadForm);
form.addEventListener('submit', onFormSubmit);
