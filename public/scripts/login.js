const selector = document.querySelector("#login")
selector.addEventListener("click", async (e) => {
    try {
        e.preventDefault()
        const data = {
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value
        }
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }
        let response = await fetch("/api/sessions/login", opts)
        response = await response.json()
        
        alert(response.message)
        window.location.href = "/"
    } catch (error) {
        alert(error.message)
    }
})