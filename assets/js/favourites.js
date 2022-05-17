

const bannerElement = document.getElementById('banner');

const onload =  () => {
    $("#banner").append(`     <div class="button-container">
    <a class="fav-button waves-effect waves-light btn-large"
      ><i class="material-icons right">cloud</i>Saved quotes</a
    >
    <a class="fav-button waves-effect waves-light btn-large"
      ><i class="material-icons right">book</i>Saved books</a
    >
  </div>
  <div class="favourite-title">
    <h1 class="favo">FAVOURITES</h1>
  </div>`)

}





window.addEventListener('load', onload)