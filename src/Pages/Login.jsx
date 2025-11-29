import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import login from "../assets/login.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { setUser } = useAuth(); // persistent setUser

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (response.data.status === "success") {
        setMessage("Login successful!");
        setError("");

        const userData = { email };
        setUser(userData); // automatically saved to localStorage via AuthContext

        navigate("/commentanalyzer");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid email or password. Please try again.");
      setMessage("");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <img
        src={login}
        alt=" login"
        className="w-[30rem] mt-[2.5rem] h-[26.1rem] max-w-[98%] object-cover shadow-md hidden lg:block"
      />
      <div className="w-full max-w-sm p-9 pr-[3rem] mt-10 bg-white pb-[2.1rem] shadow-md">
        <h2 className="text-2xl font-bold ml-[7rem] text-[2rem] text-[#1E3A8A] mb-6">
          Login
        </h2>

        <form className="flex flex-col" onSubmit={handleLogin}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 font-montserrat text-gray-700 text-sm"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md text-gray-900 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 font-montserrat text-gray-700 text-sm"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md text-gray-900 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {message && (
            <p className="text-green-500 text-center mb-4">{message}</p>
          )}

          <button
            type="submit"
            className="w-full p-3 bg-[#14B8A6] text-white rounded-md 
                       hover:bg-green-500 focus:outline-none 
                       focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-[#1E3A8A] hover:text-green-500 underline"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
