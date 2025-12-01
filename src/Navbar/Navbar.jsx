import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "./../AuthContext";
import Logo from "../assets/logo.png";

function Navbar() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, admin, logout } = useAuth();

  const handleProfileClick = () => {
    setIsOverlayOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 py-3 px-6 sticky top-0 z-50 w-full shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left Section: Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img src={Logo} className="h-10" alt="Reactify Logo" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <Link
            to="/commentanalyzer"
            className="text-gray-700 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 hover:text-[#1E3A8A] transition-all duration-200"
          >
            Analyze
          </Link>
          <Link
            to="/aboutus"
            className="text-gray-700 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 hover:text-[#1E3A8A] transition-all duration-200"
          >
            About us
          </Link>
          <Link
            to="/contactus"
            className="text-gray-700 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 hover:text-[#1E3A8A] transition-all duration-200"
          >
            Contact us
          </Link>
        </div>

        {/* Right Section: Profile/Login & Hamburger */}
        <div className="flex items-center gap-3">
          {(user || admin) && (
            <div className="relative">
              <button
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#14B8A6] text-white hover:shadow-lg transition-all duration-200"
                onClick={handleProfileClick}
              >
                <CgProfile className="h-5 w-5" />
              </button>
              {isOverlayOpen && (
                <div className="absolute right-0 mt-3 w-52 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="p-2">
                    <Link to={admin ? "/admin/profile" : "/profile"}>
                      <button className="w-full text-left px-4 py-2.5 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                        <CgProfile className="h-4 w-4" />
                        Profile
                      </button>
                    </Link>
                    <button
                      className="w-full text-left px-4 py-2.5 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
                      onClick={logout}
                    >
                      <FiX className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {!user && !admin && (
            <Link
              to={
                window.location.pathname.includes("/admin")
                  ? "/admin/login"
                  : "/login"
              }
            >
              <button className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white font-medium rounded-full px-6 py-2.5 hover:shadow-lg hover:scale-105 transition-all duration-200">
                Login
              </button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <FiX className="h-6 w-6 text-gray-700" />
            ) : (
              <FiMenu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 py-4 px-6 absolute top-full left-0 w-full shadow-lg">
          <div className="flex flex-col space-y-1">
            <Link
              to="/commentanalyzer"
              className="block py-3 px-4 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:text-[#1E3A8A] transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Analyze
            </Link>
            <Link
              to="/aboutus"
              className="block py-3 px-4 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:text-[#1E3A8A] transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              About us
            </Link>
            <Link
              to="/contactus"
              className="block py-3 px-4 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:text-[#1E3A8A] transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
