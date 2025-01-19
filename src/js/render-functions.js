function createMarkup(photo) {
  return photo
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-card">
        <a href="${largeImageURL}">
          <img class="gallery-img" width="360" height="152" src="${webformatURL}" alt="${tags}" />
        </a>
        <ul class="card-stats">
            <li class="card-stats-item">
              <p>Likes</p>
              <p>${likes}</p>
            </li>
            <li class="card-stats-item">
              <p>Views</p>
              <p>${views}</p>
            </li>
            <li class="card-stats-item">
              <p>Comments</p>
              <p>${comments}</p>
            </li>
            <li class="card-stats-item">
              <p>Downloads</p>
              <p>${downloads}</p>
            </li>
        </ul>
    </li>`
    )
    .join('');
}

export default createMarkup;
