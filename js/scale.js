const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;
const SCALE_DEFAULT = 100;

const scaleControlValue = document.querySelector('.scale__control--value');
const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const previewImage = document.querySelector('.img-upload__preview img');

let currentScale = SCALE_DEFAULT;

const updateScale = (scale) => {
  currentScale = scale;
  scaleControlValue.value = `${currentScale}%`;
  previewImage.style.transform = `scale(${currentScale / SCALE_MAX})`;
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

smallerButton.addEventListener('click', onSmallerButtonClick);
biggerButton.addEventListener('click', onBiggerButtonClick);
