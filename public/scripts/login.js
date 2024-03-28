const loginButton = document.querySelector("#login");
loginButton.addEventListener("click", async (e) => {
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
        if (!response.ok) {
            alert("Login failed");
            window.location.href = "/sessions/login";

        } else {
            alert("Log in!")
            window.location.href = "/";
        }
    } catch (error) {
        console.log(error);
        alert("An unexpected error occurred. Please try again later.");
    }
});


const googleButton = document.querySelector("#google");
googleButton.addEventListener("click", async (e) => {
    try {
        e.preventDefault();
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






