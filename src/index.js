import Notiflix from 'notiflix';

import PicturesApi from './api-images';
import Slider from './slider';
import { showNotification } from './notifications';
import { pictureMarkup } from './markup';
import { pageElements } from './page-elements';

const { form, gallery, loadBtn } = pageElements;

const pictures = new PicturesApi();
const slider = new Slider();
console.log('1', slider.mySlider);

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
  });
}

function onBtnClick() {
  pictures.getPictures().then(result => {
    pictureMarkup(result);
    // slider.mySlider.destroy();
    slider.refreshSlider();
  });
  Notiflix.Loading.remove(500);
}
