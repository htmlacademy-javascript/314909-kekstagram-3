import { isEscapeKey } from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const cancelButton = bigPictureElement.querySelector('.big-picture__cancel');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const captionElement = bigPictureElement.querySelector('.social__caption');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const shownCommentsCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const totalCommentsCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');

const createCommentElement = ({avatar, name, message}) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const pictureElement = document.createElement('img');
  pictureElement.classList.add('social__picture');
  pictureElement.src = avatar;
  pictureElement.alt = name;
  pictureElement.width = 35;
  pictureElement.height = 35;

  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = message;

  commentElement.append(pictureElement, textElement);

  return commentElement;
};

const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    fragment.append(createCommentElement(comment));
  });

  commentsListElement.innerHTML = '';
  commentsListElement.append(fragment);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function closeBigPicture() {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

export const openBigPicture = ({url, description, likes, comments}) => {
  bigPictureImgElement.src = url;
  captionElement.textContent = description;
  likesCountElement.textContent = likes;
  shownCommentsCountElement.textContent = comments.length;
  totalCommentsCountElement.textContent = comments.length;

  renderComments(comments);

  commentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');

  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

cancelButton.addEventListener('click', closeBigPicture);
