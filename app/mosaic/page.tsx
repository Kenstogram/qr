import Navbar from '@/components/NavbarDark';
import { Suspense } from "react";
import ColorfulQR from '@/components/ColorfulQR'; // Adjust the path as needed
import { Button } from "@/components/ui/button";

export default function MosaicPage() {
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
          Create a Mosaic QR!
        </h1>
        <a href="https://app.qrexperiences.com"
                target="_blank"
                rel="noopener noreferrer"
                >
        <Button className="border border-stone-200">
          Want to add QR Click Analytics?
        </Button>
        </a>
           <ColorfulQR />
      </div>
    </div>
    </>
  );
}
