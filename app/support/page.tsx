import Navbar from '@/components/NavbarDark';
import { Suspense } from "react";
import HubSpotForm from '@/components/HubSpotForm'; // Adjust the path as needed

export default function SupportPage() {
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
            Get Support for QR Experiences
          </h1>
          <p className="mt-3 text-gray-600">
            Were here to help you make the most of QR Experiences. Whether you have questions, need technical assistance, or want to explore, our support team is ready to assist.
          </p>
          <div className="p-10">
            {/* Include any specific support form or contact details here */}
            <HubSpotForm />
          </div>
        </div>
      </div>
    </>
  );
}
