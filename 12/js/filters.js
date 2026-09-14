import { renderThumbnails } from './render-thumbnails.js';
import { debounce } from './util.js';

const RANDOM_PHOTOS_COUNT = 10;
const RENDER_DELAY = 500;

const FilterType = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};

const filtersContainer = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');
const filterButtons = filtersForm.querySelectorAll('.img-filters__button');

let sourcePhotos = [];
let currentFilter = FilterType.DEFAULT;

const shuffleArray = (array) => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
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

const setActiveButton = (filterType) => {
  filterButtons.forEach((button) => {
    button.classList.toggle('img-filters__button--active', button.id === `filter-${filterType}`);
  });
};

const onFilterButtonClick = (evt) => {
  const {target} = evt;

  if (!target.classList.contains('img-filters__button') || target.id === `filter-${currentFilter}`) {
    return;
  }

  currentFilter = target.id.replace('filter-', '');
  setActiveButton(currentFilter);
  debouncedRenderFilteredPhotos();
};

filtersForm.addEventListener('click', onFilterButtonClick);

export const initFilters = (photos) => {
  sourcePhotos = photos;
  filtersContainer.classList.remove('img-filters--inactive');
  renderFilteredPhotos();
};
