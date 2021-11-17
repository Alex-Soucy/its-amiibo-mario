/*
Countdown API Key: D4D701239DFE46729FA7FDB962DBF3C0
Good for 100 free requests
Check response.request_info for credits_remaining
*/

var listingsContainerEl = document.querySelector('#card-container')

// TESTING COUNTDOWN API CALL
var getEbayListings = function () {
  console.log('Function was called.')
  fetch('https://api.countdownapi.com/request?api_key=D4D701239DFE46729FA7FDB962DBF3C0&type=search&ebay_domain=ebay.com&search_term=mario%20amiibo').then(function (response) {
    if (response.ok) {
      console.log(response)
      response.json().then(function (data) {
        console.log(data)
        displayListings(data)
      })
    }
  })
}

var displayListings = function (listings) {
  if (listings.search_results.length === 0) {
    listingsContainerEl.textContent = 'Sorry, we couldn\'t find a matching listing for the provided character.'
  } else {
    // limit rows created to 10 and direct user to eBay search result page for additional listings
    for (var i = 0; i < 10; i++) {
      var listingsRowEl = document.createElement('div')
      listingsRowEl.classList.add('row', 'valign-wrapper')

      // START NAME CARD CREATION
      var nameContainerEl = document.createElement('div')
      nameContainerEl.setAttribute('id', 'amiiboName')
      nameContainerEl.classList.add('card', 'small', 'col', 's3', 'red-text', 'card-panel', 'hoverable')

      var nameCardTitleEl = document.createElement('h4')
      nameCardTitleEl.classList.add('card-title')
      nameCardTitleEl.textContent = 'Mario' // this should be the searched amiibo name from the search page

      nameContainerEl.appendChild(nameCardTitleEl)
      // END NAME CARD CREATION

      // START AUCTION INFO CREATION
      var auctionInfoContainerEl = document.createElement('div')
      auctionInfoContainerEl.setAttribute('id', 'gameName')
      auctionInfoContainerEl.classList.add('card', 'small', 'col', 's3', 'red-text', 'card-panel', 'hoverable')

      var auctionCardTitleEl = document.createElement('a')
      auctionCardTitleEl.setAttribute('id', 'ebayTitle')
      auctionCardTitleEl.setAttribute('href', listings.search_results[i].link)
      auctionCardTitleEl.classList.add('card-title')
      auctionCardTitleEl.textContent = listings.search_results[i].title

      auctionInfoContainerEl.appendChild(auctionCardTitleEl)

      var auctionCardContentEl = document.createElement('div')
      auctionCardContentEl.classList.add('card-content')

      var isAuctionBoolEl = document.createElement('p')
      isAuctionBoolEl.setAttribute('id', 'ebayAuction')
      isAuctionBoolEl.textContent = 'Auction: ' + listings.search_results[i].is_auction

      auctionCardContentEl.appendChild(isAuctionBoolEl)

      var isBuyItNowEl = document.createElement('p')
      isBuyItNowEl.setAttribute('id', 'ebayByNow')
      isBuyItNowEl.textContent = 'Buy It Now: ' + listings.search_results[i].buy_it_now

      auctionCardContentEl.appendChild(isBuyItNowEl)

      var conditionEl = document.createElement('p')
      conditionEl.setAttribute('id', 'ebayCondition')
      conditionEl.textContent = 'Condition: ' + listings.search_results[i].condition

      auctionCardContentEl.appendChild(conditionEl)

      var freeReturnsEl = document.createElement('p')
      freeReturnsEl.setAttribute('id', 'ebayReturns')
      freeReturnsEl.textContent = 'Free Returns: ' + listings.search_results[i].free_returns

      auctionCardContentEl.appendChild(freeReturnsEl)

      auctionInfoContainerEl.appendChild(auctionCardContentEl)
      // END AUCTION INFO CREATION

      // START PRICING CARD CREATION
      var pricingCardContainerEl = document.createElement('div')
      pricingCardContainerEl.setAttribute('id', 'vendorName')
      pricingCardContainerEl.classList.add('card', 'small', 'col', 's3', 'red-text', 'card-panel', 'hoverable')

      var priceCardTitleEl = document.createElement('h4')
      priceCardTitleEl.classList.add('card-title')
      priceCardTitleEl.textContent = 'Current Price'

      pricingCardContainerEl.appendChild(priceCardTitleEl)

      var priceCardContentEl = document.createElement('p')
      priceCardContentEl.classList.add('card-content')
      priceCardContentEl.textContent = listings.search_results[i].price.raw

      pricingCardContainerEl.appendChild(priceCardContentEl)

      var priceCardShippingEl = document.createElement('p')
      priceCardShippingEl.classList.add('card-content')
      priceCardShippingEl.textContent = '+ shipping'

      pricingCardContainerEl.appendChild(priceCardShippingEl)
      // END PRICING CARD CREATION

      // START PICTURE CARD CREATION
      var amiiboPicContainerEl = document.createElement('div')
      amiiboPicContainerEl.setAttribute('id', 'amiiboPic')
      amiiboPicContainerEl.classList.add('card', 'small', 'col', 's3', 'red-text', 'card-panel', 'hoverable')

      var amiiboPicTitleEl = document.createElement('h4')
      amiiboPicTitleEl.classList.add('card-title')
      amiiboPicTitleEl.textContent = 'Listing Image'

      amiiboPicContainerEl.appendChild(amiiboPicTitleEl)

      var amiiboImageDivEl = document.createElement('div')
      amiiboImageDivEl.classList.add('card-image')

      var amiiboPicImageEl = document.createElement('img')
      amiiboPicImageEl.setAttribute('id', 'ebayImage')
      amiiboPicImageEl.setAttribute('alt', 'amiibo picture')
      amiiboPicImageEl.setAttribute('src', listings.search_results[i].image)

      amiiboImageDivEl.appendChild(amiiboPicImageEl)

      amiiboPicContainerEl.appendChild(amiiboImageDivEl)
      // END PICTURE CARD CREATION

      // APPEND CARDS TO ROW CONTAINER ELEMENT
      listingsRowEl.appendChild(nameContainerEl)
      listingsRowEl.appendChild(auctionInfoContainerEl)
      listingsRowEl.appendChild(pricingCardContainerEl)
      listingsRowEl.appendChild(amiiboPicContainerEl)

      // APPEND NEW ROW TO LISTINGS CONTAINER ELEMENT
      listingsContainerEl.appendChild(listingsRowEl)
    }
  }
}

getEbayListings()
