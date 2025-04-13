// models/StudentSkill.js
const mongoose = require("mongoose");

const studentSkillSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // assuming your student users are stored in the "User" model
        required: true,
    },
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
        required: true,
    },
    course_duration: {
        type: String,
        required: true,
    },
    course_score: {
        type: Number,
        default: null,
    }
}, { timestamps: true });

module.exports = mongoose.model("StudentSkill", studentSkillSchema);
