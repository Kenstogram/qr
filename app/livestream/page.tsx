import Navbar from '@/components/NavbarDark';
import { Suspense } from "react";
import Iframe from 'react-iframe';
import NavLink from '@/components/NavLink';

export default function LivestreamPage() {
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
            Livestream Experience
          </h1>
          <p className="mt-3 text-gray-600">
            Stream live events on social platforms, generate QR Experiences for access, and enhance engagement with interactive content. Our platform leverages QR analytics to provide insights into audience engagement and interaction.
          </p>
          <div className="mt-10">
            <Iframe
              url="https://rennyswedding.livestreamqr.com/"
              width="100%"
              height="500px"
              id="livestream-iframe"
              className="border-none"
              display="block"
              position="relative"
            />
          </div>
          <NavLink
                  href="https://livestreamqr.com"
                  className="block mt-5 font-medium text-sm text-white bg-black border border-gray-800 hover:bg-gray-600 active:bg-white active:text-black md:inline"
                >
                  Get Started
                </NavLink>
         {/* <h2 className="lg:text-3xl text-2xl font-bold mt-10">
            Pricing
          </h2>
          <p className="mt-3 text-gray-600">
            Our pricing model is straightforward and designed to provide value at every stage:
          </p>
          <ul className="list-disc list-inside mt-3 text-gray-600">
            <li>
              <strong>Stream Live Events on Socials:</strong> Engage your audience with live streaming on social media platforms.
            </li>
            <li>
              <strong>Generate QR Experiences for Access:</strong> Create QR Experiences to provide exclusive access to your live events.
            </li>
            <li>
              <strong>Enhance Engagement with Content:</strong> Use interactive content to increase viewer engagement.
            </li>
            <li>
              <strong>Use QR Analytics for Engagement:</strong> Gain insights into audience interactions and engagement.
            </li>
          </ul>
          <h3 className="lg:text-2xl text-xl font-bold mt-8">
            Pricing Breakdown
          </h3>
          <p className="mt-3 text-gray-600">
            Our pricing structure is competitive and transparent:
          </p>
          <ul className="list-disc list-inside mt-3 text-gray-600">
            <li>
              <strong>Livestreaming:</strong> $0.05 per minute + $0.25 per GB for streaming.
            </li>
          </ul> */}
        </div>
      </div>
    </>
  );
}
