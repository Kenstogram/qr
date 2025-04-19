import Navbar from '@/components/NavbarDark';
import { Suspense } from "react";
import Iframe from 'react-iframe';

export default function LiveshopPage() {
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
            Liveshop Experience
          </h1>
          <p className="mt-3 text-gray-600">
            Embrace the future of retail with LiveShopping, a revolutionary way to engage with your customers in real-time. Integrate live video shopping into your website to transform your user experience, boost brand engagement, and drive sales.
          </p>
          {/* <p className="mt-3 text-gray-600">
            Our platform offers a seamless blend of livestreaming, liveshopping, AI agents, QR analytics, social integrations, and payment solutions, all designed to enhance your brands reach and effectiveness. Launch super apps with comprehensive features including CRM and brand referrals, ensuring a holistic approach to customer interaction and retention.
          </p>
          <p className="mt-3 text-gray-600">
            Host live shopping events, embed checkout with QR Experiences, and automate your POS with advanced QR analytics. Enhance your sales process with features like barcode and QR Experience scanning, making transactions faster and more efficient.
          </p> */}
          <div className="mt-10">
            <Iframe
              url="https://influencersqr.shop/collections/home"
              width="100%"
              height="600px"
              id="liveshop-iframe"
              className="border-none"
              display="block"
              position="relative"
            />
          </div>
          {/* <h2 className="lg:text-3xl text-2xl font-bold mt-10">
            Pricing
          </h2>
          <p className="mt-3 text-gray-600">
            Our pricing model is transparent and straightforward, designed to provide value at every stage of your business growth:
          </p>
          <ul className="list-disc list-inside mt-3 text-gray-600">
            <li>
              <strong>Live Shopping Events:</strong> Host live shopping events to engage directly with your customers.
            </li>
            <li>
              <strong>Embed Checkout with QR Experiences:</strong> Integrate seamless checkout experiences using QR Experiences.
            </li>
            <li>
              <strong>Scan Barcodes and QR Experiences:</strong> Efficiently manage your inventory and sales with barcode and QR Experience scanning.
            </li>
            <li>
              <strong>Automate POS with QR Analytics:</strong> Use advanced QR analytics to streamline and automate your point of sale processes.
            </li>
          </ul>
          <h3 className="lg:text-2xl text-xl font-bold mt-8">
            Pricing Breakdown
          </h3>
          <p className="mt-3 text-gray-600">
            Our pricing structure is designed to be competitive and fair:
          </p>
          <ul className="list-disc list-inside mt-3 text-gray-600">
            <li>
              <strong>Transaction Fee:</strong> 3% + $0.50 per transaction.
            </li>
            <li>
              <strong>Livestreaming:</strong> $0.05 per minute + $0.25 per GB for streaming.
            </li> 
          </ul> */}
        </div>
      </div>
    </>
  );
}
