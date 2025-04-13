const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    maxlength: 100,
    unique: true
  },
  password: {
    type: String,
    required: true,
    maxlength: 255
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'student', 'recruiter']
  }
});

// Create and export the User model
module.exports = mongoose.model('User', userSchema);
