
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Header from '../components/Header'; // Assuming Header component is already created

const StudentDashboard = () => {
  // State to store job opportunities
  const [jobs, setJobs] = useState([]);
  
  // State to store applied jobs
  const [appliedJobs, setAppliedJobs] = useState([]);

  // State to store the filter criteria
  const [filters, setFilters] = useState({
    jobType: '',
    location: '',
    category: '',
    salary: [0, 100000],
  });

  // Using useNavigate hook for navigation
  const navigate = useNavigate();

  // Fetch jobs data (this would ideally come from an API)
  useEffect(() => {
    const fetchJobs = () => {
      // This is mock data. Replace with your actual API call.
      const allJobs = [
        {
          id: 1,
          title: 'Software Engineer',
          company: 'TechCorp',
          location: 'New York, NY',
          jobType: 'Full-time',
          category: 'Software Engineering',
          salary: 90000,
        },
        {
          id: 2,
          title: 'Data Scientist',
          company: 'DataX',
          location: 'San Francisco, CA',
          jobType: 'Part-time',
          category: 'Data Science',
          salary: 70000,
        },
        {
          id: 3,
          title: 'Frontend Developer',
          company: 'WebTech',
          location: 'Remote',
          jobType: 'Internship',
          category: 'Software Engineering',
          salary: 60000,
        },
      ];
      setJobs(allJobs);
    };

    fetchJobs();
  }, []);

  // Function to handle filter changes
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Function to filter jobs based on selected filters
  const filteredJobs = jobs.filter((job) => {
    const { jobType, location, category, salary } = filters;
    return (
      (jobType ? job.jobType === jobType : true) &&
      (location ? job.location.toLowerCase().includes(location.toLowerCase()) : true) &&
      (category ? job.category === category : true) &&
      (job.salary >= salary[0] && job.salary <= salary[1])
    );
  });

  // Function to apply for a job
  const handleApply = (jobId) => {
    const jobToApply = jobs.find((job) => job.id === jobId);
    setAppliedJobs([...appliedJobs, jobToApply]); // Add the job to applied jobs
  };

  // Function to navigate to the student's profile page
  const handleViewProfile = () => {
    navigate('/studentprofile'); // Navigate to the StudentProfilePage
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="max-w-screen-xl mx-auto p-8">
        {/* Dashboard Header */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">Welcome, John Doe!</h2>
          <p className="text-gray-600 mt-2">Explore available job opportunities that match your skills.</p>
          <br/>
          <button
            onClick={handleViewProfile} // Add onClick to navigate
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            View Profile
          </button>
        </div>



        {/* Filter Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Filter Jobs</h3>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <select
                name="jobType"
                value={filters.jobType}
                onChange={handleFilterChange}
                className="p-3 border rounded-md w-1/4"
              >
                <option value="">All Job Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
              </select>

              <select
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="p-3 border rounded-md w-1/4"
              >
                <option value="">All Locations</option>
                <option value="New York, NY">New York, NY</option>
                <option value="San Francisco, CA">San Francisco, CA</option>
                <option value="Remote">Remote</option>
              </select>

              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="p-3 border rounded-md w-1/4"
              >
                <option value="">All Categories</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Data Science">Data Science</option>
              </select>

              <div className="flex items-center">
                <input
                  type="number"
                  name="salaryMin"
                  value={filters.salary[0]}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      salary: [parseInt(e.target.value), filters.salary[1]],
                    })
                  }
                  className="p-3 border rounded-md w-1/4"
                  placeholder="Min Salary"
                />
                <span className="mx-2">-</span>
                <input
                  type="number"
                  name="salaryMax"
                  value={filters.salary[1]}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      salary: [filters.salary[0], parseInt(e.target.value)],
                    })
                  }
                  className="p-3 border rounded-md w-1/4"
                  placeholder="Max Salary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Job Listings Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Job Opportunities</h3>
          {filteredJobs.length > 0 ? (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div key={job.id} className="flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-medium text-gray-700">{job.title}</h4>
                    <p className="text-gray-500">{job.company}</p>
                    <p className="text-gray-400">{job.location}</p>
                    <p className="text-gray-600">{job.jobType}</p>
                    <p className="text-blue-600 font-medium">{`$${job.salary}`}</p>
                  </div>
                  <button
                    onClick={() => handleApply(job.id)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg"
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
                <div key={job.id} className="flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-medium text-gray-700">{job.title}</h4>
                    <p className="text-gray-500">{job.company}</p>
                    <p className="text-gray-400">{job.location}</p>
                    <p className="text-gray-600">{job.jobType}</p>
                    <p className="text-blue-600 font-medium">{`$${job.salary}`}</p>
                  </div>
                  <button className="bg-gray-500 text-white px-6 py-3 rounded-lg cursor-not-allowed">
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

