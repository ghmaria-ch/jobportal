import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const EditProfilePage = () => {
  const navigate = useNavigate();

  const studentId = localStorage.getItem('studentID');
  const token = localStorage.getItem('token');

  const [studentProfile, setStudentProfile] = useState(null);
  const [skills, setSkills] = useState([{ name: '', certificate: null }]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/students/profile/${studentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const profileData = response.data.profile;
        const skillsData = response.data.skills.map(skill => ({
          name: skill.skill_name,
          certificate: skill.certificate_path ? { name: skill.certificate_path.split('/').pop() } : null
        }));

        setStudentProfile(profileData);
        setSkills(skillsData.length > 0 ? skillsData : [{ name: '', certificate: null }]);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        alert('Failed to fetch profile data.');
      }
    };

    if (studentId) fetchProfile();
  }, [studentId, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillNameChange = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index].name = value;
    setSkills(updatedSkills);
  };

  const handleCertificateChange = (index, file) => {
    const updatedSkills = [...skills];
    updatedSkills[index].certificate = file;
    setSkills(updatedSkills);
  };

  const addSkill = () => {
    if (skills.length < 5) {
      setSkills([...skills, { name: '', certificate: null }]);
    } else {
      alert('You can only add up to 5 skills.');
    }
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append('name', studentProfile.name);
      formData.append('email', studentProfile.email);
      formData.append('degree', studentProfile.degree);
      formData.append('university', studentProfile.university);
      formData.append('location', studentProfile.location);
      formData.append('bio', studentProfile.bio);

      const skillsData = skills.map(skill => ({
        name: skill.name,
        certificate: skill.certificate instanceof File ? null : skill.certificate?.name,
      }));

      formData.append('skills', JSON.stringify(skillsData));

      skills.forEach((skill, index) => {
        if (skill.certificate instanceof File) {
          formData.append(`certificates`, skill.certificate);
        }
      });

      const response = await axios.put(
        `http://localhost:5000/uprofile/${studentId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
      );

      if (response.status === 200) {
        alert('Profile updated successfully!');
        navigate('/studentprofile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  if (!studentProfile) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="max-w-3xl mx-auto py-10 px-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
          <h2 className="text-3xl font-semibold text-gray-800 text-center">Edit Profile</h2>

          {['name', 'email', 'degree', 'university', 'location'].map((field) => (
            <div key={field}>
              <label className="block text-gray-600 font-medium capitalize mb-1">{field}</label>
              <input
                type="text"
                name={field}
                value={studentProfile[field] || ''}
                onChange={handleInputChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          ))}

          <div>
            <label className="block text-gray-600 font-medium mb-1">Bio</label>
            <textarea
              name="bio"
              value={studentProfile.bio || ''}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              rows="3"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Skills (Max 5)</h3>
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center space-x-3 mb-3">
                <input
                  type="text"
                  placeholder="Skill Name"
                  value={skill.name}
                  onChange={(e) => handleSkillNameChange(index, e.target.value)}
                  className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />

                <label className="flex items-center justify-center cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded-lg transition">
                  {skill.certificate ? 'Change File' : 'Choose File'}
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleCertificateChange(index, e.target.files[0])}
                  />
                </label>

                {skill.certificate && (
                  <>
                    <span className="text-sm text-gray-600 truncate w-32">
                      {skill.certificate.name}
                    </span>
                  </>
                )}

                {skills.length > 1 && (
                  <button
                    onClick={() => removeSkill(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            {skills.length < 5 && (
              <button
                onClick={addSkill}
                className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
              >
                + Add Skill
              </button>
            )}
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              onClick={() => navigate('/studentprofile')}
              className="px-6 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveChanges}
              className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
