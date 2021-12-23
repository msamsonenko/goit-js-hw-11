import Notiflix from 'notiflix';

import PicturesApi from './api-images';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-button');

const pictures = new PicturesApi();

let gallerySlider = new SimpleLightbox('.gallery a');
gallerySlider.on('show.simplelightbox');

form.addEventListener('submit', onFormSubmit);
loadBtn.addEventListener('click', onBtnClick);

function onFormSubmit(e) {
  e.preventDefault();
  const {
    elements: { searchQuery },
  } = e.currentTarget;

  gallery.innerHTML = '';
  pictures.query = searchQuery.value;
  pictures.resetPage();
  pictures.getPictures().then(response => {
    if (response.data.hits.length === 0) {
      return showNotification(response);
    }
    showNotification(response);
    pictureMarkup(response);
  });
  loadBtn.classList.toggle('is-hidden');
}

function onBtnClick() {
  pictures.getPictures().then(pictureMarkup);
  Notiflix.Loading.remove(500);
}

function pictureMarkup({ data }) {
  const { hits } = data;
  const markUp = hits
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
  <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy"  /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span>${likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b>
      <span>${views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <span>${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <span>${downloads}</span>
    </p>
  </div>
</div>`;
    })
    .join('');

  return gallery.insertAdjacentHTML('beforeend', markUp);
}
function showNotification({ data }) {
  if (data.hits.length === 0) {
    Notiflix.Loading.remove(500);
    return Notiflix.Notify.failure(
      `Sorry, there are ${data.total} images matching your search query. Please try again.`,
    );
  }
  if (data.hits.length === 1) {
    return Notiflix.Notify.success(`Hooray! We found ${data.total} image.`);
  }
  Notiflix.Loading.remove(500);
  return Notiflix.Notify.success(`Hooray! We found ${data.total} images.`);
}
