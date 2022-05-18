const bannerElement = document.getElementById("banner");
const bookElement = document.getElementById("book-btn");
const quotesElement = document.getElementById("quotes-btn");
const favouriteSection = document.getElementById("book-favourites");
const sectionElement = document.getElementById("favourite-section");

let author = "";
let title = "";
let image = "";
let bookLink = "";
let quote = "";

const onload = () => {
  $("#banner").append(`     <div class="button-container">
    <a id="quotes-btn" class="fav-button waves-effect waves-light btn-large"
      ><i  class="material-icons right">cloud</i>Saved quotes</a
    >
    <a id="book-btn" class="fav-button waves-effect waves-light btn-large"
      ><i class="material-icons right">book</i>Saved books</a
    >
  </div>
  <div class="favourite-title">
    <h1 class="favo">FAVOURITES</h1>
  </div>`);
  $("#book-btn").click(fetchBooks);
  $("#quotes-btn").click(fetchQuotes);
};

const fetchBooks = () => {
  //fetch data from local storage
  const savedBooks = JSON.parse(localStorage.getItem("favoriteBook"));
  console.log(savedBooks);

  if (document.getElementById("book-favourites") !== null) {
    document.getElementById("book-favourites").remove();
  }
  // gather the info needed for 5 cards
  $("#favourites-section").append(
    `<section id="book-favourites" class="book-favourites"></section>`
  );

  //set forloop for number of sets in the local storage
  for (i = 0; i < savedBooks.length; i++) {
    // add this whole object to the currentSearchResults array

    // from the response cherry pick Title, AUTHOR, PUBLISHER DESCRIPTION and IMAGE
    title = savedBooks[i].volumeInfo.title;
    console.log(title);
    author = savedBooks[i].volumeInfo.authors;
    console.log(author);
    bookLink = savedBooks[i].volumeInfo.previewLink;
    console.log(bookLink);

    if (!savedBooks[i].volumeInfo.imageLinks) {
      image = ".assets/images/placeholder.png";
    } else {
      image = savedBooks[i].volumeInfo.imageLinks.thumbnail;
    }
    let bookResults = [title, author, image];
    console.log("book results" + bookResults);
    // render results card
    renderFavoriteBooks(bookResults);
  }
};
const fetchQuotes = () => {
  //fetch data from local storage
  const savedQuotes = JSON.parse(localStorage.getItem("quote"));
  console.log(savedQuotes);

  if (document.getElementById("book-favourites") !== null) {
    document.getElementById("book-favourites").remove();
  }
  // gather the info needed for 5 cards
  $("#favourites-section").append(
    `<section id="book-favourites" class="book-favourites"></section>`
  );

  //set forloop for number of sets in the local storage
  for (i = 0; i < savedQuotes.length; i++) {
    // add this whole object to the currentSearchResults array

    // from the response cherry pick Title, AUTHOR, PUBLISHER DESCRIPTION and IMAGE
    quote = savedQuotes[i].quote_text;
    console.log(title);
    author = savedQuotes[i].author;
    console.log(author);

    let bookResults = [quote, author];
    console.log("book results" + bookResults);
    // render results card
    renderFavoriteQuotes(bookResults);
  }
};

const renderFavoriteBooks = () => {
  // if saved quotes is rendered, clear it from page.
  // render book cards

  $("#book-favourites").append(` <div class="card-container col s12 m7">
    <div class="card horizontal">
      <div class="card-image">
        <img class="image" src=${image} />
      </div>
      <div class="card-stacked">
        <div class="card-content">
          <p>title: ${title}</p>
          <p>author: ${author}</p>
        </div>
        <div class="card-action">
          <a class="waves-effect waves-light blue btn-small">read more</a>
          <a class="btn-floating btn-small waves-effect waves-light red"
            ><i class="material-icons">-</i></a
          >
        </div>
      </div>
    </div>
  </div>`);
};

const renderFavoriteQuotes = () => {
  $("#book-favourites").append(`   <div class="card-container col s12 m7">
    <div class="card horizontal">
      <!-- <div class="card-image">
        <img class="image" src="./assets/images/mountain.jpg" />
      </div> -->
      <div class="card-stacked">
        <div class="card-content">
          <p>quotes: ${quote}</p>
          <p>author: ${author}</p>
        </div>
       <div class="card-action">
        <!-- <a class="waves-effect waves-light btn-small">Button</a> -->
        <a
          class="delete-button btn-floating btn-small waves-effect waves-light red"
          ><i class="material-icons">-</i></a
        >
      </div>
    </div>
  </div>
</div>`);
};

window.addEventListener("load", onload);
