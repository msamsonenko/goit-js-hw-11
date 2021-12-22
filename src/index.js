
import Notiflix from 'notiflix';

import  PicturesApi  from './api-images';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-button');

const pictures = new PicturesApi();

console.log(pictures)

form.addEventListener('submit', onFormSubmit);
loadBtn.addEventListener('click', onBtnClick);

function onFormSubmit(e) {
  e.preventDefault();
const {
    elements: { searchQuery },
  } = e.currentTarget;

  pictures.query = searchQuery.value;
  gallery.innerHTML = '';
  pictures.resetPage();
  pictures.fetchPictures().then(result => {
    showNotification(result);
    pictureMarkup(result);
  })
  
  // console.log(e.currentTarget);
  // console.log(searchQuery.value);
  // fetchPictures(searchQuery.value).then(pictureMarkup);
}

function onBtnClick(){
  pictures.fetchPictures().then(pictureMarkup);
  Notiflix.Loading.remove(500);

}

function pictureMarkup(photos) {
  console.log(photos)
  const { hits, total } = photos;
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

  return gallery.insertAdjacentHTML('beforeend', markUp);
}
function showNotification(result){
  if(result.hits.length === 0){
    return Notiflix.Notify.failure(`Sorry, there are ${result.total} images matching your search query. Please try again.`);
    }
    if(result.hits.length === 1){
     return Notiflix.Notify.success(`Hooray! We found ${result.total} image.`);
    }
    Notiflix.Loading.remove(500);
   return Notiflix.Notify.success(`Hooray! We found ${result.total} images.`);
}