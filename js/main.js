// fetch("https://api.tvmaze.com/shows")
//   .then((response) => response.json())
//   .then((data) => console.log(data));

let showContainer = document.querySelector(".box-cards .container");
let asideShowContent = document.querySelector(".show-content");
let buttonClose = document.querySelector("aside .btn-close");
let aside = document.querySelector("aside");
let body = document.querySelector("body");
let submitButton = document.querySelector("#search-button");
let searchInput = document.querySelector("#search-input");
// console.log(submitButton);
// console.log(searchInput);

async function getDataFromApi() {
  try {
    const res = await fetch("https://api.tvmaze.com/shows");
    const data = await res.json();
    // console.log(data);
    displayShow(data.slice(0, 40));
  } catch (error) {
    console.log(error);
  }
}

function displayShow(elements) {
  console.log(elements);
  showContainer.innerHTML = ``;
  elements.forEach((show) => {
    showContainer.innerHTML += `
      <div class="tvShow-container rounded-3" data-id="${show.id}">
        <div class="tv-show" style="background-image:linear-gradient(transparent 60% ,#000),url(${
          show.image
            ? show.image.original
            : "https://images.app.goo.gl/3tvsfPhN38RMavqs6"
        })" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight">
          <div class="tv-text">
            <h4>${show.name}</h4>
            <p>${show.genres[1] || ""}</p>
          </div>
        </div>
      </div>
    `;
  });
  addEvents();
}

function addEvents() {
  let tvShows = document.querySelectorAll(".tvShow-container");
  tvShows.forEach((ele) => {
    ele.onclick = function () {
      // console.log(ele.dataset.id);
      let id = ele.dataset.id;
      getSingleDataFromApi(id);
    };
  });
}

async function getSingleDataFromApi(id) {
  try {
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const data = await res.json();
    displayShowSingleData(data);
  } catch (error) {
    console.log(error);
  }
}

function displayShowSingleData(data) {
  let allGenres = ``;
  data.genres.forEach((ele) => {
    allGenres += `<div>${ele}</div>`;
  });
  asideShowContent.innerHTML = `
  <img src="${data.image.original}" alt="" class="show-image" />
  <h2 class="text-white show-title">${data.name}</h2>
  <div class="show-geners">
    <div class="show-gener d-flex flex-wrap gap-3 text-secondary">
      ${allGenres}
    </div>
  </div>
  <hr />
  <h5 class="text-white fw-bolder">summary:</h5>
  <div class="text-white fs-6">${data.summary}</div>
  <a href="${data.url}" target="_blank" class="show-site-link">more about the movies</a>
`;
}

buttonClose.onclick = () => {
  aside.classList.remove("show");
  aside.removeAttribute("aria-modal");
  aside.removeAttribute("role");
  body.removeAttribute("style");
};

submitButton.onclick = () => {
  console.log(searchInput.value);
  localStorage.setItem("searchInputValue", searchInput.value);
  getSearchDataFromApi(searchInput.value);
};

async function getSearchDataFromApi(value) {
  try {
    const res = await fetch("https://api.tvmaze.com/search/shows?q=" + value);
    const data = await res.json();
    displayShow(data.slice(0, 40).map((ele) => ele.show));
  } catch (error) {
    console.log(error);
  }
}

function setUp() {
  getDataFromApi();
  getSingleDataFromApi();
}
setUp();
