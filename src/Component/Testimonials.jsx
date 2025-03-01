import { motion } from "framer-motion";

export default function TestimonialsSection() {
  return (
    <section className="bg-[#F9FAFB] py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-extrabold text-[#1E3A8A] mb-6"
        >
          What Our Users Say
        </motion.h2>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          See how Reactify is transforming YouTube content analysis for
          creators, researchers, and businesses.
        </p>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-10 mt-16">
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
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:scale-105 text-left border border-gray-200"
            >
              <div className="flex items-center space-x-4">
                <span className="text-5xl">{testimonial.avatar}</span>
                <h3 className="text-lg font-semibold text-[#1E3A8A]">
                  {testimonial.name}
                </h3>
              </div>
              <p className="text-gray-700 mt-3 text-left">
                {testimonial.review}
              </p>
            </motion.div>
          ))}
        </div>

        {/* AI Insights Section */}
        <div className="mt-24">
          <h2 className="text-5xl font-extrabold text-[#1E3A8A]">
            AI-Powered Insights
          </h2>
          <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
            Reactify has analyzed millions of comments with unmatched accuracy
            and speed.
          </p>

          {/* Animated Stats */}
          <div className="flex flex-wrap justify-center gap-12 mt-12">
            {[
              { label: "Comments Analyzed", value: "1K+" },
              { label: "Accuracy Rate", value: "80%+" },
              { label: "Comments Downloaded", value: "1k+" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white px-10 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-center border border-gray-200"
              >
                <h3 className="text-5xl font-bold text-[#14B8A6]">
                  {stat.value}
                </h3>
                <p className="text-gray-700 text-lg mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
