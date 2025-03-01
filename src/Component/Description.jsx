import { motion } from "framer-motion";
import video from "../assets/vid.mp4";

export default function DescriptionSection() {
  return (
    <section className="bg-gray-50 py-16 ">
      <div className="max-w-7xl mx-auto text-center">
        {/* Features Section */}
        <h2 className="text-4xl font-extrabold text-[#1E3A8A]">
          Why Choose Reactify?
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          AI-powered YouTube comment analysis to uncover insights, detect spam,
          and evaluate sentiment in real-time.
        </p>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {[
            {
              icon: "📊",
              title: "Sentiment Analysis",
              desc: "Classify YouTube comments as Positive, Negative, or Neutral with AI-driven accuracy.",
            },
            {
              icon: "📥",
              title: "Download Results",
              desc: "Export analyzed data in CSV format for further use and insights.",
            },
            {
              icon: "📜",
              title: "Download Comments",
              desc: "Retrieve and store all YouTube comments from any video instantly.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 flex flex-col items-center"
            >
              <span className="text-[#14B8A6] text-5xl">{feature.icon}</span>
              <h3 className="text-xl font-semibold text-[#1E3A8A] mt-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mt-2 text-center">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto mt-20 ">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-[#1E3A8A] text-center  "
        >
          How It Works?
        </motion.h2>

        {/* Video and Steps Layout */}
        <div className="flex flex-col lg:flex-row items-center mt-10   px-6">
          {/* Steps (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 p-6 "
          >
            <p className="text-gray-600 my-4 max-w-2xl mx-auto">
              AI-powered YouTube comment analysis to uncover insights, detect
              spam, and evaluate sentiment in real-time.
            </p>
            <div className="space-y-6">
              {[
                {
                  step: "1️⃣",
                  text: "Paste the YouTube video URL into the input field.",
                },
                {
                  step: "2️⃣",
                  text: "AI analyzes sentiment, spam, and trends instantly.",
                },
                {
                  step: "3️⃣",
                  text: "Download your results or explore interactive insights.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="flex items-center space-x-4 "
                >
                  <span className="text-2xl text-[#14B8A6] font-bold">
                    {item.step}
                  </span>
                  <p className="text-gray-700">{item.text}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              onClick={() => (window.location.href = "/signup")}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="w-64 px-6 py-3 mt-8 bg-[#14B8A6] text-white font-bold rounded-md hover:bg-[#12897D] transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]"
            >
              Start Analyzing Now
            </motion.button>
          </motion.div>

          {/* Video (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 p-6"
          >
            <video
              className="w-full rounded-lg shadow-lg object-cover hover:shadow-2xl transition-transform transform hover:scale-105"
              src={video}
              autoPlay
              loop
              muted
            >
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
