// const db = require("../db");
// const path = require("path");
// const fs = require("fs"); 

// // exports.getprofile = (req, res) => {
// //     const { studentId } = req.params;

// //     const profileQuery = `
// //         SELECT sp.id, sp.student_id, u.name, u.email, sp.degree, sp.university, sp.bio, sp.rating, sp.is_verified
// //         FROM student_profiles sp
// //         JOIN users u ON sp.student_id = u.id
// //         WHERE sp.student_id = ? AND u.role = 'student'
// //     `;

// //     const skillsQuery = `
// //         SELECT skill_name, course_duration, course_score, certificate_url
// //         FROM student_skills
// //         WHERE student_id = ?
// //     `;

// //     db.query(profileQuery, [studentId], (err, profileResults) => {
// //         if (err) return res.status(500).json({ message: "Database error", error: err });

// //         if (profileResults.length === 0) return res.status(404).json({ message: "Student profile not found" });

// //         const studentProfile = profileResults[0];

// //         db.query(skillsQuery, [studentId], (err, skillsResults) => {
// //             if (err) return res.status(500).json({ message: "Error fetching skills", error: err });

// //             studentProfile.skills = skillsResults.map(skill => ({
// //                 skill_name: skill.skill_name,
// //                 course_duration: skill.course_duration,
// //                 course_score: skill.course_score,
// //                 certificate_url: skill.certificate_url
// //             }));

// //             res.status(200).json({ profile: studentProfile });
// //         });
// //     });
// // };

// const multer = require("multer"); // 📌 Requires: Multer package must be installed

// // --- MULTER CONFIGURATION (Local Storage) ---
// // Define the directory where files will be stored
// const UPLOAD_DIR = path.join(__dirname, '..', 'uploads', 'certificates');

// // Ensure the upload directory exists
// if (!fs.existsSync(UPLOAD_DIR)) {
//     fs.mkdirSync(UPLOAD_DIR, { recursive: true });
// }

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, UPLOAD_DIR);
//     },
//     filename: (req, file, cb) => {
//         // Filename: timestamp_originalName (ensures unique file names)
//         cb(null, Date.now() + '_' + file.originalname);
//     }
// });

// // Middleware function to handle the upload 
// // It expects an array of files under the field name 'certificates' (max 5 files)
// const upload = multer({ 
//     storage: storage,
//     limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit per file
// }).array('certificates', 5);


// // 📌 EXPORTED MIDDLEWARE: Handles file upload and subsequent JSON parsing
// exports.uploadCertificates = (req, res, next) => {
//     // 1. Run Multer's upload function
//     upload(req, res, (err) => {
//         if (err instanceof multer.MulterError) {
//             // Handle Multer-specific errors (e.g., file size limit exceeded)
//             return res.status(400).json({ message: "Multer error: " + err.message });
//         } else if (err) {
//             // Handle other general errors
//             return res.status(500).json({ message: "Unknown upload error: " + err.message });
//         }

//         // 2. Parse the 'skills' field
//         // The frontend sends the complex 'skills' array as a JSON string when using FormData.
//         if (req.body.skills) {
//              try {
//                 // Manually parse the string back into a JavaScript array/object
//                 req.body.skills = JSON.parse(req.body.skills);
//             } catch (e) {
//                 return res.status(400).json({ message: "Invalid JSON format for skills data." });
//             }
//         }
        
//         // 3. Continue to the main controller logic (e.g., addprofile or editprofile)
//         // Files are available on req.files and parsed body data is on req.body
//         next();
//     });
// };

// ///////////////////////////////////////////////////////////////

// // exports.getprofile = (req, res) => {
// //     const { studentId } = req.params;

// //     const profileQuery = `
// //         SELECT sp.id, sp.student_id, u.name, u.email, sp.degree, sp.university, sp.bio, sp.rating, sp.is_verified
// //         FROM student_profiles sp
// //         JOIN users u ON sp.student_id = u.id
// //         WHERE sp.student_id = ? AND u.role = 'student'
// //     `;

// //     const skillsQuery = `
// //         SELECT skill_name, course_duration, course_score
// //         FROM student_skills
// //         WHERE student_id = ?
// //     `;

// //     db.query(profileQuery, [studentId], (err, profileResults) => {
// //         if (err) return res.status(500).json({ message: "Database error", error: err });

// //         if (profileResults.length === 0) return res.status(404).json({ message: "Student profile not found" });

// //         const studentProfile = profileResults[0];

// //         db.query(skillsQuery, [studentId], (err, skillsResults) => {
// //             if (err) return res.status(500).json({ message: "Error fetching skills", error: err });

// //             studentProfile.skills = skillsResults.map(skill => ({
// //                 skill_name: skill.skill_name,
// //                 course_duration: skill.course_duration,
// //                 course_score: skill.course_score
// //             }));

// //             res.status(200).json({ profile: studentProfile });
// //         });
// //     });
// // };
// /////////////////////////////////////////////////////////////////////////////////////

// exports.getprofile = (req, res) => {
//     const { studentId } = req.params;

//     const profileQuery = `
//         SELECT sp.id, sp.student_id, u.name, u.email, sp.degree, sp.university, sp.bio, sp.rating, sp.is_verified
//         FROM student_profiles sp
//         JOIN users u ON sp.student_id = u.id
//         WHERE sp.student_id = ? AND u.role = 'student'
//     `;

//     const skillsQuery = `
//         SELECT skill_name, course_duration, course_score, certificate_url 
//         FROM student_skills
//         WHERE student_id = ?
//     `;

//     db.query(profileQuery, [studentId], (err, profileResults) => {
//         if (err) return res.status(500).json({ message: "Database error", error: err });

//         if (profileResults.length === 0) return res.status(404).json({ message: "Student profile not found" });

//         const studentProfile = profileResults[0];

//         db.query(skillsQuery, [studentId], (err, skillsResults) => {
//             if (err) return res.status(500).json({ message: "Error fetching skills", error: err });

//             studentProfile.skills = skillsResults.map(skill => ({
//                 skill_name: skill.skill_name,
//                 course_duration: skill.course_duration,
//                 course_score: skill.course_score,
//                 certificate_url: skill.certificate_url // 📌 Include the new column
//             }));

//             res.status(200).json({ profile: studentProfile });
//         });
//     });
// };


// /////////////////////////////////////////////////////////////////////////////////////

// exports.getallprofiles = (req, res) => {
//     const profileQuery = `
//         SELECT sp.id, sp.student_id, u.name, u.email, sp.degree, sp.university, sp.bio, sp.rating
//         FROM student_profiles sp
//         JOIN users u ON sp.student_id = u.id
//         WHERE u.role = 'student'
//     `;

//     const skillsQuery = `
//         SELECT ss.student_id, ss.skill_name, ss.course_duration, ss.course_score
//         FROM student_skills ss
//     `;

//     db.query(profileQuery, (err, profileResults) => {
//         if (err) return res.status(500).json({ message: "Database error", error: err });

//         if (profileResults.length === 0) return res.status(404).json({ message: "No student profiles found" });

//         db.query(skillsQuery, (err, skillsResults) => {
//             if (err) return res.status(500).json({ message: "Error fetching skills", error: err });

//             // Mapping skills and rating to the respective student profiles
//             const studentProfiles = profileResults.map(profile => ({
//                 ...profile,
//                 rating: profile.rating, // Ensure rating is included
//                 skills: skillsResults
//                     .filter(skill => skill.student_id === profile.student_id)
//                     .map(skill => ({
//                         skill_name: skill.skill_name,
//                         course_duration: skill.course_duration,
//                         course_score: skill.course_score
//                     }))
//             }));

//             res.status(200).json({ profiles: studentProfiles });
//         });
//     });
// };



// ////////////////////////////////////////////////////////////////////////////////////////////////////

// // exports.addprofile = (req, res) => {
// //     const { student_id, degree, university, bio, skills } = req.body;

// //     // Check if profile already exists
// //     const checkProfileQuery = `SELECT id FROM student_profiles WHERE student_id = ?`;

// //     db.query(checkProfileQuery, [student_id], (err, results) => {
// //         if (err) return res.status(500).json({ message: "Database error", error: err });

// //         if (results.length > 0) {
// //             return res.status(400).json({ message: "Profile already exists. You cannot add another." });
// //         }

// //         // Insert new profile if it doesn't exist
// //         const insertProfileQuery = `
// //             INSERT INTO student_profiles (student_id, degree, university, bio, is_verified)
// //             VALUES (?, ?, ?, ?, 0)
// //         `;

// //         db.query(insertProfileQuery, [student_id, degree, university, bio], (err, profileResult) => {
// //             if (err) return res.status(500).json({ message: "Error inserting profile", error: err });

// //             // Insert skills
// //             const insertSkillsQuery = `
// //                 INSERT INTO student_skills (student_id, skill_name, course_duration, course_score)
// //                 VALUES ?
// //             `;

// //             const skillValues = skills.map(skill => [student_id, skill.skill_name, skill.course_duration, skill.course_score]);

// //             db.query(insertSkillsQuery, [skillValues], (err) => {
// //                 if (err) return res.status(500).json({ message: "Error inserting skills", error: err });

// //                 res.status(201).json({ message: "Profile added successfully" });
// //             });
// //         });
// //     });
// // };

// //////////////////////////////////////////////////////////////////////////////////////////////////////////
// exports.addprofile = (req, res) => {
//     const { student_id, degree, university, bio, skills } = req.body;
//     const uploadedFiles = req.files || []; // 📌 Get uploaded files

//     // ... (rest of profile check and insert logic remains the same)

//     db.query(checkProfileQuery, [student_id], (err, results) => {
//         if (err) return res.status(500).json({ message: "Database error", error: err });

//         if (results.length > 0) {
//             return res.status(400).json({ message: "Profile already exists. You cannot add another." });
//         }

//         const insertProfileQuery = `
//             INSERT INTO student_profiles (student_id, degree, university, bio, is_verified)
//             VALUES (?, ?, ?, ?, 0)
//         `;

//         db.query(insertProfileQuery, [student_id, degree, university, bio], (err, profileResult) => {
//             if (err) return res.status(500).json({ message: "Error inserting profile", error: err });

//             // 📌 Update query to include the new column
//             const insertSkillsQuery = `
//                 INSERT INTO student_skills (student_id, skill_name, course_duration, course_score, certificate_url)
//                 VALUES ?
//             `;

//             // 📌 Create skill values, mapping file array indices
//             const skillValues = skills.map((skill, index) => {
//                 const file = uploadedFiles.find(f => f.fieldname === `certificates[${index}]`);

//                 return [
//                     student_id, 
//                     skill.skill_name, 
//                     skill.course_duration, 
//                     skill.course_score, 
//                     file ? `/uploads/certificates/${file.filename}` : null // 📌 Store relative path
//                 ];
//             });

//             db.query(insertSkillsQuery, [skillValues], (err) => {
//                 if (err) return res.status(500).json({ message: "Error inserting skills", error: err });
//                 res.status(201).json({ message: "Profile added successfully" });
//             });
//         });
//     });
// };
// ///////////////////////////////////////////////////////////////////////////////////////////////////////

// // exports.editprofile = (req, res) => {
// //     const { studentId } = req.params;
// //     const { degree, university, bio, skills } = req.body;

// //     // Update student profile query
// //     const updateProfileQuery = `
// //         UPDATE student_profiles 
// //         SET degree = ?, university = ?, bio = ? 
// //         WHERE student_id = ?
// //     `;

// //     db.query(updateProfileQuery, [degree, university, bio, studentId], (err, result) => {
// //         if (err) return res.status(500).json({ message: "Database error", error: err });

// //         // Remove existing skills
// //         const deleteSkillsQuery = `DELETE FROM student_skills WHERE student_id = ?`;
// //         db.query(deleteSkillsQuery, [studentId], (err) => {
// //             if (err) return res.status(500).json({ message: "Error updating skills", error: err });

// //             // Insert new skills if provided
// //             if (skills.length > 0) {
// //                 const insertSkillsQuery = `
// //                     INSERT INTO student_skills (student_id, skill_name, course_duration, course_score)
// //                     VALUES ?
// //                 `;

// //                 const skillsValues = skills.map(skill => [studentId, skill.skill_name, skill.course_duration, skill.course_score]);

// //                 db.query(insertSkillsQuery, [skillsValues], (err) => {
// //                     if (err) return res.status(500).json({ message: "Error inserting new skills", error: err });

// //                     res.status(200).json({ message: "Profile updated successfully!" });
// //                 });
// //             } else {
// //                 res.status(200).json({ message: "Profile updated successfully!" });
// //             }
// //         });
// //     });
// // };
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// exports.editprofile = (req, res) => {
//     const { studentId } = req.params;
//     const { degree, university, bio, skills } = req.body; // 📌 skills now contains old certificate_url

//     const uploadedFiles = req.files || []; // 📌 Get uploaded files

//     // ... (rest of profile update logic remains the same)

//     db.query(updateProfileQuery, [degree, university, bio, studentId], (err, result) => {
//         if (err) return res.status(500).json({ message: "Database error", error: err });

//         const deleteSkillsQuery = `DELETE FROM student_skills WHERE student_id = ?`;
//         db.query(deleteSkillsQuery, [studentId], (err) => {
//             if (err) return res.status(500).json({ message: "Error updating skills", error: err });

//             if (skills.length > 0) {
//                 // 📌 Update query to include the new column
//                 const insertSkillsQuery = `
//                     INSERT INTO student_skills (student_id, skill_name, course_duration, course_score, certificate_url)
//                     VALUES ?
//                 `;

//                 // 📌 Create skill values, prioritizing new file upload over old URL (if one exists in the payload)
//                 const skillsValues = skills.map((skill, index) => {
//                     const file = uploadedFiles.find(f => f.fieldname === `certificates[${index}]`);

//                     return [
//                         studentId, 
//                         skill.skill_name, 
//                         skill.course_duration, 
//                         skill.course_score, 
//                         // Use new file path OR the old URL sent back from the frontend.
//                         file ? `/uploads/certificates/${file.filename}` : (skill.certificate_url || null)
//                     ];
//                 });

//                 db.query(insertSkillsQuery, [skillsValues], (err) => {
//                     if (err) return res.status(500).json({ message: "Error inserting new skills", error: err });
//                     res.status(200).json({ message: "Profile updated successfully!" });
//                 });
//             } else {
//                 res.status(200).json({ message: "Profile updated successfully!" });
//             }
//         });
//     });
// };
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // Update student rating
// exports.updatestudentrating = (req, res) => {
//     const { studentId } = req.params;
//     const { rating } = req.body;

//     if (!rating || rating < 0 || rating > 10) {
//         return res.status(400).json({ message: "Invalid rating. It must be between 0 and 10." });
//     }

//     const updateQuery = `UPDATE student_profiles SET rating = ? WHERE student_id = ?`;

//     db.query(updateQuery, [rating, studentId], (err, result) => {
//         if (err) {
//             console.error("Error updating rating:", err);
//             return res.status(500).json({ message: "Database error", error: err });
//         }

//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: "Student not found" });
//         }

//         res.status(200).json({ message: "Rating updated successfully!" });
//     });
// };




const db = require("../db");
const path = require("path");
const fs = require("fs"); 
const multer = require("multer"); // 📌 NEW IMPORT

// --- MULTER CONFIGURATION (Local Storage) ---
const UPLOAD_DIR = path.join(__dirname, '..', 'uploads', 'certificates');

// Ensure the upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

// 📌 Multer configuration using .fields() to accept all named fields
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
}).fields([
    { name: 'certificates', maxCount: 5 }, // File array field
    { name: 'degree', maxCount: 1 },       // Text field
    { name: 'university', maxCount: 1 },   // Text field
    { name: 'bio', maxCount: 1 },          // Text field
    { name: 'skills', maxCount: 1 }        // Text field (JSON string)
]);


// 📌 EXPORTED MIDDLEWARE: Handles file upload and subsequent data parsing
exports.uploadCertificates = (req, res, next) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: "Multer error: " + err.message });
        } else if (err) {
            return res.status(500).json({ message: "Unknown upload error: " + err.message });
        }

        // --- Post-Multer Data Normalization (CRITICAL FIX) ---
        // Multer's .fields() puts single-value fields into req.body as an array [value].
        // We must extract the actual value from the array.
        
        // 1. Extract plain text values from the array wrapping
        req.body.degree = req.body.degree ? req.body.degree[0] : undefined;
        req.body.university = req.body.university ? req.body.university[0] : undefined;
        req.body.bio = req.body.bio ? req.body.bio[0] : undefined;
        
        // 2. Parse the 'skills' JSON string
        if (req.body.skills) {
            const skillsString = Array.isArray(req.body.skills) ? req.body.skills[0] : req.body.skills;
             try {
                req.body.skills = JSON.parse(skillsString);
            } catch (e) {
                return res.status(400).json({ message: "Invalid JSON format for skills data." });
            }
        }
        
        // 3. Normalize the files object to be an array (req.files.certificates)
        req.files = req.files.certificates || [];

        next();
    });
};

// ... (rest of the controller functions follow) ...

exports.getprofile = (req, res) => {
    const { studentId } = req.params;

    const profileQuery = `
        SELECT sp.id, sp.student_id, u.name, u.email, sp.degree, sp.university, sp.bio, sp.rating, sp.is_verified
        FROM student_profiles sp
        JOIN users u ON sp.student_id = u.id
        WHERE sp.student_id = ? AND u.role = 'student'
    `;

    const skillsQuery = `
        SELECT skill_name, course_duration, course_score, certificate_url
        FROM student_skills
        WHERE student_id = ?
    `;

    db.query(profileQuery, [studentId], (err, profileResults) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });

        if (profileResults.length === 0) return res.status(404).json({ message: "Student profile not found" });

        const studentProfile = profileResults[0];

        db.query(skillsQuery, [studentId], (err, skillsResults) => {
            if (err) return res.status(500).json({ message: "Error fetching skills", error: err });

            studentProfile.skills = skillsResults.map(skill => ({
                skill_name: skill.skill_name,
                course_duration: skill.course_duration,
                course_score: skill.course_score,
                certificate_url: skill.certificate_url // 📌 Include new column
            }));

            res.status(200).json({ profile: studentProfile });
        });
    });
};


exports.getallprofiles = (req, res) => {
    const profileQuery = `
        SELECT sp.id, sp.student_id, u.name, u.email, sp.degree, sp.university, sp.bio, sp.rating
        FROM student_profiles sp
        JOIN users u ON sp.student_id = u.id
        WHERE u.role = 'student'
    `;

    const skillsQuery = `
        SELECT ss.student_id, ss.skill_name, ss.course_duration, ss.course_score, ss.certificate_url
        FROM student_skills ss
    `;

    db.query(profileQuery, (err, profileResults) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });

        if (profileResults.length === 0) return res.status(404).json({ message: "No student profiles found" });

        db.query(skillsQuery, (err, skillsResults) => {
            if (err) return res.status(500).json({ message: "Error fetching skills", error: err });

            // Mapping skills and rating to the respective student profiles
            const studentProfiles = profileResults.map(profile => ({
                ...profile,
                rating: profile.rating, // Ensure rating is included
                skills: skillsResults
                    .filter(skill => skill.student_id === profile.student_id)
                    .map(skill => ({
                        skill_name: skill.skill_name,
                        course_duration: skill.course_duration,
                        course_score: skill.course_score,
                        certificate_url: skill.certificate_url // 📌 Include new column
                    }))
            }));

            res.status(200).json({ profiles: studentProfiles });
        });
    });
};





exports.addprofile = (req, res) => {
    const { student_id, degree, university, bio, skills } = req.body;
    const uploadedFiles = req.files || []; // 📌 Get uploaded files

    // Check if profile already exists
    const checkProfileQuery = `SELECT id FROM student_profiles WHERE student_id = ?`;

    db.query(checkProfileQuery, [student_id], (err, results) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });

        if (results.length > 0) {
            return res.status(400).json({ message: "Profile already exists. You cannot add another." });
        }

        // Insert new profile if it doesn't exist
        const insertProfileQuery = `
            INSERT INTO student_profiles (student_id, degree, university, bio, is_verified)
            VALUES (?, ?, ?, ?, 0)
        `;

        db.query(insertProfileQuery, [student_id, degree, university, bio], (err, profileResult) => {
            if (err) return res.status(500).json({ message: "Error inserting profile", error: err });

            // 📌 Update query to include the new column
            const insertSkillsQuery = `
                INSERT INTO student_skills (student_id, skill_name, course_duration, course_score, certificate_url)
                VALUES ?
            `;

            // 📌 Create skill values, mapping file array indices
            const skillValues = skills.map((skill, index) => {
                const file = uploadedFiles.find(f => f.fieldname === `certificates[${index}]`);

                return [
                    student_id, 
                    skill.skill_name, 
                    skill.course_duration, 
                    skill.course_score, 
                    file ? `/uploads/certificates/${file.filename}` : null // 📌 Store relative path
                ];
            });

            db.query(insertSkillsQuery, [skillValues], (err) => {
                if (err) return res.status(500).json({ message: "Error inserting skills", error: err });
                res.status(201).json({ message: "Profile added successfully" });
            });
        });
    });
};

exports.editprofile = (req, res) => {
    const { studentId } = req.params;
    const { degree, university, bio, skills } = req.body; // 📌 skills now contains old certificate_url

    const uploadedFiles = req.files || []; // 📌 Get uploaded files

    // Update student profile query
    const updateProfileQuery = `
        UPDATE student_profiles 
        SET degree = ?, university = ?, bio = ? 
        WHERE student_id = ?
    `;

    db.query(updateProfileQuery, [degree, university, bio, studentId], (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });

        const deleteSkillsQuery = `DELETE FROM student_skills WHERE student_id = ?`;
        db.query(deleteSkillsQuery, [studentId], (err) => {
            if (err) return res.status(500).json({ message: "Error updating skills", error: err });

            if (skills.length > 0) {
                // 📌 Update query to include the new column
                const insertSkillsQuery = `
                    INSERT INTO student_skills (student_id, skill_name, course_duration, course_score, certificate_url)
                    VALUES ?
                `;

                // 📌 Create skill values, prioritizing new file upload over old URL (if one exists in the payload)
                const skillsValues = skills.map((skill, index) => {
                    const file = uploadedFiles.find(f => f.fieldname === `certificates[${index}]`);

                    return [
                        studentId, 
                        skill.skill_name, 
                        skill.course_duration, 
                        skill.course_score, 
                        // Use new file path OR the old URL sent back from the frontend.
                        file ? `/uploads/certificates/${file.filename}` : (skill.certificate_url || null)
                    ];
                });

                db.query(insertSkillsQuery, [skillsValues], (err) => {
                    if (err) return res.status(500).json({ message: "Error inserting new skills", error: err });
                    res.status(200).json({ message: "Profile updated successfully!" });
                });
            } else {
                res.status(200).json({ message: "Profile updated successfully!" });
            }
        });
    });
};


// Update student rating
exports.updatestudentrating = (req, res) => {
    const { studentId } = req.params;
    const { rating } = req.body;

    if (!rating || rating < 0 || rating > 10) {
        return res.status(400).json({ message: "Invalid rating. It must be between 0 and 10." });
    }

    const updateQuery = `UPDATE student_profiles SET rating = ? WHERE student_id = ?`;

    db.query(updateQuery, [rating, studentId], (err, result) => {
        if (err) {
            console.error("Error updating rating:", err);
            return res.status(500).json({ message: "Database error", error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ message: "Rating updated successfully!" });
    });
};