/*
Countdown API Key: D4D701239DFE46729FA7FDB962DBF3C0
Good for 100 free requests
Check response.request_info for credits_remaining
*/

// TESTING COUNTDOWN API CALL
var getEbayListings = function () {
  fetch('https://api.countdownapi.com/request?api_key=D4D701239DFE46729FA7FDB962DBF3C0&type=search&ebay_domain=ebay.com&search_term=mario%20amiibo').then(function (response) {
    if (response.ok) {
      console.log(response)
      response.json().then(function (data) {
        console.log(data)
      })
    }
  })
}

getEbayListings()
