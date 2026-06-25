import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB7BNb3xXoRBNjhXOV-ovvdidl_qDI0yY4",
  authDomain: "vista-cf6f6.firebaseapp.com",
  projectId: "vista-cf6f6",
  storageBucket: "vista-cf6f6.firebasestorage.app",
  messagingSenderId: "20488668346",
  appId: "1:20488668346:web:5a5671d6c09c09483fee83",
  measurementId: "G-JTJQQ1GWXR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };