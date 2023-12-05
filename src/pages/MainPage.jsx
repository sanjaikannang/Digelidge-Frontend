import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import feather from "feather-icons";

const MainPage = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [studentDetails, setStudentDetails] = useState({
    studentname: "",
    course: "",
    batch: "",
    attendence: "",
    taskscore: "",
    assessment: "",
    project: "",
  });
  const [studentsList, setStudentsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  useEffect(() => {
    // Fetch students when the component mounts
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://sanjaikannan-studentmanagement.onrender.com/student/get-student",
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (response.ok) {
        const students = await response.json();
        setStudentsList(students);
      } else {
        console.error("Failed to fetch students");
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    // Clear form data when the dialog is closed
    setStudentDetails({
      studentname: "",
      course: "",
      batch: "",
      attendence: "",
      taskscore: "",
      assessment: "",
      project: "",
    });
    setSelectedStudentId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddStudent = async () => {
    // Validate form data if needed before adding to the list
    if (
      studentDetails.studentname &&
      studentDetails.course &&
      studentDetails.batch &&
      studentDetails.attendence &&
      studentDetails.taskscore &&
      studentDetails.assessment &&
      studentDetails.project
    ) {
      try {
        const response = await fetch(
          "https://sanjaikannan-studentmanagement.onrender.com/student/create-student",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify(studentDetails),
          }
        );

        if (response.ok) {
          // Successfully added student, update the list
          fetchStudents();
          closeDialog();
        } else {
          console.error("Failed to add student");
        }
      } catch (error) {
        console.error("Error adding student:", error);
      }
    } else {
      // Handle validation error
      console.error("Please fill in all the fields.");
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      const response = await fetch(
        `https://sanjaikannan-studentmanagement.onrender.com/student/delete-student/${studentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (response.ok) {
        // Successfully deleted student, update the list
        fetchStudents();
      } else {
        console.error("Failed to delete student");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
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
          <span className=" text-emerald-400 font-bold">Student </span>
          Management System
        </div>
        <a
          onClick={handleLogout}
          className="text-black px-4 py-2 rounded bg-emerald-300"
        >
          Logout
        </a>
      </nav>
      <div className="flex flex-col items-center p-4">
        <button
          onClick={openDialog}
          className="bg-emerald-300 rounded text-black py-2 px-4 mt-4"
        >
          Add Student
        </button>

        {isDialogOpen && (
          <div className="fixed inset-0 overflow-y-auto bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-4 rounded-md w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl relative">
              <button
                onClick={closeDialog}
                className="absolute top-2 right-2 text-gray-600 hover:text-red-500 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h2 className="text-lg font-semibold mb-4">
                {selectedStudentId ? "Edit Student" : "Add Student"}
              </h2>
              <form>
                <div className="mb-4">
                  <input
                    type="text"
                    id="studentname"
                    name="studentname"
                    placeholder="Student Name"
                    value={studentDetails.studentname}
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
                    onClick={
                      selectedStudentId ? handleEditStudent : handleAddStudent
                    }
                    className="bg-emerald-400 text-black py-2 px-4 rounded-md mr-2"
                  >
                    {selectedStudentId ? "Save" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Display students in the UI */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {studentsList &&
              studentsList.map((student, index) => (
                <div
                  key={index}
                  className="bg-emerald-50 font-semibold p-4 rounded-md flex flex-col items-center"
                >
                  <p className="mb-2 text-lg">{student.studentname}</p>
                  <p className="mb-2 text-sm">Course: {student.course}</p>
                  <p className="mb-2 text-sm">Batch: {student.batch}</p>
                  <p className="mb-2 text-sm">
                    Attendance: {student.attendence}
                  </p>
                  <p className="mb-2 text-sm">
                    Task Score: {student.taskscore}
                  </p>
                  <p className="mb-2 text-sm">
                    Assessment Score: {student.assessment}
                  </p>
                  <p className="mb-2 text-sm">
                    Project Score: {student.project}
                  </p>
                  <div className="flex items-center mt-2">
                    <Link
                      to={`/editpage/${student._id}`}
                      className="text-blue-500 mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        dangerouslySetInnerHTML={{
                          __html: feather.icons.edit.toSvg(),
                        }}
                      ></svg>
                    </Link>
                    <button
                      onClick={() => handleDeleteStudent(student._id)}
                      className="text-red-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        dangerouslySetInnerHTML={{
                          __html: feather.icons.trash.toSvg(),
                        }}
                      ></svg>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MainPage;
