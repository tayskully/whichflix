//DEPENDENCIES ====================
var apiKeyTmbd = "76c745d0d38df70f6fb5ec449119b744";
var apiKeyOmbd = "3c12800d";

var genreDropdown = $("#genre-dropdown");
var durationValue = $("#duration-dropdown").val();
var typeValue = $("#type-dropdown").val();
var runTimeDropdown = $("#duration-dropdown");

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
});

var yearRangeValue = slider.noUiSlider.get();

//FUNCTIONS =======================
let userGenre;
let startDate;
let endDate;
let userRunTime;

function getSliderValues() {
  yearRangeValue = slider.noUiSlider.get();
  // console.log(yearRangeValue);
  var startYear = yearRangeValue[0];
  var endYear = yearRangeValue[1];
  startDate = `${startYear}-01-01`;
  endDate = `${endYear}-12-31`;
  return [startDate, endDate];
}

function getGenreValue() {
  userGenre = genreDropdown.val();
  return userGenre;
}

function getRunTime() {
  userRunTime = runTimeDropdown.val();
  if (userRunTime === null) {
    userRunTime = "45 500";
    userRunTime = userRunTime.split(" ");
    return userRunTime, console.log(userRunTime);
  } else {
    userRunTime = userRunTime.split(" ");
    return userRunTime;
  }
}

slider.noUiSlider.on("change", getValues);
genreDropdown.on("change", getValues);
runTimeDropdown.on("change", getValues);

function getValues() {
  // get all the values from the inputs
  // get slider values
  var sliderValues = getSliderValues(); // returns an array
  console.log(sliderValues);

  // get genre value
  var userGenre = getGenreValue(); // returns a string
  console.log(userGenre);

  //get the runtime value
  var userRunTime = getRunTime();
  console.log(userRunTime);
}

//USER INTERACTIONS================
// Handle form submission
console.log($("#search-form"));
$("#search-form").submit(function (event) {
  event.preventDefault(); // Prevent the form from submitting normally
  console.log("form clicked");
  // Get user input from the search input field
  var searchQuery = $("#search").val();

  // Create an object to store the user's preferences
  var userPreferences = {
    searchQuery: searchQuery,
    genre: userGenre,
    yearRange: yearRangeValue,
    duration: userRunTime,
    type: typeValue,
  };

  //clear the input field
  $("#search").val("");

  // Store the user's preferences in localStorage
  localStorage.setItem("userPreferences", JSON.stringify(userPreferences));

  // You can also retrieve data from localStorage later if needed
  // var storedPreferences = localStorage.getItem('userPreferences');
  // var parsedPreferences = JSON.parse(storedPreferences);
  // console.log(parsedPreferences);

  // For demonstration, we'll just display a confirmation message
  // alert("Your preferences have been saved locally.");

  getValues();

  // Redirect to the results page
  window.location.href = "result-page.html";

  // You can further process the data or update the page content.
});
