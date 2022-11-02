import { fetchAllMovies } from './js/fetch-all-movies';

import { fetchMoviesGenres, fetchTVShowGenres } from './js/fetch-genres';
import cardListTmp from './templates/card-list.hbs';
// import SimpleLightbox from 'simplelightbox';
import * as basicLightbox from 'basiclightbox';

const cardListRef = document.querySelector('.card-list');
let genresList = '';

let regbtn = null;
let messageRef = null;

//модальное окно регистрации
const singInButtoRef = document.querySelector('#singIn');

const instance = basicLightbox.create(
  `
    <form class="singin-modal">
      <input type="email" placeholder="email" class="regInput" id="email">
      <input type = "password" placeholder="password" class="regInput" id="password">
      <button type="submit" class="regbtn">Регистрация</button>

    <p class="message" style="color:red"></p>
        
    </form>
`
);

singInButtoRef.addEventListener('click', () => {
  instance.show();
  regbtn = document.querySelector('.regbtn');
  functionRegistr();
});

main();

// запросы API
async function main() {
  let genresList = {};
  let listMovie = '';
  await fetchMoviesGenres().then(data => {
    data.genres.forEach(item => {
      genresList[item.id] = item.name;
    });
  });

  await fetchTVShowGenres().then(data =>
    data.genres.forEach(item => {
      genresList[item.id] = item.name;
    })
  );

  await fetchAllMovies().then(data => {
    listMovie = data.results;
  });

  await markipHtml(genresList, listMovie);
}

// рендеринг html
function markipHtml(genresList, listMovie) {
  // console.log(genresList);
  // console.log(listMovie);

  cardListRef.innerHTML = cardListTmp({
    listMovie,
    genresList,
  });
}

// USER REGISTRATION

function functionRegistr() {
  console.log(regbtn);
  regbtn.addEventListener('click', e => {
    e.preventDefault();
    const email = document.querySelector("input[type = 'email']").value;
    const password = document.querySelector("input[type = 'password']").value;
    messageRef = document.querySelector('.message');

    // регистрация пользователя
    // fireBaseRegistr(email, password);
    // Вход пользхователя
    singIn(email, password);
  });
}

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { getDatabase, ref, set } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCPsJvUJkZLDdjF8QolGB590zgd9ZdJpB4',
  authDomain: 'alien-house-159919.firebaseapp.com',
  databaseURL:
    'https://alien-house-159919-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'alien-house-159919',
  storageBucket: 'alien-house-159919.appspot.com',
  messagingSenderId: '1067825444317',
  appId: '1:1067825444317:web:7a707dd2e08e707dd13234',
  measurementId: 'G-0TX6D4NG3J',
  atabaseURL:
    'https://alien-house-159919-default-rtdb.europe-west1.firebasedatabase.app/ ',
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const userID = '9999';
const filmID = '6666666';
const filmName = 'Black Adam part 2';
const genres = ['Action', 'Fantasy', 'Science', 'Fiction'];

writeUserData(userID, filmID, filmName, genres);

function writeUserData(userID, filmID, filmName, genres) {
  const db = getDatabase();
  set(ref(db, 'users/' + userID + '/' + filmID), {
    filmID: filmID,
    filmName: filmName,
    genres: genres,
  });
}

// ============ Регистрация пользователя ====================
// function fireBaseRegistr(email, password) {
//   // Initialize Firebase
//
//   // Регистрация пользователя
//   const auth = getAuth();
//   createUserWithEmailAndPassword(auth, email, password)
//     .then(userCredential => {
//       // Signed in
//       const user = userCredential.user;
//       // ...
//     })
//     .catch(error => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // ..
//     });
// }

// Вход зарегистрированного пользователя
function singIn(email, password) {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      localStorage.setItem('registerUser', 'true');
      // ...
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      messageRef.innerHTML = 'Неверный логин и пароль';
    });
}
