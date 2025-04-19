"use client";

import CTA from '@/components/CTA';
import Metrics from '@/components/Metrics';
import GradientWrapper from '@/components/GradientWrapper';
import Hero from '@/components/Hero';
import { motion } from "framer-motion";
import { gradient } from "@/components/Gradient";
import { useState, useEffect, Suspense } from "react";
import Navbar from '@/components/Navbar';
//import Gallery from '@/components/Gallery';
import { PricingFaq } from "@/components/pricing/pricing-faq";
import { hasCookie, setCookie } from "cookies-next";
import { CloudSunRain, Rocket } from 'lucide-react';
import AnalyticsDashboard from "@/components/analyticsDashboard";
import Swag from "@/components/Swag";
import HeroBlog from "@/components/HeroBlog"

export default function LandingPage() {
  const [weather, setWeather] = useState("gradient-canvas");
  const [showConsent, setShowConsent] = useState<boolean>(true);

  // Update the gradient effect based on the weather state
  useEffect(() => {
    gradient.initGradient(`#${weather}`);
  }, [weather]);
  
  useEffect(() => {
    const consentExists = hasCookie("localConsent");
    console.log("Consent Exists: ", consentExists); // Debug log
    setShowConsent(!consentExists);
  }, []);

  const acceptCookie = () => {
    setCookie("localConsent", "true", {});
    console.log("Cookie set: localConsent"); // Debug log
    setShowConsent(false); // Hide the banner after accepting
  };

  const rejectCookie = () => {
    console.log("User rejected cookies");
    // Redirect to support page
    window.location.href = "https://qrexperiences.com/support";
  };


  const changeWeather = () => {
    setWeather(prevWeather => {
      switch (prevWeather) {
        case "gradient-canvas":
          return "storm-gradient-canvas";
        case "storm-gradient-canvas":
          return "aurora-gradient-canvas";
        case "aurora-gradient-canvas":
          return "aurora-dark-gradient-canvas";
        case "aurora-dark-gradient-canvas":
          return "sunset-gradient-canvas";
        case "sunset-gradient-canvas":
          return "gradient-canvas-blue"; // Added new gradient
        case "gradient-canvas-blue":
          return "neon-gradient-canvas"; // Added new gradient
        case "neon-gradient-canvas":
          return "retro-gradient-canvas"; // Added new gradient
        case "retro-gradient-canvas":
          return "cyberpunk-gradient-canvas"; // Added new gradient
        case "cyberpunk-gradient-canvas":
          return "galactic-gradient-canvas"; // Added new gradient
        case "galactic-gradient-canvas":
          return "flame-gradient-canvas"; // Added new gradient
        case "flame-gradient-canvas":
          return "vortex-gradient-canvas"; // Added new gradient
        case "vortex-gradient-canvas":
          return "gradient-canvas"; // Loop back to original gradient
        default:
          return "gradient-canvas";
      }
    });
  };

  return (
    <>
      <motion.div>
        <motion.canvas
          id={weather} // Apply the current weather state here
          data-transition-in
          className="flex h-[500px] w-full bg-transparent"
        ></motion.canvas>
        <Suspense fallback={
          <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-300" />
        }>
          <Navbar />
          <Hero />
        </Suspense>
        <GradientWrapper />
        <HeroBlog/>
        <div className="pb-96"></div>
      </motion.div>
    </>
  );
}
