const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // to serve certificate files

// Setup DB connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'my pass',
    database: 'job_portal'
});

// Multer Config
const storage = multer.diskStorage({
    destination: './uploads/certificates/',
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

// Create or Update Profile
app.post('/profile/:student_id', upload.array('certificates', 5), (req, res) => {
    const studentId = req.params.student_id;
    const { bio, degree, university, location, skills } = req.body;
    const skillList = JSON.parse(skills); // skills sent as JSON string

    // Upsert profile
    db.query('INSERT INTO student_profiles (student_id, bio, degree, university, location, is_verified) VALUES (?, ?, ?, ?, ?, FALSE) ON DUPLICATE KEY UPDATE bio=?, degree=?, university=?, location=?, is_verified=FALSE',
        [studentId, bio, degree, university, location, bio, degree, university, location],
        (err) => {
            if (err) return res.status(500).json({ error: err });

            // Clear old skills
            db.query('DELETE FROM student_skills WHERE student_id=?', [studentId], (err) => {
                if (err) return res.status(500).json({ error: err });

                // Insert new skills
                const insertSkills = 'INSERT INTO student_skills (student_id, skill_name, certificate_path) VALUES ?';
                const skillValues = skillList.map((skill, index) => [
                    studentId,
                    skill.name,
                    req.files[index] ? '/uploads/certificates/' + req.files[index].filename : null
                ]);

                db.query(insertSkills, [skillValues], (err) => {
                    if (err) return res.status(500).json({ error: err });
                    res.json({ message: 'Profile & skills updated successfully! Pending admin verification.' });
                });
            });
        });
});

// Get Profile + Skills
app.get('/profile/:student_id', (req, res) => {
    const studentId = req.params.student_id;
    db.query('SELECT * FROM student_profiles WHERE student_id = ?', [studentId], (err, profileResult) => {
        if (err) return res.status(500).json({ error: err });
        if (profileResult.length === 0) return res.status(404).json({ message: "Profile not found" });

        db.query('SELECT skill_name, certificate_path FROM student_skills WHERE student_id = ?', [studentId], (err, skillsResult) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ ...profileResult[0], skills: skillsResult });
        });
    });
});
