// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const skillsList = [
//   'Web Development', 'Data Structures', 'Machine Learning', 'Cyber Security',
//   'Cloud Computing', 'Artificial Intelligence', 'Database Management', 'Networking'
// ];

// const jobTypes = ['Full-Time', 'Part-Time', 'Internship', 'Contract'];
// const recruiterId = localStorage.getItem('recruiterId');


// const PostJob = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [requiredSkills, setRequiredSkills] = useState([]);
//   const [location, setLocation] = useState('');
//   const [jobType, setJobType] = useState('');
//   const [salary, setSalary] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate=useNavigate();
  

//   // Handle selecting multiple skills
//   const handleSkillChange = (e) => {
//     const selectedSkill = e.target.value;
//     if (selectedSkill && !requiredSkills.includes(selectedSkill)) {
//       setRequiredSkills([...requiredSkills, selectedSkill]);
//     }
//   };

//   // Remove a selected skill
//   const removeSkill = (skill) => {
//     setRequiredSkills(requiredSkills.filter((s) => s !== skill));
//   };
//   const handlePostJob = async (e) => {
//     e.preventDefault();

//     const jobData = {
//       recruiterId,
//       title,
//       description,
//       requiredSkills,
//       location,
//       jobType,
//       salary
//     };

//     console.log("📌 Sending Job Data:", jobData); // Log the data

//     try {
//       const response = await axios.post('http://localhost:5000/job/postajob', jobData, {
//         headers: { 'Content-Type': 'application/json' }
//       });

//       console.log("✅ Job Posted Successfully:", response.data);
//       setMessage(response.data.message);
//       setTitle('');
//       setDescription('');
//       setRequiredSkills([]);
//       setLocation('');
//       setJobType('');
//       setSalary('');
//       navigate("/recruiterdashboard")
//     } catch (error) {
//       console.error("❌ Axios Error:", error);
//       if (error.response) {
//         console.error("❌ Server Response Error:", error.response.data);
//         setMessage(error.response.data.message || "Error posting job.");
//       } else {
//         setMessage("Network error. Try again.");
//       }
//     }
// };


//   return (
//     <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold mb-4">Post a Job</h2>
//       {message && <p className="text-red-500 mb-2">{message}</p>}
//       <form onSubmit={handlePostJob}>
//         <input
//           type="text"
//           placeholder="Job Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full p-2 border rounded mb-3"
//         />
//         <textarea
//           placeholder="Job Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full p-2 border rounded mb-3"
//         />
        
//         {/* Multi-select skills */}
//         <label className="block text-gray-700 font-semibold mb-1">Required Skills</label>
//         <select
//           value=""
//           onChange={handleSkillChange}
//           className="w-full p-2 border rounded mb-3"
//         >
//           <option value="" disabled>Select Skill</option>
//           {skillsList
//             .filter(skill => !requiredSkills.includes(skill)) // Hide selected skills
//             .map((skill, index) => (
//               <option key={index} value={skill}>{skill}</option>
//             ))}
//         </select>

//         {/* Display selected skills */}
//         <div className="flex flex-wrap mb-3">
//           {requiredSkills.map((skill, index) => (
//             <span key={index} className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm mr-2 mb-2 flex items-center">
//               {skill} 
//               <button type="button" onClick={() => removeSkill(skill)} className="ml-2 text-white bg-red-500 px-2 py-1 rounded-full">
//                 x
//               </button>
//             </span>
//           ))}
//         </div>

//         {/* Job Type Selection */}
//         <label className="block text-gray-700 font-semibold mb-1">Job Type</label>
//         <select
//           value={jobType}
//           onChange={(e) => setJobType(e.target.value)}
//           className="w-full p-2 border rounded mb-3"
//         >
//           <option value="" disabled>Select Job Type</option>
//           {jobTypes.map((type, index) => (
//             <option key={index} value={type}>{type}</option>
//           ))}
//         </select>

//         {/* Location Field */}
//         <input
//           type="text"
//           placeholder="Job Location"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//           className="w-full p-2 border rounded mb-3"
//         />

//         {/* Salary Field */}
//         <input
//           type="number"
//           placeholder="Salary (optional)"
//           value={salary}
//           onChange={(e) => setSalary(e.target.value)}
//           className="w-full p-2 border rounded mb-3"
//         />

//         <button 
//           type="submit" 
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
//         >
//           Post Job
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PostJob;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const skillsList = [
  'Web Development', 'Data Structures', 'Machine Learning', 'Cyber Security',
  'Cloud Computing', 'Artificial Intelligence', 'Database Management', 'Networking'
];

const jobTypes = ['Full-Time', 'Part-Time', 'Internship', 'Contract'];
const recruiterId = localStorage.getItem('recruiterId');

const PostAJob = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [salary, setSalary] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Handle selecting multiple skills
  const handleSkillChange = (e) => {
    const selectedSkill = e.target.value;
    if (selectedSkill && !requiredSkills.includes(selectedSkill)) {
      setRequiredSkills([...requiredSkills, selectedSkill]);
    }
  };

  // Remove a selected skill
  const removeSkill = (skill) => {
    setRequiredSkills(requiredSkills.filter((s) => s !== skill));
  };

  const handlePostJob = async (e) => {
    e.preventDefault();

    const jobData = {
      recruiterId,
      title,
      description,
      requiredSkills,
      location,
      jobType,
      salary
    };

    try {
      const response = await axios.post('http://localhost:5000/job/postajob', jobData, {
        headers: { 'Content-Type': 'application/json' }
      });

      setMessage(response.data.message);
      setTitle('');
      setDescription('');
      setRequiredSkills([]);
      setLocation('');
      setJobType('');
      setSalary('');
      navigate("/recruiterdashboard");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || "Error posting job.");
      } else {
        setMessage("Network error. Try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-50 flex items-center justify-center p-5">
      <div className="max-w-xl bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">📢 Post a Job</h2>

        {message && <p className="text-red-500 text-center mb-4">{message}</p>}

        <form onSubmit={handlePostJob} className="space-y-5">
          <input
            type="text"
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />

          <textarea
            placeholder="Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />

          {/* Multi-select skills */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Required Skills</label>
            <select
              value=""
              onChange={handleSkillChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
            >
              <option value="" disabled>Select Skill</option>
              {skillsList
                .filter(skill => !requiredSkills.includes(skill))
                .map((skill, index) => (
                  <option key={index} value={skill}>{skill}</option>
                ))}
            </select>

            {/* Display selected skills */}
            <div className="flex flex-wrap gap-2 mt-3">
              {requiredSkills.map((skill, index) => (
                <span key={index} className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm flex items-center shadow-md">
                  {skill}
                  <button 
                    type="button" 
                    onClick={() => removeSkill(skill)} 
                    className="ml-2 bg-red-500 hover:bg-red-600 px-2 py-1 rounded-full text-xs"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Job Type Selection */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Job Type</label>
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
            >
              <option value="" disabled>Select Job Type</option>
              {jobTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Location Field */}
          <input
            type="text"
            placeholder="Job Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />

          {/* Salary Field */}
          <input
            type="number"
            placeholder="Salary (optional)"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg hover:shadow-xl transition-all font-semibold"
          >
            🚀 Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostAJob;

