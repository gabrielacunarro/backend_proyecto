document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("/api/sessions/", { method: "POST" });
        const res = await response.json();
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
                event.preventDefault();
                try {
                    const token = localStorage.getItem("token");
                    const opts = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                    };
                    let response = await fetch("/api/sessions/signout", opts);
                    response = await response.json();
                    if (response.statusCode === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Signout successful!',
                        }).then(() => {
                            localStorage.removeItem("token");
                            location.replace("/");
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'An unexpected error occurred',
                        text: 'Please try again later.'
                    });
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

        if (res.response && res.response.session && res.response.session.role === 1) {
            const ordersButton = document.querySelector("#ordersbtn");
            if (ordersButton) {
                ordersButton.style.display = "none";
            }
        } else if (res.response && res.response.session && res.response.session.role === 0) {
            const formButton = document.querySelector("#formbtn");
            if (formButton) {
                formButton.style.display = "none";
            }
        }

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'An unexpected error occurred',
            text: 'Please try again later.'
        });
    }
});
<<<<<<< HEAD

=======
>>>>>>> origin/main
