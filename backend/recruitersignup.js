const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Change if your MySQL username is different
  password: '',  // Add your MySQL password if set
  database: 'job_portal' // Use your actual database name
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL Database');
});

// 📌 Recruiter Sign-Up API
app.post('/api/recruiter/signup', (req, res) => {
  const { companyName, jobTitle, email, password } = req.body;

  if (!companyName || !jobTitle || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = 'INSERT INTO recruiters (company_name, job_title, email, password) VALUES (?, ?, ?, ?)';
  db.query(sql, [companyName, jobTitle, email, password], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'Email already registered' });
      }
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'Recruiter registered successfully' });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
