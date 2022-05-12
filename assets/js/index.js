const main = document.getElementById("main");

const renderSearchBanner = () => {
  const section = document.createElement("section");
  section.setAttribute("class", "search-banner");
  const title = document.createElement("h1");
  title.setAttribute("class", "banner-title");
  title.textContent = "library of knowledge";

  const info = document.createElement("h2");
  info.setAttribute("class", "banner-info");
  info.textContent = "Enter Author/Book name";

  const inputDiv = document.createElement("div");
  inputDiv.setAttribute("class", "input-container");

  const input = document.createElement("input");
  input.setAttribute("class", "input is-rounded");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "search");
  input.setAttribute("id", "input-text");

  inputDiv.append(input);
  section.append(title, info, inputDiv);
  main.append(section);
};
const onLoad = () => {
  renderSearchBanner();
};
window.addEventListener("load", onLoad);
