document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    let valid = true;

    // Get input values
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    // Get error message elements
    let usernameError = document.getElementById("usernameError");
    let passwordError = document.getElementById("passwordError");

    // Reset error messages
    usernameError.textContent = "";
    passwordError.textContent = "";

    // Username validation
    if (username.length < 3 || username.length > 20) {
        usernameError.textContent = "Username must be between 3 and 20 characters.";
        valid = false;
    }

    // Password validation
    if (password.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters.";
        valid = false;
    }

    // If form is invalid, stop further execution
    if (!valid) return;

    // Prepare form data for AJAX request
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("action", "login");

    // Send AJAX request to `auth.php`
    fetch("auth.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("✅ Login Successful! Redirecting...");
            window.location.href = "dashboard.php"; // Redirect on successful login
        } else {
            // Display error message from server
            alert("❌ Login Failed: " + data.message);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("⚠️ Something went wrong. Please try again later.");
    });
});

// Toggle Password Visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById("password");
    const toggleButton = document.querySelector(".toggle-password");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleButton.textContent = "🙈"; // Eye-closed emoji
    } else {
        passwordInput.type = "password";
        toggleButton.textContent = "𖣠"; // Eye-open emoji
    }
}
