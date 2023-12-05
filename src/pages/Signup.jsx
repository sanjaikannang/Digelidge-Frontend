import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    const payload = {
      name,
      email,
      password,
    };
    try {
      const res = await fetch(
        "https://sanjaikannan-studentmanagement.onrender.com/user/signup",
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();

      if (data.token) {
        const userData = {
          name,
          email,
        };

        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("token", data.token);
        navigate("/login");
      } else {
        setErr(data.error || "Error during signup. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErr("Error during signup. Please try again.");
    }
  };
  return (
    <>
      <nav className="bg-white p-4 text-gray flex justify-between items-center">
        <div className="text-xl text-gray font-semibold">
          <span className="text-emerald-400 font-bold">Student </span>
          Management System
        </div>
      </nav>
      <div className="bg-emerald-100 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-4 space-y-4">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              <span className=" text-emerald-400 font-bold">Student </span>
              Management System!
            </h1>
            <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center ">
              Register
            </h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
            />
            <button
              onClick={handleSignup}
              className="w-full bg-emerald-500 text-white py-2 rounded-md"
            >
              Register
            </button>
            {err && <p className="text-red-500 mt-2">{err}</p>}
            <p className="text-gray-600 mt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-emerald-500">
                Login here.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
