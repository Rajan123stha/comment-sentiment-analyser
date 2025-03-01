import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer
      className="bg-slate-100 text-black pt-6 border-t border-gray-300 "
      id="footer"
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        {/* Logo and Branding Section */}
        <div className="flex justify-center md:justify-between items-center mb-6">
          <img src={logo} alt="Reactify Logo" className="h-12" />
        </div>

        {/* Navigation Links Section */}
        <div className="flex justify-center md:justify-between space-x-6 mb-4 text-sm">
          <a
            href="/aboutus"
            className="hover:text-[#14B8A6] transition duration-300"
          >
            About Us
          </a>
          <a
            href="/contactus"
            className="hover:text-[#14B8A6] transition duration-300"
          >
            Contact Us
          </a>
          <a
            href="/privacy"
            className="hover:text-[#14B8A6] transition duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="/faq"
            className="hover:text-[#14B8A6] transition duration-300"
          >
            FAQs
          </a>
        </div>

        {/* Social Media Icons Section */}
        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="text-2xl hover:text-[#14B8A6] transition duration-300" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="text-2xl hover:text-[#14B8A6] transition duration-300" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-2xl hover:text-[#14B8A6] transition duration-300" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-2xl hover:text-[#14B8A6] transition duration-300" />
          </a>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-xs md:text-sm">
          <p>
            &copy; {new Date().getFullYear()} Reactify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
