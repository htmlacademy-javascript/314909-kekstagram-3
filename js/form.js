import { isEscapeKey } from './util.js';
import { pristine } from './validate.js';
import { resetScale } from './scale.js';
import { resetEffect } from './effects.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';

const DEFAULT_PREVIEW_SRC = 'img/upload-default-image.jpg';

const formElement = document.querySelector('.img-upload__form');
const fileFieldElement = formElement.querySelector('#upload-file');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const cancelButtonElement = formElement.querySelector('.img-upload__cancel');
const hashtagsFieldElement = formElement.querySelector('.text__hashtags');
const commentFieldElement = formElement.querySelector('.text__description');
const submitButtonElement = formElement.querySelector('.img-upload__submit');
const previewImageElement = formElement.querySelector('.img-upload__preview img');
const effectPreviewElements = formElement.querySelectorAll('.effects__preview');

let currentObjectUrl = '';

const isTextFieldFocused = () => document.activeElement === hashtagsFieldElement || document.activeElement === commentFieldElement;

const updatePreview = () => {
  const [file] = fileFieldElement.files;

  if (!file) {
    return;
  }

  currentObjectUrl = URL.createObjectURL(file);
  previewImageElement.src = currentObjectUrl;

  effectPreviewElements.forEach((previewElement) => {
    previewElement.style.backgroundImage = `url(${currentObjectUrl})`;
  });
};

const resetPreview = () => {
  if (currentObjectUrl) {
    URL.revokeObjectURL(currentObjectUrl);
    currentObjectUrl = '';
  }

  previewImageElement.src = DEFAULT_PREVIEW_SRC;

  effectPreviewElements.forEach((previewElement) => {
    previewElement.style.backgroundImage = '';
  });
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused() && !document.querySelector('.error')) {
    evt.preventDefault();
    closeUploadForm();
  }
}

const openUploadForm = () => {
  updatePreview();
  overlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

function closeUploadForm() {
  formElement.reset();
  pristine.reset();
  resetScale();
  resetEffect();
  resetPreview();
  overlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }

  blockSubmitButton();

  sendData(new FormData(formElement))
    .then(() => {
      closeUploadForm();
      showSuccessMessage();
    })
    .catch(showErrorMessage)
    .finally(unblockSubmitButton);
};

const onFileFieldChange = () => {
  openUploadForm();
};

const onCancelButtonClick = () => {
  closeUploadForm();
};

fileFieldElement.addEventListener('change', onFileFieldChange);
cancelButtonElement.addEventListener('click', onCancelButtonClick);
formElement.addEventListener('submit', onFormSubmit);
