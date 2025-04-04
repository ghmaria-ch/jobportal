
// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from '../components/Header';

// const StudentDashboard = () => {
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [appliedJobs, setAppliedJobs] = useState([]); // Store applied jobs
//   const [jobTypeFilter, setJobTypeFilter] = useState('');
//   const [skillFilter, setSkillFilter] = useState('');

  

//   const navigate = useNavigate();
//   const studentId = localStorage.getItem('studentId');
//   const studentName = localStorage.getItem('studentName') || 'Student';

//   // Fetch all jobs
//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/job/getjobs');
//         setJobs(response.data);
//         setFilteredJobs(response.data);
//       } catch (error) {
//         console.error('Error fetching jobs:', error);
//       }
//     };

//     fetchJobs();
//   }, []);

//   // Fetch applied jobs
//   // Fetch applied jobs
// useEffect(() => {
//   const fetchAppliedJobs = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/application/getappliedjobs/${studentId}`);
//       console.log("Applied Jobs:", response.data);

//       // Ensure response contains appliedJobs and set it in state
//       if (response.data && Array.isArray(response.data.appliedJobs)) {
//         setAppliedJobs(response.data.appliedJobs);
//       } else {
//         setAppliedJobs([]); // Fallback to empty array if response is invalid
//       }
//     } catch (error) {
//       console.error("Error fetching applied jobs:", error.response?.data || error.message);
//       setAppliedJobs([]); // Handle errors by setting an empty array
//     }
//   };

//   fetchAppliedJobs();
// }, [studentId]);


//   // Filter jobs based on criteria
//   useEffect(() => {
//     let filtered = jobs;

//     if (jobTypeFilter) {
//       filtered = filtered.filter(job => job.job_type.toLowerCase() === jobTypeFilter.toLowerCase());
//     }

//     if (skillFilter) {
//       filtered = filtered.filter(job =>
//         job.required_skills.some(skill =>
//           skill.toLowerCase().includes(skillFilter.toLowerCase())
//         )
//       );
//     }

//     setFilteredJobs(filtered);
//   }, [jobTypeFilter, skillFilter, jobs]);

//   // Apply for a job
//   const handleApply = async (jobId) => {
//     if (!studentId) {
//       alert('You must be logged in to apply for a job.');
//       return;
//     }

//     try {
//       await axios.post('http://localhost:5000/application/apply', {
//         studentId,
//         jobId,
//       });

//       alert('Application submitted successfully!');
//     } catch (error) {
//       console.error('Error applying for job:', error);
//       alert(error.response?.data?.message || 'Failed to apply for the job.');
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <Header />
//       <div className="max-w-screen-xl mx-auto p-8">
//         {/* Dashboard Header */}
//         <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
//           <h2 className="text-3xl font-semibold text-gray-800">Welcome, {studentName}!</h2>
//           <p className="text-gray-600 mt-2">Explore job opportunities that match your skills.</p>
//           <button
//             onClick={() => navigate('/studentprofile')}
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-4"
//           >
//             View Profile
//           </button>
//         </div>

//         {/* Filters Section */}
//         <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-4">Filters</h3>
//           <div className="grid grid-cols-2 gap-4">
//             <select
//               className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               value={jobTypeFilter}
//               onChange={(e) => setJobTypeFilter(e.target.value)}
//             >
//               <option value="">All Job Types</option>
//               <option value="Full-Time">Full-time</option>
//               <option value="Part-Time">Part-time</option>
//               <option value="Contract">Contract</option>
//             </select>

//             <input
//               type="text"
//               className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               placeholder="Filter by Skill (e.g., Machine Learning)"
//               value={skillFilter}
//               onChange={(e) => setSkillFilter(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Job Listings Section */}
//         <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-4">Job Opportunities</h3>
//           {filteredJobs.length > 0 ? (
//             <div className="space-y-4">
//               {filteredJobs.map((job) => (
//                 <div key={job.id} className="bg-gray-50 p-4 rounded-lg shadow-md flex justify-between items-center">
//                   <div>
//                     <h4 className="text-lg font-medium text-gray-700">{job.title}</h4>
//                     <p className="text-gray-500">{job.location}</p>
//                     <p className="text-gray-600 font-semibold">Salary: ${job.salary}</p>
//                     <p className="text-gray-700">
//                       <strong>Skills Required:</strong> {job.required_skills.join(', ')}
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => handleApply(job.id)}
//                     className="bg-blue-600 text-white px-6 py-2 rounded-lg"
//                   >
//                     Apply
//                   </button>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500">No jobs available for the selected filters.</p>
//           )}
//         </div>

//         {/* Applied Jobs Section */}
//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-4">Applied Jobs</h3>
//           {appliedJobs.length > 0 ? (
//             <div className="space-y-4">
//               {appliedJobs.map((job) => (
//                 <div key={job.id} className="bg-gray-50 p-4 rounded-lg shadow-md flex justify-between items-center">
//                   <div>
//                     <h4 className="text-lg font-medium text-gray-700">{job.title}</h4>
//                     <p className="text-gray-500">{job.description} </p>
//                     <p className="text-gray-600">Salary: ${job.salary}</p>
//                     <p className="text-gray-700">
//                       <strong>Skills Required:</strong> {job.required_skills.join(', ')}
//                     </p>
//                     <p className="text-gray-700"><strong>Status:</strong> {job.application_status}</p>
//                     <p className="text-gray-500"><strong>Applied On:</strong> {new Date(job.created_at).toLocaleDateString()}</p>
//                   </div>
//                   <button className="bg-gray-500 text-white px-6 py-2 rounded-lg cursor-not-allowed">
//                     Applied
//                   </button>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500">You haven't applied to any jobs yet.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;



import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const navigate = useNavigate();

  const studentId = localStorage.getItem("studentId");
  const studentName = localStorage.getItem("studentName") || "Student";

  // Fetch all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/job/getjobs");
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  // Fetch applied jobs
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/application/getappliedjobs/${studentId}`
        );

        if (response.data && Array.isArray(response.data.appliedJobs)) {
          setAppliedJobs(response.data.appliedJobs);
        } else {
          setAppliedJobs([]);
        }
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
        setAppliedJobs([]);
      }
    };

    fetchAppliedJobs();
  }, [studentId]);

  // Filter jobs based on criteria
  useEffect(() => {
    let filtered = jobs;

    if (jobTypeFilter) {
      filtered = filtered.filter(
        (job) => job.job_type.toLowerCase() === jobTypeFilter.toLowerCase()
      );
    }

    if (skillFilter) {
      filtered = filtered.filter((job) =>
        job.required_skills.some((skill) =>
          skill.toLowerCase().includes(skillFilter.toLowerCase())
        )
      );
    }

    setFilteredJobs(filtered);
  }, [jobTypeFilter, skillFilter, jobs]);

  // Apply for a job
  const handleApply = async (jobId) => {
    if (!studentId) {
      toast.error("You must be logged in to apply.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/application/apply", {
        studentId,
        jobId,
      });

      toast.success("Application submitted!");
    } catch (error) {
      toast.error("Failed to apply for the job.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-6xl mx-auto p-6">
        {/* Dashboard Header */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome, {studentName}! 👋
          </h2>
          <p className="text-gray-600 mt-2">
            Explore and apply for job opportunities.
          </p>
          <button
            onClick={() => navigate("/studentprofile")}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
          >
            View Profile
          </button>
        </div>

        {/* Filters Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Filters</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={jobTypeFilter}
              onChange={(e) => setJobTypeFilter(e.target.value)}
            >
              <option value="">All Job Types</option>
              <option value="Full-Time">Full-time</option>
              <option value="Part-Time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>

            <input
              type="text"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Search by Skill (e.g., React)"
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
            />
          </div>
        </div>

        {/* Job Listings */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Job Opportunities
          </h3>
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-gray-100 p-5 rounded-lg shadow-md transition hover:shadow-lg"
                >
                  <h4 className="text-lg font-medium text-gray-800">
                    {job.title}
                  </h4>
                  <p className="text-gray-500">{job.location}</p>
                  <p className="text-gray-500">{job.description}</p>
                  <p className="text-gray-500">{job.job_type}</p> 
                  <p className="text-gray-700"><strong>Status:</strong> {job.application_status}</p>
                  <p className="text-gray-600 font-semibold">
                    Salary:  ₹{job.salary}
                  </p>
                  <p className="text-gray-700">
                    <strong>Skills Required:</strong>{" "}
                    {job.required_skills.join(", ")}
                  </p>
                  <button
                    onClick={() => handleApply(job.id)}
                    className="mt-3 bg-blue-600 text-white px-6 py-2 rounded-lg w-full hover:bg-blue-700 transition"
                  >
                    Apply
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No jobs found.</p>
          )}
        </div>

        {/* Applied Jobs */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Applied Jobs
          </h3>
          {appliedJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {appliedJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-gray-100 p-5 rounded-lg shadow-md transition hover:shadow-lg"
                >
                  <h4 className="text-lg font-medium text-gray-800">
                    {job.title}
                  </h4>
                  <p className="text-gray-600">Salary: ${job.salary}</p>
                  <p className="text-gray-700">
                    <strong>Skills:</strong> {job.required_skills.join(", ")}
                  </p>
                  <p className="text-gray-700">
                    <strong>Status:</strong> {job.application_status}
                  </p>
                  <p className="text-gray-500">
                    <strong>Applied On:</strong>{" "}
                    {new Date(job.created_at).toLocaleDateString()}
                  </p>
                  <button className="mt-3 bg-gray-500 text-white px-6 py-2 rounded-lg w-full cursor-not-allowed">
                    Applied
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">You haven't applied to any jobs yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;


// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from '../components/Header';

// const StudentDashboard = () => {
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [appliedJobs, setAppliedJobs] = useState([]); // Store applied jobs
//   const [jobTypeFilter, setJobTypeFilter] = useState('');
//   const [skillFilter, setSkillFilter] = useState('');

  

//   const navigate = useNavigate();
//   const studentId = localStorage.getItem('studentId');
//   const studentName = localStorage.getItem('studentName') || 'Student';

//   // Fetch all jobs
//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/job/getjobs');
//         setJobs(response.data);
//         setFilteredJobs(response.data);
//       } catch (error) {
//         console.error('Error fetching jobs:', error);
//       }
//     };

//     fetchJobs();
//   }, []);

//   // Fetch applied jobs
//   // Fetch applied jobs
// useEffect(() => {
//   const fetchAppliedJobs = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/application/getappliedjobs/${studentId}`);
//       console.log("Applied Jobs:", response.data);

//       // Ensure response contains appliedJobs and set it in state
//       if (response.data && Array.isArray(response.data.appliedJobs)) {
//         setAppliedJobs(response.data.appliedJobs);
//       } else {
//         setAppliedJobs([]); // Fallback to empty array if response is invalid
//       }
//     } catch (error) {
//       console.error("Error fetching applied jobs:", error.response?.data || error.message);
//       setAppliedJobs([]); // Handle errors by setting an empty array
//     }
//   };

//   fetchAppliedJobs();
// }, [studentId]);


//   // Filter jobs based on criteria
//   useEffect(() => {
//     let filtered = jobs;

//     if (jobTypeFilter) {
//       filtered = filtered.filter(job => job.job_type.toLowerCase() === jobTypeFilter.toLowerCase());
//     }

//     if (skillFilter) {
//       filtered = filtered.filter(job =>
//         job.required_skills.some(skill =>
//           skill.toLowerCase().includes(skillFilter.toLowerCase())
//         )
//       );
//     }

//     setFilteredJobs(filtered);
//   }, [jobTypeFilter, skillFilter, jobs]);

//   // Apply for a job
//   const handleApply = async (jobId) => {
//     if (!studentId) {
//       alert('You must be logged in to apply for a job.');
//       return;
//     }

//     try {
//       await axios.post('http://localhost:5000/application/apply', {
//         studentId,
//         jobId,
//       });

//       alert('Application submitted successfully!');
//     } catch (error) {
//       console.error('Error applying for job:', error);
//       alert(error.response?.data?.message || 'Failed to apply for the job.');
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <Header />
//       <div className="max-w-screen-xl mx-auto p-8">
//         {/* Dashboard Header */}
//         <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
//           <h2 className="text-3xl font-semibold text-gray-800">Welcome, {studentName}!</h2>
//           <p className="text-gray-600 mt-2">Explore job opportunities that match your skills.</p>
//           <button
//             onClick={() => navigate('/studentprofile')}
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-4"
//           >
//             View Profile
//           </button>
//         </div>

//         {/* Filters Section */}
//         <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-4">Filters</h3>
//           <div className="grid grid-cols-2 gap-4">
//             <select
//               className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               value={jobTypeFilter}
//               onChange={(e) => setJobTypeFilter(e.target.value)}
//             >
//               <option value="">All Job Types</option>
//               <option value="Full-Time">Full-time</option>
//               <option value="Part-Time">Part-time</option>
//               <option value="Contract">Contract</option>
//             </select>

//             <input
//               type="text"
//               className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               placeholder="Filter by Skill (e.g., Machine Learning)"
//               value={skillFilter}
//               onChange={(e) => setSkillFilter(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Job Listings Section */}
//         <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-4">Job Opportunities</h3>
//           {filteredJobs.length > 0 ? (
//             <div className="space-y-4">
//               {filteredJobs.map((job) => (
//                 <div key={job.id} className="bg-gray-50 p-4 rounded-lg shadow-md flex justify-between items-center">
//                   <div>
//                     <h4 className="text-lg font-medium text-gray-700">{job.title}</h4>
//                     <p className="text-gray-500">{job.location}</p>
//                     <p className="text-gray-600 font-semibold">Salary: ${job.salary}</p>
//                     <p className="text-gray-700">
//                       <strong>Skills Required:</strong> {job.required_skills.join(', ')}
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => handleApply(job.id)}
//                     className="bg-blue-600 text-white px-6 py-2 rounded-lg"
//                   >
//                     Apply
//                   </button>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500">No jobs available for the selected filters.</p>
//           )}
//         </div>

//         {/* Applied Jobs Section */}
//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-4">Applied Jobs</h3>
//           {appliedJobs.length > 0 ? (
//             <div className="space-y-4">
//               {appliedJobs.map((job) => (
//                 <div key={job.id} className="bg-gray-50 p-4 rounded-lg shadow-md flex justify-between items-center">
//                   <div>
//                     <h4 className="text-lg font-medium text-gray-700">{job.title}</h4>
//                     <p className="text-gray-500">{job.description} </p>
//                     <p className="text-gray-600">Salary: ${job.salary}</p>
//                     <p className="text-gray-700">
//                       <strong>Skills Required:</strong> {job.required_skills.join(', ')}
//                     </p>
//                     <p className="text-gray-700"><strong>Status:</strong> {job.application_status}</p>
//                     <p className="text-gray-500"><strong>Applied On:</strong> {new Date(job.created_at).toLocaleDateString()}</p>
//                   </div>
//                   <button className="bg-gray-500 text-white px-6 py-2 rounded-lg cursor-not-allowed">
//                     Applied
//                   </button>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500">You haven't applied to any jobs yet.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;