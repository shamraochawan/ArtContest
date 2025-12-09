// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJnQg1aQ9XX_0Y9QiUfs6qaHjIsP4LYtQ",
  authDomain: "onlineartcontest-4c0a4.firebaseapp.com",
  projectId: "onlineartcontest-4c0a4",
  storageBucket: "onlineartcontest-4c0a4.firebasestorage.app",
  messagingSenderId: "897533892711",
  appId: "1:897533892711:web:12978a72f2c1f9776bdcc2",
  measurementId: "G-NB8KSP7QRR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };