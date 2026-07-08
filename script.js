// ================================
// Fake Store API
// ================================

const apiURL = "https://fakestoreapi.com/products";

const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const loader = document.getElementById("loader");

let products = [];
let filteredProducts = [];

// ================================
// Fetch Products
// ================================

async function fetchProducts() {

    loader.style.display = "flex";

    try {

        const response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error("Failed to fetch products.");
        }

        products = await response.json();

        filteredProducts = [...products];

        displayProducts(filteredProducts);

        loadCategories(products);

    }

    catch (error) {

        productContainer.innerHTML = `
            <div class="col-12 text-center">
                <h3>⚠️ ${error.message}</h3>
            </div>
        `;

    }

    finally {

        loader.style.display = "none";

    }

}

// ================================
// Display Products
// ================================

function displayProducts(data) {

    productContainer.innerHTML = "";

    if (data.length === 0) {

        productContainer.innerHTML = `
            <div class="col-12 text-center">
                <h3>No Products Found</h3>
            </div>
        `;

        return;

    }

    data.forEach(product => {

        productContainer.innerHTML += `

        <div class="col-lg-3 col-md-4 col-sm-6">

            <div class="product-card">

                <img
                    src="${product.image}"
                    class="product-img"
                    alt="${product.title}"
                >

                <span class="category">
                    ${product.category}
                </span>

                <h5 class="product-title">
                    ${product.title}
                </h5>

                <div class="product-price">
                    $${product.price}
                </div>

                <div class="rating">

                    ⭐ ${product.rating.rate}
                    (${product.rating.count})

                </div>

                <button class="btn-purple">
                    View Product
                </button>

            </div>

        </div>

        `;

    });

}

// ================================
// Load Categories
// ================================

function loadCategories(products) {

    const categories = [...new Set(products.map(item => item.category))];

    categories.forEach(category => {

        categoryFilter.innerHTML += `
            <option value="${category}">
                ${category}
            </option>
        `;

    });

}

// ================================
// Search Function
// ================================

searchInput.addEventListener("keyup", filterProducts);

// ================================
// Category Filter
// ================================

categoryFilter.addEventListener("change", filterProducts);

// ================================
// Combined Filter
// ================================

function filterProducts() {

    const searchText = searchInput.value.toLowerCase();

    const selectedCategory = categoryFilter.value;

    filteredProducts = products.filter(product => {

        const matchesSearch =
            product.title.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });

    displayProducts(filteredProducts);

}

// ================================
// Start App
// ================================

fetchProducts();
