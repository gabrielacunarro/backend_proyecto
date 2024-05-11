document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".addToCart");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", async (event) => {
            event.preventDefault(); 

            try {
                const productId = event.target.dataset.productId; 
                const token = localStorage.getItem("token"); 

                const userInfo = JSON.parse(atob(token.split(".")[1]));
                const data = {
                    pid: productId, 
                    uid: userInfo.email, 
                    quantity: 1, 
                    state: "paid" 
                };

                const opts = {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` 
                    },
                    body: JSON.stringify(data) 
                };

                let response = await fetch("/api/orders/", opts);

                if (response.ok) {
                    // Actualizar el stock del producto en la interfaz de usuario si es necesario
                    const productStockElement = document.querySelector(`#stock-${productId}`);
                    if (productStockElement) {
                        const currentStock = parseInt(productStockElement.textContent);
                        const updatedStock = currentStock - 1;
                        productStockElement.textContent = updatedStock;
                    }

                    alert("Producto agregado al carrito con éxito.");
                } else {
                    alert("Error al agregar el producto al carrito.");
                }
            } catch (error) {
                alert("Ocurrió un error al agregar el producto al carrito.");
            }
        });
    });
});


