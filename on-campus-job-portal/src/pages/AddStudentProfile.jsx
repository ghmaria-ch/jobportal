// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const skillOptions = [
//   "Web Development",
//   "Data Structures",
//   "Machine Learning",
//   "Cyber Security",
//   "Cloud Computing",
//   "Artificial Intelligence",
//   "Database Management",
//   "Networking"
// ];

// const AddStudentProfile = () => {
//   const navigate = useNavigate();
//   const studentId = localStorage.getItem("studentId");
//   const token = localStorage.getItem("token");

//   const [profileExists, setProfileExists] = useState(false);
//   const [formData, setFormData] = useState({
//     degree: "",
//     university: "",
//     bio: "",
//     skills: [{ skill_name: "", course_duration: "", course_score: "" }]
//   });

//   useEffect(() => {
//     const checkProfile = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/student/getprofile/${studentId}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         if (response.data.profile) {
//           setProfileExists(true);
//         }
//       } catch (error) {
//         console.log("No profile found, user can create one.");
//       }
//     };

//     if (studentId) checkProfile();
//   }, [studentId, token]);

//   const handleChange = (e, index, field) => {
//     if (field === "skill_name") {
//       const newSkills = [...formData.skills];
//       newSkills[index][field] = e.target.value;
//       setFormData({ ...formData, skills: newSkills });
//     } else if (["course_duration", "course_score"].includes(field)) {
//       const newSkills = [...formData.skills];
//       newSkills[index][field] = e.target.value;
//       setFormData({ ...formData, skills: newSkills });
//     } else {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     }
//   };

//   const addSkillField = () => {
//     if (formData.skills.length < 5) {
//       setFormData({
//         ...formData,
//         skills: [...formData.skills, { skill_name: "", course_duration: "", course_score: "" }]
//       });
//     }
//   };

//   const removeSkillField = (index) => {
//     const newSkills = [...formData.skills];
//     newSkills.splice(index, 1);
//     setFormData({ ...formData, skills: newSkills });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/student/addprofile",
//         { student_id: studentId, ...formData },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert(response.data.message);
//       navigate("/studentprofile");
//     } catch (error) {
//       alert(error.response?.data?.message || "Error adding profile");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
//         <h2 className="text-2xl font-bold mb-6 text-center">Add Student Profile</h2>

//         {profileExists ? (
//           <p className="text-center text-red-600 font-semibold">You already have a profile.</p>
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Degree */}
//             <div>
//               <label className="block font-medium text-gray-700">Degree</label>
//               <input
//                 type="text"
//                 name="degree"
//                 value={formData.degree}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border rounded"
//               />
//             </div>

//             {/* University */}
//             <div>
//               <label className="block font-medium text-gray-700">University</label>
//               <input
//                 type="text"
//                 name="university"
//                 value={formData.university}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border rounded"
//               />
//             </div>

//             {/* Bio */}
//             <div>
//               <label className="block font-medium text-gray-700">Bio</label>
//               <textarea
//                 name="bio"
//                 value={formData.bio}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border rounded"
//               ></textarea>
//             </div>

//             {/* Skills Section */}
//             <div>
//               <h3 className="text-lg font-semibold">Skills</h3>
//               {formData.skills.map((skill, index) => (
//                 <div key={index} className="flex flex-col gap-2 p-4 border rounded-md mt-2">
//                   <label className="block font-medium text-gray-700">Skill Name</label>
//                   <select
//                     value={skill.skill_name}
//                     onChange={(e) => handleChange(e, index, "skill_name")}
//                     className="p-2 border rounded"
//                     required
//                   >
//                     <option value="">Select Skill</option>
//                     {skillOptions.map((option) => (
//                       <option key={option} value={option}>
//                         {option}
//                       </option>
//                     ))}
//                   </select>

//                   <label className="block font-medium text-gray-700">Course Duration (Months)</label>
//                   <input
//                     type="number"
//                     value={skill.course_duration}
//                     onChange={(e) => handleChange(e, index, "course_duration")}
//                     className="p-2 border rounded"
//                     required
//                   />

//                   <label className="block font-medium text-gray-700">Course Score (out of 100)</label>
//                   <input
//                     type="number"
//                     value={skill.course_score}
//                     onChange={(e) => handleChange(e, index, "course_score")}
//                     className="p-2 border rounded"
//                     required
//                   />

//                   {formData.skills.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeSkillField(index)}
//                       className="bg-red-500 text-white p-1 rounded w-fit mt-2"
//                     >
//                       Remove Skill
//                     </button>
//                   )}
//                 </div>
//               ))}

//               {formData.skills.length < 5 && (
//                 <button
//                   type="button"
//                   onClick={addSkillField}
//                   className="bg-green-500 text-white p-2 rounded mt-3"
//                 >
//                   + Add Skill
//                 </button>
//               )}
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
//             >
//               Submit Profile
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddStudentProfile;
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

const AddStudentProfile = () => {
  const navigate = useNavigate();
  const studentId = localStorage.getItem("studentId");
  const token = localStorage.getItem("token");

  const [profileExists, setProfileExists] = useState(false);
  const [formData, setFormData] = useState({
    degree: "",
    university: "",
    bio: "",
    skills: [{ skill_name: "", course_duration: "", course_score: "" }]
  });

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/student/getprofile/${studentId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.profile) {
          setProfileExists(true);
        }
      } catch (error) {
        console.log("No profile found, user can create one.");
      }
    };

    if (studentId) checkProfile();
  }, [studentId, token]);

  const handleChange = (e, index, field) => {
    if (field) {
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
      const response = await axios.post(
        "http://localhost:5000/student/addprofile",
        { student_id: studentId, ...formData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(response.data.message);
      navigate("/studentprofile");
    } catch (error) {
      alert(error.response?.data?.message || "Error adding profile");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Your Profile</h2>

        {profileExists ? (
          <p className="text-center text-red-500 font-semibold text-lg">
            You already have a profile.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Degree */}
            <div>
              <label className="block font-semibold text-gray-700">Degree</label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* University */}
            <div>
              <label className="block font-semibold text-gray-700">University</label>
              <input
                type="text"
                name="university"
                value={formData.university}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block font-semibold text-gray-700">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>

            {/* Skills Section */}
            <div>
              <h3 className="text-lg font-bold text-gray-700">Skills</h3>
              {formData.skills.map((skill, index) => (
                <div key={index} className="p-4 border rounded-md shadow-sm mt-4 bg-gray-50">
                  <label className="block font-medium text-gray-700">Skill Name</label>
                  <select
                    value={skill.skill_name}
                    onChange={(e) => handleChange(e, index, "skill_name")}
                    className="w-full p-2 border rounded-md mt-1 focus:ring-2 focus:ring-blue-400"
                    required
                  >
                    <option value="">Select Skill</option>
                    {skillOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <label className="block font-medium text-gray-700 mt-2">Course Duration (Months)</label>
                  <input
                    type="number"
                    value={skill.course_duration}
                    onChange={(e) => handleChange(e, index, "course_duration")}
                    className="w-full p-2 border rounded-md mt-1 focus:ring-2 focus:ring-blue-400"
                    required
                  />

                  <label className="block font-medium text-gray-700 mt-2">Course Score (out of 100)</label>
                  <input
                    type="number"
                    value={skill.course_score}
                    onChange={(e) => handleChange(e, index, "course_score")}
                    className="w-full p-2 border rounded-md mt-1 focus:ring-2 focus:ring-blue-400"
                    required
                  />

                  {formData.skills.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSkillField(index)}
                      className="bg-red-500 text-white p-2 rounded-md mt-3 hover:bg-red-600 transition"
                    >
                      Remove Skill
                    </button>
                  )}
                </div>
              ))}

              {formData.skills.length < 5 && (
                <button
                  type="button"
                  onClick={addSkillField}
                  className="bg-green-500 text-white p-2 rounded-md mt-3 hover:bg-green-600 transition"
                >
                  + Add Skill
                </button>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            >
              Submit Profile
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddStudentProfile;

