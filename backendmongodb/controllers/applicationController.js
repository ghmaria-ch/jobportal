const JobApplication = require('../models/jobapplications');
const JobPosting = require('../models/jobs');
const User = require('../models/users');
const StudentProfile = require('../models/studentprofiles');
const StudentSkill = require('../models/studentskills');

// Apply for a job
exports.apply = async (req, res) => {
  const { studentId, jobId } = req.body;

  if (!studentId || !jobId) {
    return res.status(400).json({ message: 'Student ID and Job ID are required' });
  }

  try {
    const existingApplication = await JobApplication.findOne({ student_id: studentId, job_id: jobId });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    const newApplication = new JobApplication({ student_id: studentId, job_id: jobId });
    await newApplication.save();

    res.status(200).json({ success: true, message: 'Application submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// Get applied jobs for a student
// Get applied jobs for a student
exports.getappliedjobs = async (req, res) => {
  const { studentId } = req.params;

  try {
    const appliedJobs = await JobApplication.find({ student_id: studentId })
      .populate('job_id');

    if (appliedJobs.length === 0) {
      return res.status(200).json({ appliedJobs: [] }); // Return empty list instead of 404
    }

    // Flatten the job data so frontend doesn't need to access job.job_id
    const formattedJobs = appliedJobs.map(app => {
      const job = app.job_id;

      return {
        id: app._id,
        job_id: job?._id,
        title: job?.title || "N/A",
        location: job?.location || "N/A",
        description: job?.description || "N/A",
        salary: job?.salary || 0,
        job_type: job?.job_type || "N/A",
        required_skills: job?.required_skills || [],
        application_status: app.application_status || "Pending",
        created_at: app.applied_at || app.createdAt, // whichever field is correct
      };
    });

    res.status(200).json({ appliedJobs: formattedJobs });
  } catch (err) {
    console.error("Error in getappliedjobs:", err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};


// Get all applications
exports.getappliedall = async (req, res) => {
  try {
    const applications = await JobApplication.find().populate('job_id');

    if (applications.length === 0) {
      return res.status(404).json({ message: 'No job applications found' });
    }

    res.status(200).json({ appliedJobs: applications });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// Get applicants for recruiter's jobs
exports.getapplicantsforrecruiterjobs = async (req, res) => {
  const { recruiterId } = req.params;

  try {
    const jobs = await JobPosting.find({ recruiter_id: recruiterId }, '_id');
    const jobIds = jobs.map(job => job._id);

    const applications = await JobApplication.find({ job_id: { $in: jobIds } })
      .populate('student_id', 'name email')
      .populate('job_id');

    const detailedApplicants = await Promise.all(applications.map(async app => {
      const profile = await StudentProfile.findOne({ student_id: app.student_id._id });
      const skills = await StudentSkill.find({ student_id: app.student_id._id });

      return {
        application_id: app._id,
        student_id: app.student_id._id,
        job_id: app.job_id._id,
        application_status: app.application_status,
        applied_at: app.applied_at,
        student_name: app.student_id.name,
        student_email: app.student_id.email,
        degree: profile?.degree || null,
        university: profile?.university || null,
        is_verified: profile?.is_verified || false,
        rating: profile?.rating || null,
        skills: skills.map(s => s.skill_name)
      };
    }));

    res.status(200).json({ applicants: detailedApplicants });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// Update application status
exports.updateapplicationstatus = async (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body;

  const validStatuses = ['Pending', 'Accepted', 'Rejected'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const result = await JobApplication.findByIdAndUpdate(applicationId, { application_status: status });

    if (!result) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({ message: `Application status updated to ${status}` });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};
