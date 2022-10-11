import axios from 'axios';

async function getImagesApi(searchQuery, page) {
  const APIKEY = '29155055-535eee12d1c19223bea048262';
  const URL = `https://pixabay.com/api/?key=${APIKEY}`;

  const params = {
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  };

  try {
    const response = await axios.get(`${URL}&q=${searchQuery}&page=${page}`, {
      params,
    });

    return response.data;
  } catch (error) {
    console.log('error: ', error);
  }
}

export default getImagesApi;
