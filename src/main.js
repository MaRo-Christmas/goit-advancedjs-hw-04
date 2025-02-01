import { getPhotos } from './js/pixabay-api.js';
import createMarkup from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const galleryEl = document.querySelector('.js-gallery');
const loaderEl = document.querySelector('.loader');
const loadBtn = document.querySelector('.load');

let page = 1;
let userQuery = '';
const perPage = 15;
let totalImages = 0;
let lightbox;

form.addEventListener('submit', handleSearch);
loadBtn.addEventListener('click', handleLoadMore);
loadBtn.style.display = 'none';

async function handleSearch(event) {
  event.preventDefault();
  const form = event.currentTarget;
  userQuery = form.elements.user_query.value.trim();

  if (userQuery === '') {
    iziToast.show({
      title: 'Error',
      message: "Input can't be empty!",
      position: 'center',
      color: 'red',
    });
    return;
  }

  galleryEl.innerHTML = '';
  page = 1;
  totalImages = 0;
  loadBtn.style.display = 'none';

  try {
    loaderEl.style.display = 'flex';
    const data = await getPhotos(userQuery, page, perPage);

    if (data.totalHits === 0) {
      iziToast.show({
        title: 'Warning',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'center',
        color: 'yellow',
      });
      return;
    }

    totalImages = Math.min(data.totalHits, 60);
    galleryEl.innerHTML = createMarkup(data.hits);

    lightbox = new SimpleLightbox('.js-gallery a', {
      captions: true,
      captionsData: 'alt',
      captionDelay: 250,
    });

    lightbox.refresh();

    checkLoadMore(data.hits.length);
  } catch (err) {
    console.error('Error fetching photos:', err);
  } finally {
    loaderEl.style.display = 'none';
    form.reset();
  }
}

async function handleLoadMore() {
  page += 1;
  loadBtn.style.display = 'none';

  try {
    loaderEl.style.display = 'flex';
    const data = await getPhotos(userQuery, page, perPage);

    galleryEl.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    lightbox.refresh();
    smoothScroll();

    checkLoadMore(data.hits.length);
  } catch (err) {
    console.error('Error fetching more photos:', err);
  } finally {
    loaderEl.style.display = 'none';
  }
}

function smoothScroll() {
  const firstCard = galleryEl.firstElementChild;
  if (!firstCard) return;

  const { height: cardHeight } = firstCard.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function checkLoadMore(receivedImages) {
  const totalPages = Math.ceil(totalImages / perPage);

  if (page >= totalPages || receivedImages < perPage) {
    loadBtn.style.display = 'none';
    iziToast.show({
      title: 'Info',
      message: "We're sorry, but you've reached the end of search results.",
      position: 'center',
      color: 'blue',
    });
  } else {
    loadBtn.style.display = 'block';
  }
}
