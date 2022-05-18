const bannerElement = document.getElementById("banner");
const bookElement = document.getElementById("book-btn");
const quotesElement = document.getElementById("quotes-btn");
const favouriteSection = document.getElementById("book-favourites");

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
  $("#book-favourites").append(` <div class="card-container col s12 m7">
    <div class="card horizontal">
      <div class="card-image">
        <img class="image" src="./assets/images/mountain.jpg" />
      </div>
      <div class="card-stacked">
        <div class="card-content">
          <p id="">title</p>
          <p id="">author</p>
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
  $("#book-favourites").append(`   <div class="card-container col s12 m7">
  <div class="card horizontal">
    <!-- <div class="card-image">
      <img class="image" src="./assets/images/mountain.jpg" />
    </div> -->
    <div class="card-stacked">
      <div class="card-content">
        <p id="quotes">quotes</p>
        <p id="authors">author</p>
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
