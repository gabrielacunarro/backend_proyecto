const selector = document.querySelector("#login");
selector.addEventListener("click", async (e) => {
    try {
        e.preventDefault();
        const data = {
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value
        };
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };
        let response = await fetch("/api/sessions/login", opts);
        response = await response.json();
        
        localStorage.setItem('token', response.token);
        
        alert(response.message);
        
        // Redirecciona a la página principal después del inicio de sesión
        window.location.href = "/";
    } catch (error) {
        alert(error.message);
    }
});

