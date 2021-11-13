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
let amiiboInfoAr = [];

// function to retrieve data from Amiibo API
let getAmiiboInfo = function(name) {
  // format the api url    "https://www.amiiboapi.com/api/amiibo/?name=" + searchTerm
  var apiUrl = "https://www.amiiboapi.com/api/amiibo/?name=mario";
   
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
      }})
    .catch(function(error) {
      alert("Unable to connect to Amiibo API");
    });

    displayAmiiboInfo();

    
  };

 
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

    //   //create a div element to display results
    //   let divEl = document.createElement("div")
 
    //   // create a span element to hold  name
    //   var titleEl = document.createElement("span");
    //   titleEl.textContent = repoName;
      
    //   // append to container
    //   repoEl.appendChild(titleEl);
  
    //   // create a status element
    //   var statusEl = document.createElement("span");
    //   statusEl.classList = "flex-row align-center";
  
    //   // check if current repo has issues or not
    //   if (repos[i].open_issues_count > 0) {
    //     statusEl.innerHTML =
    //       "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
    //   } else {
    //     statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    //   }
  
    //   // append to container
    //   repoEl.appendChild(statusEl);
  
    //   // append container to the dom
    //   repoContainerEl.appendChild(repoEl);

getAmiiboInfo();  

