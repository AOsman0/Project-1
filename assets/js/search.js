//TODO find a way to link home page to search page
const mainElement = document.getElementById("main");
const API_KEY = "AIzaSyAb1sWH5SP_pa3SpuWv9TXLKXk9X2NWwFE";
let title = "";
let author = "";
let image = "";
let publisher = "";
let description = "";

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
      for (i = 0; i < 5; i++) {
        title = items[i].volumeInfo.title;
        console.log(title);
        author = items[i].volumeInfo.authors;
        console.log(author);
        publisher = items[i].volumeInfo.publisher;
        console.log(publisher);
        image = items[i].volumeInfo.imageLinks.thumbnail;
        console.log(image);
        description = items[i].volumeInfo.description;
        console.log(description);
        let bookResults = [title, author, publisher, image, description];
        console.log("book results" + bookResults);
        // render results
      }
    }),
    function (error) {
      console.log(error);
    };

  // from the response cherry pick Title, AUTHOR, PUBLISHER and IMAGE

  // render results cards
};
const renderSearchBanner = () => {
  $("#main").append(` <section class="results-banner">
      <form class="input-container"  id="form">
        <input
          class="input is-rounded"
          type="text"
          placeholder="search"
          id="input-text"
         
         
        />
        <button type="submit" id="submit" class="btn"
        >submit</button>
      </form>
    </section>`);
  form.addEventListener("submit", handleFormSubmit);
};
const initialiseLocalStorage = () => {
  console.log("local storage needs to be done");
};
const onLoad = () => {
  //initialise feedback results
  initialiseLocalStorage();
  //   render search banner
  renderSearchBanner();
};
window.addEventListener("load", onLoad);
