const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serve static files from current directory

// File Uploads Config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({ storage: storage });

// Database Config
let db;
async function initializeDB() {
    db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            subject TEXT,
            message TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE IF NOT EXISTS registrations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fullName TEXT,
            email TEXT,
            phone TEXT,
            country TEXT,
            category TEXT,
            type TEXT,
            amount TEXT,
            paymentId TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE IF NOT EXISTS submissions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            authors TEXT,
            abstract TEXT,
            file_path TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);
    console.log("Database initialized");
}
initializeDB();

// API Routes

// 1. Contact Form Submission
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        await db.run(
            'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
            [name, email, subject, message]
        );
        res.status(200).json({ success: true, message: 'Message received successfully!' });
    } catch (error) {
        console.error("Contact form error:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// 2. Registration Submission
app.post('/api/register', async (req, res) => {
    try {
        const { fullName, email, phone, country, category, type, amount, paymentId } = req.body;
        await db.run(
            'INSERT INTO registrations (fullName, email, phone, country, category, type, amount, paymentId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [fullName, email, phone, country, category, type, amount, paymentId]
        );
        // Note: Actual payment logic can be verified here if backend integration to Razorpay/PayPal is fully enabled.
        res.status(200).json({ success: true, message: 'Registration submitted successfully!' });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// 3. Paper Submission
app.post('/api/submit-paper', upload.single('paper'), async (req, res) => {
    try {
        const { title, authors, abstract } = req.body;
        const file_path = req.file ? req.file.path : null;

        // Ensure a file was actually uploaded
        if (!file_path) {
            return res.status(400).json({ success: false, message: 'Paper file is required' });
        }

        await db.run(
            'INSERT INTO submissions (title, authors, abstract, file_path) VALUES (?, ?, ?, ?)',
            [title, authors, abstract, file_path]
        );
        res.status(200).json({ success: true, message: 'Paper submitted successfully!' });
    } catch (error) {
        console.error("Paper submission error:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Removed fallback to avoid path resolution errors

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
