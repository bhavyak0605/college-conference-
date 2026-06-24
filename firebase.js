// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7BNb3xXoRBNjhXOV-ovvdidl_qDI0yY4",
  authDomain: "vista-cf6f6.firebaseapp.com",
  projectId: "vista-cf6f6",
  storageBucket: "vista-cf6f6.firebasestorage.app",
  messagingSenderId: "20488668346",
  appId: "1:20488668346:web:a39a1834e7f9eea53fee83",
  measurementId: "G-563SKP67FY"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };