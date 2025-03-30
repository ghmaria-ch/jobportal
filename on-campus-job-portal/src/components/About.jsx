// components/AboutUs.jsx
import React from 'react';

function AboutUs() {
  return (
    <section id='about' className="bg-white h-screen w-full flex items-center justify-center py-16 px-4 sm:px-8 lg:px-16">
      <div className="w-full max-w-screen-xl grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Image */}
        <div className="flex justify-center items-center">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/online-job-search-illustration-download-in-svg-png-gif-file-formats--finding-recruitment-business-activity-pack-professionals-illustrations-4185620.png" // Replace with your image URL
            alt="Campus Job Portal"
            className="rounded-lg shadow-lg object-cover w-full h-full max-w-xs sm:max-w-md lg:max-w-lg"
          />
        </div>

        {/* Right Column - Text Content */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-semibold text-blue-600 mb-6">
            About Campus Job Portal
          </h2>
          <p className="text-gray-700 text-lg mb-4">
            Welcome to the Campus Job Portal, your one-stop platform to
            connect students with the best job opportunities, internships,
            and work-study programs on campus. Whether you're looking for a
            part-time job to gain experience or an internship to kickstart your
            career, we've got you covered.
          </p>
          <p className="text-gray-700 text-lg mb-6">
            Our portal provides a user-friendly interface that allows students
            to browse job listings, apply directly, and get notified about
            new opportunities—all in one place. We aim to empower students by
            providing easy access to valuable career resources and opportunities.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
