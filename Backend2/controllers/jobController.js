const db = require('../db'); // Ensure you have a database connection

// const db = require('../config/db');

exports.postajob = (req, res) => {
    console.log("📥 Received Data:", req.body);  // Debugging incoming request

    const { recruiterId, title, description, requiredSkills, location, jobType, salary } = req.body;

    if (!recruiterId || !title || !description || !requiredSkills || !location || !jobType) {
        console.error("🚨 Missing Fields:", req.body);
        return res.status(400).json({ message: "All fields except salary are required." });
    }

    const skillsArray = Array.isArray(requiredSkills) ? requiredSkills : [];

    const query = `
        INSERT INTO jobs (recruiter_id, title, description, required_skills, location, job_type, salary) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [recruiterId, title, description, JSON.stringify(skillsArray), location, jobType, salary || null], (err, result) => {
        if (err) {
            console.error("❌ Database Error:", err);
            return res.status(500).json({ message: "Database error", error: err });
        }
        res.status(201).json({ message: "Job posted successfully", jobId: result.insertId });
    });
};


exports.getrecruiterjobs = (req, res) => {
    console.log("📥 Received Request:", req.params); // Debugging log

    const { recruiterId } = req.params;
    if (!recruiterId) {
        return res.status(400).json({ message: "Recruiter ID is required" });
    }

    const query = `
        SELECT id, title, required_skills, location, job_type, salary, 
               DATE_FORMAT(created_at, '%d %M %Y') AS posted_date 
        FROM jobs 
        WHERE recruiter_id = ?
    `;

    console.log("🔍 Executing Query:", query, [recruiterId]); // Debugging log

    db.query(query, [recruiterId], (err, results) => {
        if (err) {
            console.error("❌ Database Error:", err);
            return res.status(500).json({ message: "Database error", error: err.message });
        }

        console.log("✅ Query Results:", results); // Debugging log

        if (results.length === 0) {
            return res.status(404).json({ message: "No jobs found for this recruiter." });
        }

        res.status(200).json(results);
    });
};


exports.getjobs = (req, res) => {
    console.log("📥 Received Request:", req.params); // Debugging log

   

    const query = `
        SELECT id, title, required_skills, location, job_type, salary, 
               DATE_FORMAT(created_at, '%d %M %Y') AS posted_date 
        FROM jobs 
    `;


    db.query(query,  (err, results) => {
        if (err) {
            console.error("❌ Database Error:", err);
            return res.status(500).json({ message: "Database error", error: err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "No jobs found for this recruiter." });
        }

        res.status(200).json(results);
    });
};



 
exports.deletejob = async (req, res) => {
  const { jobId } = req.params;

  try {
    const deleteQuery = 'DELETE FROM jobs WHERE id = ?';
    const [result] = await db.promise().execute(deleteQuery, [jobId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




