// // src/pages/RecruiterSignUp.jsx
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const RecruiterSignUp = () => {
//   const [formData, setFormData] = useState({
//     companyName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     jobTitle: '',
//   });

//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Simple validation for password confirmation
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords don't match.");
//       return;
//     }

//     setError('');
//     // Perform sign-up logic here
//     console.log("Form submitted:", formData);
//     // After successful sign-up, redirect or show a success message
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
//         <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Recruiter Sign Up</h2>

//         {/* Error message */}
//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//         <form onSubmit={handleSubmit}>
//           {/* Company Name */}
//           <div className="mb-4">
//             <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
//             <input
//               type="text"
//               id="companyName"
//               name="companyName"
//               value={formData.companyName}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg"
//               placeholder="Enter your company name"
//               required
//             />
//           </div>

//           {/* Job Title */}
//           <div className="mb-4">
//             <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
//             <input
//               type="text"
//               id="jobTitle"
//               name="jobTitle"
//               value={formData.jobTitle}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg"
//               placeholder="Enter your job title"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg"
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg"
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           {/* Confirm Password */}
//           <div className="mb-6">
//             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
//             <input
//               type="password"
//               id="confirmPassword"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg"
//               placeholder="Confirm your password"
//               required
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-300"
//           >
//             Sign Up
//           </button>
//         </form>

//         <div className="mt-6 text-center text-sm text-gray-600">
//           Already have an account?{' '}
//           <Link to="/login" className="text-blue-500 hover:underline">
//             Login
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecruiterSignUp;
import React, { useState } from 'react';
import axios from 'axios';

const RecruiterSignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role:'recruiter'
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match.");
      setSuccess('');
      return;
    }
    

    try {
      const response = await axios.post("http://localhost:5000/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      setSuccess("Sign-up successful! You can now log in.");
      setError("");
      setFormData({ name: "", email: "", password: "", confirmPassword: "", role: "recruiter" }); // Reset form
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
      setSuccess("");
    }
  };
  //     const response = await fetch('http://localhost:5000/api/recruiter/signup', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         companyName: formData.companyName,
  //         jobTitle: formData.jobTitle,
  //         email: formData.email,
  //         password: formData.password,
  //       }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       setSuccess('Signup successful! Redirecting...');
  //       setTimeout(() => navigate('/login'), 2000); // Redirect after success
  //     } else {
  //       setError(data.error);
  //     }
  //   } catch (error) {
  //     setError('Signup failed. Please try again.');
  //   }
  // };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-100">
    //   <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
    //     <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Recruiter Sign Up</h2>

    //     {error && <p className="text-red-500 text-center mb-4">{error}</p>}
    //     {success && <p className="text-green-500 text-center mb-4">{success}</p>}

    //     <form onSubmit={handleSubmit}>
    //       <div className="mb-4">
    //         <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
    //         <input
    //           type="text"
    //           name="companyName"
    //           value={formData.companyName}
    //           onChange={handleChange}
    //           className="w-full p-3 border border-gray-300 rounded-lg"
    //           required
    //         />
    //       </div>

    //       <div className="mb-4">
    //         <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
    //         <input
    //           type="text"
    //           name="jobTitle"
    //           value={formData.jobTitle}
    //           onChange={handleChange}
    //           className="w-full p-3 border border-gray-300 rounded-lg"
    //           required
    //         />
    //       </div>

    //       <div className="mb-4">
    //         <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
    //         <input
    //           type="email"
    //           name="email"
    //           value={formData.email}
    //           onChange={handleChange}
    //           className="w-full p-3 border border-gray-300 rounded-lg"
    //           required
    //         />
    //       </div>

    //       <div className="mb-4">
    //         <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
    //         <input
    //           type="password"
    //           name="password"
    //           value={formData.password}
    //           onChange={handleChange}
    //           className="w-full p-3 border border-gray-300 rounded-lg"
    //           required
    //         />
    //       </div>

    //       <div className="mb-6">
    //         <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
    //         <input
    //           type="password"
    //           name="confirmPassword"
    //           value={formData.confirmPassword}
    //           onChange={handleChange}
    //           className="w-full p-3 border border-gray-300 rounded-lg"
    //           required
    //         />
    //       </div>

    //       <button
    //         type="submit"
    //         className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-300"
    //       >
    //         Sign Up
    //       </button>
    //     </form>

    //     <div className="mt-6 text-center text-sm text-gray-600">
    //       Already have an account?{' '}
    //       <Link to="/login" className="text-blue-500 hover:underline">
    //         Login
    //       </Link>
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Recruiter Sign Up</h2>

        {/* Error & Success Messages */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Confirm your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecruiterSignUp;
