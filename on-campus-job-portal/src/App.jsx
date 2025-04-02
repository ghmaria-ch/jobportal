// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated import for React Router v6
import Home from './pages/Home'; // Home Page
import About from './components/About'; // About Page
import Contact from './components/Contact'; // Contact Page // Header with navigation
import Login from './pages/Login';
import StudentSignUp from './pages/StudentSignUp';
import RecruiterSignUp from './pages/RecruiterSignUp';
import RecruiterLogin from './pages/RecruiterLogin';
import StudentLogin from './pages/StudentLogin';
import StudentDashboard from './pages/StudentDashBoard';
import RecruiterDashboard from './pages/RecruiterDashBorad';
import StudentProfile from './pages/StudentProfile';
import EditProfile from './pages/EditProfile';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="bg-gray-50 min-h-screen">
        <main className="p-8">
          <Routes>
            <Route path="/" element={<Home />} /> {/* Updated Route for React Router v6 */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/studentsignup" element={<StudentSignUp/>}/>
            <Route path="/recruitersignup" element={<RecruiterSignUp/>}/>
            <Route path="/studentlogin" element={<StudentLogin/>} />
            <Route path="/recruiterlogin" element={<RecruiterLogin/>} />
            <Route path="/studentdashboard" element={<StudentDashboard/>} />
            <Route path="/recruiterdashboard" element={<RecruiterDashboard/>} />
            <Route path="/studentprofile" element={<StudentProfile/>}/>
            <Route path="/editprofile" element={<EditProfile/>}/>
            <Route path="/adminlogin" element={<AdminLogin/>}/>
            <Route path="/admindashboard" element={<AdminDashboard/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
