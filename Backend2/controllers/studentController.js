const db = require("../db");
const path = require("path");
const fs = require("fs"); 

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
//                 certificate_url: skill.certificate_url
//             }));

//             res.status(200).json({ profile: studentProfile });
//         });
//     });
// };
exports.getprofile = (req, res) => {
    const { studentId } = req.params;

    const profileQuery = `
        SELECT sp.id, sp.student_id, u.name, u.email, sp.degree, sp.university, sp.bio, sp.rating, sp.is_verified
        FROM student_profiles sp
        JOIN users u ON sp.student_id = u.id
        WHERE sp.student_id = ? AND u.role = 'student'
    `;

    const skillsQuery = `
        SELECT skill_name, course_duration, course_score
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
                course_score: skill.course_score
            }));

            res.status(200).json({ profile: studentProfile });
        });
    });
};




exports.addprofile = (req, res) => {
    const { student_id, degree, university, bio, skills } = req.body;

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

            // Insert skills
            const insertSkillsQuery = `
                INSERT INTO student_skills (student_id, skill_name, course_duration, course_score)
                VALUES ?
            `;

            const skillValues = skills.map(skill => [student_id, skill.skill_name, skill.course_duration, skill.course_score]);

            db.query(insertSkillsQuery, [skillValues], (err) => {
                if (err) return res.status(500).json({ message: "Error inserting skills", error: err });

                res.status(201).json({ message: "Profile added successfully" });
            });
        });
    });
};

exports.editprofile = (req, res) => {
    const { studentId } = req.params;
    const { degree, university, bio, skills } = req.body;

    // Update student profile query
    const updateProfileQuery = `
        UPDATE student_profiles 
        SET degree = ?, university = ?, bio = ? 
        WHERE student_id = ?
    `;

    db.query(updateProfileQuery, [degree, university, bio, studentId], (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });

        // Remove existing skills
        const deleteSkillsQuery = `DELETE FROM student_skills WHERE student_id = ?`;
        db.query(deleteSkillsQuery, [studentId], (err) => {
            if (err) return res.status(500).json({ message: "Error updating skills", error: err });

            // Insert new skills if provided
            if (skills.length > 0) {
                const insertSkillsQuery = `
                    INSERT INTO student_skills (student_id, skill_name, course_duration, course_score)
                    VALUES ?
                `;

                const skillsValues = skills.map(skill => [studentId, skill.skill_name, skill.course_duration, skill.course_score]);

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




