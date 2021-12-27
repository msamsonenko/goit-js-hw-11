import Notiflix from 'notiflix';

export function showNotification({ data }) {
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
