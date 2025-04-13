const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assumes you have a 'Student' model
    required: true
  },
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobPosting', // Assumes your job schema is named JobPosting
    required: true
  },
  applied_at: {
    type: Date,
    default: Date.now
  },
  application_status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending'
  }
});

module.exports = mongoose.model('Application', applicationSchema);
