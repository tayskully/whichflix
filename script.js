//DEPENDENCIES ====================
var apiKeyTmbd = "76c745d0d38df70f6fb5ec449119b744";
var apiKeyOmbd = "3c12800d";

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

//adds range slider
var slider = document.getElementById("test-slider");
noUiSlider.create(slider, {
  start: [20, 80],
  connect: true,
  step: 1,
  orientation: "horizontal", // 'horizontal' or 'vertical'
  range: {
    min: 1900,
    max: 2023,
  },
//   format: wNumb({ //styling, 3rd party library
//     decimals: 0,
//   }),
});
//USER INTERACTIONS================
