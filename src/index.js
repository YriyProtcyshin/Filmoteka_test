import { fetchAllMovies } from './js/fetch-all-movies';
import { fetchGenres } from './js/fetch-genres';
import cardListTmp from './templates/card-list.hbs';

const cardListRef = document.querySelector('.card-list');
let genreList = null;

fetchGenres().then(json => {
  console.log(json.genres);
  genreList = json.genres;
});

fetchAllMovies().then(json => {
  markupcardList(json.results);
});

function markupcardList(data) {
  cardListRef.innerHTML = cardListTmp(data);
}

console.log(genreList);
