"use client";

import { motion } from "framer-motion";
import { gradient } from "@/components/Gradient";
import { useState, useEffect, Suspense } from "react";
import { CloudSunRain, Rocket } from 'lucide-react';
import GradientCircle from "./GradientCircle";
import SwirlyQRCode from "./SwirlyQRCode";
import EmailForm from "./EmailForm";
import SignUpEmailForm from "./SignUpEmailForm";
import LoginButton from "./login-button";
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const [weather, setWeather] = useState("gradient-canvas");

  // Update the gradient effect based on the weather state
  useEffect(() => {
    gradient.initGradient(`#${weather}`);
  }, [weather]);

  const changeWeather = () => {
    setWeather((prevWeather) => {
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
    <motion.div>
      {/* Motion Canvas as Background */}
      <motion.canvas
        id={weather} // Apply the current weather state here
        data-transition-in
        className="absolute top-0 left-0 w-full h-full bg-transparent -z-10"
      >
        {/* Button to change gradient */}
        <button
          className="absolute z-[100] top-2 right-10 bg-transparent text-white px-4 py-2 rounded"
          onClick={changeWeather}
        >
          {weather === "galactic-gradient-canvas" ? <Rocket /> : <CloudSunRain />}
        </button>
      </motion.canvas>

      {/* Main Content */}
      <div className="bg-white relative mx-5 border dark:text-white border-stone-200 dark:border-stone-700 shadow-md sm:mx-auto sm:w-full sm:max-w-md rounded-lg sm:shadow-md">
        <p className="mt-2 text-center text-sm text-stone-600 dark:text-stone-400">
        <div className="flex justify-center items-center mt-5 gap-1 text-black">
        <a
            className="mt-2 font-medium text-black hover:text-blue-600 dark:text-stone-500"
            href="https://QRexperiences.com/"
            rel="noreferrer"
            target="_blank"
          >
                <Image src="/darkrainbowqr.svg" alt="logo" width={36} height={36} className="transform rotate-45 mr-2" />
                </a> 
              </div>
          <br />
          <h1 className="text-center font-cal text-3xl text-black dark:text-stone-500">
          Start for free today!
        </h1>
          {/* <a
            className="mt-2 font-medium text-black hover:text-blue-600 dark:text-stone-500"
            href="https://QRexperiences.com/"
            rel="noreferrer"
            target="_blank"
          >
            About QR Experiences
          </a> */}
        </p>
        <div className="mx-auto mt-2 w-11/12 max-w-xs sm:w-full">
          <Suspense
            fallback={
              <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800" />
            }
          >
            <div className="mb-4 mt-1">
              <p className="mt-2 mb-2 text-center text-sm text-stone-600 dark:text-stone-400">
                <br />
                <a className="font-medium text-black dark:text-stone-500">
                  Sign up with a Magic Link
                </a>
              </p>
              <SignUpEmailForm />
            </div>
          </Suspense>
        </div>
        {/* <div className="mx-auto mt-4 w-11/12 max-w-xs sm:w-full">
          <Suspense
            fallback={
              <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800" />
            }
          >
            <div className="mb-4 mt-1 border-t border-gray-300">
              <p className="mt-2 mb-2 text-center text-sm text-stone-600 dark:text-stone-400">
                <br />
                <a className="font-medium text-black dark:text-stone-500">
                  Sign up and login with Google?
                </a>
              </p>
              <LoginButton />
            </div>
          </Suspense>
        </div> */}
        <div className="mx-auto mt-4 w-11/12 max-w-xs sm:w-full">
          <Suspense
            fallback={
              <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800" />
            }
          >
            <div className="mb-4 mt-1 border-t border-gray-300">
              <p className="mt-2 mb-2 text-center text-sm text-stone-600 dark:text-stone-400">
                <br />
                <a className="font-medium text-black dark:text-stone-500">
                  Already have a QR Experiences account?
                </a>
              </p>
              <EmailForm />
            </div>
          </Suspense>
        </div>
        <div className="mx-auto mt-4 w-11/12 max-w-xs sm:w-full">
            <div className="mb-4 mt-1">
                  <p className="mt-2 mb-2 text-center text-sm text-stone-600 dark:text-stone-400">
                    <br />
                    <a className="font-medium text-black dark:text-stone-500">
                      By proceeding, you agree to the 
                      <a
                className="font-medium text-black hover:text-blue-600 dark:text-stone-500"
                href="https://QRexperiences.com/policy"
                rel="noreferrer"
                target="_blank"
              > Terms and Conditions&nbsp;
              </a>
              and 
              <a
                className="font-medium text-black hover:text-blue-600 dark:text-stone-500"
                href="https://QRexperiences.com/policy"
                rel="noreferrer"
                target="_blank"
              > Privacy Policy
              </a>
                </a>
              </p>
            </div>
        </div>
      </div>
    </motion.div>
  );
}
