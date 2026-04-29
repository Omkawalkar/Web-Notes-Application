tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            "colors": {
                "tertiary-fixed-dim": "#ef81c4",
                "secondary-fixed-dim": "#dbb4ff",
                "primary-fixed": "#9396ff",
                "surface": "#f5f7f9",
                "on-tertiary-container": "#63054a",
                "secondary": "#8126cf",
                "tertiary-container": "#ff8ed2",
                "outline": "#747779",
                "on-secondary-fixed-variant": "#7511c3",
                "inverse-primary": "#8083ff",
                "inverse-on-surface": "#9a9d9f",
                "on-tertiary-fixed-variant": "#6e1354",
                "inverse-surface": "#0b0f10",
                "primary-dim": "#3939c7",
                "on-secondary-container": "#6900b4",
                "error": "#b41340",
                "surface-bright": "#f5f7f9",
                "on-error-container": "#510017",
                "on-surface-variant": "#595c5e",
                "on-primary-container": "#0a0081",
                "on-tertiary-fixed": "#3b002b",
                "on-secondary-fixed": "#4f0089",
                "on-primary-fixed-variant": "#0e009d",
                "secondary-fixed": "#e5c6ff",
                "error-dim": "#a70138",
                "surface-container-high": "#dfe3e6",
                "tertiary-fixed": "#ff8ed2",
                "surface-container": "#e5e9eb",
                "surface-dim": "#d0d5d8",
                "on-secondary": "#fbefff",
                "secondary-container": "#e5c6ff",
                "tertiary": "#963776",
                "on-error": "#ffefef",
                "on-tertiary": "#ffeef4",
                "primary-fixed-dim": "#8387ff",
                "primary": "#4647d3",
                "on-primary-fixed": "#000000",
                "on-background": "#2c2f31",
                "tertiary-dim": "#882a69",
                "on-primary": "#f4f1ff",
                "error-container": "#f74b6d",
                "background": "#f5f7f9",
                "surface-variant": "#d9dde0",
                "secondary-dim": "#740ec2",
                "surface-container-low": "#eef1f3",
                "surface-container-lowest": "#ffffff",
                "on-surface": "#2c2f31",
                "surface-container-highest": "#d9dde0",
                "surface-tint": "#4647d3",
                "primary-container": "#9396ff",
                "outline-variant": "#abadaf"
            },
            "borderRadius": {
                "DEFAULT": "1rem",
                "lg": "2rem",
                "xl": "3rem",
                "full": "9999px"
            },
            "fontFamily": {
                "headline": ["Inter"],
                "body": ["Inter"],
                "label": ["Inter"]
            }
        },
    },
}

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginMessage = document.getElementById("loginMessage");

    if (!loginForm) {
        console.error("Login form not found!");
        return;
    }

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (loginMessage) {
            loginMessage.textContent = "";
            loginMessage.style.color = "red";
        }

        if (!email || !password) {
            if (loginMessage) {
                loginMessage.textContent = "Email and password are required";
            }
            return;
        }

        // Show loading state
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Logging in...';
        submitBtn.disabled = true;

        try {
            console.log("Attempting login for:", email);
            
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            console.log("Response status:", res.status);
            console.log("Response data:", data);

            if (res.ok) {
                if (loginMessage) {
                    loginMessage.style.color = "green";
                    loginMessage.textContent = data.message || "Login successful! Redirecting...";
                }

                // Store user data and token
                if (data.token) {
                    localStorage.setItem("authToken", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    console.log("Token stored successfully");
                }

                // Redirect to home page
                setTimeout(() => {
                    window.location.href = "../Home page/Home.html";
                }, 1000);
            } else {
                if (loginMessage) {
                    loginMessage.style.color = "red";
                    loginMessage.textContent = data.message || "Invalid credentials";
                }
            }
        } catch (error) {
            console.error("Login error:", error);
            if (loginMessage) {
                loginMessage.style.color = "red";
                loginMessage.textContent = "Cannot connect to server. Please make sure the backend is running on http://localhost:5000";
            }
        } finally {
            // Reset button state
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
});