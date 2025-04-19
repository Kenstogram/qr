import Navbar from '@/components/NavbarDark';
import { Suspense } from "react";
import Image from "next/image";
import NavLink from '@/components/NavLink';

export default function SweatpantsPage() {
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
           Custom QR Merch
          </h1>
          <p className="mt-3 text-gray-600">
            Want to design swag featuring customizable QR experiences with analytics tracking? Express your individuality and make a statement while enjoying comfort and style.
          </p>
          <div>
           <Image
              alt="SweatpantsQR Image"
              src="/sweatpants.png"
              width={500}
              height={500}
              className="dark:hidden"
            />
          </div>
          <p className="mt-3 text-gray-600">
            Our platform combines cutting-edge design tools with easy customization, allowing you to create unique gear that reflect your personality. Each QR Experience can link to anything from personal messages to social media profiles, making your sweatpants not just clothing but a conversation starter.
          </p>
          <NavLink
                  href="https://qrexperiences.com"
                  className="block font-medium text-sm text-white bg-black border border-gray-800 hover:bg-gray-600 active:bg-white active:text-black md:inline"
                >
                  Get Started
                </NavLink>
        </div>
      </div>
    </>
  );
}
