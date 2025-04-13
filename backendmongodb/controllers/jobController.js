const JobPosting = require('../models/jobs');
const mongoose = require('mongoose');

// POST a job
exports.postajob = async (req, res) => {
  const { recruiterId, title, description, requiredSkills, location, jobType, salary } = req.body;

  if (!recruiterId || !title || !description || !requiredSkills || !location || !jobType) {
    return res.status(400).json({ message: "All fields except salary are required." });
  }

  try {
    const job = new JobPosting({
      recruiter_id: recruiterId,
      title,
      description,
      required_skills: requiredSkills,
      location,
      job_type: jobType,
      salary: salary || undefined
    });

    const savedJob = await job.save();
    res.status(201).json({ message: "Job posted successfully", jobId: savedJob._id });
  } catch (err) {
    console.error("❌ Error saving job:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

// GET jobs for a recruiter
exports.getrecruiterjobs = async (req, res) => {
  const { recruiterId } = req.params;

  if (!recruiterId) {
    return res.status(400).json({ message: "Recruiter ID is required" });
  }

  try {
    const jobs = await JobPosting.find({ recruiter_id: recruiterId });

    const formatted = jobs.map(job => ({
      id: job._id,
      title: job.title,
      required_skills: job.required_skills,
      location: job.location,
      job_type: job.job_type,
      salary: job.salary,
      posted_date: job.created_at.toLocaleDateString('en-GB', {
        day: '2-digit', month: 'long', year: 'numeric'
      })
    }));

    if (!formatted.length) {
      return res.status(404).json({ message: "No jobs found for this recruiter." });
    }

    res.status(200).json(formatted);
  } catch (err) {
    console.error("❌ Error fetching recruiter jobs:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET all jobs
exports.getjobs = async (req, res) => {
  try {
    const jobs = await JobPosting.find();

    const formatted = jobs.map(job => ({
      id: job._id,
      title: job.title,
      required_skills: job.required_skills,
      location: job.location,
      job_type: job.job_type,
      salary: job.salary,
      posted_date: job.created_at.toLocaleDateString('en-GB', {
        day: '2-digit', month: 'long', year: 'numeric'
      })
    }));

    if (!formatted.length) {
      return res.status(404).json({ message: "No jobs found." });
    }

    res.status(200).json(formatted);
  } catch (err) {
    console.error("❌ Error fetching jobs:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE a job
exports.deletejob = async (req, res) => {
  const { jobId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({ message: 'Invalid job ID' });
  }

  try {
    const deleted = await JobPosting.findByIdAndDelete(jobId);

    if (!deleted) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (err) {
    console.error("❌ Error deleting job:", err);
    res.status(500).json({ message: 'Server error' });
  }
};
