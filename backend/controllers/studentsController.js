
import db from '../db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Register a new student
export const registerStudent = (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if the email already exists
  const checkEmailQuery = 'SELECT * FROM students WHERE email = ?';
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    if (results.length > 0) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Insert new student into the database
    const insertQuery = 'INSERT INTO students (name, email, password) VALUES (?, ?, ?)';
    db.query(insertQuery, [name, email, password], (err, result) => {
      if (err) return res.status(500).json({ message: 'Failed to register' });

      res.status(201).json({ message: 'Registration successful' });
    });
  });
};

// Student Login
export const loginStudent = (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password' });
  }

  // Check if student exists
  const sql = 'SELECT * FROM students WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const student = results[0];

    // Compare passwords directly (No bcrypt)
    if (password !== student.password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: student.id, email: student.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token,
        id: student.id,          // Add user id to response
      name: student.name,      // Add user name to response
      email: student.email,  
     });
  });
};




export const getStudentProfile = (req, res) => {
    const studentId = req.params.id;
  
    const profileQuery = `
        SELECT s.name, s.email, sp.bio, sp.degree, sp.university, sp.location, sp.is_verified 
        FROM student_profiles sp 
        JOIN students s ON sp.student_id = s.id
        WHERE sp.student_id = ?`;

    db.query(profileQuery, [studentId], (err, profileResults) => {
        if (err) return res.status(500).json({ message: 'Database error' });

        if (profileResults.length === 0) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        const skillsQuery = `SELECT skill_name, certificate_path FROM student_skills WHERE student_id = ?`;
        db.query(skillsQuery, [studentId], (err, skillsResults) => {
            if (err) return res.status(500).json({ message: 'Database error' });

            res.status(200).json({
                profile: profileResults[0], // Ensure profile is inside an object
                skills: skillsResults, 
            });
        });
    });
};

// // // import db from '../db.js';
// // import jwt from 'jsonwebtoken';
// // import dotenv from 'dotenv';
// // import multer from 'multer';
// // import path from 'path';

// dotenv.config();

// Setup multer for file uploads
// import multer from 'multer';
// // import path from 'path';
// // import { db } from '../database.js';

// // Configure Multer for file storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Directory where files are saved
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });

// const upload = multer({ storage: storage });

// // Middleware to handle multiple certificate uploads
// export const uploadCertificates = upload.array('certificates', 5);

// // Update Student Profile and Skills (Including Certificate Upload)
// export const updateStudentProfile = (req, res) => {
//   const studentId = req.params.id;
//   const { name, email, bio, degree, university, location, skills } = req.body;

//   if (!name || !email || !degree || !university || !location) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   // Log uploaded files for debugging
//   console.log('Uploaded files:', req.files);

//   // Update student profile
//   const updateProfileQuery = `
//     UPDATE student_profiles
//     SET bio = ?, degree = ?, university = ?, location = ?
//     WHERE student_id = ?`;

//   db.query(updateProfileQuery, [bio, degree, university, location, studentId], (err, result) => {
//     if (err) return res.status(500).json({ message: 'Database error updating profile' });

//     // Update student name and email
//     const updateStudentQuery = `
//       UPDATE students
//       SET name = ?, email = ?
//       WHERE id = ?`;

//     db.query(updateStudentQuery, [name, email, studentId], (err, result) => {
//       if (err) return res.status(500).json({ message: 'Database error updating student details' });

//       // Handle skills and certificates
//       if (skills && Array.isArray(skills)) {
//         skills.forEach((skill, index) => {
//           let certificatePath = null;

//           // If files were uploaded, match the index to get the correct file
//           if (req.files && req.files[index]) {
//             certificatePath = `/uploads/${req.files[index].filename}`;
//           }

//           const updateSkillQuery = `
//             INSERT INTO student_skills (student_id, skill_name, certificate_path)
//             VALUES (?, ?, ?)
//             ON DUPLICATE KEY UPDATE certificate_path = VALUES(certificate_path)`;

//           db.query(updateSkillQuery, [studentId, skill, certificatePath], (err, result) => {
//             if (err) {
//               console.error('Error updating skills:', err);
//               return res.status(500).json({ message: 'Database error updating skills' });
//             }
//           });
//         });
//       }

//       res.status(200).json({ message: 'Profile updated successfully' });
//     });
//   });
// };

// // Route for updating student profile
// app.put('/api/students/profile/:id', uploadCertificates, updateStudentProfile);
