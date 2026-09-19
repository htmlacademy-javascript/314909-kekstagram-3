import { openBigPicture } from './big-picture.js';

const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainerElement = document.querySelector('.pictures');

const renderThumbnail = (photo) => {
  const {url, description, likes, comments} = photo;
  const thumbnailElement = pictureTemplateElement.cloneNode(true);

  const pictureImageElement = thumbnailElement.querySelector('.picture__img');
  pictureImageElement.src = url;
  pictureImageElement.alt = description;
  thumbnailElement.querySelector('.picture__likes').textContent = likes;
  thumbnailElement.querySelector('.picture__comments').textContent = comments.length;

  thumbnailElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(photo);
  });

  return thumbnailElement;
};

export const renderThumbnails = (photos) => {
  picturesContainerElement.querySelectorAll('.picture').forEach((picture) => picture.remove());

  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    fragment.append(renderThumbnail(photo));
  });

  picturesContainerElement.append(fragment);
};
