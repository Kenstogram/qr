"use client";

import { ShoppingCart } from "lucide-react";
import React, { useState } from "react";
import Iframe from 'react-iframe';
import { Site } from "@prisma/client";

export default function Storebar({ data }: { data: Site }) {
  const [open, setOpen] = useState(false);
  // Use this to debug the regex
  const formattedSubdomain = data.subdomain?.replace(/([A-Z][a-z]*)([A-Z][a-z]*)/, '$1-$2').toLowerCase();
  console.log('Formatted Subdomain:', formattedSubdomain);

  return (
    <div className="fixed bottom-5 left-5 z-20">
      <a href={`https://liveshopqr.com/collections/${formattedSubdomain}`} target="_blank" className="flex items-center justify-center">
      <button
        className="items-center rounded-full bg-black p-4 text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 active:shadow-sm z-70"
        onClick={() => setOpen(!open)}
      >
        <ShoppingCart size={24} />
      </button>
      </a>
      {/* {open && (
        <div className="rounded-lg">
          <Iframe
            url={`https://liveshopqr.com/collections/${formattedSubdomain}`}
            width="350"
            height="545"
            id="QRExperiences Donation"
            className="bg-white"
            display="block"
            position="relative"
          />
        </div>
      )} */}
    </div>
  );
}