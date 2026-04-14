let currentPage = 1;
let isLoading = false;
let finished = false;

// Disable infinite scroll when filters/sorting active
const hasParams =
  window.location.search.includes('sort_by') ||
  window.location.search.includes('filter');

if (!hasParams) {
  document.addEventListener("DOMContentLoaded", () => {
    initScroll();
  });
}

// Fetch next page and extract ONLY products
async function fetchProducts(page) {
  const url = `${window.location.pathname}?page=${page}`;
  const res = await fetch(url);
  const text = await res.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "text/html");

  const newGrid = doc.querySelector("#product-grid");

  if (!newGrid) {
    finished = true;
    return "";
  }

  return newGrid.innerHTML;
}

// Append products
function renderProducts(html) {
  const container = document.querySelector("#product-grid");
  container.insertAdjacentHTML("beforeend", html);
}

// Load next page
async function loadMore() {
  if (isLoading || finished) return;

  isLoading = true;
  currentPage++;

  const html = await fetchProducts(currentPage);

  if (!html.trim()) {
    finished = true;
    document.getElementById("infinite-loader").innerText = "No more products";
    return;
  }

  renderProducts(html);
  isLoading = false;
}

// Scroll trigger
function initScroll() {
  const loader = document.getElementById("infinite-loader");

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      loadMore();
    }
  });

  observer.observe(loader);
}