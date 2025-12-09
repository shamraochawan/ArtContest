// ==========================================
// 1. IMPORTS
// ==========================================
// Import the setup we created in the main folder
import { auth, provider } from "../firebase-config.js"; 
// Import specific authentication functions from the internet
import { signInWithEmailAndPassword, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// ==========================================
// 2. HTML ELEMENTS
// ==========================================
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('login-email');
const passwordInput = document.getElementById('login-password');
const googleBtn = document.getElementById('btn-google');

// ==========================================
// 3. EMAIL & PASSWORD LOGIN LOGIC
// ==========================================
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Stop page refresh

        const email = emailInput.value;
        const password = passwordInput.value;
        const submitBtn = loginForm.querySelector('button[type="submit"]');

        // UI Feedback: Disable button
        submitBtn.disabled = true;
        submitBtn.textContent = "Logging in...";

        try {
            // Attempt to login with Firebase
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            
            // SUCCESS: Save 'logged in' state to browser memory
            localStorage.setItem('artecertLoggedIn', 'true'); 
            
            console.log("Logged in as:", userCredential.user.email);
            alert("Success! Welcome back.");
            
            // Redirect to Home Page (Go up one folder)
            window.location.href = "../index.html"; 

        } catch (error) {
            // ERROR: Show message and re-enable button
            console.error("Login Error:", error);
            alert("Login Failed: " + error.message);
            
            submitBtn.disabled = false;
            submitBtn.textContent = "Login";
        }
    });
}

// ==========================================
// 4. GOOGLE LOGIN LOGIC (Fixed for popups)
// ==========================================
if (googleBtn) {
    googleBtn.addEventListener('click', async () => {
        
        // Disable button immediately to prevent double-clicks (Fixes 'cancelled-popup' error)
        googleBtn.disabled = true;
        const originalText = googleBtn.innerHTML;
        googleBtn.innerHTML = "Opening Google...";

        try {
            // Open the Google Popup
            const result = await signInWithPopup(auth, provider);
            
            // SUCCESS: Save 'logged in' state
            localStorage.setItem('artecertLoggedIn', 'true');

            console.log("Google User:", result.user.displayName);
            alert("Success! Welcome " + result.user.displayName);
            
            // Redirect to Home Page
            window.location.href = "../index.html";

        } catch (error) {
            // ERROR: Re-enable the button so user can try again
            console.error("Google Login Error:", error);
            
            googleBtn.disabled = false;
            googleBtn.innerHTML = originalText;

            // Only alert if it's a real error, not just the user closing the window
            if (error.code !== 'auth/cancelled-popup-request') {
                alert("Google Login Failed: " + error.message);
            }
        }
    });
}