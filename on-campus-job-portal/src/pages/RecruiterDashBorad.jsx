

// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Header from '../components/Header';

// const RecruiterDashboard = () => {
//   const navigate = useNavigate();
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [jobTypeFilter, setJobTypeFilter] = useState('');
//   const [skillFilter, setSkillFilter] = useState('');

//   const recruiterId = localStorage.getItem('recruiterId');
//   const recruiterName = localStorage.getItem('recruiterName') || 'Recruiter';

//   useEffect(() => {
//     if (!recruiterId) return;

//     // Fetch Jobs Posted by Recruiter
//     const fetchJobs = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/job/getrecruiterjobs/${recruiterId}`);
//         setJobs(response.data);
//         setFilteredJobs(response.data);
//       } catch (error) {
//         console.error("Error fetching jobs:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // Fetch Applications for Recruiter Jobs
//     const fetchApplications = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/application/getapplicantsforrecruiterjobs/${recruiterId}`);
//         setApplications(response.data.applicants);
//       } catch (error) {
//         console.error("Error fetching applications:", error);
//       }
//     };

//     fetchJobs();
//     fetchApplications();
//   }, [recruiterId]);

//   const handleDeleteJob = async (jobId) => {
//     try {
//       await axios.delete(`http://localhost:5000/job/delete/${jobId}`);
//       alert('Job deleted successfully!');
//       setJobs(jobs.filter(job => job.id !== jobId));
//       setFilteredJobs(filteredJobs.filter(job => job.id !== jobId));
//       setApplications(applications.filter(app => app.job_id !== jobId)); // Remove applications related to deleted job
//     } catch (error) {
//       console.error('Error deleting job:', error);
//       alert('Failed to delete job.');
//     }
//   };

//   const handleApplicationAction = async (applicationId, action) => {
//     try {
//       // Check if the application is already accepted or rejected
//       const application = applications.find(app => app.application_id === applicationId);
//       if (application && (application.application_status === 'Accepted' || application.application_status === 'Rejected')) {
//         alert('This application has already been processed and cannot be changed.');
//         return; // Prevent further action
//       }
  
//       // Update the application status
//       await axios.put(`http://localhost:5000/application/updateapplicationstatus/${applicationId}`, { status: action });
//       alert(`Application ${action} successfully!`);
//       setApplications(applications.map(app => 
//         app.application_id === applicationId ? { ...app, application_status: action } : app
//       ));
//     } catch (error) {
//       console.error('Error updating application:', error);
//       alert('Failed to update application status.');
//     }
//   };
  

  


//   // 🔍 Apply Filters
//   useEffect(() => {
//     let updatedJobs = jobs;

//     if (jobTypeFilter) {
//       updatedJobs = updatedJobs.filter(job => job.job_type.toLowerCase() === jobTypeFilter.toLowerCase());
//     }

//     if (skillFilter) {
//       updatedJobs = updatedJobs.filter(job => {
//         const skills = Array.isArray(job.required_skills)
//           ? job.required_skills
//           : JSON.parse(job.required_skills || '[]');
//         return skills.some(skill => skill.toLowerCase().includes(skillFilter.toLowerCase()));
//       });
//     }

//     setFilteredJobs(updatedJobs);
//   }, [jobTypeFilter, skillFilter, jobs]);

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <Header />
//       <div className="max-w-5xl mx-auto p-8">
//         {/* Welcome Message */}
//         <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//           <h2 className="text-3xl font-semibold text-gray-800">
//             Welcome, {recruiterName}! 👋
//           </h2>
//           <p className="text-gray-500">Manage your job postings and applications efficiently.</p>
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
//               <option value="Full-time">Full-time</option>
//               <option value="Part-time">Part-time</option>
//               <option value="Contract">Contract</option>
//               <option value="Internship">Internship</option>
//             </select>

//             {/* Skill Filter */}
//             <input
//               type="text"
//               className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               placeholder="Filter by Skill (e.g., React)"
//               value={skillFilter}
//               onChange={(e) => setSkillFilter(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Job Postings Section */}
//         <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//           <div className="flex justify-between mb-4">
//             <h3 className="text-2xl font-semibold text-gray-800">Manage Job Postings</h3>
//             <button 
//               onClick={() => navigate('/postajob')}
//               className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all"
//             >
//               + Post a Job
//             </button>
//           </div>

//           {loading ? (
//             <p className="text-gray-500">Loading jobs...</p>
//           ) : filteredJobs.length === 0 ? (
//             <p className="text-gray-500">No jobs match the selected filters.</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {filteredJobs.map((job) => (
//                 <div key={job.id} className="p-5 bg-gray-50 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all">
//                   <div>
//                     <h4 className="text-lg font-medium text-gray-700">{job.title}</h4>
//                     <h4 className="text-lg font-medium text-gray-700">{job.id}</h4>
//                     <p className="text-gray-500 text-sm"><strong>Location:</strong> {job.location}</p>
//                     <p className="text-gray-500 text-sm"><strong>Type:</strong> {job.job_type}</p>
//                     <p className="text-gray-500 text-sm"><strong>Salary:</strong> {job.salary || 'N/A'}</p>
//                     <p className="text-gray-500 text-sm"><strong>Posted on:</strong> {job.posted_date}</p>
//                     <p className="text-gray-500 text-sm">
//   <strong>Skills:</strong> {job.required_skills.join(", ")}
// </p>
//                   </div>
//                   <button 
//                     onClick={() => handleDeleteJob(job.id)}
//                     className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition-all w-full"
//                   >
//                     🗑 Delete
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Applications Section */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//   <h3 className="text-2xl font-semibold text-gray-800 mb-4">Job Applications</h3>
//   {applications.length === 0 ? (
//     <p className="text-gray-500">No applications yet.</p>
//   ) : (
//     applications.map(app => (
//       <div key={app.application_id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-md mb-4">
//         <p><strong>{app.student_name}</strong> applied for Job ID {app.job_id}</p>
//         <p>Email: {app.student_email}</p>
//         <p>Status: {app.application_status}</p>
//         <p>Rating: {app.rating}</p>
//         <p>Skills: {app.skills}</p>

//         {/* Show the "Accept" and "Reject" buttons only if the application status is not "Accepted" or "Rejected" */}
//         {app.application_status !== 'Accepted' && app.application_status !== 'Rejected' && (
//           <>
//             <button 
//               onClick={() => handleApplicationAction(app.application_id, 'Accepted')} 
//               className="bg-green-600 text-white px-4 py-2 mr-2 rounded-lg"
//             >
//               Accept
//             </button>
//             <button 
//               onClick={() => handleApplicationAction(app.application_id, 'Rejected')} 
//               className="bg-red-600 text-white px-4 py-2 rounded-lg"
//             >
//               Reject
//             </button>
//           </>
//         )}
//       </div>
//     ))
//   )}
// </div>

//       </div>
//     </div>
//   );
// };

// export default RecruiterDashboard;



import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [skillFilter, setSkillFilter] = useState('');

  const recruiterId = localStorage.getItem('recruiterId');
  const recruiterName = localStorage.getItem('recruiterName') || 'Recruiter';

  useEffect(() => {
    if (!recruiterId) return;

    // Fetch Jobs Posted by Recruiter
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/job/getrecruiterjobs/${recruiterId}`);
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch Applications for Recruiter Jobs
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/application/getapplicantsforrecruiterjobs/${recruiterId}`);
        setApplications(response.data.applicants);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchJobs();
    fetchApplications();
  }, [recruiterId]);

  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(`http://localhost:5000/job/delete/${jobId}`);
      alert('Job deleted successfully!');
      setJobs(jobs.filter(job => job.id !== jobId));
      setFilteredJobs(filteredJobs.filter(job => job.id !== jobId));
      setApplications(applications.filter(app => app.job_id !== jobId)); // Remove applications related to deleted job
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete job.');
    }
  };

  const handleApplicationAction = async (applicationId, action) => {
    try {
      // Check if the application is already accepted or rejected
      const application = applications.find(app => app.application_id === applicationId);
      if (application && (application.application_status === 'Accepted' || application.application_status === 'Rejected')) {
        alert('This application has already been processed and cannot be changed.');
        return; // Prevent further action
      }
  
      // Update the application status on the server
      await axios.put(`http://localhost:5000/application/updateapplicationstatus/${applicationId}`, { status: action });
      alert(`Application ${action} successfully!`);
  
      
      // setApplications(applications.filter(app => app.application_status ='Pending'));
    } catch (error) {
      console.error('Error updating application:', error);
      alert('Failed to update application status.');
    }
  };
  
  

  


  // 🔍 Apply Filters
  useEffect(() => {
    let updatedJobs = jobs;

    if (jobTypeFilter) {
      updatedJobs = updatedJobs.filter(job => job.job_type.toLowerCase() === jobTypeFilter.toLowerCase());
    }

    if (skillFilter) {
      updatedJobs = updatedJobs.filter(job => {
        const skills = Array.isArray(job.required_skills)
          ? job.required_skills
          : JSON.parse(job.required_skills || '[]');
        return skills.some(skill => skill.toLowerCase().includes(skillFilter.toLowerCase()));
      });
    }

    setFilteredJobs(updatedJobs);
  }, [jobTypeFilter, skillFilter, jobs]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="max-w-5xl mx-auto p-8">
        {/* Welcome Message */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">
            Welcome, {recruiterName}! 👋
          </h2>
          <p className="text-gray-500">Manage your job postings and applications efficiently.</p>
        </div>

        {/* Filters Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Filters</h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Job Type Filter */}
            <select
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={jobTypeFilter}
              onChange={(e) => setJobTypeFilter(e.target.value)}
            >
              <option value="">All Job Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>

            {/* Skill Filter */}
            <input
              type="text"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Filter by Skill (e.g., React)"
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
            />
          </div>
        </div>

        {/* Job Postings Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between mb-4">
            <h3 className="text-2xl font-semibold text-gray-800">Manage Job Postings</h3>
            <button 
              onClick={() => navigate('/postajob')}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all"
            >
              + Post a Job
            </button>
          </div>

          {loading ? (
            <p className="text-gray-500">Loading jobs...</p>
          ) : filteredJobs.length === 0 ? (
            <p className="text-gray-500">No jobs match the selected filters.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <div key={job.id} className="p-5 bg-gray-50 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all">
                  <div>
                    <h4 className="text-lg font-medium text-gray-700">{job.title}</h4>
                    <h4 className="text-lg font-medium text-gray-700">{job.id}</h4>
                    <p className="text-gray-500 text-sm"><strong>Location:</strong> {job.location}</p>
                    <p className="text-gray-500 text-sm"><strong>Type:</strong> {job.job_type}</p>
                    <p className="text-gray-500 text-sm"><strong>Salary:</strong> {job.salary || 'N/A'}</p>
                    <p className="text-gray-500 text-sm"><strong>Posted on:</strong> {job.posted_date}</p>
                    <p className="text-gray-500 text-sm">
  <strong>Skills:</strong> {job.required_skills.join(", ")}
</p>
                  </div>
                  <button 
                    onClick={() => handleDeleteJob(job.id)}
                    className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition-all w-full"
                  >
                    🗑 Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Job Applications</h3>
  {applications.filter(app=>app.application_status==='Pending').length === 0 ? (
    <p className="text-gray-500">No applications yet.</p>
  ) : (
    applications
      .filter(app => app.application_status === 'Pending')
    .map(app => (
      <div key={app.application_id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-md mb-4">
        <p><strong>{app.student_name}</strong> applied for Job ID {app.job_id}</p>
        <p>Email: {app.student_email}</p>
        <p>Status: {app.application_status}</p>
        <p>Rating: {app.rating}</p>
        <p>Skills: {app.skills}</p>

        {/* Show the "Accept" and "Reject" buttons only if the application status is not "Accepted" or "Rejected" */}
        {app.application_status !== 'Accepted' && app.application_status !== 'Rejected' && (
          <>
            <button 
              onClick={() => handleApplicationAction(app.application_id, 'Accepted')} 
              className="bg-green-600 text-white px-4 py-2 mr-2 rounded-lg"
            >
              Accept
            </button>
            <button 
              onClick={() => handleApplicationAction(app.application_id, 'Rejected')} 
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Reject
            </button>
          </>
        )}
      </div>
    ))
  )}
</div>

      </div>
    </div>
  );
};

export default RecruiterDashboard;

