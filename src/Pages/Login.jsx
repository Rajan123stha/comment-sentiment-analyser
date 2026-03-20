import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import login from "../assets/login.jpg";
import { HiMail, HiLockClosed, HiEye, HiEyeOff } from "react-icons/hi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useAuth(); // persistent setUser

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-teal-50 p-4 md:p-8">
      <div className="w-full max-w-5xl flex rounded-3xl overflow-hidden shadow-2xl bg-white">
        {/* Left Side - Image */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <img src={login} alt="Login" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/70 via-[#1E3A8A]/50 to-[#14B8A6]/40 flex flex-col justify-end p-10">
            <h2 className="text-4xl font-bold text-white mb-3">
              Welcome Back!
            </h2>
            <p className="text-white/80 text-lg">
              Analyze YouTube comments with AI-powered sentiment insights
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#14B8A6] mb-4">
              <HiLockClosed className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>
            <p className="text-gray-500 mt-2">Access your account</p>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <HiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl text-gray-900 bg-gray-50
                             focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] focus:bg-white
                             transition-all duration-200 placeholder-gray-400"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <HiLockClosed className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-xl text-gray-900 bg-gray-50
                             focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] focus:bg-white
                             transition-all duration-200 placeholder-gray-400"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <HiEyeOff className="h-5 w-5" />
                  ) : (
                    <HiEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
                {error}
              </div>
            )}
            {message && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm text-center">
                {message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-[#0F172A] to-[#1E3A8A] text-white font-semibold rounded-xl 
                         hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02]
                         focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/50
                         transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                New to Reactify?
              </span>
            </div>
          </div>

          {/* Signup Link */}
          <Link
            to="/signup"
            className="block w-full py-3.5 text-center border-2 border-gray-200 text-gray-700 font-medium rounded-xl 
                       hover:border-[#14B8A6] hover:text-[#14B8A6] hover:bg-teal-50
                       transition-all duration-200"
          >
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
