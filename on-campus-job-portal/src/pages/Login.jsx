
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
// import Header from '../components/Header';

// const Login = () => {
//   const [isStudent, setIsStudent] = useState(false); // Track which user type is selected
//   const navigate = useNavigate();  // Initialize the navigate hook

//   // Handle navigation to student login or recruiter login
//   const handleStudentLogin = () => {
//     navigate('/studentlogin');  // Navigate to the student login page
//   };

//   const handleRecruiterLogin = () => {
//     navigate('/recruiterlogin');  // Navigate to the recruiter login page
//   };

//   return (
//     <>
//     <Header/>
//     <div className="min-h-screen flex items-center justify-center bg-gray-100"> {/* Neutral gray background */}
//       <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
//         <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Welcome to CampusJobs</h2>

//         <div className="mb-6">
//           <h3 className="text-xl font-medium text-gray-700 text-center mb-4">Login as:</h3>
//           <div className="flex justify-center space-x-4">
//             <button
//               onClick={handleStudentLogin}  // Navigate to student login page
//               className={`px-6 py-3 rounded-full text-white font-medium transition-colors duration-300 ${
//                 isStudent ? 'bg-blue-600' : 'bg-gray-600 hover:bg-blue-600'
//               }`}
//             >
//               Student
//             </button>
//             <button
//               onClick={handleRecruiterLogin}  // Navigate to recruiter login page
//               className={`px-6 py-3 rounded-full text-white font-medium transition-colors duration-300 ${
//                 !isStudent ? 'bg-blue-600' : 'bg-gray-600 hover:bg-blue-600'
//               }`}
//             >
//               Recruiter
//             </button>
//           </div>
//         </div>

//         <div className="mt-6 text-center text-sm text-gray-600">
//           Don't have an account?{' '}
//           <div></div>
//           <Link to="/studentsignup" className="text-blue-500 hover:underline">
//             Sign Up as student
//           </Link>
//           <div></div>
//           <Link to="/recruitersignup" className="text-blue-500 hover:underline">
//             Sign Up as recruiter
//           </Link>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Login = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
    
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-10 max-w-md w-full">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Welcome to CampusJobs</h2>
          <h3 className="text-lg font-medium text-gray-600 text-center mb-4">Login as:</h3>
          <div className="flex justify-center space-x-4">
          <button
          onClick={()=>navigate("/adminlogin")}
          className="px-6 py-3 text-lg font-semibold rounded-full bg-gray-700 text-white shadow-md transition-all hover:bg-blue-600 hover:scale-105"
          >Admin</button>
            <button
              onClick={() => navigate('/studentlogin')}
              className="px-6 py-3 text-lg font-semibold rounded-full bg-gray-700 text-white shadow-md transition-all hover:bg-blue-600 hover:scale-105"
            >
              Student
            </button>
            <button
              onClick={() => navigate('/recruiterlogin')}
              className="px-6 py-3 text-lg font-semibold rounded-full bg-blue-600 text-white shadow-md transition-all hover:bg-indigo-700 hover:scale-105"
            >
              Recruiter
            </button>
          </div>

          <div className="mt-6 text-center text-gray-600">
            Don't have an account?
            <div className="mt-2">
              <Link to="/studentsignup" className="text-blue-500 font-semibold hover:underline hover:text-blue-700">
                Sign Up as Student
              </Link>
            </div>
            <div className="mt-1">
              <Link to="/recruitersignup" className="text-blue-500 font-semibold hover:underline hover:text-blue-700">
                Sign Up as Recruiter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;


