import { getRandomInteger, getRandomArrayElement, createIdGenerator } from './util.js';

const PHOTOS_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const MIN_AVATAR_NUMBER = 1;
const MAX_AVATAR_NUMBER = 6;
const MIN_SENTENCES_COUNT = 1;
const MAX_SENTENCES_COUNT = 2;

const DESCRIPTIONS = [
  'Отдыхаем на природе',
  'Прогулка по вечернему городу',
  'Утренний кофе на балконе',
  'Наши любимые питомцы',
  'Поездка на море',
  'Вкусный завтрак',
  'Тренировка в парке',
  'Новые впечатления от путешествия',
  'Творческий беспорядок на рабочем столе',
  'Закат над рекой',
];

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const COMMENT_NAMES = [
  'Артём',
  'Мария',
  'Иван',
  'Ольга',
  'Дмитрий',
  'Анна',
  'Сергей',
  'Екатерина',
];

const generateCommentMessage = () => {
  const sentencesCount = getRandomInteger(MIN_SENTENCES_COUNT, MAX_SENTENCES_COUNT);
  const sentences = [];

  for (let i = 0; i < sentencesCount; i++) {
    sentences.push(getRandomArrayElement(COMMENT_MESSAGES));
  }

  return sentences.join(' ');
};

const generateComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER)}.svg`,
  message: generateCommentMessage(),
  name: getRandomArrayElement(COMMENT_NAMES),
});

const generateComments = (generateCommentId) => {
  const commentsCount = getRandomInteger(MIN_COMMENTS, MAX_COMMENTS);
  return Array.from({length: commentsCount}, () => generateComment(generateCommentId()));
};

const generatePhoto = (id, generateCommentId) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: generateComments(generateCommentId),
});

export const generatePhotos = () => {
  const generateCommentId = createIdGenerator();
  return Array.from({length: PHOTOS_COUNT}, (element, index) => generatePhoto(index + 1, generateCommentId));
};
