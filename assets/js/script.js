// ** PAGE VARIABLES **
let amiiboInputEl = document.querySelector("#input");
let amiiboFormEl = document.querySelector("#form");
let resultsEl = document.querySelector("#results");
let searchContainerEl = document.querySelector("#btn-parent");
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
    resultsEl.innerHTML = "";
    amiiboInputEl.value = "";
    searchContainerEl.innerHTML = "";
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
    };
  });
};

// ** FUNCTION TO DISPLAY DATA FROM API **
let displayAmiiboInfo = function(data, amiiboName) {

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

    // create img div
    let figureDivEl = document.createElement("div");
    figureDivEl.classList = "card-image";
    figureDivEl.setAttribute('id', 'img-div');
    nameFigureContainerEl.appendChild(figureDivEl);

    
    //create amiibo-figure img
    let amiiboFigureEl = document.createElement("img");
    amiiboFigureEl.setAttribute('id', 'amiibo-image');
    amiiboFigureEl.setAttribute("src", data.amiibo[i].image)
    amiiboFigureEl.setAttribute("alt", "Picture of the searched for Amiibo figure")
    figureDivEl.appendChild(amiiboFigureEl);

    //append name-figure container to array-container
    arrayContainerEl.appendChild(nameFigureContainerEl);

    //create amiiboInfo container div
    let amiiboInfoContainerEl = document.createElement("div");
    amiiboInfoContainerEl.classList = "card small col s6 red-text card-panel hoverable";

    //create game-title div
    let gameContainerEl = document.createElement("div");
    gameContainerEl.classList = "card-title";
    gameContainerEl.textContent = "Amiibo Series"
    amiiboInfoContainerEl.appendChild(gameContainerEl);
  
    //create amiibo-game div
    let amiiboGameEl = document.createElement("div");
    amiiboGameEl.classList = "card-content";
    amiiboGameEl.textContent = data.amiibo[i].amiiboSeries;
    amiiboInfoContainerEl.appendChild(amiiboGameEl);

    //append amiiboInfo container to array-container
    arrayContainerEl.appendChild(amiiboInfoContainerEl);
 
    // append array-container to resultsEl
    resultsEl.appendChild(arrayContainerEl);
  };
  
  // create link to secondary API and append to page
  let secondApiBtn = document.createElement("a");
  secondApiBtn.classList = "btn red waves-effect waves-light col s4 push-s4";
  secondApiBtn.textContent = "See eBay Listings";
  secondApiBtn.setAttribute("href", "./results.html?amiibo=" + amiiboName);
  searchContainerEl.appendChild(secondApiBtn);

};

// ** EVENT HANDLER FOR USER INPUT **
amiiboFormEl.addEventListener( "submit", formSubmitHandler);