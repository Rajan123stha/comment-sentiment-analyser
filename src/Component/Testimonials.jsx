import { motion } from "framer-motion";

export default function TestimonialsSection() {
  return (
    <section className="bg-gradient-to-b from-[#F9FAFB] to-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-blue-100 text-[#1E3A8A] text-sm font-medium rounded-full mb-4"
          >
            ⭐ Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-[#1E3A8A] mb-6"
          >
            What Our Users Say
          </motion.h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            See how Reactify is transforming YouTube content analysis for
            creators, researchers, and businesses.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {[
            {
              name: "Rajesh Kumar",
              review:
                "Reactify helped me filter spam and understand my audience’s sentiment. A game changer!",
              avatar: "🧑‍💻",
            },
            {
              name: "Emily Roberts",
              review:
                "I love how easy it is to analyze YouTube comments. The CSV download feature is super useful!",
              avatar: "👩‍🎨",
            },
            {
              name: "Daniel Lee",
              review:
                "As a researcher, this tool saves hours of work! The sentiment analysis is highly accurate.",
              avatar: "🎓",
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-5xl text-gray-100 font-serif">
                "
              </div>

              {/* Rating Stars */}

              <p className="text-gray-700 leading-relaxed mb-6 relative z-10">
                "{testimonial.review}"
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-[#1E3A8A]">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500">Verified User</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Insights Section */}
        <div className="mt-28 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 text-sm font-medium rounded-full mb-4"
          >
            🚀 Our Impact
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1E3A8A] mb-4">
            AI-Powered Insights
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Reactify has analyzed millions of comments with unmatched accuracy
            and speed.
          </p>

          {/* Animated Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14 max-w-4xl mx-auto">
            {[
              { label: "Comments Analyzed", value: "1K+", icon: "💬" },
              { label: "Accuracy Rate", value: "80%+", icon: "🎯" },
              { label: "Happy Users", value: "500+", icon: "😊" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#1E3A8A] to-[#14B8A6] bg-clip-text text-transparent">
                  {stat.value}
                </h3>
                <p className="text-gray-600 mt-2 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
