// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLmlRbxZI-6ONXS4PEUFMXCLUD-drBCTY",
  authDomain: "art-contest-2025.firebaseapp.com",
  projectId: "art-contest-2025",
  storageBucket: "art-contest-2025.firebasestorage.app",
  messagingSenderId: "523292533996",
  appId: "1:523292533996:web:4ef1909f548458b6c1f1c9",
  measurementId: "G-FNW5G94341"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
