import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export default class Slider {
  constructor() {
    this.mySlider = this.createSlider();
  }

  createSlider() {
    console.log('hello');
    return new SimpleLightbox('#gallery a').on('show.simplelightbox');
  }
  refreshSlider() {
    this.mySlider.refresh();
  }
}
