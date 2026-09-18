import { isEscapeKey } from './util.js';

const COMMENTS_STEP = 5;
const COMMENT_AVATAR_SIZE = 35;

const bigPictureElement = document.querySelector('.big-picture');
const cancelButton = bigPictureElement.querySelector('.big-picture__cancel');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const captionElement = bigPictureElement.querySelector('.social__caption');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const shownCommentsCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const totalCommentsCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');

let comments = [];
let shownCommentsCount = 0;

const createCommentElement = ({avatar, name, message}) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const pictureElement = document.createElement('img');
  pictureElement.classList.add('social__picture');
  pictureElement.src = avatar;
  pictureElement.alt = name;
  pictureElement.width = COMMENT_AVATAR_SIZE;
  pictureElement.height = COMMENT_AVATAR_SIZE;

  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = message;

  commentElement.append(pictureElement, textElement);

  return commentElement;
};

const renderNextComments = () => {
  const nextComments = comments.slice(shownCommentsCount, shownCommentsCount + COMMENTS_STEP);
  const fragment = document.createDocumentFragment();

  nextComments.forEach((comment) => {
    fragment.append(createCommentElement(comment));
  });

  commentsListElement.append(fragment);
  shownCommentsCount += nextComments.length;

  shownCommentsCountElement.textContent = shownCommentsCount;
  totalCommentsCountElement.textContent = comments.length;
  commentsLoaderElement.classList.toggle('hidden', shownCommentsCount >= comments.length);
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

export const openBigPicture = ({url, description, likes, comments: photoComments}) => {
  bigPictureImgElement.src = url;
  captionElement.textContent = description;
  likesCountElement.textContent = likes;

  comments = photoComments;
  shownCommentsCount = 0;
  commentsListElement.innerHTML = '';
  renderNextComments();

  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

cancelButton.addEventListener('click', closeBigPicture);
commentsLoaderElement.addEventListener('click', renderNextComments);
