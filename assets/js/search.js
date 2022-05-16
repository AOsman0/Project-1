//TODO find a way to link home page to search page
const mainElement = document.getElementById("main");
const resultsSection = document.getElementById("results");
const addButton = document.getElementById("add");
const API_KEY = "AIzaSyAb1sWH5SP_pa3SpuWv9TXLKXk9X2NWwFE";
let title = "";
let author = "";
let image = "";
let publisher = "";
let description = "";
let bookLink = "";

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
      // gather the info needed for 5 cards
      for (i = 0; i < 10; i++) {
        // from the response cherry pick Title, AUTHOR, PUBLISHER DESCRIPTION and IMAGE
        title = items[i].volumeInfo.title;
        console.log(title);
        author = items[i].volumeInfo.authors;
        console.log(author);
        publisher = items[i].volumeInfo.publisher;
        console.log(publisher);
        if (!items[i].volumeInfo.imageLinks) {
          image = ".assets / images / placeholder.png";
        } else {
          image = items[i].volumeInfo.imageLinks.thumbnail;
        }
        console.log(image);
        description = items[i].volumeInfo.description;
        console.log(description);
        bookLink = items[i].volumeInfo.previewLink;
        console.log(bookLink);
        let bookResults = [title, author, publisher, image, description];
        console.log("book results" + bookResults);
        // render results card
        renderResult(bookResults);
      }
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
        <button type="submit" id="submit" class="btn-large"
        >submit</button>
      </form>
    </section>`);
  form.addEventListener("submit", handleFormSubmit);
};
// function to render results banner
// TODO limit characters in description
const renderResult = () => {
  $("#results").append(`<div class="row">
  <div class="col s12 m6">
    <div class="card">
      <div class="card-image">
        <img
          src=${image}
        />
        <span class="card-title">${title}</span>
        <a class="btn-floating halfway-fab waves-effect waves-light red"
          ><i class="material-icons" id="add">add</i></a
        >
      </div>
      <div class="card-content">
        <p>Author: ${author}</p>
        <p>publisher: ${publisher}</p>
        <p>
          description: ${description}
        </p>
        <a class="waves-effect waves-light btn-small">More info</a>
      </div>
    </div>
  </div>
</div>`);
  $("#add").click(addButtonClick);
};
const initialiseLocalStorage = () => {
  console.log("local storage needs to be done");
};
//function to add to favourite storage
// TODO FIND A WAY TO TARGET ONLY ONE CARD ON EACH CLICK
const addButtonClick = () => {
  console.log("add-button-clicked" + addButton);
};
const onLoad = () => {
  //initialise feedback results
  initialiseLocalStorage();
  //   render search banner
  renderResultsBanner();
};
window.addEventListener("load", onLoad);
