const mainElement = document.getElementById("main");
const plusButtonGreen = document.getElementById("green-tick");

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
  const quotesSection = document.getElementById("quotes-section");
  console.log("refresh-clicked" + refreshIcon);
  if (refreshIcon) {
    console.log("enterifconditions");
    quotesSection.remove();
    fetchQuotesData();
  }
};

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "quotelibapi.p.rapidapi.com",
    "X-RapidAPI-Key": "565934b5f7msh8a38532c8b6c6c6p156ee2jsn68b76c63d372",
  },
};

const fetchQuotesData = () => {
  fetch("https://quotelibapi.p.rapidapi.com/quote", options)
    .then((response) => response.json())
    .then((response) => {
      localStorage.setItem("quote", JSON.stringify(response));
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
  $("#main").append(`<section id="quotes-section">
   <div class="quotes-container">
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
 </section>`);

  $("#green-tick").click(plusButton);
  $("#refresh-icon").click(refreshButtonClick);

  $("#main").append(` <section class="search-banner">
  <h1 class="banner-title">library of Knowledge</h1>
  <h2 class="banner-info">Enter Author/Book name</h2>

  <div class="input-container">
    <input
      class="input is-rounded"
      type="text"
      placeholder="search"
      id="input-text"
    />
  </div>
</section>`);
};
const onLoad = () => {
  fetchQuotesData();
};

window.addEventListener("load", onLoad);
