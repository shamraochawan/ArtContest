// Import the config from the parent folder
import { auth } from "../firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const signupForm = document.getElementById('signup-form');
const emailInput = document.getElementById('signup-email');
const passwordInput = document.getElementById('signup-password');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        // This command creates the user in Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Log them in automatically in your local storage
        localStorage.setItem('artecertLoggedIn', 'true');
        
        alert("Account Created! Welcome " + userCredential.user.email);
        
        // Send them to the main page
        window.location.href = "../index.html"; 
    } catch (error) {
        console.error(error);
        
        // Show friendly error messages
        if (error.code === 'auth/email-already-in-use') {
            alert("This email is already registered. Please Login.");
        } else if (error.code === 'auth/weak-password') {
            alert("Password should be at least 6 characters.");
        } else {
            alert("Error: " + error.message);
        }
    }
});