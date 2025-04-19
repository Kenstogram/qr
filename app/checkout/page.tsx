'use client'

import React, { useState, useEffect } from "react";
import Navbar from '@/components/NavbarDark';
import { Suspense } from "react";
import Iframe from 'react-iframe';
import NavLink from '@/components/NavLink';

export default function CheckoutPage() {
  const [showQR, setShowQR] = useState<number>(0);  // State to toggle between QR images
  const [showCover, setShowCover] = useState<boolean>(true);  // State to toggle cover overlay

  const images = [
    '/cool.webp',  // Example QR images
    '/cool2.png',
  ];

  // Toggle between the QR images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowQR((prevShowQR) => (prevShowQR + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Handle the QR code click to hide the cover
  const handleQRCodeClick = () => {
    setShowCover(false);
  };

  return (
    <>
      <Suspense fallback={
        <div className="p-2 my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-300" />
      }>
        <Navbar />
      </Suspense>
      <div className="p-2 mt-36 mx-auto">
        <div className="mb-36 prose mx-auto">
          <h1 className="lg:text-5xl text-3xl font-bold">
            Checkout Experience
          </h1>
          <p className="mt-3 text-gray-600">
            Accept Payments easily with CheckoutQR, an easy to use way to engage with your customers in real-time. Integrate checkouts and shopping into your website to transform your user experience, boost brand engagement, and drive sales.
          </p>

          <div className="mt-10">
            {/* QR Toggle and Iframe for Checkout */}
            <div className="p-2 relative">
              <div
                className="z-50 truncate rounded-md px-1 py-1 text-sm font-medium text-black"
                onClick={handleQRCodeClick}
                style={{ position: 'absolute', top: 0, left: 0, cursor: 'pointer' }}
              >
                <img
                  src={images[showQR]} // Display toggling QR images
                  alt="Featured Checkout"
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
              </div>
              <div className="ml-2 flex flex-col items-center border-10 border-black pb-2">
                <div className="bg-white rounded-lg w-80 h-full flex justify-center items-center relative">
                  {showCover && (
                    <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center rounded-lg">
                      <p className="text-white font-bold">Click on the QR to View Checkout</p>
                    </div>
                  )}
                  <Iframe
                    url={`https://liveshopqr.com/collections/cool`}
                    width="320"
                    height="350"
                    id="QRExperiences Donation"
                    display="block"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          <NavLink
            href="https://checkoutqr.com"
            className="block font-medium text-sm text-white bg-black border border-gray-800 hover:bg-gray-600 active:bg-white active:text-black md:inline"
          >
            Get Started
          </NavLink>
        </div>
      </div>
    </>
  );
}
