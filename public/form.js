document.addEventListener("DOMContentLoaded", () => {
    const newEventButton = document.querySelector("#newEvent");

    newEventButton.addEventListener("click", (event) => {
        event.preventDefault();

        const title = document.querySelector("#inputTitle").value;
        const description = document.querySelector("#inputDescription").value;
        const photo = document.querySelector("#inputPhoto").value;
        const price = document.querySelector("#inputPrice").value;
        const stock = document.querySelector("#inputStock").value;

        if (!title || !description || !photo || !price || !stock) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        const data = {
            title,
            description,
            photo,
            price,
            stock
        };

        console.log(data);

        // Simular el envío de datos al servidor
        alert("Registro exitoso");
    });
});





