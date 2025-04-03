import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    // Fetch all students
    const fetchStudents = async () => {
        try {
            const response = await axios.get("http://localhost:5000/student/getallprofiles");
            setStudents(response.data.profiles); // Fix: profiles array comes inside "profiles" key
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    // Update student rating
    const handleRatingUpdate = async (studentId, newRating) => {
        try {
            await axios.put(`http://localhost:5000/student/updatestudentrating/${studentId}`, { rating: newRating });
            alert("Rating updated successfully!");
            fetchStudents(); // Refresh data
        } catch (error) {
            console.error("Error updating rating:", error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Admin Dashboard - Student Profiles</h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Degree</th>
                            <th className="border border-gray-300 px-4 py-2">University</th>
                            <th className="border border-gray-300 px-4 py-2">Skills</th>
                            <th className="border border-gray-300 px-4 py-2">Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center p-4">No students found.</td>
                            </tr>
                        ) : (
                            students.map((student) => (
                                <tr key={student.student_id} className="border border-gray-300">
                                    <td className="border px-4 py-2">{student.name}</td>
                                    <td className="border px-4 py-2">{student.email}</td>
                                    <td className="border px-4 py-2">{student.degree}</td>
                                    <td className="border px-4 py-2">{student.university}</td>
                                    <td className="border px-4 py-2">
                                        {student.skills.length > 0
                                            ? student.skills.map(skill => (
                                                <div key={skill.skill_name}>
                                                    {skill.skill_name} ({skill.course_score})
                                                </div>
                                              ))
                                            : "No Skills"}
                                    </td>
                                    <td className="border px-4 py-2">
                                    <td className="border px-4 py-2 flex items-center gap-2">
    <span className="font-semibold">{student.rating}</span> {/* Display Current Rating */}
    <select
        className="border rounded px-2 py-1 w-20"
        value={student.rating} // Preselect the current rating
        onChange={(e) => handleRatingUpdate(student.student_id, e.target.value)}
    >
        <option value="">Select</option> {/* Default option */}
        {[...Array(11).keys()].map((num) => (
            <option key={num} value={num}>
                {num}
            </option>
        ))}
    </select>
</td>


                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
