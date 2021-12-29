import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export default class Slider {
  constructor() {
    this.mySlider = null;
  }

  createSlider() {
    return (this.mySlider = new SimpleLightbox('.gallery a').on('show.simplelightbox'));
  }
  refreshSlider() {
    return this.mySlider.refresh();
  }
}
