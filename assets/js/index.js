const mainElement = document.getElementById("main");

const renderSearchBanner = () => {
  $("#main").append(` <section class="search-banner">
      <h1 class="banner-title">library of Knowledge</h1>
      <h2 class="banner-info">Enter Author/Book name</h2>

      <div class="input-container">
        <input
          class="input is-rounded"
          type="text"
          placeholder="search"
          id="input-text"
        />
      </div>
    </section>`);
};
const onLoad = () => {
  renderSearchBanner();
};
window.addEventListener("load", onLoad);
