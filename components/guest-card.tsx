"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Iframe from 'react-iframe';
import { QRCodeSVG } from 'qrcode.react';
import { GetClicksDomain } from '@/lib/actions';
import { Site } from '@prisma/client';
import { ShoppingCart, PartyPopper } from "lucide-react";

export default function GuestCard({ data }: { data: Site }) {
  const [clicksData, setClicksData] = useState<number | null>(null);
  const [iframeVisible, setIframeVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (data.subdomain) {
          const clicks = await GetClicksDomain(data.subdomain);
          setClicksData(clicks);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [data.subdomain]);

  const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  const toggleIframe = (event: React.MouseEvent) => {
    event.preventDefault();
    setIframeVisible(!iframeVisible);
  };

  return (
    <div className="border-1 border-white relative rounded-lg shadow-md hover:shadow-xl">
      <Link href={`https://go.qrexperiences.com/${data.subdomain}`} rel="noreferrer" target="_blank" className="flex flex-col overflow-hidden rounded-lg">
        <div className="flex items-center justify-between bg-black">
          <Image
            alt="Card Cover Image"
            src={data.image as string}
            unoptimized={true}
            style={{ objectFit: 'contain' }}
            width={500}
            height={500}
          />
        </div>
        <div className="p-4">
          <div className="flex items-center text-black">
            <p>{data.description}</p>
          </div>
        </div>
      </Link>
      {/* <div className="absolute top-2 flex flex-wrap w-full justify-between space-x-4 px-4">
        <div className="flex items-center text-white bg-black opacity-70 rounded-md">
          <p>{clicksData !== null ? clicksData : 'Loading'} Clicks</p>
        </div>
        <div className="flex items-center text-white bg-black opacity-70 rounded-md">
          <p>{data.name}</p>
        </div>
      </div> */}
      {/* <div className="absolute bottom-4 flex w-full justify-between space-x-4 px-4">
        <button
          onClick={toggleIframe}
          className="truncate rounded-md bg-stone-600 px-2 py-1 text-sm font-medium text-stone-100 transition-colors hover:bg-stone-200 flex items-center"
        >
          <div className="flex items-center">
            Shop
            <ShoppingCart className="ml-1" />
          </div>
        </button>
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
      {iframeVisible && (
        <div className="mt-4 w-full">
          <Iframe
            url={`https://liveshopqr.com/collections/${data.subdomain}`}
            width="100%"
            height="400px"
            className="border rounded-md"
            display="initial"
            position="relative"
          />
        </div>
      )}
    </div>
  );
}
