async function loadProductDetails(productId) {
    try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
            return await response.json();
        } else {
            return { response: await response.text() };
        }
    } catch (error) {
        console.error('Error fetching product details:', error);
        return null;
    }
}

function renderProductDetails(product, isLoggedIn, userId) {
    const productDetailsSection = document.getElementById("product-details");
    if (!productDetailsSection) {
        console.error('Product details section not found.');
        return;
    }

    if (typeof product === 'object' && product.hasOwnProperty('response')) {
        const productDetailHtml = `
            <div class="product-details-container">
                <img src="${product.response.photo}" class="product-details-img" alt="${product.response.title}" />
                <div class="product-details-content">
                    <h5 class="p-2 text-center product-details-title">${product.response.title}</h5>
                    <p class="p-2 text-center product-details-description" style="font-size: 14px; margin-top: 0;">
                        ${product.response.description}
                    </p>
                    <p class="p-2 text-center product-details-price">Price: $${product.response.price}</p>
                    <p class="p-2 text-center product-details-stock">Stock: ${product.response.stock}</p>
                    ${isLoggedIn ? '<button class="addToCart btn-add-cart">Add to cart</button>' : ''}
                </div>
            </div>
        `;

        productDetailsSection.innerHTML = productDetailHtml;

        if (isLoggedIn) {
            const addToCartButton = productDetailsSection.querySelector(".addToCart");
            if (addToCartButton) {
                addToCartButton.addEventListener("click", async () => {
                    try {
                        
                        const order = {
                            pid: product.response.pid,
                            uid: userId, 
                            quantity: 1,
                            state: "cart"
                        };

                        const response = await fetch('/api/orders', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(order)
                        });

                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }

                        const result = await response.json();
                        if (result.statusCode === 401) {
                            alert("PLEASE LOG IN!");
                        } else {
                            alert("Product added to cart!");
                        }
                    } catch (error) {
                        console.error('Error adding product to cart:', error);
                        alert(error.message);
                    }
                });
            } else {
                console.error('Add to cart button not found.');
            }
        }
    } else {
        console.error('Unexpected response format:', product);
    }
}

async function checkSession() {
    try {
        const response = await fetch("/api/sessions/", {
            method: "POST",
            credentials: "same-origin" 
        });
        const res = await response.json();
        return res.statusCode === 200 ? res.response.session.cookies : null; 
    } catch (error) {
        console.error('Error al obtener la sesión:', error);
        return null;
    }
}

document.addEventListener("DOMContentLoaded", async function () {

    const productId = window.location.pathname.split("/").pop();

    const userId = await checkSession();
    const isLoggedIn = userId !== null;

    const product = await loadProductDetails(productId);
    renderProductDetails(product, isLoggedIn, userId);
});
