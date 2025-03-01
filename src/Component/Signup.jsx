import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import signup from "../assets/signup.webp";

const Signup = () => {
  const location = useLocation(); // Access location for passed state
  const navigate = useNavigate(); // For navigation

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility

  // Set email from location.state if passed
  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleSignup = async (e) => {
    e.preventDefault();

    // Email validation regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password validation (min 8 characters, 1 number, 1 special character)
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long and contain at least one letter, one number, and one special character."
      );
      return;
    }

    // Check if username is provided
    if (!username) {
      setError("Username is required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/register", {
        username,
        email,
        password,
      });

      if (response.data.status === "success") {
        setMessage("Registration successful!");
        setError("");
        // Redirect to login or homepage
        navigate("/login"); // Redirect to login page after successful signup
      }
    } catch (error) {
      setError("Registration failed. Please check your details.");
      setMessage("");
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible); // Toggle password visibility
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 p-5">
      {/* Background Video */}
      <img
        src={signup}
        alt=" signup"
        className=" mt-[2.5rem]  object-cover shadow-md w-[30rem] h-[31.8rem] max-w-[98%] hidden lg:block "
      />

      {/* Container for the form */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-md bg-white p-8 border border-gray-300 shadow-md z-10">
        <h2 className="text-2xl font-bold text-[2rem] text-[#1E3A8A] mb-6">
          Signup
        </h2>
        <form className="w-full" onSubmit={handleSignup}>
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 font-montserrat text-gray-700 text-sm"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 font-montserrat text-gray-700 text-sm"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email} // Email pre-filled
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block mb-2 font-montserrat text-gray-700 text-sm"
            >
              Password
            </label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex mt-[25px] items-center pr-3 cursor-pointer"
            >
              {isPasswordVisible ? (
                <FaEyeSlash className="text-gray-500" />
              ) : (
                <FaEye className="text-gray-500" />
              )}
            </span>
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {message && (
            <p className="text-green-500 text-center mb-4">{message}</p>
          )}
          <button
            type="submit"
            className="w-full p-3 bg-[#14B8A6] text-white rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Signup
          </button>
          <p className="text-center mt-6 text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#1E3A8A] hover:text-green-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
