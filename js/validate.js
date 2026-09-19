const MAX_HASHTAGS_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_REGEXP = new RegExp(`^#[\\p{L}\\p{N}]{1,${MAX_HASHTAG_LENGTH - 1}}$`, 'u');

const HashtagValidationPriority = {
  PATTERN: 3,
  UNIQUE: 2,
  COUNT: 1,
};

const formElement = document.querySelector('.img-upload__form');
const hashtagsFieldElement = formElement.querySelector('.text__hashtags');
const commentFieldElement = formElement.querySelector('.text__description');

export const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const getHashtags = (value) => value.trim().split(/\s+/).filter(Boolean);

const validateHashtagsPattern = (value) => getHashtags(value).every((hashtag) => HASHTAG_REGEXP.test(hashtag));

const validateHashtagsCount = (value) => getHashtags(value).length <= MAX_HASHTAGS_COUNT;

const validateHashtagsUnique = (value) => {
  const lowerCasedHashtags = getHashtags(value).map((hashtag) => hashtag.toLowerCase());
  return lowerCasedHashtags.length === new Set(lowerCasedHashtags).size;
};

const validateCommentLength = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(
  hashtagsFieldElement,
  validateHashtagsPattern,
  `Хэштег должен начинаться с # и состоять из букв и цифр длиной не более ${MAX_HASHTAG_LENGTH} символов`,
  HashtagValidationPriority.PATTERN,
);

pristine.addValidator(
  hashtagsFieldElement,
  validateHashtagsUnique,
  'Хэштеги не должны повторяться',
  HashtagValidationPriority.UNIQUE,
);

pristine.addValidator(
  hashtagsFieldElement,
  validateHashtagsCount,
  `Нельзя указать больше ${MAX_HASHTAGS_COUNT} хэштегов`,
  HashtagValidationPriority.COUNT,
);

pristine.addValidator(
  commentFieldElement,
  validateCommentLength,
  `Длина комментария не может составлять больше ${MAX_COMMENT_LENGTH} символов`,
);
