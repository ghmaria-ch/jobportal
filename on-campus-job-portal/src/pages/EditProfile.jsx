
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from '../components/Header';

// const EditProfilePage = () => {
//   const navigate = useNavigate();

//   const [studentProfile, setStudentProfile] = useState({
//     name: 'John Doe',
//     email: 'johndoe@example.com',
//     degree: 'Bachelor of Computer Science',
//     university: 'ABC University',
//     bio: 'A passionate software developer looking for new opportunities in web development.',
//     location: 'New York, NY',
//   });

//   const [skills, setSkills] = useState([{ name: '', certificate: null }]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setStudentProfile({ ...studentProfile, [name]: value });
//   };

//   const handleSkillNameChange = (index, value) => {
//     const updatedSkills = [...skills];
//     updatedSkills[index].name = value;
//     setSkills(updatedSkills);
//   };

//   const handleCertificateChange = (index, file) => {
//     const updatedSkills = [...skills];
//     updatedSkills[index].certificate = file;
//     setSkills(updatedSkills);
//   };

//   const addSkill = () => {
//     if (skills.length < 5) {
//       setSkills([...skills, { name: '', certificate: null }]);
//     } else {
//       alert('You can only add up to 5 skills.');
//     }
//   };

//   const removeSkill = (index) => {
//     const updatedSkills = skills.filter((_, i) => i !== index);
//     setSkills(updatedSkills);
//   };

//   const handleSaveChanges = () => {
//     console.log('Submitted Profile:', studentProfile, skills);
//     alert('Profile updated successfully!');
//     navigate('/studentprofile');
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <Header />
//       <div className="max-w-3xl mx-auto py-10 px-6">
//         <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">

//           <h2 className="text-3xl font-semibold text-gray-800 text-center">Edit Profile</h2>

//           {/* Profile Fields */}
//           {['name', 'email', 'degree', 'university', 'location'].map((field) => (
//             <div key={field}>
//               <label className="block text-gray-600 font-medium capitalize mb-1">{field}</label>
//               <input
//                 type="text"
//                 name={field}
//                 value={studentProfile[field]}
//                 onChange={handleInputChange}
//                 className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               />
//             </div>
//           ))}

//           <div>
//             <label className="block text-gray-600 font-medium mb-1">Bio</label>
//             <textarea
//               name="bio"
//               value={studentProfile.bio}
//               onChange={handleInputChange}
//               className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               rows="3"
//             />
//           </div>

//           {/* Skill Inputs with file preview */}
//           <div>
//             <h3 className="text-lg font-semibold text-gray-700 mb-2">Skills (Max 5)</h3>
//             {skills.map((skill, index) => (
//               <div key={index} className="flex items-center space-x-3 mb-3">

//                 {/* Skill Name */}
//                 <input
//                   type="text"
//                   placeholder="Skill Name"
//                   value={skill.name}
//                   onChange={(e) => handleSkillNameChange(index, e.target.value)}
//                   className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                 />

//                 {/* Choose File */}
//                 <label className="flex items-center justify-center cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded-lg transition">
//                   {skill.certificate ? "Change File" : "Choose File"}
//                   <input
//                     type="file"
//                     className="hidden"
//                     onChange={(e) => handleCertificateChange(index, e.target.files[0])}
//                   />
//                 </label>

//                 {/* Show File Name */}
//                 {skill.certificate && (
//                   <span className="text-sm text-gray-600 truncate w-32">{skill.certificate.name}</span>
//                 )}

//                 {/* View File */}
//                 {skill.certificate && (
//                   <button
//                     onClick={() => window.open(URL.createObjectURL(skill.certificate))}
//                     className="text-blue-500 underline text-sm"
//                     type="button"
//                   >
//                     View
//                   </button>
//                 )}

//                 {/* Remove Skill */}
//                 {skills.length > 1 && (
//                   <button
//                     onClick={() => removeSkill(index)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     Remove
//                   </button>
//                 )}
//               </div>
//             ))}

//             {/* Add Skill Button */}
//             {skills.length < 5 && (
//               <button
//                 onClick={addSkill}
//                 className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
//               >
//                 + Add Skill
//               </button>
//             )}
//           </div>

//           {/* Save & Cancel Buttons */}
//           <div className="flex justify-end space-x-4 pt-4">
//             <button
//               onClick={() => navigate('/studentprofile')}
//               className="px-6 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSaveChanges}
//               className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
//             >
//               Save Changes
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProfilePage;




import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from "axios";

const EditProfilePage = () => {
  const navigate = useNavigate();

  const studentId = localStorage.getItem('studentID'); // Make sure to use correct key
  const token = localStorage.getItem('token');
  
  const [studentProfile, setStudentProfile] = useState(null);
  const [skills, setSkills] = useState([{ name: '', certificate: null }]);

  // Fetch student profile data from API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/students/profile/${studentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStudentProfile({
          ...response.data.profile,
          skills: response.data.skills, // Add skills to the profile
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
        alert("Failed to fetch profile data. Please try again.");
      }
    };

    fetchProfile();
  }, [studentId, token]); // Dependency array ensures it runs once when component mounts

  // Handle profile input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentProfile({ ...studentProfile, [name]: value });
  };

  // Handle skill name changes
  const handleSkillNameChange = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index].name = value;
    setSkills(updatedSkills);
  };

  // Handle certificate file changes
  const handleCertificateChange = (index, file) => {
    const updatedSkills = [...skills];
    updatedSkills[index].certificate = file;
    setSkills(updatedSkills);
  };

  // Add a new skill input
  const addSkill = () => {
    if (skills.length < 5) {
      setSkills([...skills, { name: '', certificate: null }]);
    } else {
      alert('You can only add up to 5 skills.');
    }
  };

  // Remove a skill input
  const removeSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  // Save changes and navigate
  // const handleSaveChanges = () => {
  //   console.log('Submitted Profile:', studentProfile, skills);
  //   alert('Profile updated successfully!');
  //   navigate('/studentprofile');
  // };
  const handleSaveChanges = async () => {
    try {
      const updatedProfile = {
        name: studentProfile.name,
        email: studentProfile.email,
        degree: studentProfile.degree,
        university: studentProfile.university,
        location: studentProfile.location,
        bio: studentProfile.bio,
        skills: skills.map(skill => ({
          name: skill.name,
          certificate: skill.certificate ? skill.certificate.name : null,
        })),
      };
  
      // Send PUT request to update profile in the database
      const response = await axios.put(
        `http://localhost:5000/api/students/profile/${studentId}`,
        updatedProfile,
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.status === 200) {
        alert('Profile updated successfully!');
        navigate('/studentprofile');  // Navigate to profile page
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert('Failed to update profile. Please try again.');
    }
  };
  

  // Check if studentProfile is loaded
  if (!studentProfile) {
    return <div>Loading...</div>; // Show loading text until profile data is available
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="max-w-3xl mx-auto py-10 px-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">

          <h2 className="text-3xl font-semibold text-gray-800 text-center">Edit Profile</h2>

          {/* Profile Fields */}
          {['name', 'email', 'degree', 'university', 'location'].map((field) => (
            <div key={field}>
              <label className="block text-gray-600 font-medium capitalize mb-1">{field}</label>
              <input
                type="text"
                name={field}
                value={studentProfile[field]}
                onChange={handleInputChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          ))}

          <div>
            <label className="block text-gray-600 font-medium mb-1">Bio</label>
            <textarea
              name="bio"
              value={studentProfile.bio}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              rows="3"
            />
          </div>

          {/* Skills Inputs with file preview */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Skills (Max 5)</h3>
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center space-x-3 mb-3">

                {/* Skill Name */}
                <input
                  type="text"
                  placeholder="Skill Name"
                  value={skill.name}
                  onChange={(e) => handleSkillNameChange(index, e.target.value)}
                  className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />

                {/* Choose File */}
                <label className="flex items-center justify-center cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded-lg transition">
                  {skill.certificate ? "Change File" : "Choose File"}
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleCertificateChange(index, e.target.files[0])}
                  />
                </label>

                {/* Show File Name */}
                {skill.certificate && (
                  <span className="text-sm text-gray-600 truncate w-32">{skill.certificate.name}</span>
                )}

                {/* View File */}
                {skill.certificate && (
                  <button
                    onClick={() => window.open(URL.createObjectURL(skill.certificate))}
                    className="text-blue-500 underline text-sm"
                    type="button"
                  >
                    View
                  </button>
                )}

                {/* Remove Skill */}
                {skills.length > 1 && (
                  <button
                    onClick={() => removeSkill(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            {/* Add Skill Button */}
            {skills.length < 5 && (
              <button
                onClick={addSkill}
                className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
              >
                + Add Skill
              </button>
            )}
          </div>

          {/* Save & Cancel Buttons */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              onClick={() => navigate('/studentprofile')}
              className="px-6 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveChanges}
              className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;

