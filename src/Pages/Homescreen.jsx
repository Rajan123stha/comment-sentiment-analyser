import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import HeroSection from "./HeroSection";
import DescriptionSection from "../Component/Description";
import TestimonialsSection from "../Component/Testimonials";

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
