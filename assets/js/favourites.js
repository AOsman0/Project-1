const mainElement = document.getElementById("main")
const banner = document.getElementById("banner");
const bookElement = document.getElementById("book-btn");
const quotesElement = document.getElementById("quotes-btn");
const favouriteSection = document.getElementById("book-favourites");
const sectionElement = document.getElementById("favourite-section");
let title = "";
let author = "";
let image = "";
let publisher = "";
let description = "";
let bookLink = "";
let trimmedDescription = "";
let currentSearchResults = [];
let favoriteBookList = [];
let isbn = "";
let rating = "";

let favoritesList = [];
let publishedDate = "";
let language = "";
let pageCount = "";
let categories = "";


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
  $(`#${i}`).click(renderConfirmModalQuotes);
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



  // remove the whole section that rendors these cards
  favQuotes = document.getElementById("fav-books").remove();
  // and then rerender the cards
  fetchBooks();
};


const closeConfirmModal = () => {
  console.log("modal closed");
  document.getElementById("confirm-container").remove();
}

// function to render confirm modal 
const renderConfirmModal = (event) => {
  $("#main").append(`  <div class="confirm-container" id="confirm-container">
  <div class="confirm">
    <div id="close" class="modal-content">
      <span class="close">&times;</span>
    </div>

    <div class="confirm-content">
      <div class="title-container">
        <h1 class="text-option">do you want to delete this to favourites?</h1>
      </div>

      <div class="button-container">
        <div class="button-options" id="yes">
          <a class="waves-effect waves-light btn-small"
            >yes</a
          >
        </div> 
        <div class="button-options" id="closeModal">
          <a class="waves-effect waves-light btn-small" >no</a
          >
        </div>
      </div>
    </div>
  </div>
</div>`)
$("#close").click(closeConfirmModal);
$("#closeModal").click(closeConfirmModal);

$("#yes").click(() =>{
  closeConfirmModal();
  deleteBookCard(event);

});

window.onclick = function(event) {
  console.log("clicked outside window: " + event.target.id)
  if (event.target.id == 'confirm-container') {
  document.getElementById("confirm-container").remove();
  }
}

}
// function to render confirm modal 
const renderConfirmModalQuotes = (event) => {
  $("#main").append(`  <div class="confirm-container" id="confirm-container">
  <div class="confirm">
    <div id="close" class="modal-content">
      <span class="close">&times;</span>
    </div>

    <div class="confirm-content">
      <div class="title-container">
        <h1 class="text-option">do you want to delete this to favourites?</h1>
      </div>

      <div class="button-container">
        <div class="button-options" id="yes">
          <a class="waves-effect waves-light btn-small"
            >yes</a
          >
        </div> 
        <div class="button-options" id="closeModal">
          <a class="waves-effect waves-light btn-small" >no</a
          >
        </div>
      </div>
    </div>
  </div>
</div>`)
$("#close").click(closeConfirmModal);
$("#closeModal").click(closeConfirmModal);

$("#yes").click(() =>{
  closeConfirmModal();
  deleteCard(event);

});

window.onclick = function(event) {
  console.log("clicked outside window: " + event.target.id)
  if (event.target.id == 'confirm-container') {
  document.getElementById("confirm-container").remove();
  }
}

}
// function to render modals 
const renderModal = () => {
  $("main").append(`<div class="popup-container" id="popup-container">
  <div class="pop-up">  
  <div id="close" class="modal-content">
  <span class="close">&times;</span>
</div>
<div>
    <div class="title-picture">
      <div>
        <h1>${title}</h1>
        <h2 class="h2">${author}</h2>
      </div>
      <div class="img-container">
        <img
        src="${image}"
        
          alt=""
        />
      </div>
    </div>

    <table class="popup-table">
      <tr>
        <th>ISBN</th>
        <td>${isbn}</td>
        <th>RATING</th>
        <td>${rating}</td>
      </tr>
      <tr>
        <th>CATEGORIES</th>
        <td>${categories}</td>
        <th>PAGE COUNT</th>
        <td>${bookLength}</td>
      </tr>
      <tr>
        <th>PUBLISHER</th>
        <td>${publisher}</td>
        <th>LANGUAGE</th>
        <td>${language}</td>
      </tr>
      <tr>
        <th>contributor</th>
        <td>${author}</td>
      </tr>
    </table>

    <h5>DESCRIPTION </h5> 
    

    <p>
      ${description}
    </p>
   <div class="button-container">
          
          <a class="waves-effect waves-light btn-small" href="${bookLink}">preview</a>
          </div>
  </div>
</div>`)
$("#close").click(closeModal);
}
// function to close modal
const closeModal = () => {
  document.getElementById("popup-container").remove();
}
// function to gather data for modal
const fetchModalData = (event) => {
  
  const target = event.target;
  console.log(target)
  const cardId = target.id;
  console.log(cardId);
  const cardNum = cardId.substring(4)
  console.log(cardNum)
  
  
 
  // alert user to saving information
  // we want to add this movie to the favoriteMovieList list
  // step 1:
  // fetch the existing favoriteMovieList from the local storage
  const savedBooks = JSON.parse(localStorage.getItem("favoriteBook"));
  console.log(savedBooks);
  const savedBook = savedBooks[cardNum];
  console.log( savedBook)
  items = savedBook
  title =savedBook.volumeInfo.title;
  console.log(title);
  author = savedBook.volumeInfo.authors;
  console.log(author);
  publisher = savedBook.volumeInfo.publisher;
  console.log(publisher);
  if (!savedBook.volumeInfo.imageLinks) {
    image = ".assets/images/placeholder.png";
  } else {
    image = savedBook.volumeInfo.imageLinks.thumbnail;
  }
  console.log(image);
  description = savedBook.volumeInfo.description;
  // variable to limit description character count


  isbn = savedBook.volumeInfo.industryIdentifiers[0].identifier
  rating = savedBook.volumeInfo.averageRating
  language = savedBook.volumeInfo.language
  bookLength = savedBook.volumeInfo.pageCount
  console.log(bookLength)
  categories = savedBook.volumeInfo.categories
  
  
  console.log(bookLink);
  let bookResults = [title, author, publisher, image, description, bookLink, isbn, rating, language, bookLength, categories];

  console.log( bookResults);
  renderModal(bookResults);
  // render results card
  
}
// function to gather data for quotes
const fetchQuotes = () => {
  //fetch data from local storage
  const quotes = JSON.parse(localStorage.getItem("favoriteQuotes"));
  const savedQuotes = JSON.parse(quotes)
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

// function to render favourite books
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
          <p>title: ${title}</p>
          <p>author: ${author}</p>
        </div>
        <div class="card-action">
          <a class="waves-effect waves-light blue btn-small" id="more${i}">read more</a>
          <a class="btn-floating btn-small waves-effect waves-light red"
            ><i id="${i}" class="material-icons">-</i></a
          >
        </div>
      </div>
    </div>
  </div>`);
  $(`#${i}`).click(renderConfirmModal);
  $(`#more${i}`).click(fetchModalData);
};
// function to render favourite quotes
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
    <h1 class="favourite-title">FAVOURITES</h1>
  </div>`);
  $("#book-btn").click(fetchBooks);
  $("#quotes-btn").click(fetchQuotes);
};

window.addEventListener("load", onload);
