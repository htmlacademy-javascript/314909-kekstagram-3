import { generatePhotos } from './data.js';
import { renderThumbnails } from './render-thumbnails.js';

const photos = generatePhotos();

renderThumbnails(photos);
