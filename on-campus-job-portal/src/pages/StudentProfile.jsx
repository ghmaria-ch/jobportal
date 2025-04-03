
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const StudentProfile = () => {
  const navigate = useNavigate();
  const [studentProfile, setStudentProfile] = useState({
    name: 'Null',
    email: 'Null',
    degree: 'Null',
    university: 'Null',
    skills: [],
    bio: 'Null',
    is_verified: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const studentId = localStorage.getItem('studentId');
    const token = localStorage.getItem('token');

    if (!studentId || !token) {
      console.error('Missing studentID or token');
      navigate('/login');
      return;
    }

    const fetchStudentProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/student/getprofile/${studentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const profileData = response.data.profile || {};
        setStudentProfile({
          name: profileData.name || 'Null',
          email: profileData.email || 'Null',
          degree: profileData.degree || 'Null',
          university: profileData.university || 'Null',
          skills: profileData.skills || [],
          bio: profileData.bio || 'Null',
          is_verified: profileData.is_verified || false,
        });
      } catch (err) {
        console.error('Profile fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentProfile();
  }, [navigate]);

  if (loading) return <div className="text-center text-gray-600 py-10">Loading...</div>;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen">
      <Header />
      <div className="max-w-screen-md mx-auto p-8">
        {/* Profile Header */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <div className="flex items-center space-x-4">
            {/* <div className="bg-blue-500 text-white p-4 rounded-full text-xl font-bold">
              {studentProfile.name.charAt(0)}
            </div> */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{studentProfile.name}</h2>
              <p className="text-gray-500">{studentProfile.email}</p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="mt-6 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Degree:</h3>
              <p className="text-gray-600">{studentProfile.degree}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">University:</h3>
              <p className="text-gray-600">{studentProfile.university}</p>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Skills:</h3>
              {studentProfile.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-2">
                  {studentProfile.skills.map((skill, index) => (
                    <div key={index} className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm shadow-md">
                      {skill.skill_name} 
                      <span className="ml-2 text-xs">({skill.course_duration || 'N/A'}, {skill.course_score || 'N/A'}/100)</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No skills added</p>
              )}
            </div>

            {/* Bio */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Bio:</h3>
              <p className="text-gray-600">{studentProfile.bio}</p>
            </div>
          </div>

          {/* Profile Verification Status */}
          <div className="mt-6">
            {studentProfile.is_verified ? (
              <p className="text-green-600 font-semibold flex items-center">
                ✅ Profile Verified
              </p>
            ) : (
              <p className="text-red-600 font-semibold flex items-center">
                ❌ Profile Not Verified (Admin approval required)
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => navigate('/editprofile')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
          >
            ✏️ Edit Profile
          </button>
          <button
            onClick={() => navigate('/addstudentprofile')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-all"
          >
            ➕ Add Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;

