import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export default class Slider {
  constructor() {
    this.slide = this.createSlider();
  }

  createSlider() {
    let gallery = new SimpleLightbox('.gallery a');
    gallery.on('show.simplelightbox');
    return gallery;
  }
  refreshSlider() {
    this.slide.refresh();
  }
}
