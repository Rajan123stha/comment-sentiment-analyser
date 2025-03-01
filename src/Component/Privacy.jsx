import React from "react";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
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
          Privacy <span className="text-[#14B8A6]">Policy</span>
        </motion.h2>

        {/* Content Wrapper */}
        <motion.div
          className="bg-white p-6 md:p-10 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gray-700 leading-relaxed">
            At <b>Reactify</b>, we prioritize your privacy. This Privacy Policy
            outlines the types of personal information we collect, how we use
            it, and the steps we take to protect your data.
          </p>

          {/* Section 1 */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-[#1E3A8A] mb-2">
              1. Information We Collect
            </h3>
            <p className="text-gray-700">
              We collect data such as email addresses, YouTube video URLs, and
              user interaction details for sentiment analysis purposes.
            </p>
          </div>

          {/* Section 2 */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-[#1E3A8A] mb-2">
              2. How We Use Your Information
            </h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>
                To provide accurate sentiment analysis for YouTube comments.
              </li>
              <li>To improve our services and develop new features.</li>
              <li>To ensure a secure and user-friendly experience.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-[#1E3A8A] mb-2">
              3. Data Protection
            </h3>
            <p className="text-gray-700">
              We implement strong security measures to safeguard your
              information from unauthorized access or misuse.
            </p>
          </div>

          {/* Section 4 */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-[#1E3A8A] mb-2">
              4. Third-Party Services
            </h3>
            <p className="text-gray-700">
              We may integrate with third-party services (e.g., YouTube API) but
              ensure that your data is handled securely.
            </p>
          </div>

          {/* Section 5 */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-[#1E3A8A] mb-2">
              5. Your Choices & Rights
            </h3>
            <p className="text-gray-700">
              You can request to delete your data, update preferences, or opt
              out of data collection at any time.
            </p>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-8">
            <motion.a
              href="/contactus"
              className="bg-[#14B8A6] text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-[#0F766E] transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us for Privacy Concerns
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
