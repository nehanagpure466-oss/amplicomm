let featuredProducts = [];
let normalProducts = [];
let renderedProducts = new Set();

let currentPage = 1;
let normalIndex = 0;
let isLoading = false;
let allFetched = false;

// Detect sorting/filtering
const hasQueryParams = window.location.search.includes('sort_by') || window.location.search.includes('filter');

if (!hasQueryParams) {
  init();
}

async function fetchProducts(page) {
  const res = await fetch(`${window.location.pathname}/products.json?page=${page}`);
  const data = await res.json();

  if (data.products.length === 0) {
    allFetched = true;
    return;
  }

  data.products.forEach(product => {
    if (renderedProducts.has(product.id)) return;

    if (product.tags.includes('featured')) {
      featuredProducts.push(product);
    } else {
      normalProducts.push(product);
    }
  });
}

async function init() {
  let page = 1;

  // Fetch until we get all 15 featured
  while (featuredProducts.length < 15 && !allFetched) {
    await fetchProducts(page);
    page++;
  }

  currentPage = page;

  // Render initial: 15 featured + 5 normal
  renderProducts([
    ...featuredProducts,
    ...normalProducts.slice(0, 5)
  ]);

  normalIndex = 5;

  observeScroll();
}

function renderProducts(products) {
  const container = document.getElementById('product-grid');

  products.forEach(product => {
    if (renderedProducts.has(product.id)) return;

    renderedProducts.add(product.id);

    const html = `
      <li class="grid__item">
        <a href="/products/${product.handle}">
          <img src="${product.images[0]?.src}" width="200"/>
          <h3>${product.title}</h3>
          <p>₹${product.variants[0].price}</p>
        </a>
      </li>
    `;

    container.insertAdjacentHTML('beforeend', html);
  });
}

async function loadMore() {
  if (isLoading || allFetched) return;

  isLoading = true;

  let nextBatch = normalProducts.slice(normalIndex, normalIndex + 20);

  if (nextBatch.length < 20 && !allFetched) {
    await fetchProducts(currentPage++);
    nextBatch = normalProducts.slice(normalIndex, normalIndex + 20);
  }

  renderProducts(nextBatch);

  normalIndex += 20;
  isLoading = false;
}

// Intersection Observer
function observeScroll() {
  const loader = document.getElementById('loader');

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      loadMore();
    }
  });

  observer.observe(loader);
}