const socketNew = io();

// Escuchar el evento "new success" y mostrar una alerta
socketNew.on("new success", (message) => alert(message));

document.addEventListener("DOMContentLoaded", () => {
    // Seleccionar el botón por su ID
    const newEventButton = document.querySelector("#newEvent");

    // Agregar un evento de clic al botón
    newEventButton.addEventListener("click", (event) => {
        event.preventDefault();
        
        // Seleccionar los elementos del formulario por sus ID
        const title = document.querySelector("#inputTitle").value;
        const description = document.querySelector("#inputDescription").value;
        const photo = document.querySelector("#inputPhoto").value;
        const price = document.querySelector("#inputPrice").value;
        const stock = document.querySelector("#inputStock").value;

        // Crear un objeto con los datos del formulario
        const data = {
            title: title,
            description: description,
            photo: photo,
            price: price,
            stock: stock
        };

        console.log(data);

        // Emitir el evento "new product" junto con los datos del producto al servidor
        socketNew.emit("new product", data);
    });
});



