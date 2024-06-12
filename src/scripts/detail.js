document.addEventListener("DOMContentLoaded", function () {
    const productDetailsSection = document.getElementById("product-details");

    // Obtener el ID del producto de la URL
    const productId = window.location.pathname.split("/").pop();

    // Función para obtener los detalles del producto desde la API
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

    // Función para renderizar los detalles del producto en la página
    function renderProductDetails(product) {
        // Limpiar el contenido anterior
        productDetailsSection.innerHTML = "";
        console.log(product)
        // Crear el HTML para mostrar los detalles del producto
        const productDetailHtml = `
            <div class="card m-2 anchor" style="width: 360px">
                <h2>${product.response.title}</h2>
                <img src="${product.response.photo}" style="height: 240px" class="card-img-top object-fit-cover" alt="${product.title}" />
                <div class="card-body">
                    <p>Description: ${product.response.description}</p>
                    <p>Price: ${product.response.price}</p>
                    <p>Stock: ${product.response.stock}</p>
                    <!-- Agrega más detalles del producto según sea necesario -->
                </div>
            </div>
        `;

        // Insertar el HTML en el elemento del producto
        productDetailsSection.innerHTML = productDetailHtml;
    }

    // Obtener y renderizar los detalles del producto al cargar la página
    fetchProductDetails(productId);
});
