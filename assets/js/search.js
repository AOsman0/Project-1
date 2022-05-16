//TODO find a way to link home page to search page

const onLoad = () => {
  //initialise feedback results
  initialiseLocalStorage();
  //   render search banner
  renderSearchBanner();
};
window.addEventListener("load", onLoad);
