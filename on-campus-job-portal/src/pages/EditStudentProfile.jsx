import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const skillOptions = [
  "Web Development",
  "Data Structures",
  "Machine Learning",
  "Cyber Security",
  "Cloud Computing",
  "Artificial Intelligence",
  "Database Management",
  "Networking"
];

const EditStudentProfile = () => {
  const navigate = useNavigate();
  const studentId = localStorage.getItem("studentId");
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    degree: "",
    university: "",
    bio: "",
    skills: []
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/student/getprofile/${studentId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.profile) {
          setFormData({
            degree: response.data.profile.degree,
            university: response.data.profile.university,
            bio: response.data.profile.bio,
            skills: response.data.profile.skills || []
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (studentId) fetchProfile();
  }, [studentId, token]);

  const handleChange = (e, index, field) => {
    if (field === "skill_name" || field === "course_duration" || field === "course_score") {
      const newSkills = [...formData.skills];
      newSkills[index][field] = e.target.value;
      setFormData({ ...formData, skills: newSkills });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const addSkillField = () => {
    if (formData.skills.length < 5) {
      setFormData({
        ...formData,
        skills: [...formData.skills, { skill_name: "", course_duration: "", course_score: "" }]
      });
    }
  };

  const removeSkillField = (index) => {
    const newSkills = [...formData.skills];
    newSkills.splice(index, 1);
    setFormData({ ...formData, skills: newSkills });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/student/editprofile/${studentId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message);
      navigate("/studentprofile");
    } catch (error) {
      alert(error.response?.data?.message || "Error updating profile");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Degree */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Degree</label>
            <input
              type="text"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* University */}
          <div>
            <label className="block text-lg font-medium text-gray-700">University</label>
            <input
              type="text"
              name="university"
              value={formData.university}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          {/* Skills Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Skills</h3>
            {formData.skills.map((skill, index) => (
              <div key={index} className="p-4 border border-gray-300 rounded-lg mt-3 bg-gray-50 shadow-sm">
                {/* Skill Name */}
                <label className="block font-medium text-gray-700">Skill Name</label>
                <select
                  value={skill.skill_name}
                  onChange={(e) => handleChange(e, index, "skill_name")}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">Select Skill</option>
                  {skillOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                {/* Course Duration */}
                <label className="block font-medium text-gray-700 mt-2">Course Duration (Months)</label>
                <input
                  type="number"
                  value={skill.course_duration}
                  onChange={(e) => handleChange(e, index, "course_duration")}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  required
                />

                {/* Course Score */}
                <label className="block font-medium text-gray-700 mt-2">Course Score (out of 100)</label>
                <input
                  type="number"
                  value={skill.course_score}
                  onChange={(e) => handleChange(e, index, "course_score")}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  required
                />

                {/* Remove Skill Button */}
                {formData.skills.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSkillField(index)}
                    className="bg-red-500 text-white p-2 rounded-lg flex items-center mt-3 hover:bg-red-600 transition-all"
                  >
                    🗑 Remove Skill
                  </button>
                )}
              </div>
            ))}

            {/* Add Skill Button */}
            {formData.skills.length < 5 && (
              <button
                type="button"
                onClick={addSkillField}
                className="bg-green-500 text-white p-3 rounded-lg mt-3 hover:bg-green-600 transition-all"
              >
                + Add Skill
              </button>
            )}
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditStudentProfile;


