import React, { useState } from "react";
import { motion } from "framer-motion";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit (You can integrate with backend)
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent Successfully!");
  };

  return (
    <section className="bg-[#E5E7EB] py-16">
      <div className="max-w-screen-lg mx-auto px-6 md:px-12">
        {/* Heading with Animation */}
        <motion.h2
          className="text-center text-4xl font-bold text-[#1E3A8A] mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Contact <span className="text-[#14B8A6]">Us</span>
        </motion.h2>

        {/* Contact Content */}
        <motion.div
          className="bg-white p-6 md:p-10 rounded-lg shadow-lg flex flex-col md:flex-row gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Left Section - Contact Info */}
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold text-[#1E3A8A] mb-4">
              Get In Touch
            </h3>
            <p className="text-gray-700 mb-4">
              Have any questions? Feel free to reach out to us. We're here to
              help you with **Reactify** and sentiment analysis.
            </p>

            <div className="mt-4">
              <p className="text-[#1E3A8A] font-medium">📍 Location:</p>
              <p className="text-gray-700">Kathmandu, Nepal</p>
            </div>

            <div className="mt-4">
              <p className="text-[#1E3A8A] font-medium">📧 Email:</p>
              <p className="text-gray-700">support@reactify.com</p>
            </div>

            <div className="mt-4">
              <p className="text-[#1E3A8A] font-medium">📞 Phone:</p>
              <p className="text-gray-700">+977 9800000000</p>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold text-[#1E3A8A] mb-4">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6]"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6]"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6]"
                  placeholder="Type your message..."
                  rows="4"
                  required
                ></textarea>
              </div>

              {/* Submit Button with Animation */}
              <motion.button
                type="submit"
                className="w-full bg-[#14B8A6] text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-[#0F766E] transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;
