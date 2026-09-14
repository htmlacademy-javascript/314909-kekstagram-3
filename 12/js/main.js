import { getData } from './api.js';
import { initFilters } from './filters.js';
import { showDataErrorMessage } from './messages.js';
import './form.js';

getData()
  .then(initFilters)
  .catch(showDataErrorMessage);
