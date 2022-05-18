const mainElement = document.getElementById("main");
const plusButtonGreen = document.getElementById("green-tick");
const quotesSection = document.getElementById("quotes-section");

let favoritesList = [];

const readFromLocalStorage = () => {
  const currentQuote = localStorage.getItem("current-quote");
  console.log("currentQuote: " + currentQuote);
  const favoritesListFromLS = localStorage.getItem("favoriteQuotes");
  // check if the favorites list is null or does it have any items
  if (favoritesListFromLS === null || favoritesListFromLS === undefined) {
    // when the list is null
    // else push this item to the empty favorites list
    // PARSE CURRENT QUOTE
    const parsedCurrentQuote = JSON.stringify(JSON.parse(currentQuote));
    favoritesList.push(parsedCurrentQuote);
    // and then store it in the local storage
    // parse favoriteList to string
    localStorage.setItem("favoriteQuotes", JSON.stringify(favoritesList));
    console.log("favoriteList: " + localStorage.getItem("favoriteQuotes"));
  } else {
    // when the list is not null
    let parsedFavoriteList = JSON.parse(favoritesListFromLS);
    console.log("parsedFavoriteList: " + parsedFavoriteList);

    // lets push this quote to the favorites list
    // parse current quote before we push it
    const parsedCurrentQuote = JSON.parse(currentQuote);
    parsedFavoriteList.push(currentQuote);

    // store that list to the local storage
    localStorage.setItem("favoriteQuotes", JSON.stringify(parsedFavoriteList));
    console.log("favoriteList: " + localStorage.getItem("favoriteQuotes"));
  }
};

const plusButton = () => {
  readFromLocalStorage();
};

const refreshButtonClick = () => {
  const refreshIcon = document.getElementById("refresh-icon");
  const quotesContainer = document.getElementById("quotes-container");
  console.log("refresh-clicked" + refreshIcon);
  if (refreshIcon) {
    console.log("enterifconditions");
    quotesContainer.remove();
    fetchQuotesData();
  }
};

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "quotelibapi.p.rapidapi.com",
    "X-RapidAPI-Key": "48da7b9fcemshc5ff20a1dbaf8cap1255e2jsn3db6ac34e3d7",
  },
};

const fetchQuotesData = () => {
  fetch("https://quotelibapi.p.rapidapi.com/quote", options)
    .then((response) => response.json())
    .then((response) => {
      localStorage.setItem("current-quote", JSON.stringify(response[0]));
      renderLandingPage(response);
      console.log(
        "this is the value of the key: " + localStorage.getItem("quote")
      );
    })

    .catch((err) => console.error(err));
};

const renderLandingPage = (quoteArray) => {
  console.log("abc" + JSON.stringify(quoteArray[0]));
  const quote = quoteArray[0];
  $("#quotes-section").append(`
   <div id="quotes-container" class="quotes-container">
     <div class="quotes-head">
       <h2 class="quotes-header">
         Quotes
         <div class="button-icons">
           <button class="plus-icon" id="green-tick">
             <i class="fa-solid fa-plus"></i>
           </button>
           <button class="refresh-icon" id="refresh-icon">
             <i class="fa-solid fa-arrows-rotate"></i>
           </button>
         </div>
       </h2>
     </div>
     <div class="quotes-info">
       <p class="quotes-text">
         ${quote.quote_text}
       </p>
       <h3 class="quotes-details">${quote.author}</h3>
     </div>
   </div>
 `);

  $("#green-tick").click(plusButton);
  $("#refresh-icon").click(refreshButtonClick);
};
const onLoad = () => {
  fetchQuotesData();
};

window.addEventListener("load", onLoad);
