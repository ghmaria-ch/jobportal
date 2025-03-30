// // src/pages/RecruiterDashboard.jsx
// import React from 'react';
// import { Link } from 'react-router-dom'; // For navigation if needed
// import Header from '../components/Header'; // Assuming Header component is already created

// const RecruiterDashboard = () => {
//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <Header />
//       <div className="max-w-screen-xl mx-auto p-8">
//         {/* Dashboard Header */}
//         <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
//           <h2 className="text-3xl font-semibold text-gray-800">Welcome, [Recruiter Name]!</h2>
//           <p className="text-gray-600 mt-2">Your dashboard to manage job postings, view applications, and more.</p>
//         </div>

//         {/* Quick Stats Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <h3 className="text-xl font-semibold text-gray-700">Job Postings</h3>
//             <p className="text-3xl font-bold text-blue-600">3</p>
//             <p className="text-gray-600">Active Job Postings</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <h3 className="text-xl font-semibold text-gray-700">Applications Received</h3>
//             <p className="text-3xl font-bold text-blue-600">12</p>
//             <p className="text-gray-600">Applications for your Jobs</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <h3 className="text-xl font-semibold text-gray-700">Interview Scheduled</h3>
//             <p className="text-3xl font-bold text-blue-600">5</p>
//             <p className="text-gray-600">Upcoming Interviews</p>
//           </div>
//         </div>

//         {/* Job Postings Section */}
//         <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-4">Manage Job Postings</h3>
//           <div className="space-y-4">
//             {/* Example Job Postings */}
//             <div className="flex justify-between items-center">
//               <div>
//                 <h4 className="text-lg font-medium text-gray-700">Software Engineer</h4>
//                 <p className="text-gray-500">Posted on: 10 March 2025</p>
//               </div>
//               <Link
//                 to="/edit-job/1" // Link to edit job details (if created)
//                 className="text-blue-600 hover:underline"
//               >
//                 Edit
//               </Link>
//             </div>
//             <div className="flex justify-between items-center">
//               <div>
//                 <h4 className="text-lg font-medium text-gray-700">Data Analyst</h4>
//                 <p className="text-gray-500">Posted on: 5 March 2025</p>
//               </div>
//               <Link
//                 to="/edit-job/2" // Link to edit job details (if created)
//                 className="text-blue-600 hover:underline"
//               >
//                 Edit
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Applications Section */}
//         <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-4">Applications Received</h3>
//           <div className="space-y-4">
//             {/* Example Applications */}
//             <div className="flex justify-between items-center">
//               <div>
//                 <h4 className="text-lg font-medium text-gray-700">John Doe - Software Engineer</h4>
//                 <p className="text-gray-500">Applied on: 12 March 2025</p>
//               </div>
//               <Link
//                 to="/view-application/1" // Assuming there's a page to view the application details
//                 className="text-blue-600 hover:underline"
//               >
//                 View Application
//               </Link>
//             </div>
//             <div className="flex justify-between items-center">
//               <div>
//                 <h4 className="text-lg font-medium text-gray-700">Jane Smith - Data Analyst</h4>
//                 <p className="text-gray-500">Applied on: 6 March 2025</p>
//               </div>
//               <Link
//                 to="/view-application/2" // Assuming there's a page to view the application details
//                 className="text-blue-600 hover:underline"
//               >
//                 View Application
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Profile Section */}
//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-4">Company Profile</h3>
//           <Link
//             to="/edit-company-profile" // Link to edit company profile
//             className="text-blue-600 hover:underline"
//           >
//             Edit Company Profile
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecruiterDashboard;
// src/pages/RecruiterDashboard.jsx


// import React from 'react';
// import { Link } from 'react-router-dom';
// import Header from '../components/Header';

// const RecruiterDashboard = () => {
//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <Header />
//       <div className="max-w-screen-xl mx-auto p-8">
//         {/* Dashboard Header */}
//         <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
//           <h2 className="text-3xl font-semibold text-gray-800">Welcome, Alex!</h2>
//           <p className="text-gray-600 mt-2">Your dashboard to manage job postings, view applications, and more.</p>
//         </div>

//         {/* Quick Stats Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {[
//             { title: "Job Postings", count: 3, subtitle: "Active Job Postings" },
//             { title: "Applications Received", count: 12, subtitle: "Applications for your Jobs" },
//             { title: "Interviews Scheduled", count: 5, subtitle: "Upcoming Interviews" },
//             { title: "Hired Candidates", count: 2, subtitle: "Successfully Hired" }
//           ].map((stat, index) => (
//             <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
//               <h3 className="text-xl font-semibold text-gray-700">{stat.title}</h3>
//               <p className="text-3xl font-bold text-blue-600">{stat.count}</p>
//               <p className="text-gray-600">{stat.subtitle}</p>
//             </div>
//           ))}
//         </div>

//         {/* Job Insights & Pipeline */}
//         <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-4">Job Posting Insights</h3>
//           <ul className="list-disc ml-6 text-gray-700">
//             <li>Views: 250</li>
//             <li>Click-Through Rate: 12%</li>
//             <li>Expiring Jobs: 1</li>
//           </ul>
//         </div>

//         {/* Manage Job Postings */}
//         <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-4">Manage Job Postings</h3>
//           <div className="space-y-4">
//             {["Software Engineer", "Data Analyst"].map((job, index) => (
//               <div key={index} className="flex justify-between items-center">
//                 <div>
//                   <h4 className="text-lg font-medium text-gray-700">{job}</h4>
//                   <p className="text-gray-500">Posted on: {index === 0 ? "10 March 2025" : "5 March 2025"}</p>
//                 </div>
//                 <Link to={`/edit-job/${index + 1}`} className="text-blue-600 hover:underline">Edit</Link>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Applications Section */}
//         <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-4">Applications Received</h3>
//           <div className="space-y-4">
//             {["John Doe - Software Engineer", "Jane Smith - Data Analyst"].map((app, index) => (
//               <div key={index} className="flex justify-between items-center">
//                 <div>
//                   <h4 className="text-lg font-medium text-gray-700">{app}</h4>
//                   <p className="text-gray-500">Applied on: {index === 0 ? "12 March 2025" : "6 March 2025"}</p>
//                 </div>
//                 <Link to={`/view-application/${index + 1}`} className="text-blue-600 hover:underline">View Application</Link>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Notifications Section */}
//         <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-4">Notifications</h3>
//           <ul className="list-disc ml-6 text-gray-700">
//             <li>New application received from John Doe</li>
//             <li>Interview scheduled for Jane Smith on 15 March</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecruiterDashboard;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const RecruiterDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobs, setJobs] = useState([
    { id: 1, title: 'Software Engineer', date: '10 March 2025' },
    { id: 2, title: 'Data Analyst', date: '5 March 2025' }
  ]);

  // Function to handle job submission
  const handlePostJob = () => {
    if (jobTitle.trim() === '' || jobDescription.trim() === '') return;

    const newJob = {
      id: jobs.length + 1,
      title: jobTitle,
      date: new Date().toLocaleDateString()
    };

    setJobs([...jobs, newJob]);
    setJobTitle('');
    setJobDescription('');
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="max-w-screen-xl mx-auto p-8">
        {/* Dashboard Header */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">Welcome, Alex Johnson!</h2>
          <p className="text-gray-600 mt-2">Your dashboard to manage job postings, view applications, and more.</p>
        </div>

        {/* Quick Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">Job Postings</h3>
            <p className="text-3xl font-bold text-blue-600">{jobs.length}</p>
            <p className="text-gray-600">Active Job Postings</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">Applications Received</h3>
            <p className="text-3xl font-bold text-blue-600">12</p>
            <p className="text-gray-600">Applications for your Jobs</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">Interview Scheduled</h3>
            <p className="text-3xl font-bold text-blue-600">5</p>
            <p className="text-gray-600">Upcoming Interviews</p>
          </div>
        </div>

        {/* Job Postings Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <div className="flex justify-between mb-4">
            <h3 className="text-2xl font-semibold text-gray-800">Manage Job Postings</h3>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Post a Job
            </button>
          </div>
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-medium text-gray-700">{job.title}</h4>
                  <p className="text-gray-500">Posted on: {job.date}</p>
                </div>
                <Link to={`/edit-job/${job.id}`} className="text-blue-600 hover:underline">
                  Edit
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Applications Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Applications Received</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-lg font-medium text-gray-700">John Doe - Software Engineer</h4>
                <p className="text-gray-500">Applied on: 12 March 2025</p>
              </div>
              <Link to="/view-application/1" className="text-blue-600 hover:underline">
                View Application
              </Link>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-lg font-medium text-gray-700">Jane Smith - Data Analyst</h4>
                <p className="text-gray-500">Applied on: 6 March 2025</p>
              </div>
              <Link to="/view-application/2" className="text-blue-600 hover:underline">
                View Application
              </Link>
            </div>
          </div>
        </div>

        {/* Post a Job Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Post a New Job</h3>
              <input
                type="text"
                placeholder="Job Title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full p-2 border rounded mb-4"
              />
              <textarea
                placeholder="Job Description"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full p-2 border rounded mb-4"
              />
              <div className="flex justify-end space-x-4">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button 
                  onClick={handlePostJob}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Post Job
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterDashboard;
