import axios from 'axios';

export const fetchPhotos = async (query, page) => {
  const searchParams = new URLSearchParams({
    key: '34848340-3921ebdedd421f5516455587c',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
  });
  const { data } = await axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}&${searchParams}`
  );

  return data;
};

// const API_KEY = '34848340-3921ebdedd421f5516455587c';
// axios.defaults.baseURL = 'https://pixabay.com/api/';
// axios.defaults.params = {
//   orientation: 'horizontal',
//   per_page: 12,
// };

// export const fetchPhotos = async (query, page) => {
//   const { data } = await axios.get(`?key=${API_KEY}&q=${query}&page=${page}`);

//   return data;
// };
