/*Basic javaScript Set Up 
	Home Page:
		User Searches for an Amiibo
		Fetch Amiibo information from Amiibo API
		Display determine amiibo information
		Button for secondary API fetch/webpage 
			Fetch Web Search results using data from the original input or the fetched data to search
			Open a secondary page with search results for applicable amiibo
	Search Page/Container:
		Displays search results
Has a "Back Button" to return to home page

*/

// ** PAGE VARIABLES **
let amiiboInputEl = document.querySelector("#input");
let amiiboFormEl = document.querySelector("#form");
let amiiboName;
let amiiboInfoAr = [];
let data;

// ** EVENT HANDLER FOR AMIIBO USER SEARCH **
var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  amiiboName = amiiboInputEl.value.trim();
  
  if (amiiboName) {
    getAmiiboInfo(amiiboName);

    // clear old content
    // repoContainerEl.textContent = "";
    amiiboInputEl.value = "";
  } else {
    alert("Please enter an amiibo name");
  }

};

// ** FUNCTION TO RETRIEVE DATA FROM API **
let getAmiiboInfo = function(amiiboName) {

  // format the api url    "https://www.amiiboapi.com/api/amiibo/?name=" + amiiboName
  var apiUrl = "https://www.amiiboapi.com/api/amiibo/?name=" + amiiboName
  console.log(amiiboName);
   
  // make a get request to url
  fetch(apiUrl)
  .then(function(response) {
    // request was successful
    if (response.ok) {
      console.log(response);
        
      response.json().then(function(data) {

        displayAmiiboInfo(data, amiiboName);

      });
                 
    } else {
      alert("Please enter a valid Amiibo")
    }

  })
  .catch(function(error) {
    alert("Unable to connect to Amiibo API");
  })
};

// ** FUNCTION TO DISPLAY DATA FROM API **
let displayAmiiboInfo = function(data, amiibo) {
  console.log("The display function was called!");

  // loop over returned amiibos
  for (var i = 0; i < data.amiibo.length; i++) {
           
    // define array variables
    let amiiboName = data.amiibo[i].name;
    let amiiboGame = data.amiibo[i].gameSeries;
    let amiiboImage = data.amiibo[i].image;

    console.log(amiiboName);
    console.log(amiiboGame);
    console.log(amiiboImage);

    };

  };

// ** EVENT HANDLER FOR USER INPUT **
amiiboFormEl.addEventListener("submit", formSubmitHandler);