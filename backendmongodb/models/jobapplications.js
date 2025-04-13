const mongoose = require ("mongoose")

const jobApplicationSchema = new mongoose.Schema({
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    job_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    application_status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },
    applied_at: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model("JobApplication", jobApplicationSchema);
  