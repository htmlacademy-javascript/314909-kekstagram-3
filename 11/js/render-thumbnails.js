import { openBigPicture } from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const renderThumbnail = (photo) => {
  const {url, description, likes, comments} = photo;
  const thumbnail = pictureTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(photo);
  });

  return thumbnail;
};

export const renderThumbnails = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    fragment.append(renderThumbnail(photo));
  });

  picturesContainer.append(fragment);
};
