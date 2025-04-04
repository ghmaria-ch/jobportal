const studentSkillSchema = new mongoose.Schema({
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    skill_name: {
      type: String,
      enum: [
        'Web Development',
        'Data Structures',
        'Machine Learning',
        'Cyber Security',
        'Cloud Computing',
        'Artificial Intelligence',
        'Database Management',
        'Networking'
      ],
      required: true
    },
    course_duration: { type: String, required: true },
    course_score: { type: Number }
  });
  
  module.exports = mongoose.model("StudentSkill", studentSkillSchema);
  