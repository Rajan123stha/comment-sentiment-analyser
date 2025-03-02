import React from "react";
import HeroImage from "../assets/emoji.png"; // Replace with your image path
import { motion } from "framer-motion"; // For smooth animations

export default function HeroSection() {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between">
        {/* Left Content */}
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-extrabold leading-tight">
            Unlock Insights from YouTube Comments
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Analyze sentiment, detect spam, and uncover trends with AI-powered
            insights.
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 space-x-4">
            <a
              href="/commentanalyzer"
              className="px-6 py-3 bg-[#14B8A6] text-white rounded-xl font-semibold hover:bg-[#2cc7b5] transition duration-300"
            >
              Try It Now
            </a>
            <a
              href="/aboutus"
              className="px-6 py-3 border border-gray-300 text-gray-300 rounded-xl font-semibold hover:bg-gray-700 transition duration-300"
            >
              Learn More
            </a>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="md:w-1/2 flex justify-center mt-10 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <img
            src={HeroImage}
            alt="SentimAI Analysis"
            className="w-[85%] md:w-[70%] rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
          />
        </motion.div>
      </div>
    </section>
  );
}
