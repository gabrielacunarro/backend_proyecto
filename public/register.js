const socketRegister = io();

// Escuchar el evento "new success" y mostrar una alerta
socketRegister.on("new success", (message) => alert(message));

document.addEventListener("DOMContentLoaded", () => {
    const registerButton = document.querySelector("#registerButton");

    registerButton.addEventListener("click", (event) => {
        event.preventDefault();

        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;
        const email = document.querySelector("#email").value;
        const name = document.querySelector("#name").value; 
        const photo = document.querySelector("#photo").value; 

        // Validar campos si es necesario
        if (!username || !password || !email || !name || !photo) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        const userData = {
            username: username,
            password: password,
            email: email,
            name: name,    
            photo: photo  
        };

        console.log(userData);

        socketRegister.emit("new user", userData);
    });
});




