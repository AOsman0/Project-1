const bannerElement = document.getElementById("banner");
const bookElement = document.getElementById("book-btn");
const quotesElement = document.getElementById("quotes-btn");
const favouriteSection = document.getElementById("book-favourites");
const sectionElement = document.getElementById("favourite-section");

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
      image = `./assets/images/placeholder.png`;
    } else {
      image = savedBooks[i].volumeInfo.imageLinks.thumbnail;
    }
    let bookResults = [title, author, image];
    console.log("book results" + bookResults);
    // render results card
    renderFavoriteBooks(bookResults);
  }
};

const deleteCard = (event) => {
  const target = event.target;
  console.log("id is: " + target.id);

  // this minus button will clear the div

  const fromLocalStorage = localStorage.getItem("favoriteQuotes"); // an array that has more than one objects
  // parse into json
  let parsedData = JSON.parse(fromLocalStorage);
  console.log("parseData: " + parsedData);
  const temp = parsedData.splice(target.id, 1);
  console.log("deleted: " + temp);
  console.log("parsedData: " + parsedData);

  localStorage.setItem("favoriteQuotes", JSON.stringify(parsedData));

  alert(`quote deleted`);

  // remove the whole section that rendors these cards
  favQuotes = document.getElementById("fav-quotes").remove();
  // and then rerender the cards
  fetchQuotes();
};

const minusButton = () => {
  // declare a minus icon
  const minusQuotesIcon = document.getElementById("i");
  $(`#${i}`).click(deleteCard);
  console.log("minus has been clicked for Quotes:" + minusQuotesIcon);

  // this minus button will delete a card from local storage
};

const minusButtonBooks = () => {
  // declare a minus icon
  const minusButtonBooks = document.getElementById("i");
  $(`#${i}`).click(deleteCard);
  console.log("minus has been clicked for Books:" + minusButtonBooks);
  // this minus button will delete a card from local storage
};

const deleteBookCard = (event) => {
  const target = event.target;
  console.log("id is: " + target.id);

  // this minus button will clear the div

  const bookFromLocalStorage = localStorage.getItem("favoriteBook"); // an array that has more than one objects
  // parse into json
  let parsedData = JSON.parse(bookFromLocalStorage);
  console.log("parseData: " + parsedData);
  const temp = parsedData.splice(target.id, 1);
  console.log("deleted: " + temp);
  console.log("parsedData: " + parsedData);

  localStorage.setItem("favoriteBook", JSON.stringify(parsedData));

  alert(`book deleted`);

  // remove the whole section that rendors these cards
  favQuotes = document.getElementById("fav-books").remove();
  // and then rerender the cards
  fetchBooks();
};

const fetchQuotes = () => {
  //fetch data from local storage
  const savedQuotes = JSON.parse(localStorage.getItem("favoriteQuotes"));
  console.log("saved quotes: " + savedQuotes);

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
    console.log("abc: " + savedQuotes[i]);
    const temp = JSON.parse(savedQuotes[i]);
    quote = temp.quote_text;
    console.log("quote: " + quote);
    author = temp.author;
    console.log("author: " + author);

    let bookResults = [quote, author];
    console.log("book results" + bookResults);
    // render results card
    renderFavoriteQuotes(bookResults);
  }
};

const renderFavoriteBooks = () => {
  // if saved quotes is rendered, clear it from page.
  // render book cards

  $("#book-favourites")
    .append(` <div id="fav-books" class="card-container col s12 m7">
    <div class="card horizontal">
      <div class="card-image">
        <img class="image" src=${image} />
      </div>
      <div class="card-stacked">
        <div class="card-content">
          <p class="the-quote">title: ${title}</p>
          <p class="the-author">author: ${author}</p>
        </div>
        <div class="card-action">
          <a class="waves-effect waves-light blue btn-small">read more</a>
          <a class="btn-floating btn-small waves-effect waves-light red"
            ><i id="${i}" class="material-icons">-</i></a
          >
        </div>
      </div>
    </div>
  </div>`);
  $(`#${i}`).click(deleteBookCard);
};

const renderFavoriteQuotes = () => {
  $("#book-favourites")
    .append(`   <div id="fav-quotes" class="card-container col s12 m7">
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
          ><i id= "${i}" class="material-icons">-</i></a
        >
      </div>
    </div>
  </div>
</div>`);
  $(`#${i}`).click(deleteCard);
};

window.addEventListener("load", onload);
