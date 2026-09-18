const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';
const GET_DATA_URL = `${BASE_URL}/data`;

export const getData = () => fetch(GET_DATA_URL).then((response) => {
  if (!response.ok) {
    throw new Error('Не удалось загрузить данные');
  }

  return response.json();
});

const POST_DATA_URL = `${BASE_URL}/`;

export const sendData = (body) => fetch(POST_DATA_URL, {
  method: 'POST',
  body,
}).then((response) => {
  if (!response.ok) {
    throw new Error('Не удалось отправить данные');
  }
});
