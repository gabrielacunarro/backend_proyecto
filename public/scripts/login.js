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
            Swal.fire({
                icon: 'error',
                title: 'Failed to log in',
                text: 'Please check your credentials and try again.'
            });
        } else {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Log in successful!",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = "/";
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


const googleButton = document.querySelector("#google");
googleButton.addEventListener("click", async (e) => {
    try {
        e.preventDefault();
        let response = await fetch("/api/sessions/google", {
            method: "POST"
        });
        if (response.ok) {
            setTimeout(() => {
                window.location.href = response.url;
            }, 2000);
        } else {
            showErrorAlert('Failed to initiate Google login', 'Please try again later.');
        }
    } catch (error) {
        showErrorAlert('An unexpected error occurred while initiating Google login', 'Please try again later.');
    }
});

function showErrorAlert(title = 'An unexpected error occurred', text = 'Please try again later.') {
    Swal.fire({
        icon: 'error',
        title: title,
        text: text
    });
}






