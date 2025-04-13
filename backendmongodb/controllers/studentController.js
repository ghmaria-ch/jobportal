const StudentProfile = require("../models/studentprofiles");
const StudentSkill = require("../models/studentskills");
const User = require("../models/users");

// GET profile by studentId
exports.getprofile = async (req, res) => {
    const { studentId } = req.params;

    try {
        const user = await User.findOne({ _id: studentId, role: "student" }).select("name email");
        if (!user) return res.status(404).json({ message: "Student not found" });

        const profile = await StudentProfile.findOne({ student_id: studentId });
        if (!profile) return res.status(404).json({ message: "Student profile not found" });

        const skills = await StudentSkill.find({ student_id: studentId });

        res.status(200).json({
            profile: {
                ...profile.toObject(),
                name: user.name,
                email: user.email,
                skills
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};

// GET all student profiles
exports.getallprofiles = async (req, res) => {
    try {
        const users = await User.find({ role: "student" }).select("_id name email");
        const profiles = await StudentProfile.find();
        const skills = await StudentSkill.find();

        const allProfiles = profiles.map(profile => {
            const user = users.find(u => u._id.toString() === profile.student_id.toString());
            return {
                ...profile.toObject(),
                name: user?.name,
                email: user?.email,
                skills: skills
                    .filter(skill => skill.student_id.toString() === profile.student_id.toString())
            };
        });

        res.status(200).json({ profiles: allProfiles });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};

// POST create student profile
exports.addprofile = async (req, res) => {
    const { student_id, degree, university, bio, skills } = req.body;

    try {
        const existing = await StudentProfile.findOne({ student_id });
        if (existing) return res.status(400).json({ message: "Profile already exists" });

        const newProfile = new StudentProfile({
            student_id,
            degree,
            university,
            bio,
            is_verified: false
        });
        await newProfile.save();

        const skillDocs = skills.map(skill => ({
            student_id,
            skill_name: skill.skill_name,
            course_duration: skill.course_duration,
            course_score: skill.course_score
        }));
        await StudentSkill.insertMany(skillDocs);

        res.status(201).json({ message: "Profile added successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};

// PUT update student profile
exports.editprofile = async (req, res) => {
    const { studentId } = req.params;
    const { degree, university, bio, skills } = req.body;

    try {
        await StudentProfile.findOneAndUpdate(
            { student_id: studentId },
            { degree, university, bio }
        );

        await StudentSkill.deleteMany({ student_id: studentId });

        if (skills.length > 0) {
            const skillDocs = skills.map(skill => ({
                student_id: studentId,
                skill_name: skill.skill_name,
                course_duration: skill.course_duration,
                course_score: skill.course_score
            }));
            await StudentSkill.insertMany(skillDocs);
        }

        res.status(200).json({ message: "Profile updated successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};

// PUT update student rating
exports.updatestudentrating = async (req, res) => {
    const { studentId } = req.params;
    const { rating } = req.body;

    if (!rating || rating < 0 || rating > 10) {
        return res.status(400).json({ message: "Invalid rating. It must be between 0 and 10." });
    }

    try {
        const result = await StudentProfile.findOneAndUpdate(
            { student_id: studentId },
            { rating },
            { new: true }
        );

        if (!result) return res.status(404).json({ message: "Student not found" });

        res.status(200).json({ message: "Rating updated successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
