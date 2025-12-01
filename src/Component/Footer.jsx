import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaHeart,
} from "react-icons/fa";
import { HiMail, HiLocationMarker } from "react-icons/hi";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-slate-50 to-slate-100 text-gray-700 pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img src={logo} alt="Reactify Logo" className="h-10" />
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              AI-powered sentiment analysis for YouTube comments. Understand
              your audience better.
            </p>
            {/* Social Media Icons */}
            <div className="flex items-center gap-3">
              {[
                {
                  icon: FaFacebook,
                  href: "https://facebook.com",
                  label: "Facebook",
                },
                {
                  icon: FaTwitter,
                  href: "https://twitter.com",
                  label: "Twitter",
                },
                {
                  icon: FaInstagram,
                  href: "https://instagram.com",
                  label: "Instagram",
                },
                {
                  icon: FaLinkedin,
                  href: "https://linkedin.com",
                  label: "LinkedIn",
                },
                {
                  icon: FaYoutube,
                  href: "https://youtube.com",
                  label: "YouTube",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#1E3A8A] hover:text-white hover:border-[#1E3A8A] transition-all duration-300"
                >
                  <social.icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#1E3A8A] font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { to: "/commentanalyzer", label: "Analyze Comments" },
                { to: "/aboutus", label: "About Us" },
                { to: "/contactus", label: "Contact Us" },
                { to: "/faq", label: "FAQs" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-gray-600 text-sm hover:text-[#14B8A6] transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#14B8A6] transition-colors"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[#1E3A8A] font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {[
                { to: "/privacy", label: "Privacy Policy" },
                { to: "/terms", label: "Terms of Service" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-gray-600 text-sm hover:text-[#14B8A6] transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#14B8A6] transition-colors"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[#1E3A8A] font-semibold mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <HiLocationMarker className="text-[#14B8A6] text-lg mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="text-sm font-medium">Kathmandu, Nepal</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-500 text-sm">
              © {currentYear} Reactify. All rights reserved.
            </p>

            {/* Made with love */}
            <p className="text-gray-500 text-sm flex items-center gap-1">
              Made with <FaHeart className="text-red-500 text-xs" /> in Nepal
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
