
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Set your MySQL password
  database: 'job_portal',
});

db.connect((err) => {
  if (err) console.error('Database connection failed:', err);
  else console.log('Connected to MySQL');
});

// Register Student (Without Hashing)
app.post('/api/students/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields required' });
  }

  db.query(
    'INSERT INTO students (name, email, password) VALUES (?, ?, ?)',
    [name, email, password], // Storing plain text password (Not Secure)
    (err, result) => {
      if (err) return res.status(400).json({ message: 'User already exists' });
      res.status(201).json({ message: 'Registration successful' });
    }
  );
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

