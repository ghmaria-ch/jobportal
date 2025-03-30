// src/pages/Home.jsx
import React from 'react';
import Header from '../components/Header'; // Importing Header from components
import About from '../components/About';  // Import About component from components
import Contact from '../components/Contact';
import AnimatedText from '../components/AnimatedText';


const Home = () => {
  return (
    <>
      
      <Header />
      
      <AnimatedText/>
      <About/>  
      <Contact/>

    </>
  );
};

export default Home;
