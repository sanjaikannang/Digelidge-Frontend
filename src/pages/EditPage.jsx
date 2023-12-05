import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [studentDetails, setStudentDetails] = useState({
    studentname: "",
    course: "",
    batch: "",
    attendence: "",
    taskscore: "",
    assessment: "",
    project: "",
  });

  useEffect(() => {
    // Fetch student details when the component mounts
    fetchStudentDetails();
  }, []); // Empty dependency array ensures this effect runs once on mount

  const fetchStudentDetails = async () => {
    try {
      const response = await fetch(
        `https://sanjaikannan-studentmanagement.onrender.com/student/get-student/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (response.ok) {
        const student = await response.json();
        // Ensure that fetched data is not undefined before updating state
        if (student) {
          setStudentDetails(student);
        }
      } else {
        console.error("Failed to fetch student details");
      }
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `https://sanjaikannan-studentmanagement.onrender.com/student/edit-student/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(studentDetails),
        }
      );

      if (response.ok) {
        // Successfully edited student, navigate back to MainPage
        navigate("/mainpage");
      } else {
        console.error("Failed to edit student");
      }
    } catch (error) {
      console.error("Error editing student:", error);
    }
  };

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");
    // Navigate to login page
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-white-800 p-4 text-grey flex justify-between items-center">
        <div className="text-xl text-grey font-semibold">
          <span className="text-emerald-400 font-bold">Student </span>
          Management System
        </div>
        <button
          onClick={handleLogout}
          className="text-black px-4 py-2 rounded bg-emerald-300"
        >
          Logout
        </button>
      </nav>
      <div className="flex flex-col items-center p-4">
        <h2 className="text-lg font-semibold mb-4">Edit Student</h2>
        <form className="w-full max-w-md">
          <div className="mb-4">
            <input
              type="text"
              id="studentname"
              name="studentname"
              placeholder="Student Name"
              value={studentDetails.studentname || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="course"
              name="course"
              placeholder="Course"
              value={studentDetails.course}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="batch"
              name="batch"
              placeholder="Batch"
              value={studentDetails.batch}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="attendence"
              name="attendence"
              placeholder="Attendance"
              value={studentDetails.attendence}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="taskscore"
              name="taskscore"
              placeholder="Taskscore"
              value={studentDetails.taskscore}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="assessment"
              name="assessment"
              placeholder="Assessment"
              value={studentDetails.assessment}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="project"
              name="project"
              placeholder="Project"
              value={studentDetails.project}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="bg-emerald-400 text-black py-2 px-4 rounded-md mr-2"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditPage;
