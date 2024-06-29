document.addEventListener("DOMContentLoaded", function () {
    const createButton = document.getElementById("create");

    createButton.addEventListener("click", async (e) => {
        e.preventDefault();

        const data = {
            title: document.querySelector("#title").value,
            description: document.querySelector("#description").value,
            photo: document.querySelector("#photo").value,
            price: document.querySelector("#price").value,
            stock: document.querySelector("#stock").value
        };

        try {
            const opts = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            };

            let response = await fetch("/api/products", opts);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            let result = await response.json();

            alert(result.message);
            window.location.href = "/";
        } catch (error) {
            alert(error.message);
        }
    });
});

