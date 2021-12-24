import Notiflix from 'notiflix';

import PicturesApi from './api-images';
import Slider from './slider';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-button');

const pictures = new PicturesApi();
const slider = new Slider();
console.log(pictures);
console.log(slider);

// console.log(gallerySlider);

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
      loadBtn.classList.add('is-hidden');
      return showNotification(response);
    }
    showNotification(response);
    pictureMarkup(response);
    loadBtn.classList.remove('is-hidden');
    slider.createSlider();
    console.log(slider.slide);

    // console.log(slider.instance);
    // let gallerySlider = new SimpleLightbox('.gallery a');
    // gallerySlider.on('show.simplelightbox');
  });
}

function onBtnClick() {
  pictures.getPictures().then(pictureMarkup);
  slider.slide.destroy();
  console.log(slider.slide);
  Notiflix.Loading.remove(500);
}

function pictureMarkup({ data }) {
  const { hits } = data;
  const markUp = hits
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `
      <a href="${largeImageURL}" class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy"  />
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
</a>`;
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

function createSlider() {}
