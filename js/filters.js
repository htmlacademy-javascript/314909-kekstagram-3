import { renderThumbnails } from './render-thumbnails.js';
import { debounce } from './util.js';

const RANDOM_PHOTOS_COUNT = 10;
const RENDER_DELAY = 500;
const FILTER_BUTTON_CLASS = 'img-filters__button';
const FILTER_BUTTON_ACTIVE_CLASS = 'img-filters__button--active';
const FILTER_ID_PREFIX = 'filter-';

const FilterType = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};

const filtersContainerElement = document.querySelector('.img-filters');
const filtersFormElement = document.querySelector('.img-filters__form');

let activeFilterButtonElement = filtersFormElement.querySelector(`.${FILTER_BUTTON_ACTIVE_CLASS}`);
let sourcePhotos = [];
let currentFilter = FilterType.DEFAULT;

const shuffleArray = (items) => {
  const shuffledItems = [...items];

  for (let i = shuffledItems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledItems[i], shuffledItems[j]] = [shuffledItems[j], shuffledItems[i]];
  }

  return shuffledItems;
};

const getFilteredPhotos = () => {
  switch (currentFilter) {
    case FilterType.RANDOM:
      return shuffleArray(sourcePhotos).slice(0, RANDOM_PHOTOS_COUNT);
    case FilterType.DISCUSSED:
      return [...sourcePhotos].sort((a, b) => b.comments.length - a.comments.length);
    default:
      return sourcePhotos;
  }
};

const renderFilteredPhotos = () => {
  renderThumbnails(getFilteredPhotos());
};

const debouncedRenderFilteredPhotos = debounce(renderFilteredPhotos, RENDER_DELAY);

const setActiveButton = (buttonElement) => {
  activeFilterButtonElement.classList.remove(FILTER_BUTTON_ACTIVE_CLASS);
  buttonElement.classList.add(FILTER_BUTTON_ACTIVE_CLASS);
  activeFilterButtonElement = buttonElement;
};

const onFiltersFormClick = (evt) => {
  const buttonElement = evt.target;

  if (!buttonElement.classList.contains(FILTER_BUTTON_CLASS) || buttonElement === activeFilterButtonElement) {
    return;
  }

  currentFilter = buttonElement.id.replace(FILTER_ID_PREFIX, '');
  setActiveButton(buttonElement);
  debouncedRenderFilteredPhotos();
};

filtersFormElement.addEventListener('click', onFiltersFormClick);

export const initFilters = (photos) => {
  sourcePhotos = photos;
  filtersContainerElement.classList.remove('img-filters--inactive');
  renderThumbnails(sourcePhotos);
};
