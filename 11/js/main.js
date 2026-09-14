import { getData } from './api.js';
import { renderThumbnails } from './render-thumbnails.js';
import { showDataErrorMessage } from './messages.js';
import './form.js';

getData()
  .then(renderThumbnails)
  .catch(showDataErrorMessage);
