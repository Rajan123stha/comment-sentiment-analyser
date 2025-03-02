import React from "react";
import { motion } from "framer-motion";
import about from "../assets/about.webp";

const AboutUs = () => {
  return (
    <section className="bg-[#E5E7EB] py-16">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        {/* Heading with Animation */}
        <motion.h2
          className="text-center text-4xl font-bold text-[#1E3A8A] mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About <span className="text-[#14B8A6]">Reactify</span>
        </motion.h2>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row items-center">
          {/* Left: Image Section */}
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={about}
              alt="About Reactify"
              className="w-full rounded-2xl shadow-lg"
            />
          </motion.div>

          {/* Right: Text Section */}
          <motion.div
            className="md:w-1/2 mt-8 md:mt-0 md:pl-12"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold text-[#1E3A8A] mb-4">
              Analyze YouTube Comments Smarter!
            </h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Reactify is an AI-powered platform that allows users to analyze
              YouTube comments for sentiment, download results in CSV format,
              and extract all comments at once.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Our cutting-edge technology makes comment analysis effortless,
              helping content creators and marketers make **data-driven**
              decisions with ease.
            </p>

            {/* CTA Button */}
            <motion.a
              href="/features"
              className="bg-[#14B8A6] text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-[#0F766E] transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
