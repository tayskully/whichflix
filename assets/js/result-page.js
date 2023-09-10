//DEPENDENCIES =================================================================
var apiKeyTmbd = "76c745d0d38df70f6fb5ec449119b744";
var apiKeyOmbd = "3c12800d";

var genreDropdown = $("#genre-dropdown");
var durationValue = $("#duration-dropdown").val();
var typeValue = $("#type-dropdown").val();
var runTimeDropdown = $("#duration-dropdown");


var searchButton = $("#sidebar-search-btn");
var slider = document.getElementById("test-slider");

//DATA==========================================================================
//retrieve userPreferences as an object
var userData = JSON.parse(localStorage.getItem("userPreferences"));
console.log(userData);
//defines search input from local storage data
var searchInput = userData.searchQuery;

//FUNCTIONS =====================================================================
//fetch request TMBD

//not needed
// let userGenre;
// let startDate;
// let endDate;
// let userRunTime;

// function getSliderValues() {
//   yearRangeValue = slider.noUiSlider.get();
//   // console.log(yearRangeValue);
//   var startYear = yearRangeValue[0];
//   var endYear = yearRangeValue[1];
//   startDate = `${startYear}-01-01`;
//   endDate = `${endYear}-12-31`;
//   return [startDate, endDate];
// }

// function getGenreValue() {
//   userGenre = genreDropdown.val();
//   return userGenre;
// }

// function getRunTime() {
//   userRunTime = runTimeDropdown.val();
// if (userRunTime === null) {
//   userRunTime = "45 500"
//   userRunTime = userRunTime.split(" ");
//   return userRunTime;
// } else {
//   userRunTime = userRunTime.split(" ");
//   return userRunTime;
// }}

// slider.noUiSlider.on("change", updateApiRequest);
// genreDropdown.on("change", updateApiRequest);
// runTimeDropdown.on("change", updateApiRequest);
//======================================================

function updateApiRequest() {
  // get all the values from the inputs

  // get slider values
  var sliderValues = userData.yearRange  // returns an array
  console.log(sliderValues);

  // get genre value
  var userGenre = userData.genre // returns a string
  console.log(userGenre);

  //get the runtime value
  var userRunTime = userData.duration
  console.log(userRunTime);

  // build the query url
  var queryURL = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKeyTmbd}&language=en-US`;
  if (userGenre) queryURL += `&with_genres=${userGenre}`;
  if (sliderValues[0] && sliderValues[1])
    queryURL += `&release_date.gte=${sliderValues[0]}&release_date.lte=${sliderValues[1]}`;
  // queryUrl = `&sort_by=vote_average.desc&vote_count.gte=2500`;
  if (userRunTime)
    queryURL += `&with_runtime.gte=${userRunTime[0]}&with_runtime.lte=${userRunTime[1]}`;

  // make the request
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
      } else {
        console.log("No data received");
      }
    });
}

updateApiRequest();


//User Input Search function====================

function getSearchInput() {
  //search input defined on line 13, from local storage
  if (searchInput === "") {
    console.log("no search entry");
    return;
    //read other parameters only
  } else {
    searchInput = searchInput.split(" "); //if more than one word, makes an array
    console.log(searchInput); //showing it's split correctly
    searchMovie(searchInput);
  }
}
//fetch request for movie search
function searchMovie(searchInput) {
  var queryURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKeyTmbd}&query=${searchInput[0]}`;
  if (searchInput.length > 1)
    //if there is more than one word typed in
    queryURL += `%20${searchInput[1]}`;
  if (searchInput.length > 2)
    //if there is more than one word typed in
    queryURL += `%20${searchInput[2]}`;
  if (searchInput.length > 3)
    //if there is more than one word typed in
    queryURL += `%20${searchInput[3]}`;

  fetch(queryURL)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        console.error(response.statusText);
        return null;
      }
    })
    .then(function (data) {
      if (data) {
        console.log(data);
      } else {
        console.log("no data received");
      }
    });
}
getSearchInput(); //should call elsewhere but here for now

//render movies
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
    // console.log(cardContent);

    cardDiv.html(cardContent);
    colDiv.append(cardDiv);
    rowDiv.append(colDiv);
  });

  movieContainer.append(rowDiv);
  // });
}

function getSliderValues() {
  yearRangeValue = slider.noUiSlider.get();
  // console.log(yearRangeValue);
  var startYear = yearRangeValue[0];
  var endYear = yearRangeValue[1];
  startDate = `${startYear}-01-01`;
  endDate = `${endYear}-12-31`;
  return [startDate, endDate];
}

function buildQueryURL() {
  var userYears = getSliderValues();

  var queryURL = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKeyTmbd}&language=en-US`;
  var userGenre = genreDropdown.val();
  var userRunTime = runTimeDropdown.val();
  if (userGenre) {
    queryURL += `&with_genres=${userGenre}`;
    console.log("USER GENRE:", userGenre);
  }
  if (userYears[0] && userYears[1]) {
    queryURL += `&release_date.gte=${userYears[0]}&release_date.lte=${userYears[1]}`;
    console.log("USER YEARS:", userYears);
  }
  if (userRunTime) {
    queryURL += `&with_runtime.gte=${userRunTime[0]}&with_runtime.lte=${userRunTime[1]}`;
    console.log("USER RUNTIME:", userRunTime);
  }
  return queryURL;
}

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
  $("#genre-dropdown").dropdown();
  $("#duration-dropdown").dropdown();

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

  searchButton.on("click", function (event) {
    event.preventDefault();
    var sidenavURL = buildQueryURL();

    fetch(sidenavURL)
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
          // console.log(data.results);
          displayMovies(data);
          //   getOmbdData(data);
          // } else {
          //   console.log("No data received");
        }
      });
  });
});
document.addEventListener('DOMContentLoaded', function () {
  // Initialize the sidenav
  var sidenavElem = document.querySelector('.sidenav');
  var sidenavInstance = M.Sidenav.init(sidenavElem);

  // Initialize the custom dropdown triggers within the sidenav
  var dropdownTriggers = document.querySelectorAll('.sidenav .dropdown-trigger');

  dropdownTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      var dropdown = trigger.nextElementSibling;

      // Check if the dropdown is open
      var isOpen = dropdown.classList.contains('active');

      // Close all dropdowns
      dropdownTriggers.forEach(function (otherTrigger) {
        otherTrigger.nextElementSibling.classList.remove('active');
      });

      // Toggle the dropdown's active state
      if (!isOpen) {
        dropdown.classList.add('active');
      }
    });
  });

  // Close the dropdowns when clicking outside
  document.addEventListener('click', function () {
    dropdownTriggers.forEach(function (trigger) {
      trigger.nextElementSibling.classList.remove('active');
    });
  });
});
