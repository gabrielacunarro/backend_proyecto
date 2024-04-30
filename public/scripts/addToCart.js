const addToCartBtn = document.querySelector(".addToCart");

addToCartBtn.addEventListener("click", async (event) => {
    try {

        const productId = event.target.dataset.productId;

        const data = { product_id: productId };

        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };

        let response = await fetch("/api/cart", opts);

        response = await response.json();

        if (response.statusCode === 401) {
            alert("Please log in to add products to the cart.");
        } else {

            location.replace("/cart");
        }
    } catch (error) {

        alert("An error occurred while adding the product to the cart.");
        console.error(error);
    }
});
