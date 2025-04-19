"use client";

import { useState, useEffect } from "react";
import Iframe from 'react-iframe';

export default function StripeModal() {
  const [closeStripeModal, setCloseStripeModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 400);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="h-550 fixed inset-x-0 bottom-5 mx-5 flex  flex-col items-center justify-between space-y-3 rounded-lg border-t-4 border-black bg-white px-5 pb-3 pt-0 drop-shadow-lg transition-all duration-150 ease-in-out dark:border dark:border-t-4 dark:border-stone-700 dark:bg-white dark:text-black lg:flex-row lg:space-y-0 lg:pt-3 xl:mx-auto"
    >
      <button
        onClick={() => setCloseStripeModal(!closeStripeModal)}
        className={`${
          closeStripeModal ? "rotate-180" : "rotate-0"
        } absolute right-3 top-2 text-black transition-all duration-150 ease-in-out dark:text-black`}
      >
      </button>
      <p
        className={`${
          closeStripeModal ? "hidden lg:block" : ""
        } mt-2 text-sm text-stone-700 dark:text-stone-300 lg:mt-0`}
      >
      </p>
      <div className="items-center">
        {isMobile ? (
          <Iframe
            url="https://QRExperiences-stripe.vercel.app"
            id="QR Experiences Donation"
            width="100%"
            height="500"
            className="" // Add a CSS class name
            display="block"
            position="relative"
            styles={{ border: "none", margin: "auto"}} 
          />
        ) : (
          <Iframe
            url="https://QR Experiences-stripe.vercel.app"
            id="QR Experiences Donation"
            width="560"
            height="500"
            className="" // Add a CSS class name
            display="block"
            position="relative"
            styles={{ border: "none", margin: "auto"}} 
          />
        )}
      </div>
      <div
        className={`${
          closeStripeModal ? "hidden lg:flex" : ""
        } flex w-full flex-col space-y-3 text-center sm:flex-row sm:space-x-3 sm:space-y-0 lg:w-auto`}
      >
      </div>
    </div>
  );
}
