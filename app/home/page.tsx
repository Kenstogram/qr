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

export default function HomePage() {
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
        <button
          className="absolute z-[100] top-24 right-5 bg-transparent text-white px-4 py-2 rounded"
          onClick={changeWeather}
        >
          {weather === "galactic-gradient-canvas" ? <Rocket /> : <CloudSunRain />}
        </button>
        <HeroBlog/>
        {/* <HeroBar/> */}
        {/*<Gallery />*/}
        {/* <CTA /> */}
        <Metrics />
        <AnalyticsDashboard />
        <PricingFaq />
        {/* <Swag /> */}
        <div className="pb-96"></div>
      </motion.div>
      {/* Cookie Consent Banner */}
      {/* {showConsent && (
        <div className="fixed inset-0 bg-slate-700 bg-opacity-70 z-90">
          <div className="fixed bottom-0 left-0 right-0 flex flex-col items-center justify-center px-4 py-8 bg-gray-100">
            <div className="text-6xl mb-4">
              🍪
            </div>
            <span className="text-dark text-sm mb-4 text-center">
              This website uses cookies to enhance your experience and analyze site usage. By continuing to browse, you consent to our use of cookies in accordance with our{" "}
              <a href="/policy" className="text-blue-700 text-sm underline">Cookie Policy</a>.
            </span>
            <div className="flex space-x-4">
              <button 
                className="bg-purple-500 py-2 px-8 rounded text-white" 
                onClick={acceptCookie}>
                Accept
              </button>
              <button 
                className="bg-gray-300 py-2 px-8 rounded text-black" 
                onClick={rejectCookie}>
                Reject
              </button>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}
