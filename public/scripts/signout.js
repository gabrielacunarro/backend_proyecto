document.querySelector("#signout").addEventListener("click", async (event) => {
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
