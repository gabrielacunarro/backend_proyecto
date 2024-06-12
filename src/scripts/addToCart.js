document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".addToCart");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", async () => {
            // Aquí agregarías la lógica para agregar el producto al carrito
            console.log('Producto agregado al carrito');

            // Redirigir a la página /api/carts
            window.location.href = "/api/carts";
        });
    });
});

    