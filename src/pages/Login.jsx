import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const payload = {
      email,
      password,
    };
    const res = await fetch(`https://sanjaikannan-studentmanagement.onrender.com/user/login`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);

      if (data.result && data.result._id) {
        localStorage.setItem("userId", data.result._id);
        navigate("/mainpage");
      } else {
        setErr("User information is missing or invalid!");
      }
    } else {
      setErr("Invalid credentials. Please check your email and password!");
    }
  };

  return (
    <>
      <nav className="bg-white-800 p-4 text-grey flex justify-between items-center">
        <div className="text-xl text-grey font-semibold">
          <span className=" text-emerald-400 font-bold">Student </span>
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
              Login
            </h2>
            <input
              type="text"
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
              onClick={handleLogin}
              className="w-full bg-emerald-500 text-white py-2 rounded-md"
            >
              Login
            </button>
            {err && <p className="text-red-500 mt-2">{err}</p>}
            <p className="text-gray-600 mt-2">
              Don't have an account?{" "}
              <Link to="/signup" className="text-emerald-500">
                Signup here.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
