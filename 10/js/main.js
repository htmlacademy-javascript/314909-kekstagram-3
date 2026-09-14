import { generatePhotos } from './data.js';
import { renderThumbnails } from './render-thumbnails.js';
import './form.js';

const photos = generatePhotos();

renderThumbnails(photos);
