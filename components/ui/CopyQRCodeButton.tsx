"use client"; // This makes the component client-side

import { QRCodeSVG } from "qrcode.react";
import { toast, Toaster } from 'react-hot-toast';

interface CopyQRCodeButtonProps {
  qrCodeUrl: string;
}

export default function CopyQRCodeButton({ qrCodeUrl }: CopyQRCodeButtonProps) {

  const handleCopyClick = () => {
    navigator.clipboard.writeText(qrCodeUrl).then(() => {
      toast.success("QR Experience Copied!"); // Show toast notification on success
    }).catch(() => {
      toast.error("Failed to Copy URL."); // Show toast notification on failure
    });
  };

  return (
    <div className="flex justify-center items-center space-x-4 mt-4"> {/* Flex container to space buttons */}
      {/* Copy QR Button */}
      <button
        onClick={handleCopyClick}
        className="flex items-center rounded-md border-2 bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-stone-200 dark:hover:bg-stone-700 dark:bg-stone-800"
      >
        <span className="mr-2">Copy Link</span>
        <QRCodeSVG
          value={qrCodeUrl}
          bgColor={"#FFFFFF"}
          fgColor={"#000000"}
          level={"L"}
          height={20}
          width={20}
        />
      </button>
      {/* View QR Button */}
      <a
        href={qrCodeUrl}
        target="_blank"
        rel="noreferrer"
        className="flex items-center truncate rounded-md border-2 bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-stone-200 dark:hover:bg-stone-700 dark:bg-stone-800"
      >
        <span className="mr-2">Click QR ↗</span>
      </a>
      <div className="z-[100]">
      <Toaster />
      </div>
    </div>
    
  );
}
