// CreateSiteModal.tsx
"use client";

export default function CreateNoSiteModal() {

  return (
      <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg mx-auto w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Upgrade Your Plan</h2>
        <p className="mb-6 text-center">
          You have reached the limit for the number of QR Experiences on your current plan. Upgrade your plan to create more QR Experiences.
        </p>
        <div className="flex justify-center mb-20">
          <a href="https://qrexperiences.com/pricing" className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition">
            Upgrade Now
          </a>
        </div>
      </div>
  );
}
