document.addEventListener("DOMContentLoaded", function () {
    const productsSection = document.getElementById("perfumes");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    let currentPage = 0;
    let totalProducts = 0;
    const productsPerPage = 5;
    let totalPages = 0;

    function fetchProducts(filter) {
        let filtro = filter ? "?" + filter : "";
        fetch('/api/products' + filtro)
            .then(response => response.json())
            .then(productsData => {
                totalProducts = productsData.response.totalDocs; 
                totalPages = Math.ceil(totalProducts / productsPerPage); 
                renderProducts(productsData.response.docs); 
                updatePaginationButtons(); 
            })
            .catch(error => console.error('Error fetching products:', error));
    }

    function renderProducts(products) {
        productsSection.innerHTML = "";

        const startIndex = currentPage * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const productsToRender = products.slice(startIndex, endIndex);

        productsToRender.forEach(product => {
            const cardHtml = `
                <div class="card m-2 anchor" style="width: 360px">
                    <div class="card-header"><i>6 cuotas sin interés<i>
                    </div>
                    <img src="${product.photo}" style="height: 240px" class="card-img-top object-fit-cover" alt="${product.title}" />
                    <div class="card-body">
                        <h5 class="p-2 text-center card-title">${product.title}</h5>
                        <p class="p-2 text-center card-price">Precio: ${product.price}</p>
                        <button class="btn btn-primary viewMore" data-product-id="${product._id}" data-toggle="modal" data-target="#productModal">View More</button>
                    </div>
                </div>
            `;
            productsSection.insertAdjacentHTML("beforeend", cardHtml);
        });

        const viewMoreButtons = document.querySelectorAll(".viewMore");
        viewMoreButtons.forEach(button => {
            button.addEventListener("click", () => {
                const productId = button.dataset.productId;
                window.location.href = `/products/${productId}`;
            });
        });
    }

    function updatePaginationButtons() {
        prevButton.disabled = currentPage === 0;
        nextButton.disabled = currentPage === totalPages - 1;
    }

    function goToPrevPage() {
        if (currentPage > 0) {
            currentPage--;
            fetchProducts();
            updatePaginationButtons(); 
            console.log("Prev page, currentPage:", currentPage);
        }
    }

    function goToNextPage() {
        const maxPage = totalPages - 1;

        console.log("Current Page:", currentPage);
        console.log("Max Page:", maxPage);

        const lastProductIndex = (currentPage + 1) * productsPerPage;

        if (lastProductIndex < totalProducts) {
            currentPage++;
            fetchProducts();
            updatePaginationButtons(); 
        } else {
            console.log("No hay más productos para mostrar en la siguiente página");
        }
    }

    const params = new URLSearchParams(location.search);
    const selector = document.querySelector("#text");
    selector.value = params.get("title");
    document.querySelector("#search").addEventListener("click", async (event) => {
        try {
            const text = selector.value;
            fetchProducts('title=' + text);
        } catch (error) {
            alert(error.message);
        }
    });

    prevButton.addEventListener("click", goToPrevPage);
    nextButton.addEventListener("click", goToNextPage);

    fetchProducts();
});
