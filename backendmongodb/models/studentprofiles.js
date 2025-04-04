const studentProfileSchema = new mongoose.Schema({
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    degree: String,
    university: String,
    bio: String,
    rating: { type: Number, default: 0.0 },
    is_verified: { type: Boolean, default: false }
  });
  
  module.exports = mongoose.model("StudentProfile", studentProfileSchema);
  