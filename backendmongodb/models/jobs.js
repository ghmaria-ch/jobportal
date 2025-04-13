const mongoose = require('mongoose');

const jobPostingSchema = new mongoose.Schema({
  recruiter_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assuming the recruiter is a User with a role of 'recruiter'
    required: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 255
  },
  description: {
    type: String,
    required: true
  },
  required_skills: {
    type: [String], // Array of strings, representing the required skills
    required: true
  },
  location: {
    type: String,
    required: true,
    maxlength: 255
  },
  job_type: {
    type: String,
    required: true,
    enum: ['Full-Time', 'Part-Time', 'Internship', 'Contract']
  },
  salary: {
    type: Number, // For decimal values
    required: false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Create and export the JobPosting model
module.exports = mongoose.model('JobPosting', jobPostingSchema);
