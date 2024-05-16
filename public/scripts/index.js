document.addEventListener("DOMContentLoaded", function () {
    const productsSection = document.getElementById("perfumes");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    let currentPage = 0;
    const totalProducts = 100;
    const productsPerPage = 5;
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    function fetchProducts(filter) {
        let filtro = filter ? "?" + filter : ""; 
        fetch('/api/products' + filtro)
            .then(response => response.json())
            .then(products => {
                renderProducts(products);
            })
            .catch(error => winston.error('Error fetching products:', error));
    }
    

    function renderProducts(products) {
        productsSection.innerHTML = "";

        const productsArray = products.response.docs;
        const startIndex = currentPage * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const productsToRender = productsArray.slice(startIndex, endIndex);

        productsToRender.forEach(product => {
            const cardHtml = `
                <div class="card m-2 anchor" style="width: 360px">
                    <img src="${product.photo}" style="height: 240px" class="card-img-top object-fit-cover" alt="${product.title}" />
                    <div class="card-body">
                        <h5 class="p-2 text-center card-title">${product.title}</h5>
                        <p class="p-2 text-center card-price">Precio: ${product.price}</p>
                        <p class="p-2 text-center card-stock">Stock: ${product.stock}</p>
                        <button class="btn btn-primary addToCart" data-product-id="${product._id}">Add to Cart</button>
                    </div>
                </div>
            `;
            productsSection.insertAdjacentHTML("beforeend", cardHtml);
        });

    }

    function goToPrevPage() {
        if (currentPage > 0) {
            currentPage--;
            fetchProducts();
        }
    }

    function goToNextPage() {
        const maxPage = totalPages - 1;
        if (currentPage < maxPage) {
            currentPage++;
            fetchProducts();
        }
    }
    const params = new URLSearchParams(location.search);
    const selector = document.querySelector("#text");
    selector.value = params.get("title");
    document.querySelector("#search").addEventListener("click", async (event) => {
        try {
            const text = selector.value;
            fetchProducts('title='+text)
        } catch (error) {
            alert(error.message);
        }
    });

    prevButton.addEventListener("click", goToPrevPage);
    nextButton.addEventListener("click", goToNextPage);

    // Llama a fetchProducts sin pasar un filtro al cargar la página
    fetchProducts();
});
