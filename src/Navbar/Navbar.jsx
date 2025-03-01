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
    <nav className="bg-slate-100 border-b border-gray-300 p-4 sticky top-0 z-50 w-full">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Section: Logo */}
        <Link to="/">
          <img src={Logo} className="h-10" alt="Reactify Logo" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link to="/commentanalyzer" className="text-black font-medium">
            Analyze
          </Link>
          <Link to="/aboutus" className="text-black font-medium">
            About us
          </Link>
          <Link to="/contactus" className="text-black font-medium">
            Contact us
          </Link>
        </div>

        {/* Right Section: Profile/Login & Hamburger */}
        <div className="flex items-center space-x-4">
          {(user || admin) && (
            <div className="relative">
              <CgProfile
                className="h-6 w-6 cursor-pointer"
                onClick={handleProfileClick}
              />
              {isOverlayOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-50">
                  <div className="p-2 text-center">
                    <button
                      className="w-full bg-gray-200 text-black rounded hover:bg-gray-300 p-2 mb-1"
                      onClick={logout}
                    >
                      Logout
                    </button>
                    <Link to={admin ? "/admin/profile" : "/profile"}>
                      <button className="w-full bg-teal-500 text-white rounded hover:bg-teal-600 p-2">
                        Profile
                      </button>
                    </Link>
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
              <button className="bg-[#1E3A8A] text-white rounded px-4 py-2 hover:bg-blue-800">
                Login
              </button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-300 p-4 absolute top-[60px] left-0 w-full shadow-md">
          <Link
            to="/commentanalyzer"
            className="block py-2 text-black font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Analyze
          </Link>
          <Link
            to="/aboutus"
            className="block py-2 text-black font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            About us
          </Link>
          <Link
            to="/contactus"
            className="block py-2 text-black font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact us
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
