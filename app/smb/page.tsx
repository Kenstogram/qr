import Navbar from '@/components/NavbarDark';
import { Suspense } from "react";
import HubSpotForm from '@/components/HubSpotForm'; // Adjust the path as needed

export default function SmbPage() {
  return (
    <>
    <Suspense fallback={
            <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-300" />
          }>
    <Navbar />
    </Suspense>
    <div className="mt-20 mx-auto text-center">
      <div className="mt-36 mb-36 text-center prose mx-auto">
        <h1 className="lg:text-5xl text-3xl font-bold">
          Sign up for a Demo!
        </h1>
        {/* <h2
          className="text-gray-800 text-3xl font-semibold sm:text-4xl"
          id="oss"
        >
          Create QR Experiences with <span className="text-green-500 text-3xl font-semibold sm:text-4xl">{"{Batteries Included}"}</span>
        </h2> */}
        <p className="mt-3 text-gray-600">
          Sign up to join and launch Super Apps with QR analytics, livestreaming, liveshopping, AI agents, brand referrals, social, CRM, and payments baked in.
        </p>
        <div className="p-10">
              <HubSpotForm/>
              </div>
      </div>
    </div>
    </>
  );
}
