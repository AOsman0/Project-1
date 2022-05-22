//TODO find a way to link home page to search page
const mainElement = document.getElementById("main");
const resultsSection = document.getElementById("cards");
const API_KEY = "AIzaSyAb1sWH5SP_pa3SpuWv9TXLKXk9X2NWwFE";
let title = "";
let author = "";
let image = "";
let publisher = "";
let description = "";
let bookLink = "";
let trimmedDescription = "";
let currentSearchResults = [];
let favoriteBookList = [];

// function to handle form submission
const handleFormSubmit = (event) => {
  event.preventDefault();
  //get text input
  let search = document.getElementById("input-text").value;
  console.log(search);
  //validate

  if (search) {
    // build object with full name and results
    console.log("good search");
    // fetch data from API
    fetchBookData();
  } else {
    alert("enter valid search");
  }
};
const fetchBookData = () => {
  const search = document.getElementById("input-text").value;
  console.log(search);
  const currentSearchURL = `https://www.googleapis.com/books/v1/volumes?q=${search}`;

  console.log(currentSearchURL);
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
      }
      console.log(currentSearchResults);
      // now that we are done rendering the cards, lets push the currentSearchResult to local storage
    }),
    function (error) {
      console.log(error);
    };

  // function to render results cards
};
const renderResultsBanner = () => {
  $("#main").append(` <section class="results-banner">
            <form class="input-container"  id="form">
        <input
          class="input is-rounded"
          type="text"
          placeholder="search"
          id="input-text"
         
         
        />
        <button type="submit" id="submit" href="#results" class="btn-large"
        >submit</button>
      </form>
    </section>`);
  form.addEventListener("submit", handleFormSubmit);
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
        <a  class="btn-floating halfway-fab waves-effect waves-light red"
          ><i id="${i}" class="material-icons" >+</i></a
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
  console.log("event.target: " + target);
  const currentTarget = event.currentTarget;
  console.log("event.currentTarget: " + currentTarget);
  console.log("target.tagName: " + target.tagName);
  console.log("target.id: " + target.id);
  const cardNum = target.id;
  console.log(cardNum);

  MYlISToFQuotes[cardNum].remove();

  // we want to add this movie to the favoriteMovieList list
  // step 1:
  // fetch the existing favoriteMovieList from the local storage
  const savedBook = currentSearchResults[cardNum];
  console.log(savedBook);

  // check if the last came back as null or undefined

  // append this movie to the favoriteMovieList
  storeInLS("favoriteBook", savedBook);
  // (optional) check if this movie already exists in the movie list
  // if yes, don't add it again

  // step 2:
  // save favoriteMovieList again in the local storage
};
const onLoad = () => {
  //initialise feedback results
  initialiseLocalStorage();
  //   render search banner
  renderResultsBanner();
};
window.addEventListener("load", onLoad);
