import { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ approved: 0, rejected: 0, pending: 0 });
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    // Hardcoded student data (Replace this with API call)
    const fetchedStudents = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        degree: "B.Tech IT",
        university: "XYZ University",
        bio: "Aspiring Software Engineer",
        location: "New York",
        is_verified: false,
        is_rejected: false,
        skills: [
          { skill_name: "React", certificate: "certificates/react.pdf" },
          { skill_name: "Node.js", certificate: "certificates/node.pdf" },
        ],
      },
      {
        id: 2,
        name: "Alice Smith",
        email: "alice@example.com",
        degree: "B.Tech CSE",
        university: "ABC University",
        bio: "Machine Learning Enthusiast",
        location: "California",
        is_verified: false,
        is_rejected: false,
        skills: [
          { skill_name: "Python", certificate: "certificates/python.pdf" },
        ],
      },
    ];

    setStudents(fetchedStudents);
    updateStats(fetchedStudents);
  };

  const updateStats = (students) => {
    const approved = students.filter((s) => s.is_verified).length;
    const rejected = students.filter((s) => s.is_rejected).length;
    const pending = students.length - approved - rejected;
    setStats({ approved, rejected, pending });
  };

  const handleVerification = (id, isApproved) => {
    setStudents((prev) => {
      const updatedStudents = prev.map((student) =>
        student.id === id
          ? { ...student, is_verified: isApproved, is_rejected: !isApproved }
          : student
      );
      updateStats(updatedStudents);
      return updatedStudents;
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h2 className="text-3xl font-semibold text-gray-800">Admin Dashboard</h2>
      <p className="text-gray-600">Manage student profile verifications</p>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-green-600">
          <h3 className="text-xl font-semibold">Approved</h3>
          <p className="text-3xl font-bold">{stats.approved}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-red-600">
          <h3 className="text-xl font-semibold">Rejected</h3>
          <p className="text-3xl font-bold">{stats.rejected}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-yellow-600">
          <h3 className="text-xl font-semibold">Pending</h3>
          <p className="text-3xl font-bold">{stats.pending}</p>
        </div>
      </div>

      {/* Pending Verifications Table */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <h3 className="text-2xl font-semibold text-gray-800">Student Profiles</h3>
        <table className="w-full mt-4 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-3">Name</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Degree</th>
              <th className="border p-3">University</th>
              <th className="border p-3">Skills</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border">
                <td className="border p-3">{student.name}</td>
                <td className="border p-3">{student.email}</td>
                <td className="border p-3">{student.degree}</td>
                <td className="border p-3">{student.university}</td>
                <td className="border p-3">
                  {student.skills.map((skill, index) => (
                    <div key={index}>
                      {skill.skill_name} -
                      <a
                        href={skill.certificate}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline ml-1"
                      >
                        View Certificate
                      </a>
                    </div>
                  ))}
                </td>
                <td className="border p-3 flex space-x-2">
                  {!student.is_verified && !student.is_rejected && (
                    <>
                      <button
                        className="bg-green-600 text-white px-4 py-2 rounded"
                        onClick={() => handleVerification(student.id, true)}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-600 text-white px-4 py-2 rounded"
                        onClick={() => handleVerification(student.id, false)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {student.is_verified && (
                    <p className="text-green-600 font-semibold">Approved ✅</p>
                  )}
                  {student.is_rejected && (
                    <p className="text-red-600 font-semibold">Rejected ❌</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
