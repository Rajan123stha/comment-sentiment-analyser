import React, { useState } from "react";
import Navbar from "./Navbar/Navbar";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Footer from "./Component/Footer";
import AboutUs from "./Pages/AboutUs";
import Faq from "./Pages/Faq";
import CommentAnalyzer from "./CommentAnalyzer/CommentAnalyzer";
import SpamDetection from "./SpamDetection/SpamDetection";
import Profile from "./Component/Profile";
import Terms from "./Pages/Terms";
import Privacy from "./Pages/Privacy";
import AdminLogin from "./Admin/AdminLogin";
import AdminSignup from "./Admin/AdminSignup";
import AdminProfile from "./Admin/AdminProfile";
import HomeScreen from "./Pages/Homescreen"; // Correct import for HomeScreen
import ContactUs from "./Pages/ContactUs";

function App() {
  const [videoUrl, setVideoUrl] = useState("");

  return (
    <div className="App flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <div className="flex-grow">
        <Routes>
          {/* Default route to HomeScreen */}
          <Route path="/" element={<HomeScreen />} />{" "}
          {/* Set HomeScreen as default */}
          {/* Other routes */}
          <Route path="/commentanalyzer" element={<CommentAnalyzer />} />
          {/* <Route path="/twitteranalyer" element={<TwitterAnalyzer />} /> */}
          <Route path="/spamdetection" element={<SpamDetection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
