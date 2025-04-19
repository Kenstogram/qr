import { getSiteData } from "@/lib/fetchers"; // Your existing getSiteData function
import Image from "next/image";
import { notFound } from "next/navigation";
import CopyQRCodeButton from "@/components/ui/CopyQRCodeButton";
import { QRCodeSVG } from "qrcode.react";
import SiteForm from "@/components/SiteForm";

interface Props {
  domain: string;
}

export default async function Rooms({ domain }: Props) {
  // Fetch site data using the domain
  const data = await getSiteData(domain);

  // Handle case when data is not found
  if (!data) {
    notFound(); // Will render the 404 page automatically
  }

  // Generate the QR code URL
  const qrCodeUrl = `https://go.qrexperiences.com/${data.clicklink}`;
  const displayUrl = qrCodeUrl.replace("https://", ""); // Remove 'https://'

  // Default to black text if textColor is not available
  const textColor = data.textColor || "#000000";

  return (
    <>
      <div className="flex flex-col items-center justify-start w-full">
        {/* Background Image Section with dark overlay */}
        <div className="relative w-full">
          {data?.image && (
            <div className="relative w-full" style={{ paddingBottom: "100%" }}>
              {/* Image */}
              <Image
                src={data.image}
                className="object-cover absolute top-0 left-0"
                alt="QR Code Image"
                layout="fill"
                objectFit="cover"
              />
              
              {/* Dark Overlay */}
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>
            </div>
          )}

          {/* Banner and Description Section */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10 space-y-4 p-10">
            {/* Banner Section */}
            {data?.Banner && (
              <h1
                className="text-3xl sm:text-5xl font-bold"
                style={{ color: textColor }}
              >
                {data.Banner}
              </h1>
            )}

            {/* Headline Section directly below the Banner */}
            {data?.description && (
              <p
                className="text-lg sm:text-2xl px-4"
                style={{ color: textColor }}
              >
                {data.description}
              </p>
            )}
          </div>
        </div>

        {/* Content Section Below the Image */}
        {data?.enableFeature && (
          <div className="mt-8 w-full">
            {/* Pass the siteId to the SiteForm component */}
            <SiteForm siteId={data.id} color={textColor} />
          </div>
        )}
      </div>
    </>
  );
}
