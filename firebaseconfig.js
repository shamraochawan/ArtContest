// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvd55aGskGTg_gDd1uPwGCKSRRti38rPg",
  authDomain: "fir-login-3ec2b.firebaseapp.com",
  projectId: "fir-login-3ec2b",
  storageBucket: "fir-login-3ec2b.firebasestorage.app",
  messagingSenderId: "475219906958",
  appId: "1:475219906958:web:e0a31a115b459fa75794df",
  measurementId: "G-LJP8Q3QBT5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
