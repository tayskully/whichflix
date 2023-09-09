//DEPENDENCIES ====================
var apiKeyTmbd = "76c745d0d38df70f6fb5ec449119b744";
var apiKeyOmbd = "3c12800d";

//DATA=============================

//FUNCTIONS =======================
//fetch request TMBD
//retrive userPreferences as an onject
var userData = JSON.parse(localStorage.getItem("userPreferences"));
console.log(userData);

var userGenre = userData.genre;
console.log(userGenre);

var queryURL = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKeyTmbd}&with_genres=${userGenre}&sort_by=vote_average.desc&vote_count.gte=2500`;

fetch(queryURL)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      console.error("Error: " + response.statusText);
      return null;
    }
  })
  .then(function (data) {
    if (data) {
      console.log(data.results);
      displayMovies(data);
      //   getOmbdData(data);
      // } else {
      //   console.log("No data received");
    }
  });

function displayMovies(data) {
  var movieContainer = $("#movie-container");
  movieContainer.empty();
  rowDiv = $('<div class="row">');

  data.results.forEach(function (movieData) {
    var movieTitle = movieData.title;
    var moviePoster =
      `https://image.tmdb.org/t/p/original/` + movieData.poster_path;
    var movieOverview = movieData.overview;

    // movieContainer.innerHTML= "";

    // data.results.forEach(function (data){
    var colDiv = $('<div class="col s12 m6 l4">');

    var cardDiv = $('<div class="card">');

    var cardContent = `
    <div class="card-image waves-effect waves-block waves-light">
      <img class="activator" src="${moviePoster}" alt="${movieTitle}">
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">${movieTitle}<i class="material-icons right">more_vert</i></span>
      <p><a href="#">This is a link</a></p>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">${movieTitle}<i class="material-icons right">close</i></span>
      <p>${movieOverview}</p>
    </div>
  `;
    console.log(cardContent);

    cardDiv.html(cardContent);
    colDiv.append(cardDiv);
    rowDiv.append(colDiv);
  });

  movieContainer.append(rowDiv);
  // });
}
// function getTmbdData(data)

// getTmbdData();

// // fetch request OMDB
// function getOmbdData() {
//   var queryURL = `http://www.omdbapi.com/?apikey=${apiKeyOmbd}&`;
//   fetch(queryURL).then(function (response) {
//     if (response.ok) {
//       response.json().then(function (data) {
//         console.log(data);
//       });
//     }
//   });
// }
// getOmbdData();

//USER INTERACTIONS================

// INITIALIZATION==================
$(document).ready(function () {
  $(".sidenav").sidenav();
  $(".dropdown-trigger").dropdown();
  var slider = document.getElementById("test-slider");

  var format = {
    to: function (value) {
      return Math.round(value);
    },
    from: function (value) {
      return Math.round(value);
    },
  };

  noUiSlider.create(slider, {
    start: [1900, 2023],
    connect: true,
    tooltips: true,
    step: 1,
    orientation: "horizontal",
    range: {
      min: 1900,
      max: 2023,
    },
    format,
  });
});
