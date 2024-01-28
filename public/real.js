document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    socket.on("products", (products) => {
        updateProductsView(products);
    });

    function updateProductsView(products) {
        const productsContainer = document.querySelector("#productsContainer");

        // Limpiar el contenedor antes de agregar los nuevos productos
        productsContainer.innerHTML = "";

        // Iterar sobre los productos y agregarlos al contenedor
        products.forEach((product) => {
            const productElement = document.createElement("div");
            productElement.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <img src="${product.photo}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">Precio: $${product.price}</p>
                        <p class="card-text">Stock: ${product.stock}</p>
                    </div>
                </div>
            `;

            //  textContent para evitar posibles problemas de seguridad
            productElement.querySelectorAll('*').forEach(node => { // selecciona los nodos desc de productElement
                node.textContent = node.textContent;
            });

            productsContainer.appendChild(productElement);
        });
    }
});


