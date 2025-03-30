import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const StudentProfile = () => {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false); // Admin verification state

  // Student data (can be fetched from an API later)
  const studentProfile = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    degree: 'Bachelor of Computer Science',
    university: 'ABC University',
    skills: ['JavaScript', 'React', 'Node.js', 'Python'],
    bio: 'A passionate software developer looking for new opportunities in web development.',
    location: 'New York, NY',
  };

  const handleEditProfile = () => {
    navigate('/editprofile');
  };

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
              <ul className="text-gray-500 list-disc pl-5">
                {studentProfile.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
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
            {isVerified ? (
              <p className="text-green-600 font-semibold">Profile Verified ✅</p>
            ) : (
              <p className="text-red-600 font-semibold">Profile Not Verified ❌ (Admin approval required)</p>
            )}
          </div>
        </div>

        {/* Buttons */}
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

