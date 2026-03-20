import React from "react";
import HeroImage from "../assets/emoji.png";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#14B8A6]/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#14B8A6]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <motion.div
          className="lg:w-1/2 text-center lg:text-left space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.span
            className="inline-block px-4 py-2 bg-[#14B8A6]/20 text-[#14B8A6] rounded-full text-sm font-medium border border-[#14B8A6]/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            🚀 AI-Powered Sentiment Analysis
          </motion.span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Unlock Insights from{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14B8A6] to-[#2dd4bf]">
              YouTube Comments
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0">
            Analyze sentiment, detect spam, and uncover trends with our powerful
            AI-driven insights platform.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-8 py-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#14B8A6]">1K+</p>
              <p className="text-sm text-gray-500">Comments Analyzed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#14B8A6]">80%</p>
              <p className="text-sm text-gray-500">Accuracy Rate</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#14B8A6]">3</p>
              <p className="text-sm text-gray-500">Sentiment Types</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <motion.a
              href="/commentanalyzer"
              className="px-8 py-4 bg-gradient-to-r from-[#14B8A6] to-[#0d9488] text-white rounded-xl font-semibold shadow-lg shadow-[#14B8A6]/25 hover:shadow-[#14B8A6]/40 hover:scale-105 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try It Now →
            </motion.a>
            <motion.a
              href="/aboutus"
              className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.a>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="lg:w-1/2 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative">
            {/* Glow effect behind image */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#14B8A6]/30 to-[#0d9488]/30 rounded-3xl blur-2xl transform scale-95"></div>
            <img
              src={HeroImage}
              alt="SentimAI Analysis"
              className="relative w-full max-w-md lg:max-w-lg rounded-2xl shadow-2xl transform hover:scale-105 hover:rotate-1 transition-all duration-500"
            />

            {/* Floating cards */}
            <motion.div
              className="absolute -top-4 -left-4 bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 border border-white/20 shadow-xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="text-sm font-medium">😊 Positive: 65%</p>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -right-4 bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 border border-white/20 shadow-xl"
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
            >
              <p className="text-sm font-medium">📊 Real-time Analysis</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
