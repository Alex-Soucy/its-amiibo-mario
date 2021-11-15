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
var amiiboFormEl = document.querySelector("#form");
let amiiboName;
let amiiboInfoAr = [];
let data;

// ** EVENT HANDLER FOR AMIIBO USER SEARCH **
var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  console.log(event);

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
let getAmiiboInfo = function(name) {

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
        console.log(data);
            
      let amiiboInfoAr = data.amiibo;
           
        console.log(amiiboInfoAr);
        console.log(amiiboInfoAr[1].name);
        console.log(amiiboInfoAr[1].gameSeries);
        console.log(amiiboInfoAr[1].image);
          
        console.log(amiiboInfoAr.length);
      });
                 
    } else {
      alert("Error: " + response.statusText);
    }

  })
  .catch(function(error) {
    alert("Unable to connect to Amiibo API");
  })
};

// ** FUNCTION TO DISPLAY DATA FROM API **
let displayAmiiboInfo = function(amiiboInfoAr, searchTerm) {
  console.log("This function was called!");
  console.log(amiiboInfoAr);
  //check if api returned any repos
  // if (amiiboInfoAr.length === 0) {
  //   repoContainerEl.textContent = "No Amiibo Found";
  //   return;
  // }
 
  // amiiboSearchTerm.textContent = searchTerm;
  
  // loop over returned amiibos
  for (var i = 0; i < amiiboInfoAr.length; i++) {
           
    // define array variables
    let amiiboName = amiiboInfoAr[i].name;
    let amiiboGame = amiiboInfoAr[i].gameSeries;
    let amiiboImage = amiiboInfoAr[i].image;

    console.log(amiiboName);
    console.log(amiiboGame);
    console.log(amiiboImage);

    };

  };

// ** EVENT HANDLER FOR USER INPUT **
amiiboFormEl.addEventListener("submit", formSubmitHandler);