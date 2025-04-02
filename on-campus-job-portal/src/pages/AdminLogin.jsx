

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for login button
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.email || !formData.password) {
//       setError('Please fill in both fields.');
//       return;
//     }

//     setLoading(true); // Set loading to true when submitting the form
//     setError(''); // Reset previous errors

//     try {
//       // Send login credentials to the backend
//       const response = await fetch('http://localhost:5000/api/students/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData), // Send email and password
//       });

//       const data = await response.json(); // Parse the response

//       if (!response.ok) {
//         // If response is not ok (e.g. invalid credentials)
//         throw new Error(data.message || 'Login failed');
//       }

//       // Store JWT token in local storage
//       console.log(data)
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('studentName', data.name);
//       localStorage.setItem('studentEmail',data.email);
//       localStorage.setItem('studentID',data.id)

//       // Redirect to the student dashboard
//       navigate('/studentdashboard');
//     } catch (error) {
//       // Handle error (invalid login credentials, etc.)
//       setError(error.message);
//     } finally {
//       setLoading(false); // Set loading to false after response
//     }
//   };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-10 max-w-md w-full">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>

        {/* Display error message if exists */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form 
        // onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-300 disabled:opacity-50"
            disabled={loading} // Disable button while loading
            onClick={()=>navigate("/admindashboard")}
            
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/studentsignup" className="text-blue-500 font-semibold hover:underline">
            Sign Up
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default AdminLogin;
