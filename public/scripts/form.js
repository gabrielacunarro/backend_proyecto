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
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            };
            

            let response = await fetch("/api/products", opts);
            response = await response.json();

            alert(response.message);
        } catch (error) {
            alert(error.message);
        }
    });
});





