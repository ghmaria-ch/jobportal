const db = require("../db"); 
 // Import database connection

// Apply for a job
exports.apply = (req, res) => {
    const { studentId, jobId } = req.body;

    if (!studentId || !jobId) {
        return res.status(400).json({ message: 'Student ID and Job ID are required' });
    }

    const checkQuery = `SELECT * FROM job_applications WHERE student_id = ? AND job_id = ?`;

    db.query(checkQuery, [studentId, jobId], (err, existingApplication) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });

        if (existingApplication.length > 0) {
            return res.status(400).json({ message: 'You have already applied for this job' });
        }

        const insertQuery = `INSERT INTO job_applications (student_id, job_id, application_status) VALUES (?, ?, 'Pending')`;

        db.query(insertQuery, [studentId, jobId], (err, result) => {
            if (err) return res.status(500).json({ message: "Error submitting application", error: err });

            res.status(200).json({ success: true, message: 'Application submitted successfully' });
        });
    });
};




// Get applied jobs for a specific student
exports.getappliedjobs = (req, res) => {
    const { studentId } = req.params;

    const query = `
    SELECT jobs.*, job_applications.application_status, job_applications.applied_at 
    FROM jobs
    JOIN job_applications ON jobs.id = job_applications.job_id
    WHERE job_applications.student_id = ?
`;

    db.query(query, [studentId], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Server error", error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "No jobs found for this student" });
        }

        res.status(200).json({ appliedJobs: results });
    });
};

exports.getappliedall = (req, res) => {
    const { studentId } = req.params;

    const query = `
    SELECT jobs.*, job_applications.application_status, job_applications.applied_at 
    FROM jobs
    JOIN job_applications ON jobs.id = job_applications.job_id
`;

    db.query(query, [studentId], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Server error", error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "No jobs found for this student" });
        }

        res.status(200).json({ appliedJobs: results });
    });
};



exports.getapplicantsforrecruiterjobs = (req, res) => {
    const { recruiterId } = req.params;

    const query = `
    SELECT 
    job_applications.id AS application_id,
    job_applications.student_id,
    job_applications.job_id,
    job_applications.application_status,
    job_applications.applied_at,
    users.name AS student_name,
    users.email AS student_email,
    student_profiles.degree,
    student_profiles.university,
    student_profiles.is_verified,  -- Include is_verified status
    student_profiles.rating,       -- Include rating
    GROUP_CONCAT(student_skills.skill_name SEPARATOR ', ') AS skills  -- Aggregate skills
FROM job_applications
JOIN jobs ON job_applications.job_id = jobs.id
JOIN users ON job_applications.student_id = users.id
LEFT JOIN student_profiles ON job_applications.student_id = student_profiles.student_id
LEFT JOIN student_skills ON job_applications.student_id = student_skills.student_id  -- Join skills
WHERE jobs.recruiter_id = 10
GROUP BY 
    job_applications.id, 
    job_applications.student_id, 
    job_applications.job_id, 
    job_applications.application_status, 
    job_applications.applied_at, 
    users.name, 
    users.email, 
    student_profiles.degree, 
    student_profiles.university, 
    student_profiles.is_verified, 
    student_profiles.rating;  -- Added rating in GROUP BY


    `;

    db.query(query, [recruiterId], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Server error", error: err });
        }

        res.status(200).json({ applicants: results });
    });
};

// Import database connection

// Function to update application status
exports.updateapplicationstatus = (req, res) => {
    const { applicationId } = req.params; // Get application ID from URL
    const { status } = req.body; // Get status from request body

    // Validate status
    const validStatuses = ['Pending', 'Accepted', 'Rejected'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }

    // Update query
    const sql = `UPDATE job_applications SET application_status = ? WHERE id = ?`;

    db.query(sql, [status, applicationId], (err, result) => {
        if (err) {
            console.error('Error updating application status:', err);
            return res.status(500).json({ message: 'Server error', error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.json({ message: `Application status updated to ${status}` });
    });
};



