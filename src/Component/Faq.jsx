import React, { useState } from "react";
import { motion } from "framer-motion";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  // Dummy FAQ Data
  const faqs = [
    {
      question: "What is Reactify?",
      answer:
        "Reactify is a cutting-edge platform that provides sentiment analysis for YouTube comments, helping users gain insights into audience opinions.",
    },
    {
      question: "How does the sentiment analysis work?",
      answer:
        "We use advanced AI models to analyze comments, categorizing them as positive, negative, or neutral based on their content.",
    },
    {
      question: "Is Reactify free to use?",
      answer:
        "Yes, Reactify offers a free plan with limited features. We also have premium plans for advanced analytics.",
    },
    {
      question: "Can I use Reactify for my YouTube channel?",
      answer:
        "Absolutely! Reactify helps YouTube creators understand audience engagement and improve content strategy.",
    },
  ];

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
          Frequently Asked <span className="text-[#14B8A6]">Questions</span>
        </motion.h2>

        {/* FAQ Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-md p-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* FAQ Header */}
              <div className="flex justify-between items-center">
                <button
                  className="text-lg font-medium text-left w-full"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                </button>
                <button
                  onClick={() => toggleFAQ(index)}
                  className="text-xl font-bold ml-2 text-[#1E3A8A]"
                >
                  {openIndex === index ? "−" : "+"}
                </button>
              </div>

              {/* FAQ Answer (Expandable) */}
              {openIndex === index && (
                <motion.div
                  className="mt-3 text-gray-700"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQPage;
