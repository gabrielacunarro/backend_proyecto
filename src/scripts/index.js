document.addEventListener("DOMContentLoaded", function () {
    let productsSection = document.getElementById("perfumes");
    let prevButton = document.getElementById("prev");
    let nextButton = document.getElementById("next");
    

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
        if (!productsSection) {
            return;
        }

        productsSection.innerHTML = "";

        const startIndex = currentPage * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const productsToRender = products.slice(startIndex, endIndex);

        productsToRender.forEach(product => {
            const cardHtml = `
                <div class="card m-2 anchor" style="width: 360px">
                    <div class="card-header"><i>6 interest-free installments<i>
                    </div>
                    <img src="${product.photo}" style="height: 240px" class="card-img-top object-fit-cover" alt="${product.title}" />
                    <div class="card-body">
                        <h5 class="p-2 text-center card-title">${product.title}</h5>
                        <p class="p-2 text-center card-price">Price: ${product.price}</p>
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
        if (prevButton) {
            prevButton.disabled = currentPage === 0;
        }
        if (nextButton) {
            nextButton.disabled = currentPage === totalPages - 1;
        }
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
    if (selector) {
        selector.value = params.get("title");
        document.querySelector("#search").addEventListener("click", async (event) => {
            try {
                const text = selector.value;
                fetchProducts('title=' + text);
            } catch (error) {
                alert(error.message);
            }
        });
    }

    if (prevButton) {
        prevButton.addEventListener("click", goToPrevPage);
    }

    if (nextButton) {
        nextButton.addEventListener("click", goToNextPage);
    }

    fetchProducts();
});
