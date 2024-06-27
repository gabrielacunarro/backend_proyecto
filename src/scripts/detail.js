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

async function renderProductDetails(productId) {
    try {
        const product = await loadProductDetails(productId);
        if (!product || !product.response) {
            console.error('Product details not found or invalid response format:', product);
            return;
        }

        const productDetailsSection = document.getElementById("product-details");
        if (!productDetailsSection) {
            console.error('Product details section not found.');
            return;
        }

        const productDetailHtml = `
            <div class="product-details-container">
                <img src="${product.response.photo}" class="product-details-img" alt="${product.response.title}" />
                <div class="product-details-content">
                    <h5 class="p-2 text-center product-details-title">${product.response.title}</h5>
                    <p class="p-2 text-center product-details-description" style="font-size: 14px; margin-top: 0;">
                        ${product.response.description}
                    </p>
                    <p class="p-2 text-center product-details-price">Price: $${product.response.price}</p>
                    <button class="addToCart btn-add-cart">Add to cart</button>
                </div>
            </div>
        `;

        productDetailsSection.innerHTML = productDetailHtml;

        const addToCartButton = productDetailsSection.querySelector(".addToCart");
        if (addToCartButton) {
            addToCartButton.addEventListener("click", async () => {
                try {
                    const userId = getUserIdFromSession();
                    if (!userId) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Please log in to add product to cart.',
                        });
                        return;
                    }

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
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'PLEASE LOG IN!',
                        });
                    } else {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            text: 'Product added to cart!',
                        });
                    }
                } catch (error) {
                    console.error('Error adding product to cart:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error.message,
                    });
                }
            });
        } else {
            console.error('Add to cart button not found.');
        }
    } catch (error) {
        console.error('Error rendering product details:', error);
    }
}

function getUserIdFromSession() {
    try {
        const cookies = document.cookie.split('; ');
        const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));
        if (!tokenCookie) {
            throw new Error('Token cookie not found');
        }

        const tokenValue = tokenCookie.split('=')[1];
        const payload = JSON.parse(atob(tokenValue.split('.')[1]));
        if (!payload || !payload.userId) {
            throw new Error('User ID not found in token payload');
        }

        return payload.userId;
    } catch (error) {
        console.error('Error retrieving user ID from session:', error);
        return null;
    }
}


document.addEventListener("DOMContentLoaded", async function () {
    const productId = window.location.pathname.split("/").pop();
    await renderProductDetails(productId);

    const checkoutButton = document.getElementById('checkout-btn');

    if (checkoutButton) {
        checkoutButton.addEventListener('click', async () => {
            try {
                const response = await fetch('/create-checkout-session', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ /* Aquí podrías enviar datos necesarios si es necesario */ })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const { id } = await response.json();
                const stripe = Stripe('your-publishable-key-here');
                stripe.redirectToCheckout({ sessionId: id });
            } catch (error) {
                console.error('Error creating checkout session:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error creating checkout session: ' + error.message,
                });
            }
        });
    }
});

