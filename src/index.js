{
  /* <div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>; */
}
import Notiflix from 'notiflix';

import { fetchPictures } from './api-images';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-button');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  gallery.innerHTML = '';
  const {
    elements: { searchQuery },
  } = e.currentTarget;

  console.log(e.currentTarget);
  console.log(searchQuery.value);
  fetchPictures(searchQuery.value).then(pictureMarkup);
  // loadBtn.addEventListener('click', () => {
  //   fetchPictures(searchQuery.value).then(pictureMarkup);
  // });
}

function pictureMarkup(photos) {
  const { hits, totalHits } = photos;
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  const markUp = hits
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
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
</div>`;
    })
    .join('');

  return gallery.insertAdjacentHTML('afterbegin', markUp);
}
