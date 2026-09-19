const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;
const SCALE_DEFAULT = 100;

const scaleControlValueElement = document.querySelector('.scale__control--value');
const smallerButtonElement = document.querySelector('.scale__control--smaller');
const biggerButtonElement = document.querySelector('.scale__control--bigger');
const previewImageElement = document.querySelector('.img-upload__preview img');

let currentScale = SCALE_DEFAULT;

const updateScale = (scale) => {
  currentScale = scale;
  scaleControlValueElement.value = `${currentScale}%`;
  previewImageElement.style.transform = `scale(${currentScale / SCALE_MAX})`;
};

const onSmallerButtonClick = () => {
  updateScale(Math.max(SCALE_MIN, currentScale - SCALE_STEP));
};

const onBiggerButtonClick = () => {
  updateScale(Math.min(SCALE_MAX, currentScale + SCALE_STEP));
};

export const resetScale = () => {
  updateScale(SCALE_DEFAULT);
};

smallerButtonElement.addEventListener('click', onSmallerButtonClick);
biggerButtonElement.addEventListener('click', onBiggerButtonClick);
