const bannerElement = document.getElementById("banner");
const bookElement = document.getElementById("book-btn");
const quotesElement = document.getElementById("quotes-btn");
const favouriteSection = document.getElementById("book-favourites");

let author = '';
let title = '';
let image = '';
let bookLink = '';


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
  $("#book-btn").click(renderSavedBooks);
  $("#quotes-btn").click(renderSavedQuotes);
};

const renderSavedBooks = () => {
  //fetch data from local storage
  const items = JSON.parse(localStorage.getItem('favoriteBook'));
  console.log (items )

 // own comments: i am going to get the data and 

  //set forloop for number of sets in the local storage
  for (i = 0; i < items.length; i++) {
    // add this whole object to the currentSearchResults array
    
    // from the response cherry pick Title, AUTHOR, PUBLISHER DESCRIPTION and IMAGE
    title = items[i].volumeInfo.title;
    console.log(title);
    author = items[i].volumeInfo.authors;
    console.log(author);
    bookLink = items[i].volumeInfo.previewLink;
    console.log(bookLink);
    
    
    if (!items[i].volumeInfo.imageLinks) {
      image = ".assets/images/placeholder.png";
    } else {
      image = items[i].volumeInfo.imageLinks.thumbnail;
    }
    let bookResults = [title, author, image,];
    console.log("book results" + bookResults);
    // render results card
    renderFavoriteBooks(bookResults);
    
  }
};
const renderFavoriteBooks = () => {


  // if saved quotes is rendered, clear it from page.

  //render book cards
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

const renderSavedQuotes = () => {
  //fetch data from local storage

  //set forloop for number of sets in the local storage

  // if saved quotes is rendered, clear it from page.

  //render book cards
  $("#book-favourites").append(`   <div class="card-container col s12 m7">
    <div class="card horizontal">
      <!-- <div class="card-image">
        <img class="image" src="./assets/images/mountain.jpg" />
      </div> -->
      <div class="card-stacked">
        <div class="card-content">
          <p>quotes</p>
          <p>author</p>
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
