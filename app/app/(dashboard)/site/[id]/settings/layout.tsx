import { ReactNode } from "react";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import SiteSettingsNav from "./nav";
import { QRCodeSVG } from "qrcode.react";
import CopyQRCodeButton from "@/components/ui/CopyQRCodeButton"; // Import the new client-side component
import { GetClicksDomain } from "@/lib/actions";
import Link from "next/link";
import { Share } from 'lucide-react';

export default async function SiteAnalyticsLayout({
  params,
  children,
}: {
  params: { id: string };
  children: ReactNode;
}) {
  const session = await getSession();
  
  // Redirect if no session is found
  if (!session) {
    redirect("/login");
  }

  // Fetch site data from the database
  const data = await prisma.site.findUnique({
    where: {
      id: params.id,
    },
  });

  // Check if data exists and if the user owns the site
  if (!data || data.userId !== session.user.id) {
    notFound();
  }

  const clicks = await GetClicksDomain(data?.subdomain as string);
  const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  const qrCodeUrl = `https://go.qrexperiences.com/${data.subdomain}`;
  const displayUrl = qrCodeUrl.replace("https://", ""); // Remove 'https://'

  return (
    <>
      <div className="relative flex flex-col items-center p-6 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg shadow-md">
        <div className="absolute inset-0 bg-white opacity-80 rounded-lg"></div>
        <div className="relative flex w-full justify-between">
          <Link
            href={`https://${data.subdomain}.qrexperiences.com`}
            className="flex items-center rounded-md bg-black opacity-50 px-2 py-1 text-sm font-medium text-stone-100 transition-colors hover:bg-stone-900 bg-opacity-90 hover:bg-opacity-20"
          >
            <div className="flex items-center">
              <p>{clicks !== null ? clicks : "Loading"} Clicks</p>
            </div>
          </Link>
          <Link
            href={`https://${data.subdomain}.qrexperiences.com`}
            className="flex items-center rounded-md bg-black opacity-50 px-2 py-1 text-sm font-medium text-stone-100 transition-colors hover:bg-stone-900 bg-opacity-90 hover:bg-opacity-20"
          >
            <a target="_blank" rel="noopener noreferrer" className="flex items-center">
              <p className="inline-flex items-center">
                Landing Page <Share className="ml-1" />
              </p>
            </a>
          </Link>
        </div>

        <div className="relative z-10">
          {/* <h1 className="font-cal justify items-center text-center text-xl font-bold dark:text-white mt-2 mb-2">
            {data.name} Experience
          </h1> */}
          <div className="flex flex-col items-center space-y-2 mt-2">
            <a
              href={qrCodeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center truncate rounded-md border-stone-200 dark:border-stone-600 border-2 bg-white px-2 py-2 text-sm font-medium text-black transition-colors hover:bg-stone-200 dark:hover:bg-stone-700 w-min"
            >
              <QRCodeSVG
                value={qrCodeUrl}
                bgColor={"#FFFFFF"}
                fgColor={"#000000"}
                level={"L"}
                height={150}
                width={150}
              />
              <span className="text-[0.5rem] text-black dark:text-white">
                {displayUrl}
              </span>
            </a>
          </div>
          {/* Move the copy functionality to the client-side component */}
          <CopyQRCodeButton qrCodeUrl={qrCodeUrl} />
        </div>
      </div>

      <SiteSettingsNav />
      {children}
    </>
  );
}
