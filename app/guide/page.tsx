"use client";
// Import the required dependencies
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from "next/link";
import Logo from '../../public/logo.png';
import qrfinder from '../../public/qrfinder.png';
import flatmobile from '../../public/mobile-flat.png';
import CatShop from "../../public/catshop.png";
import CatShip from "../../public/catship.png";
import CatCc from "../../public/catcc.png";
// Install Swiper modules
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from 'swiper/modules';
import { AnimatePresence, motion } from "framer-motion";
import { gradient } from "@/components/Gradient";
import Footer from "@/components/Footer";
import Navbar from '@/components/Navbar';
import { Suspense } from "react";
// swiper bundle styles
import 'swiper/css';

export default function ScanHomePage() {
      useEffect(() => { gradient.initGradient("#gradient-canvas");
      const handleScroll = () => {
      const mobileImage = document.getElementById('mobile');
      const qrImage = document.getElementById('qr');
      const qrFinderImage = document.getElementById('qrfinder');
      const lightImage = document.getElementById('light');
      const screenHolderImage = document.getElementById('Swiper');

      let qrFinderOpacity = 0;

      if (mobileImage && qrImage && qrFinderImage) {
        const mobileRect = mobileImage.getBoundingClientRect();
        const qrRect = qrImage.getBoundingClientRect();

        // Check if the mobile image is over the qr image
        if (mobileRect.top < qrRect.bottom) {
          // Position the qrfinder image around the qr image
          qrFinderImage.style.position = 'absolute';
          qrFinderImage.style.top = `${qrRect.top}px`;
          // qrFinderImage.style.left = `${qrRect.left}px`;

          // Set opacity to fade in
          qrFinderOpacity = 1;
        } else {
          // Reset styles if the mobile image is not over the qr image
          qrFinderImage.style.display = mobileRect.top < qrRect.bottom ? 'block' : 'none';
          // Set opacity to fade out
          qrFinderOpacity = 0;
        }
      }

      // Check if the mobile image is visible in the viewport
      const isMobileVisible = isElementInViewport(mobileImage);

      // Set opacity for qrfinder image
      if (qrFinderImage) {
        qrFinderImage.style.opacity = qrFinderOpacity.toString();
      }

      // Set opacity for mobile image
      if (mobileImage) {
        mobileImage.style.opacity = isMobileVisible ? '0' : '1';
      }

      // Fade in/out the screenholder image based on mobile visibility
      if (screenHolderImage) {
        screenHolderImage.style.opacity = isMobileVisible ? '0' : '1';
      }
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isElementInViewport = (el: HTMLElement | null) => {
    if (!el) return false;

    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  return (
    <Suspense fallback={<div>Loading...</div>}> {/* Wrap the component with Suspense */}
    <AnimatePresence>
    <div className="bg-[#000000] items-center px-4 container w-full flex flex-1 flex-col pt-6 pb-8 md:py-10 font-inter overflow-hidden">
        <svg
          style={{ filter: "contrast(125%) brightness(110%)" }}
          className="fixed z-[1] w-full h-full opacity-[35%]"
        >
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency=".7"
              numOctaves="3"
              stitchTiles="stitch"
            ></feTurbulence>
            <feColorMatrix type="saturate" values="0"></feColorMatrix>
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)"></rect>
        </svg>
      {/* Header Section */}
      {/* <div className="flex items-center bg-white justify-between mb-8">
        <Link href="/" passHref>
          <a className="focus:outline-none">
            <Image src={Logo} alt="Logo" width={120} height={34} />
          </a>
        </Link>
      </div> */}
      {/* Navbar Section */}
      <Navbar />
      {/* Hero Section */}
      <div id="livestream-marketplace" className="pt-16 items-start mx-auto flex w-full flex-col items-center gap-6">
        <p></p>
        <h1 className="text-3xl text-white font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          How it Works?
        </h1>
        <h1 className="text-2xl text-white font-extrabold leading-tight tracking-tighter sm:text-2xl md:text-4xl lg:text-5xl">
          Scan a QR Experience
        </h1>
        {/* <a href="https://livestreamai.vercel.app/" target="_blank" rel="noreferrer">
          <div className="flex justify-end">
            <button className="bg-gradient-to-r from-[#e1fa57] via-red-600 to-pink-600 hover:from-purple-400 hover:via-pink-400 hover:to-red-400 text-white font-bold py-2 px-4 rounded z-80">
              Demo 🚀
            </button>
          </div>
        </a> */}
      </div>
      <div className="relative items-center pt-16">
        {/* Mobile Image */}
        <Image
          id="mobile"
          src={qrfinder}
          alt="Mobile Image"
          width={120}
          height={120}
          style={{
            position: 'absolute',
            opacity: 1,
            top: '18%',
            left: '50%',
            transform: 'translate(-50%, -62%)',
            transition: 'opacity 0.5s ease',
            zIndex: 20,
          }}
          className="place-content-center z-20"
        />
        {/* QR Finder Image */}
        <Image
          id="qrfinder"
          src={flatmobile}
          alt="QR Finder Image"
          width={200}
          height={200}
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            transition: 'opacity 0.5s ease',
            zIndex: 30,
          }}
          className="place-content-center pt-96 z-30"
        />
        {/* QR Image */}
        <Link href={`https://app.livestreamqr.com`}>
        <div className="flex h-28 w-28 items-center rounded-lg justify-between px-1 py-1 bg-gradient-to-r from-grey-100 to-stone-100 absolute top-1/5 left-1/2 transform -translate-x-1/2 translate-y-1/10">
        <Image
          id="qr"
          src={Logo}
          alt="QR Image"
          width={100}
          height={100}
          style={{
            position: 'absolute',
            opacity: 1,
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -17%)',
            transition: 'opacity 0.5s ease',
            zIndex: 20,
          }}
          className="place-content-center bg-black z-20"
        />
        </div>
        </Link>
        {/* Screenholder Image */}
        {/* <Image
          id="screenholder"
          src={screenholster}
          alt="Screenholder Image"
          width={300}
          height={300}
          style={{ opacity: 0, transition: 'opacity 0.5s ease', zIndex: 40 }}
          className="place-content-center rounded-lg pt-72 pb-36 z-40"
        /> */}
      {/* Main Content Section */}
        {/* ... (unchanged part) */}
        {/* Hero Section */}
        <div id="livestream-marketplace" className="pt-80 items-start mx-auto flex w-full flex-col items-center gap-6">
        <p></p>
        <h1 className="text-3xl text-white font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Join a QR Experience
        </h1>
        {/* <h1 className="text-2xl text-white font-extrabold leading-tight tracking-tighter sm:text-2xl md:text-4xl lg:text-5xl">
          Getting Started Guide
        </h1> */}
        {/* <a href="https://livestreamqr.com/products" target="_blank" rel="noreferrer">
          <div className="flex justify-end">
            <button className="bg-gradient-to-r from-[#e1fa57] via-red-600 to-pink-600 hover:from-purple-400 hover:via-pink-400 hover:to-red-400 text-white font-bold py-2 px-4 rounded z-80">
              Demo 🚀
            </button>
          </div>
        </a> */}
      </div>
        {/* Swiper Slider */}
        <Swiper
          navigation={true} 
          modules={[Navigation]}
          id="Swiper"
          className="mySwiper pt-4 w-96"
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          autoplay={{ delay: 1000, disableOnInteraction: true }}
          >
          <div className="swiper-slide-transform">
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="relative rounded-lg border border-stone-200 pb-10 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
              <Link
                href={`https://livestreamqr.com`}
                className="flex flex-col overflow-hidden rounded-lg"
              >
                <div className="relative h-44 overflow-hidden">
                  <div className="absolute flex items-center">
                    <Image
                      priority
                      src={CatCc}
                      alt="LivestreamQR Cat Product Logo"
                      style={{ objectFit: "contain" }}
                      className="w-96 rounded-lg"
                    />
                  </div>
                </div>
                <div className="border-t border-stone-200 p-4 dark:border-stone-700">
                  <h3 className="my-0 truncate font-cal text-xl font-bold tracking-wide text-white text-white">
                    Payments by QR
                  </h3>
                  <p className="mt-2 line-clamp-1 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
                    QR Experience Invoices and Product Landing Pages
                  </p>
                </div>
              </Link>
              <div className="absolute bottom-4 flex w-full px-4 justify-end">
                <a
                  href={`https://app.livestreamqr.com`}
                  target="_blank"
                  rel="noreferrer"
                  className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
                >
                  Get Started ↗
                </a>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
          <div className="relative rounded-lg border border-stone-200 pb-10 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
              <Link
                href={`https://liveshopqr.com`}
                className="flex flex-col overflow-hidden rounded-lg"
              >
                <div className="relative h-44 overflow-hidden">
                  <div className="absolute flex items-center">
                    <Image
                      priority
                      src={CatShop}
                      alt="LivestreamQR Cat Product Logo"
                      style={{ objectFit: "contain" }}
                      className="w-96 rounded-lg"
                    />
                  </div>
                </div>
                <div className="border-t border-stone-200 p-4 dark:border-stone-700">
                  <h3 className="my-0 truncate font-cal text-xl font-bold tracking-wide text-white text-white">
                    Liveshopping Marketplace
                  </h3>
                  <p className="mt-2 line-clamp-1 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
                    Shop with Live Product Displays
                  </p>
                </div>
              </Link>
              <div className="absolute bottom-4 flex w-full px-4 justify-end">
                <a
                  href={`https://livestreamqr.shop`}
                  target="_blank"
                  rel="noreferrer"
                  className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
                >
                  Shop ↗
                </a>
              </div>
            </div>
          </SwiperSlide>
                    {/* Slide 3 */}
                    <SwiperSlide>
            <div className="relative rounded-lg border border-stone-200 pb-10 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
              <Link
                href={`https://app.livestreamqr.com`}
                className="flex flex-col overflow-hidden rounded-lg"
              >
                <div className="relative h-44 overflow-hidden">
                  <div className="absolute flex items-center">
                    <Image
                      priority
                      src={CatShip}
                      alt="LivestreamQR Cat Product Logo"
                      style={{ objectFit: "contain" }}
                      className="w-96 rounded-lg"
                    />
                  </div>
                </div>
                <div className="border-t border-stone-200 p-4 dark:border-stone-700">
                  <h3 className="my-0 truncate font-cal text-xl font-bold tracking-wide text-white text-white">
                    Livestreaming QR Experiences
                  </h3>
                  <p className="mt-2 line-clamp-1 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
                    Create a Livestream with Sharable QR Experiences
                  </p>
                </div>
              </Link>
              <div className="absolute bottom-4 flex w-full px-4 justify-end">
                <a
                  href={`https://app.livestreamqr.com`}
                  target="_blank"
                  rel="noreferrer"
                  className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
                >
                  Stream ↗
                </a>
              </div>
            </div>
          </SwiperSlide>
          {/* Slide 4 */}
            {/* Add more slides as needed */}
          </div>
        </Swiper>
          {/* <div className="mx-auto flex w-full flex-col items-center">
            <a href="https://app.livestreamqr.com" target="_blank" rel="noreferrer">
              <button className="bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 hover:from-green-400 hover:via-yellow-400 hover:to-orange-400 text-white font-bold py-2 px-4 rounded">
                Launch 🚀
              </button>
            </a>
          </div> */}
        </div>
        {/* ... (Remaining content remains unchanged) */}
      {/* ... (unchanged part) */}
      <div className="space-y-96">
          &nbsp;
        </div>
        <div className="space-y-96">
          &nbsp;
        </div>
        &nbsp;
      <div className="mx-auto text-white flex w-full flex-col items-center gap-6 pt-60">
        <Footer />
      </div>
      </div>
    </AnimatePresence>
    </Suspense>
  );
}
