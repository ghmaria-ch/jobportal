// import { useEffect, useState } from "react";
// import axios from "axios";

// const AdminDashboard = () => {
//     const [students, setStudents] = useState([]);

//     useEffect(() => {
//         fetchStudents();
//     }, []);

//     // Fetch all students
//     const fetchStudents = async () => {
//         try {
//             const response = await axios.get("http://localhost:5000/student/getallprofiles");
//             setStudents(response.data.profiles); // Fix: profiles array comes inside "profiles" key
//         } catch (error) {
//             console.error("Error fetching students:", error);
//         }
//     };

//     // Update student rating
//     const handleRatingUpdate = async (studentId, newRating) => {
//         try {
//             await axios.put(`http://localhost:5000/student/updatestudentrating/${studentId}`, { rating: newRating });
//             alert("Rating updated successfully!");
//             fetchStudents(); // Refresh data
//         } catch (error) {
//             console.error("Error updating rating:", error);
//         }
//     };

//     return (
//         <div className="container mx-auto p-6">
//             <h2 className="text-2xl font-bold mb-4">Admin Dashboard - Student Profiles</h2>
//             <div className="overflow-x-auto">
//                 <table className="w-full border-collapse border border-gray-300">
//                     <thead>
//                         <tr className="bg-gray-200">
//                             <th className="border border-gray-300 px-4 py-2">Name</th>
//                             <th className="border border-gray-300 px-4 py-2">Email</th>
//                             <th className="border border-gray-300 px-4 py-2">Degree</th>
//                             <th className="border border-gray-300 px-4 py-2">University</th>
//                             <th className="border border-gray-300 px-4 py-2">Skills</th>
//                             <th className="border border-gray-300 px-4 py-2">Rating</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {students.length === 0 ? (
//                             <tr>
//                                 <td colSpan="6" className="text-center p-4">No students found.</td>
//                             </tr>
//                         ) : (
//                             students.map((student) => (
//                                 <tr key={student.student_id} className="border border-gray-300">
//                                     <td className="border px-4 py-2">{student.name}</td>
//                                     <td className="border px-4 py-2">{student.email}</td>
//                                     <td className="border px-4 py-2">{student.degree}</td>
//                                     <td className="border px-4 py-2">{student.university}</td>
//                                     <td className="border px-4 py-2">
//                                         {student.skills.length > 0
//                                             ? student.skills.map(skill => (
//                                                 <div key={skill.skill_name}>
//                                                     {skill.skill_name} ({skill.course_score})
//                                                 </div>
//                                               ))
//                                             : "No Skills"}
//                                     </td>
//                                     <td className="border px-4 py-2">
//                                     <td className="border px-4 py-2 flex items-center gap-2">
//     <span className="font-semibold">{student.rating}</span> {/* Display Current Rating */}
//     <select
//         className="border rounded px-2 py-1 w-20"
//         value={student.rating} // Preselect the current rating
//         onChange={(e) => handleRatingUpdate(student.student_id, e.target.value)}
//     >
//         <option value="">Select</option> {/* Default option */}
//         {[...Array(11).keys()].map((num) => (
//             <option key={num} value={num}>
//                 {num}
//             </option>
//         ))}
//     </select>
// </td>


//                                     </td>
//                                 </tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;

import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get("http://localhost:5000/student/getallprofiles");
            setStudents(response.data.profiles);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    const handleRatingUpdate = async (studentId, newRating) => {
        try {
            await axios.put(`http://localhost:5000/student/updatestudentrating/${studentId}`, { rating: newRating });
            alert("Rating updated successfully!");
            fetchStudents();
        } catch (error) {
            console.error("Error updating rating:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🎓 Admin Dashboard - Student Profiles</h2>
                <div className="overflow-x-auto rounded shadow bg-white">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Name</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Email</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Degree</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">University</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Skills</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Rating</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {students.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-6 text-gray-500">No students found.</td>
                                </tr>
                            ) : (
                                students.map((student) => (
                                    <tr key={student.student_id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">{student.name}</td>
                                        <td className="px-6 py-4">{student.email}</td>
                                        <td className="px-6 py-4">{student.degree}</td>
                                        <td className="px-6 py-4">{student.university}</td>
                                        <td className="px-6 py-4">
                                            {student.skills.length > 0 ? (
                                                <ul className="list-disc list-inside space-y-1">
                                                    {student.skills.map(skill => (
                                                        <li key={skill.skill_name}>
                                                            <span className="font-medium">{skill.skill_name}</span> <span className="text-sm text-gray-500">({skill.course_score})</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <span className="text-gray-500 italic">No Skills</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-semibold text-blue-600">{student.rating}</span>
                                                <select
                                                    className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                    value={student.rating}
                                                    onChange={(e) => handleRatingUpdate(student.student_id, e.target.value)}
                                                >
                                                    <option value="">Set</option>
                                                    {[...Array(11).keys()].map((num) => (
                                                        <option key={num} value={num}>
                                                            {num}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

