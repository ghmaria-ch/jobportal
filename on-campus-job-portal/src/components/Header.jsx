// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <header className="bg-[#0A1D37] text-white p-4 shadow-lg sticky top-0 z-50">
//       <nav className="max-w-screen-xl mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <div className="flex items-center space-x-4">
//           <div className="text-3xl font-bold text-white">
//             <Link to="/">CampusJobs</Link>
//           </div>
//         </div>

//         {/* Desktop Menu Links */}
//         <div className="hidden md:flex space-x-8">
//           <Link
//             to="/"
//             className="text-lg font-semibold hover:underline transition-all duration-300"
//           >
//             Home
//           </Link>
//           <Link
//             to="#about"
//             className="text-lg font-semibold hover:underline transition-all duration-300"
//           >
//             About
//           </Link>
//           <Link
//             to="/contact"
//             className="text-lg font-semibold hover:underline transition-all duration-300"
//           >
//             Contact
//           </Link>
//           <Link
//             to="/login"
//             className="text-lg font-semibold hover:underline transition-all duration-300"
//           >
//             Login
//           </Link>
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden">
//           <button
//             onClick={toggleMenu}
//             className="text-2xl focus:outline-none"
//           >
//             <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu Dropdown */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-[#F4F4F9] text-[#333333] p-4 space-y-4">
//           <Link
//             to="/"
//             className="block text-lg font-semibold hover:underline transition-all duration-300"
//             onClick={toggleMenu}
//           >
//             Home
//           </Link>
//           <Link
//             to="/about"
//             className="block text-lg font-semibold hover:underline transition-all duration-300"
//             onClick={toggleMenu}
//           >
//             About
//           </Link>
//           <Link
//             to="/contact"
//             className="block text-lg font-semibold hover:underline transition-all duration-300"
//             onClick={toggleMenu}
//           >
//             Contact
//           </Link>
//           <Link
//             to="/login"
//             className="block text-lg font-semibold hover:underline transition-all duration-300"
//             onClick={toggleMenu}
//           >
//             Login
//           </Link>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;

import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-[#0A1D37] text-white p-4 shadow-lg sticky top-0 z-50">
      <nav className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <div className="text-3xl font-bold text-white">
            <a href="#">CampusJobs</a>
          </div>
        </div>

        {/* Desktop Menu Links */}
        <div className="hidden md:flex space-x-8">
          <a href="/" className="text-lg font-semibold hover:underline transition-all duration-300">
            Home
          </a>
          <a href="#about" className="text-lg font-semibold hover:underline transition-all duration-300">
            About
          </a>
          <a href="#contact" className="text-lg font-semibold hover:underline transition-all duration-300">
            Contact
          </a>
          {/* <a href="/login" className="text-lg font-semibold hover:underline transition-all duration-300">
            Login
          </a> */}
          <button 
  onClick={() => window.location.href = "/login"} 
  className="bg-blue-600 px-4 py-2 rounded-lg font-semibold text-white hover:bg-blue-500 transition-all"
>
  Login
</button>

        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl focus:outline-none">
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#F4F4F9] text-[#333333] p-4 space-y-4">
          <a href="/" className="block text-lg font-semibold hover:underline transition-all duration-300" onClick={toggleMenu}>
            Home
          </a>
          <a href="#about" className="block text-lg font-semibold hover:underline transition-all duration-300" onClick={toggleMenu}>
            About
          </a>
          <a href="#contact" className="block text-lg font-semibold hover:underline transition-all duration-300" onClick={toggleMenu}>
            Contact
          </a>
          <button 
  onClick={() => { 
    toggleMenu(); 
    window.location.href = "/login"; 
  }} 
  className="w-full bg-blue-600 px-4 py-2 rounded-lg font-semibold text-white hover:bg-blue-500 transition-all"
>
  Login
</button>
          

        </div>
      )}
    </header>
  );
};

export default Header;
