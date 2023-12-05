import React from "react";
import { useNavigate } from "react-router";
import p1 from "../assets/images/p1.gif";
import p2 from "../assets/images/p2.gif";
import p3 from "../assets/images/p3.gif";

const LandingPage = () => {
  const Navigate = useNavigate();

  return (
    <>
      {/* Navigation Bar */}
      <nav className="bg-white-800 p-4 text-grey flex justify-between items-center">
        <div className="text-xl text-grey font-semibold">
          <span className=" text-emerald-400 font-bold">Student </span>
          Management System
        </div>
        <a
          onClick={() => Navigate("/login")}
          className="text-black px-4 py-2 rounded bg-emerald-100"
        >
          Login
        </a>
      </nav>

      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-emerald-200 to-white">
        <div className="text-center text-grey">
          <h1 className="text-4xl font-semibold mb-4">
            Welcome to{" "}
            <span className="text-emerald-500 font-bold">
              Student Management System !{" "}
            </span>
          </h1>

          <p className="text-black mb-8">
            A place to manage your students easily!
          </p>
          <div className="flex justify-center">
            <a
              onClick={() => Navigate("/login")}
              className="bg-emerald-300 text-black px-4 py-2 rounded"
            >
              Explore
            </a>
          </div>
        </div>
      </div>

      <div className="p-8 ">
        <h2 className="text-2xl  font-semibold  mb-4 text-center">
          About Student Management System !
        </h2>
        <p className="text-black mb-8">
          The Student Management System is a comprehensive platform designed to
          simplify the process of managing students' information, academic
          records, and administrative tasks.
        </p>
        <p className="text-black mb-8">
          With user-friendly features and advanced functionalities, our system
          empowers educational institutions to efficiently handle student data,
          track performance, and enhance overall administration.
        </p>
      </div>
      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Features of The Project...
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Project Box 1 */}
          <div className="bg-white p-4 rounded-md">
            <img
              src={p1}
              alt="Project 1"
              className="w-full h-30 object-cover mb-4 rounded-md"
            />
            <p className="text-black font-medium mb-4">
              1 . Add Student Feature
            </p>
            <p className="text-black font-semibold mb-4">
              This project focuses on implementing a feature to add new students
              to the system. It includes a user-friendly interface to input
              student details and store them securely in the database.
            </p>
            {/* Add more content as needed */}
          </div>

          {/* Project Box 2 */}
          <div className="bg-white p-4 rounded-md">
            <img
              src={p2}
              alt="Project 2"
              className="w-full h-30 object-cover mb-4 rounded-md"
            />
            <p className="text-black font-medium mb-2">
              2 . Edit Student Feature
            </p>
            <p className="text-black font-semibold mb-4">
              This project involves the development of a feature to edit
              existing student information. Users can easily modify student
              details such as name, course, and attendance scores.
            </p>
            {/* Add more content as needed */}
          </div>

          {/* Project Box 3 */}
          <div className="bg-white p-4 rounded-md">
            <img
              src={p3}
              alt="Project 3"
              className="w-full h-30 object-cover mb-4 rounded-md"
            />
            <p className="text-black font-medium mb-2">
              3 . Delete Student Feature
            </p>
            <p className="text-black font-semibold mb-4">
              In this project, we implement a secure and efficient way to delete
              student records. The feature includes a confirmation mechanism to
              avoid accidental deletions.
            </p>
            {/* Add more content as needed */}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-emerald-100 text-black p-4 text-center">
        <p>&copy; 2023 Student Management System. All rights reserved.</p>
        {/* Add other footer content here */}
      </footer>
    </>
  );
};

export default LandingPage;
