const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId, // assuming this references a `User` or `Student` document
    required: true,
    ref: 'User' // or 'Student', depending on your user model
  },
  degree: {
    type: String,
    maxlength: 100
  },
  university: {
    type: String,
    maxlength: 255
  },
  bio: {
    type: String
  },
  rating: {
    type: Number,
    default: 0.0
  },  
  is_verified: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('StudentProfile', studentProfileSchema);
