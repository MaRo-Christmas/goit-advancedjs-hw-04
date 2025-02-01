import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = import.meta.env.VITE_PIXA_KEY;

async function getPhotos(query, page = 1, perPage = 15) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true`;

  try {
    const res = await axios.get(url, {
      params: {
        per_page: perPage,
        page: page,
      },
    });

    if (res.status !== 200) {
      throw new Error(`Error: ${res.status}`);
    }

    return {
      totalHits: res.data.totalHits,
      hits: res.data.hits || [],
    };
  } catch (error) {
    console.error('API Error:', error.message);
    throw new Error('Failed to fetch photos, please try again later.');
  }
}

export { getPhotos };
