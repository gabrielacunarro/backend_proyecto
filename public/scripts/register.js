const selector = document.querySelector("#register")
selector.addEventListener("click", async (e) => {
    try {
        e.preventDefault()
        const data = {
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value,
            name: document.querySelector("#name").value,
            age: document.querySelector("#age").value,
            photo: document.querySelector("#photo").value,
        }
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }
        let response = await fetch("/api/sessions/register", opts);
        response = await response.json();

        alert(response.message)
        window.location.href = "/sessions/login";
    } catch (error) {
        alert(error.message);
    }
})

const googleButton = document.querySelector("#google");
googleButton.addEventListener("click", async (e) => {
    try {

        let response = await fetch("/api/sessions/google", {
            method: "POST"
        });
        if (response.ok) {

            window.location.href = response.url;
        } else {

            throw new Error("Failed to initiate Google login");
        }
    } catch (error) {
        alert(error.message);
    }
});
