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
let resultsEl = document.querySelector("#results");
let searchContainerEl = document.querySelector("#btn-parent");
let selectEl = document.querySelector("#select")
console.log(searchContainerEl);
let amiiboName;
let amiiboInfoAr = [];
let searchHistAr = JSON.parse(localStorage.getItem("amiibo")) || [];
let data;
let amiiboSelectEl = document.querySelector("#option")

// ** EVENT HANDLER FOR AMIIBO USER SEARCH **
var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  amiiboName = amiiboInputEl.value.trim();

  if (amiiboName) {
    getAmiiboInfo(amiiboName);

    // clear old content
    resultsEl.innerHTML = "";
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
      // let autoFill = JSON.parse(storage)

      response.json().then(function(data) {
        displayAmiiboInfo(data, amiiboName);
        let searchDataObj = {
          name: amiiboName,
        }
        searchHistAr.push(searchDataObj)
        searchHistAr.shift()
        localStorage.setItem("amiibo", JSON.stringify(searchHistAr));
        
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
let displayAmiiboInfo = function(data, amiiboName) {
  console.log("The display function was called!");

  // loop over returned amiibos
  for (var i = 0; i < data.amiibo.length; i++) {

    //create array-container div
    let arrayContainerEl = document.createElement("div");
    arrayContainerEl.classList = "row valign-wrapper";

    //create name-figure-container div
    let nameFigureContainerEl = document.createElement("div");
    nameFigureContainerEl.classList = "card small col s6 red-text card-panel hoverable";

    //create amiibo-name div
    let amiiboNameEl = document.createElement("div");
    amiiboNameEl.classList = "card-title";
    amiiboNameEl.textContent = data.amiibo[i].name;
    nameFigureContainerEl.appendChild(amiiboNameEl);

    //create amiibo-figure img
    let amiiboFigureEl = document.createElement("img");
    amiiboFigureEl.classList = "card-image"
    amiiboFigureEl.setAttribute('id', 'ebayImage');
    amiiboFigureEl.setAttribute("src", data.amiibo[i].image)
    amiiboFigureEl.setAttribute("alt", "Picture of the searched for Amiibo figure")
    nameFigureContainerEl.appendChild(amiiboFigureEl);

    //append name-figure container to array-container
    arrayContainerEl.appendChild(nameFigureContainerEl);

    //create amiiboInfo container div
    let amiiboInfoContainerEl = document.createElement("div");
    amiiboInfoContainerEl.classList = "card small col s6 red-text card-panel hoverable";

    //create game-title div
    let gameContainerEl = document.createElement("div");
    gameContainerEl.classList = "card-title";
    gameContainerEl.textContent = "Game Series"
    amiiboInfoContainerEl.appendChild(gameContainerEl);

    //create amiibo-game div
    let amiiboGameEl = document.createElement("div");
    amiiboGameEl.classList = "card-content";
    amiiboGameEl.textContent = data.amiibo[i].gameSeries;
    amiiboInfoContainerEl.appendChild(amiiboGameEl);

    //append amiiboInfo container to array-container
    arrayContainerEl.appendChild(amiiboInfoContainerEl);

    // append array-container to resultsEl
    resultsEl.appendChild(arrayContainerEl);
  };
}
console.log(searchHistAr)
  const dropdown = function() {
    let dataListEl = document.getElementById("history")
    let node = document.createTextNode(amiiboInputEl.value)
    for(let i =0; i < searchHistAr.length; i++) {
    console.log(searchHistAr[i].name)
    globalThis.optionEl = document.createElement("option");
    optionEl.append(node)
    optionEl.setAttribute("value", searchHistAr[i].name);
    //  optionEl.setAttribute("id", "option")
    //  optionEl.textContent = searchHistAr[i].name
    dataListEl.appendChild(optionEl)
   }
 }
  dropdown();

  let secondApiBtn = document.createElement("a");
  secondApiBtn.classList = "btn red waves-effect waves-light";
  secondApiBtn.textContent = "See eBay Listings";
  secondApiBtn.setAttribute("href", "./results.html?amiibo=" + amiiboName);
  searchContainerEl.appendChild(secondApiBtn);

// ** EVENT HANDLER FOR USER INPUT **
amiiboFormEl.addEventListener( "submit",  formSubmitHandler);
