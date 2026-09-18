const Effect = {
  NONE: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const EFFECTS = {
  [Effect.CHROME]: {min: 0, max: 1, step: 0.1, filterName: 'grayscale', unit: ''},
  [Effect.SEPIA]: {min: 0, max: 1, step: 0.1, filterName: 'sepia', unit: ''},
  [Effect.MARVIN]: {min: 0, max: 100, step: 1, filterName: 'invert', unit: '%'},
  [Effect.PHOBOS]: {min: 0, max: 3, step: 0.1, filterName: 'blur', unit: 'px'},
  [Effect.HEAT]: {min: 1, max: 3, step: 0.1, filterName: 'brightness', unit: ''},
};

const effectsList = document.querySelector('.effects__list');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelInput = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');
const previewImage = document.querySelector('.img-upload__preview img');

let currentEffect = Effect.NONE;

noUiSlider.create(sliderElement, {
  range: {min: 0, max: 1},
  start: 1,
  step: 0.1,
  connect: 'lower',
});

const hideSlider = () => {
  effectLevelContainer.classList.add('hidden');
};

const showSlider = () => {
  effectLevelContainer.classList.remove('hidden');
};

sliderElement.noUiSlider.on('update', (values, handle) => {
  const value = Number(values[handle]);
  effectLevelInput.value = value;

  if (currentEffect === Effect.NONE) {
    previewImage.style.filter = '';
    return;
  }

  const {filterName, unit} = EFFECTS[currentEffect];
  previewImage.style.filter = `${filterName}(${value}${unit})`;
});

const updateSlider = () => {
  if (currentEffect === Effect.NONE) {
    hideSlider();
    previewImage.style.filter = '';
    effectLevelInput.value = '';
    return;
  }

  showSlider();

  const {min, max, step} = EFFECTS[currentEffect];

  sliderElement.noUiSlider.updateOptions({
    range: {min, max},
    start: max,
    step,
  }, true);
};

const onEffectsListChange = (evt) => {
  if (evt.target.name !== 'effect') {
    return;
  }

  currentEffect = evt.target.value;
  updateSlider();
};

export const resetEffect = () => {
  currentEffect = Effect.NONE;
  updateSlider();
};

effectsList.addEventListener('change', onEffectsListChange);

hideSlider();
