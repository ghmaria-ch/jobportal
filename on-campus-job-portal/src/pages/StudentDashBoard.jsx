
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from '../components/Header'; // Assuming Header component is already created

// const StudentDashboard = () => {
//   // const username = localStorage.getItem('studentName');
//   // State to store job opportunities
//   const [jobs, setJobs] = useState([]);

//   // State to store applied jobs
//   const [appliedJobs, setAppliedJobs] = useState([]);

//   // State to store the filter criteria
//   const [filters, setFilters] = useState({
//     jobType: '',
//     location: '',
//     category: '',
//     salary: [0, 100000],
//   });

//   // Using useNavigate hook for navigation
//   const navigate = useNavigate();

//   // Get the student's name from localStorage
//   const studentName = localStorage.getItem('studentName') || 'Student';
  

//   // Fetch jobs data (this would ideally come from an API)
//   useEffect(() => {
//     const fetchJobs = () => {
//       // This is mock data. Replace with your actual API call.
//       const allJobs = [
//         {
//           id: 1,
//           title: 'Software Engineer',
//           company: 'TechCorp',
//           location: 'New York, NY',
//           jobType: 'Full-time',
//           category: 'Software Engineering',
//           salary: 90000,
//         },
//         {
//           id: 2,
//           title: 'Data Scientist',
//           company: 'DataX',
//           location: 'San Francisco, CA',
//           jobType: 'Part-time',
//           category: 'Data Science',
//           salary: 70000,
//         },
//         {
//           id: 3,
//           title: 'Frontend Developer',
//           company: 'WebTech',
//           location: 'Remote',
//           jobType: 'Internship',
//           category: 'Software Engineering',
//           salary: 60000,
//         },
//       ];
//       setJobs(allJobs);
//     };

//     fetchJobs();
//   }, []);

//   // Function to handle filter changes
//   const handleFilterChange = (e) => {
//     setFilters({
//       ...filters,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Function to filter jobs based on selected filters
//   const filteredJobs = jobs.filter((job) => {
//     const { jobType, location, category, salary } = filters;
//     return (
//       (jobType ? job.jobType === jobType : true) &&
//       (location ? job.location.toLowerCase().includes(location.toLowerCase()) : true) &&
//       (category ? job.category === category : true) &&
//       (job.salary >= salary[0] && job.salary <= salary[1])
//     );
//   });

//   // Function to apply for a job
//   const handleApply = (jobId) => {
//     const jobToApply = jobs.find((job) => job.id === jobId);
//     setAppliedJobs([...appliedJobs, jobToApply]); // Add the job to applied jobs
//   };

//   // Function to navigate to the student's profile page
//   const handleViewProfile = () => {
//     navigate('/studentprofile'); // Navigate to the StudentProfilePage
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <Header />
//       <div className="max-w-screen-xl mx-auto p-8">
//         {/* Dashboard Header */}
//         <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
//           <h2 className="text-3xl font-semibold text-gray-800">Welcome, {studentName}!</h2>
//           <p className="text-gray-600 mt-2">Explore available job opportunities that match your skills.</p>
//           <br />
//           <button
//             onClick={handleViewProfile} // Add onClick to navigate
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg"
//           >
//             View Profile
//           </button>
//         </div>

//         {/* Filter Section */}
//         <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-4">Filter Jobs</h3>
//           <div className="space-y-4">
//             <div className="flex space-x-4">
//               <select
//                 name="jobType"
//                 value={filters.jobType}
//                 onChange={handleFilterChange}
//                 className="p-3 border rounded-md w-1/4"
//               >
//                 <option value="">All Job Types</option>
//                 <option value="Full-time">Full-time</option>
//                 <option value="Part-time">Part-time</option>
//                 <option value="Internship">Internship</option>
//               </select>

//               <select
//                 name="location"
//                 value={filters.location}
//                 onChange={handleFilterChange}
//                 className="p-3 border rounded-md w-1/4"
//               >
//                 <option value="">All Locations</option>
//                 <option value="New York, NY">New York, NY</option>
//                 <option value="San Francisco, CA">San Francisco, CA</option>
//                 <option value="Remote">Remote</option>
//               </select>

//               <select
//                 name="category"
//                 value={filters.category}
//                 onChange={handleFilterChange}
//                 className="p-3 border rounded-md w-1/4"
//               >
//                 <option value="">All Categories</option>
//                 <option value="Software Engineering">Software Engineering</option>
//                 <option value="Data Science">Data Science</option>
//               </select>

//               <div className="flex items-center">
//                 <input
//                   type="number"
//                   name="salaryMin"
//                   value={filters.salary[0]}
//                   onChange={(e) =>
//                     setFilters({
//                       ...filters,
//                       salary: [parseInt(e.target.value), filters.salary[1]],
//                     })
//                   }
//                   className="p-3 border rounded-md w-1/4"
//                   placeholder="Min Salary"
//                 />
//                 <span className="mx-2">-</span>
//                 <input
//                   type="number"
//                   name="salaryMax"
//                   value={filters.salary[1]}
//                   onChange={(e) =>
//                     setFilters({
//                       ...filters,
//                       salary: [filters.salary[0], parseInt(e.target.value)],
//                     })
//                   }
//                   className="p-3 border rounded-md w-1/4"
//                   placeholder="Max Salary"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Job Listings Section */}
//         <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-4">Job Opportunities</h3>
//           {filteredJobs.length > 0 ? (
//             <div className="space-y-4">
//               {filteredJobs.map((job) => (
//                 <div key={job.id} className="flex justify-between items-center">
//                   <div>
//                     <h4 className="text-lg font-medium text-gray-700">{job.title}</h4>
//                     <p className="text-gray-500">{job.company}</p>
//                     <p className="text-gray-400">{job.location}</p>
//                     <p className="text-gray-600">{job.jobType}</p>
//                     <p className="text-blue-600 font-medium">{`$${job.salary}`}</p>
//                   </div>
//                   <button
//                     onClick={() => handleApply(job.id)}
//                     className="bg-blue-600 text-white px-6 py-3 rounded-lg"
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
//                 <div key={job.id} className="flex justify-between items-center">
//                   <div>
//                     <h4 className="text-lg font-medium text-gray-700">{job.title}</h4>
//                     <p className="text-gray-500">{job.company}</p>
//                     <p className="text-gray-400">{job.location}</p>
//                     <p className="text-gray-600">{job.jobType}</p>
//                     <p className="text-blue-600 font-medium">{`$${job.salary}`}</p>
//                   </div>
//                   <button className="bg-gray-500 text-white px-6 py-3 rounded-lg cursor-not-allowed">
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
  
// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from '../components/Header'; // Assuming Header component is already created

// const StudentDashboard = () => {
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [jobTypeFilter, setJobTypeFilter] = useState('');
//   const [skillFilter, setSkillFilter] = useState('');
  
//   const navigate = useNavigate();
//   const studentName = localStorage.getItem('studentName') || 'Student';

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/job/getjobs');
//         const data = await response.json();
//         setJobs(data);
//         setFilteredJobs(data);
//       } catch (error) {
//         console.error('Error fetching jobs:', error);
//       }
//     };

//     fetchJobs();
//   }, []);

//   // Handle filtering
//   useEffect(() => {
//     let filtered = jobs;

//     // Filter by Job Type
//     if (jobTypeFilter) {
//       filtered = filtered.filter(job => job.job_type.toLowerCase() === jobTypeFilter.toLowerCase());
//     }

//     // Filter by Required Skill
//     if (skillFilter) {
//       filtered = filtered.filter(job =>
//         job.required_skills.some(skill =>
//           skill.toLowerCase().includes(skillFilter.toLowerCase())
//         )
//       );
//     }

//     setFilteredJobs(filtered);
//   }, [jobTypeFilter, skillFilter, jobs]);


// const handleApply = async (jobId) => {
//   const studentId = localStorage.getItem('studentId'); // Assuming student ID is stored in localStorage

//   if (!studentId) {
//     alert('You must be logged in to apply for a job.');
//     return;
//   }

//   try {
//     const response = await axios.post('http://localhost:5000/application/apply', {
//       studentId,
//       jobId,
//     });

//     alert('Application submitted successfully!');
//   } catch (error) {
//     console.error('Error applying for job:', error);
//     alert(error.response?.data?.message || 'Failed to apply for the job.');
//   }
// };

  

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
//             {/* Job Type Filter */}
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

//             {/* Skill Filter */}
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
//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-4">Job Opportunities</h3>
//           {filteredJobs.length > 0 ? (
//             <div className="space-y-4">
//               {filteredJobs.map((job) => (
//                 <div key={job.id} className="bg-gray-50 p-4 rounded-lg shadow-md flex justify-between items-center">
//                   <div>
//                     <h4 className="text-lg font-medium text-gray-700">{job.title}</h4>
//                     <p className="text-gray-500">{job.location} | {job.job_type}</p>
//                     <p className="text-gray-600 font-semibold">Salary: ${job.salary}</p>
//                     <p className="text-gray-700">
//                       <strong>Skills Required:</strong> {job.required_skills.join(', ')}
//                     </p>
//                   </div>
//                   <button
//                   onClick={() => handleApply(job.id)} 
//                   className="bg-blue-600 text-white px-6 py-2 rounded-lg">
//                     Apply
//                     </button>

//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500">No jobs available for the selected filters.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const StudentDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]); // Store applied jobs
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [skillFilter, setSkillFilter] = useState('');

  

  const navigate = useNavigate();
  const studentId = localStorage.getItem('studentId');
  const studentName = localStorage.getItem('studentName') || 'Student';

  // Fetch all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/job/getjobs');
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  // Fetch applied jobs
  // Fetch applied jobs
useEffect(() => {
  const fetchAppliedJobs = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/application/getappliedjobs/${studentId}`);
      console.log("Applied Jobs:", response.data);

      // Ensure response contains appliedJobs and set it in state
      if (response.data && Array.isArray(response.data.appliedJobs)) {
        setAppliedJobs(response.data.appliedJobs);
      } else {
        setAppliedJobs([]); // Fallback to empty array if response is invalid
      }
    } catch (error) {
      console.error("Error fetching applied jobs:", error.response?.data || error.message);
      setAppliedJobs([]); // Handle errors by setting an empty array
    }
  };

  fetchAppliedJobs();
}, [studentId]);


  // Filter jobs based on criteria
  useEffect(() => {
    let filtered = jobs;

    if (jobTypeFilter) {
      filtered = filtered.filter(job => job.job_type.toLowerCase() === jobTypeFilter.toLowerCase());
    }

    if (skillFilter) {
      filtered = filtered.filter(job =>
        job.required_skills.some(skill =>
          skill.toLowerCase().includes(skillFilter.toLowerCase())
        )
      );
    }

    setFilteredJobs(filtered);
  }, [jobTypeFilter, skillFilter, jobs]);

  // Apply for a job
  const handleApply = async (jobId) => {
    if (!studentId) {
      alert('You must be logged in to apply for a job.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/application/apply', {
        studentId,
        jobId,
      });

      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Error applying for job:', error);
      alert(error.response?.data?.message || 'Failed to apply for the job.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="max-w-screen-xl mx-auto p-8">
        {/* Dashboard Header */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">Welcome, {studentName}!</h2>
          <p className="text-gray-600 mt-2">Explore job opportunities that match your skills.</p>
          <button
            onClick={() => navigate('/studentprofile')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-4"
          >
            View Profile
          </button>
        </div>

        {/* Filters Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Filters</h3>
          <div className="grid grid-cols-2 gap-4">
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
              placeholder="Filter by Skill (e.g., Machine Learning)"
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
            />
          </div>
        </div>

        {/* Job Listings Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Job Opportunities</h3>
          {filteredJobs.length > 0 ? (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div key={job.id} className="bg-gray-50 p-4 rounded-lg shadow-md flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-medium text-gray-700">{job.title}</h4>
                    <p className="text-gray-500">{job.location}</p>
                    <p className="text-gray-600 font-semibold">Salary: ${job.salary}</p>
                    <p className="text-gray-700">
                      <strong>Skills Required:</strong> {job.required_skills.join(', ')}
                    </p>
                  </div>
                  <button
                    onClick={() => handleApply(job.id)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                  >
                    Apply
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No jobs available for the selected filters.</p>
          )}
        </div>

        {/* Applied Jobs Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Applied Jobs</h3>
          {appliedJobs.length > 0 ? (
            <div className="space-y-4">
              {appliedJobs.map((job) => (
                <div key={job.id} className="bg-gray-50 p-4 rounded-lg shadow-md flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-medium text-gray-700">{job.title}</h4>
                    <p className="text-gray-500">{job.description} </p>
                    <p className="text-gray-600">Salary: ${job.salary}</p>
                    <p className="text-gray-700">
                      <strong>Skills Required:</strong> {job.required_skills.join(', ')}
                    </p>
                    <p className="text-gray-700"><strong>Status:</strong> {job.application_status}</p>
                    <p className="text-gray-500"><strong>Applied On:</strong> {new Date(job.created_at).toLocaleDateString()}</p>
                  </div>
                  <button className="bg-gray-500 text-white px-6 py-2 rounded-lg cursor-not-allowed">
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
//   const [appliedJobs, setAppliedJobs] = useState([]);
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
//   useEffect(() => {
//     const fetchAppliedJobs = async () => {
//       try {
//         if (studentId) {
//           const response = await axios.get(`http://localhost:5000/application/getappliedjobs/${studentId}`);
  
//           // Ensure response is an array
//           const appliedJobsData = Array.isArray(response.data) ? response.data : [];
//           setAppliedJobs(appliedJobsData);
//         }
//       } catch (error) {
//         console.error('Error fetching applied jobs:', error.response?.data || error.message);
//         setAppliedJobs([]); // Ensure appliedJobs is always an array
//       }
//     };
//     fetchAppliedJobs();
//   }, [studentId]);
  

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
//       // Refresh applied jobs
//       const response = await axios.get(`http://localhost:5000/application/getappliedjobs/${studentId}`);
//       setAppliedJobs(response.data);
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
//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-4">Job Opportunities</h3>
//           {filteredJobs.length > 0 ? (
//             <div className="space-y-4">
//               {filteredJobs.map((job) => (
//                 <div key={job.id} className="bg-gray-50 p-4 rounded-lg shadow-md flex justify-between items-center">
//                   <div>
//                     <h4 className="text-lg font-medium text-gray-700">{job.title}</h4>
//                     <p className="text-gray-500">{job.location} | {job.job_type}</p>
//                     <p className="text-gray-600 font-semibold">Salary: ${job.salary}</p>
//                     <p className="text-gray-700">
//                       <strong>Skills Required:</strong> {job.required_skills.join(', ')}
//                     </p>
//                   </div>
//                   <button
//   onClick={() => handleApply(job.id)}
//   disabled={Array.isArray(appliedJobs) && appliedJobs.some(applied => applied.job_id === job.id)}
//   className={`px-6 py-2 rounded-lg ${
//     Array.isArray(appliedJobs) && appliedJobs.some(applied => applied.job_id === job.id)
//       ? 'bg-gray-500 text-white cursor-not-allowed'
//       : 'bg-blue-600 text-white'
//   }`}
// >
//   {Array.isArray(appliedJobs) && appliedJobs.some(applied => applied.job_id === job.id) ? 'Applied' : 'Apply'}
// </button>

//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500">No jobs available for the selected filters.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;


