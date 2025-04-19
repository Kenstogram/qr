"use client";
import BlurImage from "@/components/blur-image";
import { placeholderBlurhash, random } from "@/lib/utils";
import { Site } from "@prisma/client";
import Link from "next/link";
import { QRCodeSVG } from 'qrcode.react';
import { ShoppingCart, PartyPopper } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { gradient } from "@/components/Gradient";
import React, { useEffect, useState } from 'react';
import { GetClicksDomain } from "@/lib/actions";

export default function SiteCard({ data }: { data: Site }) {
  const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  const [clicksData, setClicksData] = useState<number | null>(null);


  useEffect(() => {
    gradient.initGradient("#gradient-canvas");

    const fetchData = async () => {
      try {
        if (data.subdomain) {
          const clicks = await GetClicksDomain(data.subdomain);
          console.log("Clicks data:", clicks); // Log clicks data
          setClicksData(clicks);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [data.subdomain]);


  return (
    <>
      <AnimatePresence>
        <div className="bg-opacity-60 bg-white border-1 border-black hover:bg-stone-400 relative rounded-lg shadow-md transition-all hover:shadow-xl hover:border-white">
          <Link href={`/site/${data.id}/settings/analytics`} className="flex flex-col overflow-hidden rounded-lg">
            <div className="flex items-center justify-between bg-white">
              <Image
                alt={"Card Cover Image"}
                src={data.image as string}
                unoptimized={true}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="p-4">
              {/* <div className="float-right">
                <div className="p-1">
                  <div className="flex items-center rounded-lg justify-between px-1 py-1 bg-gradient-to-r from-rose-500 to-fuchsia-600">
                    <QRCodeSVG
                      value={`https://${url}`}
                      bgColor={"#ffffff"}
                      fgColor={"#000000"}
                      level={"L"}
                      height={38}
                      width={38}
                    />
                  </div>
                </div>
              </div> */}
              <h3 className="my-0 truncate font-cal text-xl font-bold tracking-wide text-black">
                {data.name}
              </h3>
              <p className="mt-2 line-clamp-1 text-sm font-normal leading-snug text-stone-800">
                {data.description}
              </p>
            </div>
          </Link>
          &nbsp;
          <div className="absolute top-2 flex w-full justify-between space-x-4 px-4">
            <Link
              href={`/site/${data.id}/analytics`}
              className="flex items-center rounded-md bg-black px-2 py-1 text-sm font-medium text-stone-100 transition-colors hover:bg-stone-900 bg-opacity-90 hover:bg-opacity-20"
            >
              <div className="flex items-center">
                <p>{clicksData !== null ? clicksData : "Loading"} Clicks</p>
              </div>
            </Link>
            {/* <Link
              href={`/site/${data.id}/analytics`}
              className="flex items-center rounded-md bg-red-600 px-2 py-1 text-sm font-medium text-stone-100 transition-colors hover:bg-red-200 bg-opacity-90 hover:bg-opacity-20"
            >
              <div className="flex items-center">
                <p>LIVE</p>
              </div>
            </Link> */}
          </div>
          {/* <div className="absolute bottom-4 flex w-full justify-between space-x-4 px-4">
            <a
              href={`https://liveshopqr.com/collections/${data.subdomain}`}
              target="_blank"
              rel="noreferrer"
              className="truncate rounded-md bg-stone-600 px-2 py-1 text-sm font-medium text-stone-100 transition-colors hover:bg-stone-200 flex items-center"
            >
              <div className="flex items-center">
                Shop
                <ShoppingCart className="ml-1" />
              </div>
            </a>
            <a
              href={`https://${url}`}
              target="_blank"
              rel="noreferrer"
              className="truncate rounded-md bg-stone-600 px-2 py-1 text-sm font-medium text-stone-100 transition-colors hover:bg-stone-200 flex items-center"
            >
              <div className="flex items-center">
                Join
                <PartyPopper className="ml-1" />
              </div>
            </a>
          </div> */}
        </div>
      </AnimatePresence>
    </>
  );
}
