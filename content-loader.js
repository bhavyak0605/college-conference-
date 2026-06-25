import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, getDoc } 
    from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB7BNb3xXoRBNjhXOV-ovvdidl_qDI0yY4",
    authDomain: "vista-cf6f6.firebaseapp.com",
    projectId: "vista-cf6f6",
    storageBucket: "vista-cf6f6.firebasestorage.app",
    messagingSenderId: "20488668346",
    appId: "1:20488668346:web:5a5671d6c09c09483fee83"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadHeroContent() {
    try {
        const snap = await getDoc(doc(db, "content", "hero"));
        if (!snap.exists()) return; // fallback to existing HTML if no data

        const d = snap.data();

        // Only update if element exists AND Firestore has a value
        if (d.confName)     setText("conf-name", `(${d.confName})`);
        if (d.dates)        setText("conf-dates", d.dates);
        if (d.venue)        setText("conf-venue", d.venue);
        if (d.subtitleDesc) setText("conf-subtitle", d.subtitleDesc);
        if (d.announcement) setText("conf-announcement", d.announcement);

    } catch (err) {
        console.warn("Could not load hero content from Firebase:", err);
        // Page still shows hardcoded HTML — no crash!
    }
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

document.addEventListener("DOMContentLoaded", loadHeroContent);