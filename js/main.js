import { getData } from './api.js';
import { initFilters } from './filters.js';
import { showDataErrorMessage } from './messages.js';
import './big-picture.js';
import './effects.js';
import './form.js';
import './scale.js';
import './validate.js';

getData()
  .then(initFilters)
  .catch(showDataErrorMessage);
