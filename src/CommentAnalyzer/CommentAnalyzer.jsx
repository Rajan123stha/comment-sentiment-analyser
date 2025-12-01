import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./../AuthContext"; // Import the Auth context hook
import Spinner from "./../Component/Spinner"; // Import the Spinner component
import { Pie } from "react-chartjs-2"; // Pie chart component
import { Chart, registerables } from "chart.js"; // Import Chart and registerables from Chart.js

// Register the required components for Chart.js
Chart.register(...registerables);

const CommentAnalyzer = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [positiveComments, setPositiveComments] = useState([]);
  const [negativeComments, setNegativeComments] = useState([]);
  const [neutralComments, setNeutralComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState(null); // For pie chart
  const [sentimentPercentages, setSentimentPercentages] = useState({}); // Store percentages
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [allPositive, setAllPositive] = useState([]);
  const [allNegative, setAllNegative] = useState([]);
  const [allNeutral, setAllNeutral] = useState([]);

  const { user, admin } = useAuth(); // Use the Auth context

  const extractVideoId = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|watch\?[^v]+v=)?([^\s&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const fetchComments = async () => {
    if (!user && !admin) {
      setError("Please log in first to analyze comments.");
      return;
    }

    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      setError("Invalid YouTube URL. Please enter a valid URL.");
      return;
    }

    setError(null);
    setLoading(true);
    // const startTime = performance.now();

    try {
      const response = await axios.post("http://localhost:5000/api/comments", {
        video_url: videoUrl,
      });
      const fetchedComments = response.data;

      // const endTime = performance.now();
      // const timeTaken = (endTime - startTime) / 1000; // Convert milliseconds to seconds

      // console.log(
      //   Time taken to fetch and analyze comments: ${timeTaken.toFixed(
      //     2
      //   )} seconds
      // );

      // // You can also display this time in the UI, for example:
      // setError(Time taken: ${timeTaken.toFixed(2)} seconds);

      // Calculate total counts of sentiments
      const totalComments = fetchedComments.length;
      const positiveCount = fetchedComments.filter(
        (comment) => comment.sentiment === "positive"
      ).length;
      const negativeCount = fetchedComments.filter(
        (comment) => comment.sentiment === "negative"
      ).length;
      const neutralCount = fetchedComments.filter(
        (comment) => comment.sentiment === "neutral"
      ).length;

      const allPositive = fetchedComments.filter(
        (comment) => comment.sentiment === "positive"
      ); // Top 30% of positive comments
      setAllPositive(allPositive);
      const allNegative = fetchedComments.filter(
        (comment) => comment.sentiment === "negative"
      ); // Top 30% of negative comments
      setAllNegative(allNegative);

      const allNeutral = fetchedComments.filter(
        (comment) => comment.sentiment === "neutral"
      ); // Top 30% of neutral comments
      setAllNeutral(allNeutral);

      // Calculate sentiment percentages for the pie chart
      const newSentimentPercentages = {
        positive: ((positiveCount / totalComments) * 100).toFixed(2),
        negative: ((negativeCount / totalComments) * 100).toFixed(2),
        neutral: ((neutralCount / totalComments) * 100).toFixed(2),
      };

      // Sort comments by confidence and filter the top 30% for each sentiment
      const positive = fetchedComments
        .filter((comment) => comment.sentiment === "positive")
        .sort((a, b) => b.confidence - a.confidence)
        .slice(0, Math.ceil(positiveCount * 0.3)); // Top 30% of positive comments

      const negative = fetchedComments
        .filter((comment) => comment.sentiment === "negative")
        .sort((a, b) => b.confidence - a.confidence)
        .slice(0, Math.ceil(negativeCount * 0.3)); // Top 30% of negative comments

      const neutral = fetchedComments
        .filter((comment) => comment.sentiment === "neutral")
        .sort((a, b) => b.confidence - a.confidence)
        .slice(0, Math.ceil(neutralCount * 0.3)); // Top 30% of neutral comments

      // Set state for chart data
      setChartData({
        labels: ["Positive", "Negative", "Neutral"],
        datasets: [
          {
            label: "Sentiment Distribution",
            data: [positiveCount, negativeCount, neutralCount],
            backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
            hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
          },
        ],
      });

      // Set state for comments and percentages
      setPositiveComments(positive);
      setNegativeComments(negative);
      setNeutralComments(neutral);
      setSentimentPercentages(newSentimentPercentages); // Set percentages
    } catch (error) {
      console.error("Error fetching comments:", error);
      setError("Failed to fetch comments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderTable = (comments, sentiment) => {
    const colors = {
      Positive: {
        bg: "bg-blue-50",
        border: "border-blue-300",
        header: "bg-[#1E3A8A]",
        icon: "😊",
      },
      Negative: {
        bg: "bg-red-50",
        border: "border-red-200",
        header: "bg-red-600",
        icon: "😠",
      },
      Neutral: {
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        header: "bg-yellow-600",
        icon: "😐",
      },
    };
    const style = colors[sentiment];

    return (
      <div
        id={sentiment.toLowerCase()}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <div className={`${style.header} px-6 py-4 flex items-center gap-3`}>
          <span className="text-2xl">{style.icon}</span>
          <h2 className="text-xl font-bold text-white">{sentiment} Comments</h2>
          <span className="ml-auto bg-white/20 px-3 py-1 rounded-full text-white text-sm">
            Top 30% ({comments.length})
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={style.bg}>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-16">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Comment
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-32">
                  Confidence
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {comments.map((comment, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{comment.comment}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${style.bg} ${style.border} border`}
                    >
                      {comment.confidence}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const handleScroll = () => {
    if (window.scrollY > 200) setShowScrollTop(true);
    else setShowScrollTop(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const downloadCSV = () => {
    const csvRows = [];
    // Headers
    csvRows.push(["Sentiment", "Comment", "Confidence"]);
    // Combine all comments
    const allComments = [
      ...allPositive.map((comment) => ({
        sentiment: "Positive",
        ...comment,
      })),
      ...allNegative.map((comment) => ({
        sentiment: "Negative",
        ...comment,
      })),
      ...allNeutral.map((comment) => ({
        sentiment: "Neutral",
        ...comment,
      })),
    ];
    allComments.forEach((comment) => {
      csvRows.push([comment.sentiment, comment.comment, comment.confidence]);
    });

    const csvString = csvRows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "comments_analysis.csv");
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0F172A] via-[#1E3A8A] to-[#14B8A6] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            YouTube Comment Analyzer
          </h1>
          <p className="text-white/80 mb-8">
            Analyze sentiment from YouTube comments using AI-powered insights
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Paste YouTube video URL here..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full sm:flex-1 px-5 py-3.5 rounded-xl border-0 shadow-lg focus:ring-2 focus:ring-white/50 focus:outline-none text-gray-700 placeholder-gray-400"
            />
            <button
              onClick={fetchComments}
              disabled={loading || (!user && !admin)}
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#0F172A] font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Analyzing...
                </>
              ) : (
                <>🔍 Analyze Comments</>
              )}
            </button>
          </div>

          {error && (
            <div className="mt-4 px-4 py-3 bg-red-500/20 border border-red-400/30 rounded-lg text-white text-sm">
              {error}
            </div>
          )}

          {!user && !admin && (
            <p className="mt-4 text-yellow-200 text-sm">
              ⚠️ Please log in to analyze comments
            </p>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading && !error && (
        <div className="flex flex-col items-center justify-center py-20">
          <Spinner />
          <p className="mt-4 text-gray-500">Analyzing comments...</p>
        </div>
      )}

      {/* Results Section */}
      {chartData && (
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
                  😊
                </div>
                <div>
                  <p className="text-sm text-gray-500">Positive</p>
                  <p className="text-3xl font-bold text-[#1E3A8A]">
                    {sentimentPercentages.positive}%
                  </p>
                </div>
              </div>
              <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1E3A8A] rounded-full"
                  style={{ width: `${sentimentPercentages.positive}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center text-2xl">
                  😠
                </div>
                <div>
                  <p className="text-sm text-gray-500">Negative</p>
                  <p className="text-3xl font-bold text-red-500">
                    {sentimentPercentages.negative}%
                  </p>
                </div>
              </div>
              <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-full"
                  style={{ width: `${sentimentPercentages.negative}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-yellow-100 flex items-center justify-center text-2xl">
                  😐
                </div>
                <div>
                  <p className="text-sm text-gray-500">Neutral</p>
                  <p className="text-3xl font-bold text-yellow-500">
                    {sentimentPercentages.neutral}%
                  </p>
                </div>
              </div>
              <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500 rounded-full"
                  style={{ width: `${sentimentPercentages.neutral}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              📊 Sentiment Distribution
            </h2>
            <div className="max-w-md mx-auto">
              <Pie
                data={chartData}
                options={{
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: function (tooltipItem) {
                          const { label } = tooltipItem;
                          const percentage =
                            sentimentPercentages[label.toLowerCase()];
                          return `${label}: ${tooltipItem.raw} (${percentage}%)`;
                        },
                      },
                    },
                    legend: {
                      position: "bottom",
                      labels: {
                        padding: 20,
                        usePointStyle: true,
                      },
                    },
                  },
                  onClick: (event, elements) => {
                    if (elements.length > 0) {
                      const segmentIndex = elements[0].index;
                      const label = chartData.labels[segmentIndex];
                      document
                        .getElementById(label.toLowerCase())
                        ?.scrollIntoView({
                          behavior: "smooth",
                        });
                    }
                  },
                }}
              />
            </div>
            <p className="text-center text-gray-500 text-sm mt-4">
              Click on a segment to view comments
            </p>
          </div>
        </div>
      )}

      {/* Comments Tables */}
      {(positiveComments.length > 0 ||
        negativeComments.length > 0 ||
        neutralComments.length > 0) && (
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <div className="space-y-8">
            {renderTable(positiveComments, "Positive")}
            {renderTable(negativeComments, "Negative")}
            {renderTable(neutralComments, "Neutral")}
          </div>

          {/* Download Button */}
          <div className="flex justify-center mt-12">
            <button
              onClick={downloadCSV}
              disabled={
                loading ||
                (!positiveComments.length &&
                  !negativeComments.length &&
                  !neutralComments.length)
              }
              className="px-8 py-4 bg-gradient-to-r from-[#0F172A] to-[#14B8A6] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:opacity-50 flex items-center gap-2"
            >
              📥 Download Full Report (CSV)
            </button>
          </div>
        </div>
      )}
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-[#0F172A] to-[#14B8A6] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default CommentAnalyzer;
