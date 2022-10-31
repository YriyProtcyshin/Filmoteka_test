import { fetchAllMovies } from './js/fetch-all-movies';
import { fetchGenres } from './js/fetch-genres';
import cardListTmp from './templates/card-list.hbs';

const cardListRef = document.querySelector('.card-list');
let genresList = '';

main();

async function main() {
  let genresList = {};
  let listMovie = '';
  await fetchGenres().then(data => {
    data.genres.forEach(item => {
      genresList[item.id] = item.name;
    });
  });

  await fetchAllMovies().then(data => {
    listMovie = data.results;
  });

  await markipHtml(genresList, listMovie);
}

function markipHtml(genresList, listMovie) {
  console.log(genresList);
  console.log(listMovie);

  cardListRef.innerHTML = cardListTmp({
    listMovie,
    genresList,
  });
}
