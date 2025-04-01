// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import Header from '../components/Header';

// // const StudentProfile = () => {
// //   const navigate = useNavigate();
// //   const [isVerified, setIsVerified] = useState(false); // Admin verification state

// //   // Student data (can be fetched from an API later)
// //   const studentProfile = {
// //     name: 'John Doe',
// //     email: 'johndoe@example.com',
// //     degree: 'Bachelor of Computer Science',
// //     university: 'ABC University',
// //     skills: ['JavaScript', 'React', 'Node.js', 'Python'],
// //     bio: 'A passionate software developer looking for new opportunities in web development.',
// //     location: 'New York, NY',
// //   };

// //   const handleEditProfile = () => {
// //     navigate('/editprofile');
// //   };

// //   return (
// //     <div className="bg-gray-100 min-h-screen">
// //       <Header />
// //       <div className="max-w-screen-xl mx-auto p-8">
// //         <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
// //           <h2 className="text-3xl font-semibold text-gray-800 mb-4">Student Profile</h2>
// //           <div className="space-y-4">
// //             <div>
// //               <h3 className="text-lg font-medium text-gray-700">Name:</h3>
// //               <p className="text-gray-500">{studentProfile.name}</p>
// //             </div>
// //             <div>
// //               <h3 className="text-lg font-medium text-gray-700">Email:</h3>
// //               <p className="text-gray-500">{studentProfile.email}</p>
// //             </div>
// //             <div>
// //               <h3 className="text-lg font-medium text-gray-700">Degree:</h3>
// //               <p className="text-gray-500">{studentProfile.degree}</p>
// //             </div>
// //             <div>
// //               <h3 className="text-lg font-medium text-gray-700">University:</h3>
// //               <p className="text-gray-500">{studentProfile.university}</p>
// //             </div>
// //             <div>
// //               <h3 className="text-lg font-medium text-gray-700">Skills:</h3>
// //               <ul className="text-gray-500 list-disc pl-5">
// //                 {studentProfile.skills.map((skill, index) => (
// //                   <li key={index}>{skill}</li>
// //                 ))}
// //               </ul>
// //             </div>
// //             <div>
// //               <h3 className="text-lg font-medium text-gray-700">Bio:</h3>
// //               <p className="text-gray-500">{studentProfile.bio}</p>
// //             </div>
// //             <div>
// //               <h3 className="text-lg font-medium text-gray-700">Location:</h3>
// //               <p className="text-gray-500">{studentProfile.location}</p>
// //             </div>
// //           </div>

// //           {/* Verification Status */}
// //           <div className="mt-6">
// //             {isVerified ? (
// //               <p className="text-green-600 font-semibold">Profile Verified ✅</p>
// //             ) : (
// //               <p className="text-red-600 font-semibold">Profile Not Verified ❌ (Admin approval required)</p>
// //             )}
// //           </div>
// //         </div>

// //         {/* Buttons */}
// //         <div className="flex space-x-4">
// //           <button
// //             onClick={handleEditProfile}
// //             className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
// //           >
// //             Edit Profile
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default StudentProfile;


















// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from '../components/Header';
// import axios from 'axios'; // You may need to install axios for API requests

// const StudentProfile = () => {
//   const navigate = useNavigate();
//   const [isVerified, setIsVerified] = useState(false); // Admin verification state
//   const [studentProfile, setStudentProfile] = useState(null); // Holds student profile data
//   const [loading, setLoading] = useState(true); // Loading state to handle data fetching

//   const studentId = localStorage.getItem('studentId'); // Assuming student ID is stored in localStorage
//   const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

//   useEffect(() => {
//     // Fetch profile data from backend when component mounts
//     const fetchStudentProfile = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/profile/${studentId}`, {
//           headers: {
//             Authorization: `Bearer ${token}` // Send the JWT token in the header
//           }
//         });
        
//         setStudentProfile(response.data);
//         setIsVerified(response.data.is_verified); // Assuming the profile has an "is_verified" field
//         setLoading(false); // Stop loading once data is fetched
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//         setLoading(false);
//       }
//     };

//     if (studentId && token) {
//       fetchStudentProfile();
//     }
//   }, [studentId, token]); // Dependency array to re-run when studentId or token changes

//   const handleEditProfile = () => {
//     navigate('/editprofile');
//   };

//   if (loading) {
//     return <div>Loading...</div>; // Loading indicator until the data is fetched
//   }

//   if (!studentProfile) {
//     return <div>Error: Profile not found</div>; // Handle case where profile is not found
//   }

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <Header />
//       <div className="max-w-screen-xl mx-auto p-8">
//         <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
//           <h2 className="text-3xl font-semibold text-gray-800 mb-4">Student Profile</h2>
//           <div className="space-y-4">
//             <div>
//               <h3 className="text-lg font-medium text-gray-700">Name:</h3>
//               <p className="text-gray-500">{studentProfile.name}</p>
//             </div>
//             <div>
//               <h3 className="text-lg font-medium text-gray-700">Email:</h3>
//               <p className="text-gray-500">{studentProfile.email}</p>
//             </div>
//             <div>
//               <h3 className="text-lg font-medium text-gray-700">Degree:</h3>
//               <p className="text-gray-500">{studentProfile.degree}</p>
//             </div>
//             <div>
//               <h3 className="text-lg font-medium text-gray-700">University:</h3>
//               <p className="text-gray-500">{studentProfile.university}</p>
//             </div>
//             <div>
//               <h3 className="text-lg font-medium text-gray-700">Skills:</h3>
//               <ul className="text-gray-500 list-disc pl-5">
//                 {studentProfile.skills?.map((skill, index) => (
//                   <li key={index}>{skill}</li>
//                 ))}
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-lg font-medium text-gray-700">Bio:</h3>
//               <p className="text-gray-500">{studentProfile.bio}</p>
//             </div>
//             <div>
//               <h3 className="text-lg font-medium text-gray-700">Location:</h3>
//               <p className="text-gray-500">{studentProfile.location}</p>
//             </div>
//           </div>

//           {/* Verification Status */}
//           <div className="mt-6">
//             {isVerified ? (
//               <p className="text-green-600 font-semibold">Profile Verified ✅</p>
//             ) : (
//               <p className="text-red-600 font-semibold">Profile Not Verified ❌ (Admin approval required)</p>
//             )}
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex space-x-4">
//           <button
//             onClick={handleEditProfile}
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
//           >
//             Edit Profile
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentProfile;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from '../components/Header';
// import axios from 'axios';

// const StudentProfile = () => {
//   const navigate = useNavigate();
//   const [profile, setProfile] = useState(null); // Store profile data
//   const [skills, setSkills] = useState([]); // Store skills separately
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state

//   const studentId = localStorage.getItem('studentId'); // Get student ID from storage
//   const token = localStorage.getItem('token'); // Get auth token

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/profile/${studentId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (response.data.profile) {
//           setProfile(response.data.profile);
//           setSkills(response.data.skills || []); // Ensure skills is an array
//         } else {
//           setError("Profile not found");
//         }
//       } catch (err) {
//         setError("Failed to fetch profile");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (studentId && token) {
//       fetchProfile();
//     } else {
//       setError("User not logged in");
//       setLoading(false);
//     }
//   }, [studentId, token]);

//   const handleEditProfile = () => navigate('/editprofile');

//   if (loading) return <div>Loading...</div>;

//   if (error) return <div className="text-red-500">{error}</div>;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const StudentProfile = () => {
  const navigate = useNavigate();
  const [studentProfile, setStudentProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const handleEditProfile = () => {
        navigate('/editprofile');
      };

  useEffect(() => {
    const studentId = localStorage.getItem('studentID'); // FIX: Match localStorage key
    const token = localStorage.getItem('token');

    if (!studentId || !token) {
      console.error('Missing studentID or token'); // Debugging
      navigate('/login');
      return;
    }

    const fetchStudentProfile = async () => {
      try {
        // const response = await axios.get(`http://localhost:5000/profile/${studentId}`, {
        //   headers: { Authorization: `Bearer ${token}` },
        // });

        const response = await axios.get(`http://localhost:5000/api/students/profile/${studentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
    
        setStudentProfile({
          ...response.data.profile, // Update profile data
          skills: response.data.skills, // Add skills to profile
        });
        setLoading(false);
      } catch (err) {
        console.error('Profile fetch error:', err);
        setError('Failed to fetch profile');
        setLoading(false);
      }
    };
    

    fetchStudentProfile();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!studentProfile) return <div>Error: Profile not found</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="max-w-screen-xl mx-auto p-8">
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Student Profile</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-700">Name:</h3>
              <p className="text-gray-500">{studentProfile.name}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700">Email:</h3>
              <p className="text-gray-500">{studentProfile.email}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700">Degree:</h3>
              <p className="text-gray-500">{studentProfile.degree}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700">University:</h3>
              <p className="text-gray-500">{studentProfile.university}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700">Skills:</h3>
              {studentProfile.skills.length > 0 ? (
                <ul className="text-gray-500 list-disc pl-5">
                  {studentProfile.skills.map((skill, index) => (
                    <li key={index}>{skill.skill_name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No skills added yet</p>
              )}
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700">Bio:</h3>
              <p className="text-gray-500">{studentProfile.bio}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700">Location:</h3>
              <p className="text-gray-500">{studentProfile.location}</p>
            </div>
          </div>

          {/* Verification Status */}
          <div className="mt-6">
            {studentProfile.is_verified ? (
              <p className="text-green-600 font-semibold">Profile Verified ✅</p>
            ) : (
              <p className="text-red-600 font-semibold">Profile Not Verified ❌ (Admin approval required)</p>
            )}
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="flex space-x-4">
          <button
            onClick={handleEditProfile}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Header from '../components/Header';

// const StudentProfile = () => {
//   const navigate = useNavigate();
//   const [studentProfile, setStudentProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [certificateUrl, setCertificateUrl] = useState(null); // State to hold certificate URL

//   const handleEditProfile = () => {
//     navigate('/editprofile');
//   };

//   const handleViewCertificate = (certificateUrl) => {
//     // Handle the certificate view logic (this can be an in-page view or a redirect to the file URL)
//     setCertificateUrl(certificateUrl);
//   };

//   useEffect(() => {
//     const studentId = localStorage.getItem('studentID'); // FIX: Match localStorage key
//     const token = localStorage.getItem('token');

//     if (!studentId || !token) {
//       console.error('Missing studentID or token'); // Debugging
//       navigate('/login');
//       return;
//     }

//     const fetchStudentProfile = async () => {
//       try {
//         // Fetching profile and skills
//         const response = await axios.get(`http://localhost:5000/api/students/profile/1`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setStudentProfile({
//           ...response.data.profile, // Update profile data
//           skills: response.data.skills, // Add skills to profile
//         });
//         setLoading(false);
//       } catch (err) {
//         console.error('Profile fetch error:', err);
//         setError('Failed to fetch profile');
//         setLoading(false);
//       }
//     };

//     fetchStudentProfile();
//   }, [navigate]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;
//   if (!studentProfile) return <div>Error: Profile not found</div>;

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <Header />
//       <div className="max-w-screen-xl mx-auto p-8">
//         <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
//           <h2 className="text-3xl font-semibold text-gray-800 mb-4">Student Profile</h2>
//           <div className="space-y-4">
//             <div>
//               <h3 className="text-lg font-medium text-gray-700">Name:</h3>
//               <p className="text-gray-500">{studentProfile.name}</p>
//             </div>
//             <div>
//               <h3 className="text-lg font-medium text-gray-700">Email:</h3>
//               <p className="text-gray-500">{studentProfile.email}</p>
//             </div>
//             <div>
//               <h3 className="text-lg font-medium text-gray-700">Degree:</h3>
//               <p className="text-gray-500">{studentProfile.degree}</p>
//             </div>
//             <div>
//               <h3 className="text-lg font-medium text-gray-700">University:</h3>
//               <p className="text-gray-500">{studentProfile.university}</p>
//             </div>
//             <div>
//               <h3 className="text-lg font-medium text-gray-700">Skills:</h3>
//               {studentProfile.skills.length > 0 ? (
//                 <ul className="text-gray-500 list-disc pl-5">
//                   {studentProfile.skills.map((skill, index) => (
//                     <li key={index}>
//                       {skill.skill_name}
//                       {/* View Certificate Button */}
//                       {skill.certificate_url && (
//                         <button
//                           onClick={() => handleViewCertificate(skill.certificate_url)}
//                           className="ml-4 text-blue-600 hover:underline"
//                         >
//                           View Certificate
//                         </button>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-500">No skills added yet</p>
//               )}
//             </div>
//             <div>
//               <h3 className="text-lg font-medium text-gray-700">Bio:</h3>
//               <p className="text-gray-500">{studentProfile.bio}</p>
//             </div>
//             <div>
//               <h3 className="text-lg font-medium text-gray-700">Location:</h3>
//               <p className="text-gray-500">{studentProfile.location}</p>
//             </div>
//           </div>

//           {/* Verification Status */}
//           <div className="mt-6">
//             {studentProfile.is_verified ? (
//               <p className="text-green-600 font-semibold">Profile Verified ✅</p>
//             ) : (
//               <p className="text-red-600 font-semibold">Profile Not Verified ❌ (Admin approval required)</p>
//             )}
//           </div>
//         </div>

//         {/* Edit Profile Button */}
//         <div className="flex space-x-4">
//           <button
//             onClick={handleEditProfile}
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
//           >
//             Edit Profile
//           </button>
//         </div>
//       </div>

//       {/* Show Certificate Modal */}
//       {certificateUrl && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-4 rounded-lg">
//             <button
//               onClick={() => setCertificateUrl(null)}
//               className="text-red-500 font-bold mb-4"
//             >
//               Close
//             </button>
//             <div>
//               <iframe
//                 src={certificateUrl}
//                 width="600"
//                 height="400"
//                 className="border"
//                 title="Certificate"
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentProfile;



