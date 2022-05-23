const mainElement = document.getElementById("main");
const plusButtonGreen = document.getElementById("green-tick");
const quotesSection = document.getElementById("quotes-section");
const searchSection = document.getElementById("search-section");
let title = "";
let author = "";
let image = "";
let publisher = "";
let description = "";
let bookLink = "";
let trimmedDescription = "";
let currentSearchResults = [];
let favoriteBookList = [];

let favoritesList = [];

const readFromLocalStorage = () => {
  const currentQuote = localStorage.getItem("current-quote");

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
  } else {
    // when the list is not null
    let parsedFavoriteList = JSON.parse(favoritesListFromLS);

    // lets push this quote to the favorites list
    // parse current quote before we push it
    const parsedCurrentQuote = JSON.parse(currentQuote);
    parsedFavoriteList.push(currentQuote);

    // store that list to the local storage
    localStorage.setItem("favoriteQuotes", JSON.stringify(parsedFavoriteList));
  }
};

const plusButton = () => {
  readFromLocalStorage();
};

const refreshButtonClick = () => {
  const refreshIcon = document.getElementById("refresh-icon");
  const quotesContainer = document.getElementById("quotes-container");
  if (refreshIcon) {
    quotesContainer.remove();
    fetchQuotesData();
  }
};

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "quotelibapi.p.rapidapi.com",
    "X-RapidAPI-Key": "7b8899a8b0msh104c350bc0a0a9cp12b8f3jsncc5b3cbda328",
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
// function to handle form submission
const handleFormSubmit = (event) => {
  event.preventDefault();
  //get text input
  let search = document.getElementById("input-text").value;
  //validate

  if (search) {
    // build object with full name and results
    // fetch data from API
    fetchBookData();
  } else {
    alert("enter valid search");
  }
};
const fetchBookData = () => {
  const search = document.getElementById("input-text").value;
  const currentSearchURL = `https://www.googleapis.com/books/v1/volumes?q=${search}`;

  let items = [];

  fetch(currentSearchURL)
    .then(function (res) {
      return res.json();
    })
    .then(function (result) {
      items = result.items;
      console.log(items);
      if (document.getElementById("movie-cards") !== null) {
        document.getElementById("movie-cards").remove();
      }
      // gather the info needed for 5 cards
      $("#results").append(`<div id="movie-cards" class="results"></div>`);
      for (i = 0; i < 10; i++) {
        // add this whole object to the currentSearchResults array
        currentSearchResults.push(items[i]);
        // from the response cherry pick Title, AUTHOR, PUBLISHER DESCRIPTION and IMAGE
        title = items[i].volumeInfo.title;
        console.log(title);
        author = items[i].volumeInfo.authors;
        console.log(author);
        publisher = items[i].volumeInfo.publisher;
        console.log(publisher);
        if (!items[i].volumeInfo.imageLinks) {
          image = ".assets/images/placeholder.png";
        } else {
          image = items[i].volumeInfo.imageLinks.thumbnail;
        }
        console.log(image);
        description = items[i].volumeInfo.description;
        // variable to limit description character count
        if (description !== null && description !== undefined) {
          trimmedDescription = description.slice(0, 100);
          console.log(trimmedDescription);
        } else {
          trimmedDescription = "";
        }

        bookLink = items[i].volumeInfo.previewLink;
        console.log(bookLink);
        let bookResults = [title, author, publisher, image, trimmedDescription];
        console.log("book results" + bookResults);
        // render results card
        renderResult(bookResults);
        //   scroll down page
        var x = $(window).scrollTop();
        $("html, body").animate({ scrollTop: x + 800 });
      }
      // now that we are done rendering the cards, lets push the currentSearchResult to local storage
    }),
    function (error) {};

  // function to render results cards
};
// function to render results banner
const renderResult = () => {
  $("#movie-cards").append(`<div class="row">
    <div class="col s12 m6">
      <div class="card">
        <div class="card-image image-size">
          <img
            src=${image}
          />
          <span class="card-title">${title}</span>
          <a  class="add-btn btn-floating halfway-fab waves-effect waves-light "
            ><i id="${i}" class="material-icons" >add</i></a
          >
        </div>
        <div class="card-content">
          <p><b>AUTHOR:</b> ${author}</p>
          <p><b>PUBLISHER: </b> ${publisher}</p>
          <p>
          <b>DESCRIPTION: </b> ${trimmedDescription} ...
          </p>
          <div class="button-container">
          <a class="waves-effect waves-light btn-small">More info</a>
          <a class="waves-effect waves-light btn-small" href="${bookLink}">preview</a>
          </div>
        </div>
      </div>
    </div>
  </div>`);
  $(`#${i}`).click(addButtonClick);
};
// function to store answer in local storage
const storeInLS = (key, value) => {
  //get feedbackResults from LS
  const arrayFromLS = JSON.parse(localStorage.getItem(key));

  //push answer in to array
  arrayFromLS.push(value);

  //set feedbackResults in LS
  localStorage.setItem(key, JSON.stringify(arrayFromLS));
};
const initialiseLocalStorage = () => {
  const favouriteBooks = JSON.parse(localStorage.getItem("favoriteBook"));
  if (!favouriteBooks) {
    localStorage.setItem("favoriteBook", JSON.stringify([]));
  }
};
//function to add to favourite list
// TODO FIND A WAY TO TARGET ONLY ONE CARD ON EACH CLICK
const addButtonClick = (event) => {
  const target = event.target;
  const cardNum = target.id;

  // alert user to saving information
  alert("this book has been added to favourites");
  // we want to add this movie to the favoriteMovieList list
  // step 1:
  // fetch the existing favoriteMovieList from the local storage
  const savedBook = currentSearchResults[cardNum];

  // change color and text of button
  const currentBtn = document.getElementById(cardNum);
  currentBtn.setAttribute("class", "red");
  currentBtn.textContent = "saved";
  // check if the last came back as null or undefined

  // append this movie to the favoriteMovieList
  storeInLS("favoriteBook", savedBook);
  // (optional) check if this movie already exists in the movie list
  // if yes, don't add it again

  // step 2:
  // save favoriteMovieList again in the local storage
};
const renderSearchBanner = () => {
  $("#search-section")
    .append(`<h1 class="banner-title">library of Knowledge</h1>
        <h2 class="banner-info">Enter Author/Book name</h2>
  
        <form class="input-container"  id="form">
        <input
          class="input is-rounded"
          type="text"
          placeholder="search"
          id="input-text"    />
        <button type="submit" id="submit" class="btn-large"
        >submit</button>
      </form>`);
  form.addEventListener("submit", handleFormSubmit);
};

const renderLandingPage = (quoteArray) => {
  console.log("abc" + JSON.stringify(quoteArray[0]));
  const quote = quoteArray[0];
  $("#quotes-section").append(`
   <div id="quotes-container" class="quotes-container">
     <div class="quotes-head">
       <h2 class="quotes-header">
         Quotes To Inspire 🤔
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
  initialiseLocalStorage();
  fetchQuotesData();
  renderSearchBanner();
};

window.addEventListener("load", onLoad);
