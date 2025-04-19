import Navbar from '@/components/NavbarDark';
import { Suspense } from "react";
import Iframe from 'react-iframe';
import HubSpotForm from '@/components/HubSpotForm'; // Adjust the path as needed

export default function InfluencersPage() {
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
            Influencers Experience
          </h1>
          <p className="mt-3 text-gray-600">
            Enhance your influence with Influencers QR, a marketplace for connecting with influencers with tools to track referral performance, boost product visibility, and analyze the success of your QR campaigns. Sign up for a Demo!
          </p>
          {/* <div className="mt-10">
            <Iframe
              url="https://influencersqr.shop/collections/home"
              width="100%"
              height="600px"
              id="influencers-iframe"
              className="border-none"
              display="block"
              position="relative"
            />
          </div> */}
          <div className="p-10">
              <HubSpotForm/>
              </div>
          {/* <h2 className="lg:text-3xl text-2xl font-bold mt-10">
            Pricing
          </h2>
          <p className="mt-3 text-gray-600">
            Our pricing model is designed to be accessible and beneficial for both influencers and platforms:
          </p>
          <ul className="list-disc list-inside mt-3 text-gray-600">
            <li>
              <strong>Free for influencers:</strong> No cost to join and use the platform.
            </li>
            <li>
              <strong>Platforms:</strong> Pay a referral percentage plus $0.50 per influencer payout.
            </li>
          </ul> */}
        </div>
      </div>
    </>
  );
}
