import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = import.meta.env.VITE_PIXA_KEY;

async function getPhotos(query, page = 1, perPage = 15) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

  console.log(
    `Fetching photos for query: ${query}, page: ${page}, perPage: ${perPage}`
  );

  try {
    const res = await axios.get(url, {
      params: {
        per_page: perPage,
        page: page,
      },
    });

    if (res.status === 200) {
      const limitedHits = Math.min(res.data.totalHits, 500);
      console.log(
        `Total hits: ${res.data.totalHits}, Limited to: ${limitedHits}`
      );
      return res.data;
    } else {
      throw new Error(`Error: ${res.status}`);
    }
  } catch (error) {
    console.error('Error in API request:', error);
    throw new Error('Failed to fetch photos');
  }
}

export { getPhotos };
