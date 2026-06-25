/* 
================================================================
VISTA 2027 Admin Console - Login Controller (Firebase Module)
================================================================
*/

import { auth } from "./firebase-config.js";
import {
    signInWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

console.log("admin.js (Login controller) loaded.");

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const togglePasswordBtn = document.getElementById("togglePassword");
    const errorBox = document.getElementById("errorBox");
    const errorText = document.getElementById("errorText");
    const loginBtn = document.getElementById("loginBtn");

    // Clear any previous error box on page load
    if (errorBox) {
        errorBox.style.display = "none";
    }

    // --- Already Authenticated Guard ---
    onAuthStateChanged(auth, (user) => {
        console.log("Login page auth state changed. User:", user ? user.email : "none");
        if (user) {
            console.log("Firebase login success (already authenticated)");
            console.log("Redirecting to dashboard");
            window.location.replace("./admin-dashboard.html");
        } else {
            console.log("No authenticated user");
        }
    });

    // --- Toggle Password Visibility ---
    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener("click", () => {
            const isPassword = passwordInput.getAttribute("type") === "password";
            passwordInput.setAttribute("type", isPassword ? "text" : "password");
            
            const icon = togglePasswordBtn.querySelector("i");
            if (icon) {
                if (isPassword) {
                    icon.classList.remove("fa-eye");
                    icon.classList.add("fa-eye-slash");
                } else {
                    icon.classList.remove("fa-eye-slash");
                    icon.classList.add("fa-eye");
                }
            }
        });
    }

    // --- Login Form Submission ---
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent default page reload
            console.log("Form submitted");

            const email = emailInput.value.trim();
            const password = passwordInput.value;

            console.log("Email captured:", email);
            console.log("Firebase login started");

            // Show loading state
            if (loginBtn) {
                loginBtn.classList.add("loading");
                loginBtn.disabled = true;
                const btnText = loginBtn.querySelector(".btn-text");
                if (btnText) btnText.textContent = "Authenticating...";
            }
            if (errorBox) {
                errorBox.style.display = "none";
            }

            // Explicitly set persistence first, then sign in
            setPersistence(auth, browserLocalPersistence)
                .then(() => {
                    return signInWithEmailAndPassword(auth, email, password);
                })
                .then((userCredential) => {
                    console.log("Firebase login success", userCredential.user.email);
                    console.log("Redirecting to dashboard");
                    window.location.replace("./admin-dashboard.html");
                })
                .catch((error) => {
                    console.error("Firebase login failed", error);
                    
                    // Display user-friendly error message
                    if (errorBox && errorText) {
                        let msg = "Invalid credentials. Please try again.";
                        if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
                            msg = "Invalid email or password. Please verify your credentials.";
                        } else if (error.code === "auth/invalid-email") {
                            msg = "Please enter a valid email address.";
                        } else if (error.code === "auth/too-many-requests") {
                            msg = "Account temporarily locked due to too many failed attempts. Try again later.";
                        } else if (error.message) {
                            msg = error.message;
                        }
                        errorText.textContent = msg;
                        errorBox.style.display = "flex";
                    }

                    // Reset loading state
                    if (loginBtn) {
                        loginBtn.classList.remove("loading");
                        loginBtn.disabled = false;
                        const btnText = loginBtn.querySelector(".btn-text");
                        if (btnText) btnText.textContent = "Log In Securely";
                    }
                });
        });
    }
});
