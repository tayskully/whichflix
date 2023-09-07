//DEPENDENCIES ====================
var apiKeyTmbd = "76c745d0d38df70f6fb5ec449119b744";
var apiKeyOmbd = "3c12800d";
// var containerEl = $('#card-container')

//DATA=============================

//FUNCTIONS =======================
//fetch request TMBD
function getTmbdData() {
  var queryURL = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKeyTmbd}`; // use /tv
  fetch(queryURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
      });
    }
  });
}
getTmbdData();
// fetch request OMDB
function getOmbdData() {
  var queryURL = `http://www.omdbapi.com/?apikey=${apiKeyOmbd}&`;
  fetch(queryURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
      });
    }
  });
}
getOmbdData();



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
