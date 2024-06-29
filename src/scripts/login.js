document.addEventListener("DOMContentLoaded", function() {
    const loginButton = document.querySelector("#login");
    const showResetPasswordFormButton = document.querySelector("#showResetPasswordForm");
    const showLoginFormButton = document.querySelector("#showLoginForm");
    const loginForm = document.querySelector("#loginForm");
    const resetPasswordForm = document.querySelector("#resetPasswordForm");

    if (loginButton) {
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
    }

    if (showResetPasswordFormButton) {
        showResetPasswordFormButton.addEventListener('click', function () {
            window.location.href = '/reset';
        });
    }

    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const email = document.getElementById('resetEmail').value;
            const password = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;

            try {
                const response = await fetch('http://localhost:8080/sessions/reset', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password, newPassword })
                });

                const result = await response.json();

                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Password updated successfully',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    resetPasswordForm.reset();
                    resetPasswordForm.style.display = 'none';
                    loginForm.style.display = 'block';
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed to reset password',
                        text: result.message
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
    }

    if (showLoginFormButton) {
        showLoginFormButton.addEventListener("click", function () {
            window.location.href = "/login";
        });
    }


    const githubButton = document.querySelector("#github");
    if (githubButton) {
        githubButton.addEventListener("click", async (e) => {
            try {
                e.preventDefault();
                let response = await fetch("/api/sessions/github", {
                    method: "POST"
                });
                if (response.ok) {
                    setTimeout(() => {
                        window.location.href = response.url;
                    }, 2000);
                } else {
                    showErrorAlert('Failed to initiate Github login', 'Please try again later.');
                }
            } catch (error) {
                showErrorAlert('An unexpected error occurred while initiating Github login', 'Please try again later.');
            }
        });
    }

    function showErrorAlert(title = 'An unexpected error occurred', text = 'Please try again later.') {
        Swal.fire({
            icon: 'error',
            title: title,
            text: text
        });
    }
});
