const accesskey = "jwE44AQwULjbLtkhZZaB75DxOU-3s7TDBKx8OLKxWXI";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("searchInput");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  results.map((result) => {
    const imagesWrapper = document.createElement("div");
    imagesWrapper.classList.add("search-result");
    const img = document.createElement("img");
    img.src = result.urls.small;
    img.alt = result.alt_description;
    const imgLink = document.createElement("a");
    imgLink.href = result.links.html;
    img.target = "_blank";
    imgLink.textContent = result.alt_description;

    imagesWrapper.appendChild(img);
    imagesWrapper.appendChild(imgLink);
    searchResults.appendChild(imagesWrapper);
  });

  page++;
  if (page > 1) {
    showMore.style.display = "block";
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMore.addEventListener("click", () => {
  searchImages();
});
