import { pageElements } from './page-elements';
const { gallery } = pageElements;

export function pictureMarkup({ data }) {
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
