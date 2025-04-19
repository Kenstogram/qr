"use client";

import { Card } from "@tremor/react";
import Image from "next/image"; // Import Image component
import { Button } from "@/components/ui/button"; // Import the Button component from your UI library
import sweatpants from '../public/sweatpants.png'; // Import the image

const SwagCard = () => (
  <Card className="space-y-6 p-4">
    <div className="text-center">
      <Image
        src={sweatpants}
        alt="Sweatpants"
        className="rounded-md w-full h-auto mb-4"
      />
      <a
        href="https://sweatpantsqr.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="outline" > {/* Make the button full-width for better UI */}
          Order Custom QR Gear!
        </Button>
      </a>
    </div>
  </Card>
);

const SwagPage = () => {
  return (
    <div className="space-y-6">
      {/* SwagCard with Image and Button */}
      <SwagCard />
    </div>
  );
};

export default SwagPage;
