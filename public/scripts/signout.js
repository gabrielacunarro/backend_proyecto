fetch("/api/sessions/", { method: "POST" })
    .then((res) => res.json())
    .then((res) => {
        if (res.statusCode === 200) {
            const registerButton = document.querySelector("#registerbtn");
            const loginButton = document.querySelector("#loginbtn");
            if (registerButton) {
                registerButton.parentNode.removeChild(registerButton);
            }
            if (loginButton) {
                loginButton.parentNode.removeChild(loginButton);
            }
            const signoutButton = document.querySelector("#signout");
            signoutButton.addEventListener("click", async (event) => {
                event.preventDefault(); // Evitar que el enlace siga su comportamiento predeterminado
                try {
                    const token = localStorage.getItem("token");
                    const opts = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}` // Agregar el token de autenticación a las cabeceras
                        },
                    };
                    let response = await fetch("/api/sessions/signout", opts);
                    response = await response.json();
                    if (response.statusCode === 200) {
                        alert(response.message);
                        localStorage.removeItem("token");
                        location.replace("/");
                    }
                } catch (error) {
                    console.log(error);
                }
            });
        } else {
            const formButton = document.querySelector("#formbtn");
            const ordersButton = document.querySelector("#ordersbtn");
            const signoutButton = document.querySelector("#signout");
            if (formButton) {
                formButton.parentNode.removeChild(formButton);
            }
            if (ordersButton) {
                ordersButton.parentNode.removeChild(ordersButton);
            }
            if (signoutButton) {
                signoutButton.parentNode.removeChild(signoutButton);
            }
        }
        if (res.session.role === 1) {
            const ordersButton = document.querySelector("#ordersbtn");
            if (ordersButton) {
                ordersButton.style.display = "none";
            }
        } else if (res.session.role === 0) {
            const formButton = document.querySelector("#formbtn");
            if (formButton) {
                formButton.style.display = "none";
            }
        }
        
    });

