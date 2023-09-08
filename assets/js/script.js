//DEPENDENCIES ====================
var apiKeyTmbd = "76c745d0d38df70f6fb5ec449119b744";
var apiKeyOmbd = "3c12800d";

//DATA=============================
// adds range slider
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
  //   format: wNumb({ //styling, 3rd party library
  //     decimals: 0,
  //   }),
});

//FUNCTIONS =======================
var userGenre = null;
//fetch request TMBD
function getTmbdData() {
  genreDropdown = $("#genre-dropdown");
  genreDropdown.on("change", function () {
    var userGenre = genreDropdown.val();
    updateApiRequest(userGenre);
  });
}

function updateApiRequest(userGenre) {
  if (userGenre !== null) {
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
        } else {
          console.log("No data received");
        }
      });
  }
}

getTmbdData();

// fetch request OMDB
function getOmbdData(data) {
  console.log(data);

  for (var i = 0; i < data.results.length; i++) {
    var nameFromTMDBData = data.results[i].original_title;
    var correctName = nameFromTMDBData.replace(/\s/g, "+");
    console.log(correctName);
  }
  var queryURL = `http://www.omdbapi.com/?t=${correctName}&apikey=${apiKeyOmbd}`;
  fetch(queryURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
      });
    }
  });
}

//USER INTERACTIONS================
// Handle form submission
console.log($("#search-form"));
$("#search-form").submit(function (event) {
  event.preventDefault(); // Prevent the form from submitting normally
  console.log("form clicked");
  // Get user input from the search input field
  var searchQuery = $("#search").val();

  // Get selected values from dropdowns
  var genreValue = $("#genre-dropdown").val();
  var yearRangeValue = slider.noUiSlider.get();
  var durationValue = $("#duration-dropdown").val();
  var typeValue = $("#type-dropdown").val();

  // Create an object to store the user's preferences
  var userPreferences = {
    searchQuery: searchQuery,
    genre: genreValue,
    yearRange: yearRangeValue,
    duration: durationValue,
    type: typeValue,
  };

  // Store the user's preferences in localStorage
  localStorage.setItem("userPreferences", JSON.stringify(userPreferences));

  // You can also retrieve data from localStorage later if needed
  // var storedPreferences = localStorage.getItem('userPreferences');
  // var parsedPreferences = JSON.parse(storedPreferences);
  // console.log(parsedPreferences);

  // For demonstration, we'll just display a confirmation message
  alert("Your preferences have been saved locally.");

  // Redirect to the results page
  window.location.href = "result-page.html";

  // You can further process the data or update the page content.
});
