const socketRegister = io();

document.addEventListener("DOMContentLoaded", () => {
    const registerButton = document.querySelector("#registerButton");

    registerButton.addEventListener("click", (event) => {
        event.preventDefault();

        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;
        const email = document.querySelector("#email").value;

        // Validar campos si es necesario
        if (!username || !password || !email) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        const userData = {
            username: username,
            password: password,
            email: email
        };

        console.log(userData);

        // Emitir el evento "register" junto con los datos del usuario al servidor
        socketRegister.emit("register", userData);
    });
});


