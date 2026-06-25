// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Firebase Configuration for VISTA 2027 Portal
const firebaseConfig = {
  apiKey: "AIzaSyB7BNb3xXoRBNjhXOV-ovvdidl_qDI0yY4",
  authDomain: "vista-cf6f6.firebaseapp.com",
  projectId: "vista-cf6f6",
  storageBucket: "vista-cf6f6.firebasestorage.app",
  messagingSenderId: "20488668346",
  appId: "1:20488668346:web:a39a1834e7f9eea53fee83",
  measurementId: "G-563SKP67FY"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize and Export Firebase Auth
const auth = getAuth(app);
export { auth };