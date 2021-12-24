const BASE_URL = 'https://pixabay.com/api/';
const ACCESS_KEY = '24444752-6eeb7e9783b35bc5419290dda';
const SEARCH_OPTIONS = 'image_type=photo&orientation=horizontal&safesearch=true&per_page=4';
import axios from 'axios';
import Notiflix from 'notiflix';

export default class PicturesApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async getPictures() {
    Notiflix.Loading.standard();
    try {
      const response = await axios.get(
        `${BASE_URL}?key=${ACCESS_KEY}&q=${this.searchQuery}&${SEARCH_OPTIONS}&page=${this.page}`,
      );
      this.incrementPage();
      return response;
    } catch (error) {
      console.error(error);
    }
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
