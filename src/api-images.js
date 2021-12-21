const BASE_URL = 'https://pixabay.com/api/';
const ACCESS_KEY = '24444752-6eeb7e9783b35bc5419290dda';
const SEARCH_OPTIONS = 'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

export function fetchPictures(searchQuery) {
  let pageCount = 1;
  return fetch(
    `${BASE_URL}?key=${ACCESS_KEY}&q=${searchQuery}&${SEARCH_OPTIONS}&page=${pageCount}`,
  ).then(response => response.json());
}
