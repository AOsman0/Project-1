

const bannerElement = document.getElementById('banner');
const bookElement = document.getElementById('book-btn');
const quotesElement = document.getElementById('quotes-btn');


const onload =  () => {
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
  </div>`)
  $("#book-btn").click(renderSavedBooks);
  $("#quotes-btn").click(renderSavedQuotes);

}

const renderSavedBooks = () => {
    

}

const renderSavedQuotes = () => {
    console.log('bttn clicked')
}




window.addEventListener('load', onload)