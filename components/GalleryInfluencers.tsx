"use client";
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import GuestCard from "./guest-card";
import Image from "next/image";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Iframe from 'react-iframe';
import {QRCodeSVG} from 'qrcode.react';

const GalleryInfluencers = () => {
  const [siteData, setSiteData] = useState<any[]>([]);
  const [showQR, setShowQR] = useState<number>(0);

  useEffect(() => {
    const fetchSiteData = async () => {
      const session = await getSession();
      if (!session) {
        redirect("/login");
      }
      const sites = await prisma.site.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
      setSiteData(sites);
    };

    fetchSiteData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowQR((prevShowQR) => (prevShowQR + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleQRCodeClick = () => {
    // Add any logic here if needed when QR Experience is clicked
  };

  const images = [
    '/PGATourQR.png',
    '/qrCode-usopen.png',
    '/GolfQR.png'
  ];

  return (
    <SectionWrapper className="pb-2">
      <div className="custom-screen">
        <div className="rounded-xl max-w-2xl mx-auto text-center">
          <h2 className="p-2 text-black text-3xl font-semibold sm:text-4xl" id="oss">
            Featured InfluencersQR Experience
          </h2>
          <div className="p-10 relative">
            <a
              href={`https://influencersqr.shop/collections/home`}
              target="_blank"
              rel="noreferrer"
              className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-black transition-colors hover:bg-stone-200 dark:bg-stone-300 dark:hover:bg-stone-700"
              onClick={handleQRCodeClick}
              style={{ position: 'absolute', top: 0, left: 0 }}
            >
              {/* <Image
                src={images[showQR]}
                alt="Featured Experience"
                width={150}
                height={150}
                className="rounded-lg"
              /> */}
               <QRCodeSVG
              value={`https://influencersqr.shop/collections/home`}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"L"}
            />
            </a>
            <div className="flex flex-col items-center border-10 border-black pb-2">
              <Iframe
                url={`https://influencersqr.shop/collections/home`}
                width="400"
                height="650"
                id="QRExperiences Influencers"
                display="block"
              />
            </div>
          </div>
          <div className="overflow-hidden">
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
              slidesPerView={1}
              spaceBetween={30}
              loop={false}
            >
              {siteData.map((site) => (
                <SwiperSlide key={site.id}>
                  <GuestCard data={site} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

const SectionWrapper = ({ children, ...props }: any) => (
  <section {...props} className={`py-16 pb-36 ${props.className || ''}`}>
    {children}
  </section>
);

export default GalleryInfluencers;
