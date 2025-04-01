// require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

app.use(express.json());
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'khris@mysql23#M', // Set your MySQL password
  database: 'job_portal',
});

db.connect((err) => {
  if (err) console.error('Database connection failed:', err);
  else console.log('Connected to MySQL');
});

// Register Student (Without Hashing)
app.post('/api/students/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'All fields required' });

  db.query(
    'INSERT INTO students (email, password) VALUES (?, ?)',
    [email, password], // Storing plain text password (Not Secure)
    (err, result) => {
      if (err) return res.status(400).json({ message: 'User already exists' });
      res.status(201).json({ message: 'Registration successful' });
    }
  );
});

// Login Student (Without Hashing)
app.post('/api/students/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM students WHERE email = ?', [email], (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

    const user = results[0];

    // Compare plain text passwords
    if (password !== user.password) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token ,
      id: user.id,          // Add user id to response
      name: user.name,      // Add user name to response
      email: user.email,  
    });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

require('dotenv').config();




