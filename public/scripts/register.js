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
        if (response.statusCode === 201) {
            alert("Registered! Please verify your account from your email. ")
            window.location.href = "/login";
        } else {
            alert(response.message)
        }

    } catch (error) {
        alert(error.message);
    }
})


const githubButton = document.querySelector("#github");
githubButton.addEventListener("click", async (e) => {
    try {
        e.preventDefault()
        let response = await fetch("/api/sessions/github", {
            method: "POST"
        });
        if (response.ok) {

            window.location.href = response.url;
        } else {

            throw new Error("Failed to initiate Github login");
        }
    } catch (error) {
        alert(error.message);
    }
});
