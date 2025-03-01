import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import homeImage from "../assets/hero.png";
import video from "../assets/vid.mp4";
import meaning from "../assets/meaning.png";
import positive from "../assets/positive.png";
import identify from "../assets/identify.png";
import { Link } from "react-router-dom";
import HeroSection from "./HeroSection";
import DescriptionSection from "./Description";
import TestimonialsSection from "./Testimonials";

function HomeScreen() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const goToSignup = (e) => {
    e.preventDefault();
    navigate("/signup", { state: { email } });
  };

  const bounceStyle = {
    animation: "bounce 8s ease 2s infinite forwards",
    display: "inline-block",
  };

  return (
    <>
      <HeroSection />
      <DescriptionSection />
      <TestimonialsSection />
    </>
  );
}

export default HomeScreen;
