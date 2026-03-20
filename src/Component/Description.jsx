import { motion } from "framer-motion";
import video from "../assets/vid.mp4";

export default function DescriptionSection() {
  const features = [
    {
      icon: (
        <svg
          className="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      title: "Sentiment Analysis",
      desc: "Classify comments as Positive, Negative, or Neutral with AI-driven accuracy.",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      icon: (
        <svg
          className="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      ),
      title: "Export Results",
      desc: "Download analyzed data in CSV format for reports and insights.",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      icon: (
        <svg
          className="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      ),
      title: "Fetch Comments",
      desc: "Retrieve all YouTube comments from any video instantly.",
      gradient: "from-violet-500 to-purple-600",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Paste URL",
      text: "Enter any YouTube video URL into the analyzer.",
    },
    {
      step: "02",
      title: "AI Processing",
      text: "Our ML model analyzes sentiment and patterns.",
    },
    {
      step: "03",
      title: "Get Insights",
      text: "View results and download detailed reports.",
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white py-32 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#14B8A6]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px]" />
      </div>
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Features Section */}
      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#14B8A6]/10 border border-[#14B8A6]/20 rounded-full text-sm text-[#14B8A6] mb-6"
          >
            <span className="w-2 h-2 bg-[#14B8A6] rounded-full animate-pulse" />
            Powerful Features
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14B8A6] via-emerald-500 to-teal-500">
              Reactify
            </span>
          </h2>
          <p className="text-gray-600 mt-6 max-w-xl mx-auto text-lg">
            Advanced AI-powered analysis to transform YouTube comments into
            actionable insights.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#14B8A6]/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative h-full bg-white border border-gray-200 rounded-3xl p-8 hover:border-[#14B8A6]/50 hover:shadow-xl hover:shadow-[#14B8A6]/5 transition-all duration-500">
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-[#14B8A6] opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-2 transition-all duration-300">
                  <span className="text-sm font-medium">Learn more</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="relative max-w-6xl mx-auto mt-40 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full text-sm text-indigo-600 mb-6">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
            How It Works
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">
            Three Simple{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Steps
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-2">
              {steps.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="flex items-center gap-6 p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#14B8A6] to-emerald-600 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
                      <div className="relative w-16 h-16 bg-gradient-to-br from-[#14B8A6] to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {item.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-900 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-gray-600">{item.text}</p>
                    </div>
                    <svg
                      className="w-6 h-6 text-gray-300 group-hover:text-[#14B8A6] group-hover:translate-x-1 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="ml-[52px] w-px h-4 bg-gradient-to-b from-[#14B8A6]/30 to-transparent" />
                  )}
                </motion.div>
              ))}
            </div>
            <motion.button
              onClick={() => (window.location.href = "/signup")}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group mt-10 ml-6 relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#14B8A6] to-emerald-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#14B8A6]/30"
            >
              <span className="relative z-10">Start Analyzing</span>
              <svg
                className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-[#14B8A6] opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </motion.div>

          {/* Video */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#14B8A6]/20 via-purple-500/10 to-indigo-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
              <div className="relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-2xl">
                <div className="flex items-center gap-3 px-5 py-4 bg-gray-50 border-b border-gray-100">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="flex-1 mx-8">
                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      <span className="text-xs text-gray-500 font-mono">
                        reactify.app/analyzer
                      </span>
                    </div>
                  </div>
                </div>
                <video
                  className="w-full aspect-video object-cover"
                  src={video}
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
