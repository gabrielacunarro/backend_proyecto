document.addEventListener("DOMContentLoaded", function () {
    const productDetailsSection = document.getElementById("product-details");

    const productId = window.location.pathname.split("/").pop();

    function fetchProductDetails(productId) {
        fetch(`/api/products/${productId}`)
            .then(response => response.json())
            .then(product => {
                renderProductDetails(product);
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
            });
    }

    function renderProductDetails(product) {
        productDetailsSection.innerHTML = "";
        const productDetailHtml = `
            <div class="product-details-container">
                <h2 class="product-details-title">${product.response.title}</h2>
                <img src="${product.response.photo}" class="product-details-img" alt="${product.response.title}" />
                <p class="product-details-description">Description: ${product.response.description}</p>
                <p class="product-details-price">Price:$${product.response.price}</p>
                <p class="product-details-stock">Stock: ${product.response.stock}</p>
                <button class="addToCart">Add to cart</button>
            </div>
        `;

        productDetailsSection.innerHTML = productDetailHtml;
    }

    fetchProductDetails(productId);
});
