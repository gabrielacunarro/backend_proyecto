const socketNew = io();

socketNew.on("new success", (message) => alert(message));

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
            title: title,
            description: description,
            photo: photo,
            price: price,
            stock: stock
        };

        console.log(data);

        socketNew.emit("new product", data);
    });
});




