import Navbar from '@/components/NavbarDark';
import { Suspense } from "react";
import HubSpotForm from '@/components/HubSpotForm'; // Adjust the path as needed

export default function EventsPage() {
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
            Discover QR Ticketing and Events
          </h1>
          <p className="mt-3 text-gray-600">
            Join us to explore the world of QR ticketing and events. Launch interactive experiences with features like QR analytics, livestreaming, liveshopping, AI agents, brand referrals, social integration, CRM, and seamless payments.
          </p>
          <div className="p-10">
            <HubSpotForm />
          </div>
        </div>
      </div>
    </>
  );
}
