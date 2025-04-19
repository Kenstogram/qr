import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import Image from 'next/image'; // Using Next.js Image component
import miamiqrcode from '../public/miamiqrcode.png';
import tshirt from '../public/tshirt.png';

const CTA = () => (
  <SectionWrapper className="pt-40">
    <div className="custom-screen">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-gray-800 text-3xl font-semibold sm:text-4xl" id="oss">
          QR Experiences with {""}
          <span className="bg-gradient-to-tr from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent text-3xl font-semibold sm:text-4xl">
            {"{Batteries Included}"}
          </span>
        </h2>
        <p className="mt-3 text-gray-600">
          Enjoy Better QR Experiences with AI
        </p>
        <div className="rounded-xl max-w-2xl mx-auto text-center">
          <div className="overflow-hidden">
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
            >
              <SwiperSlide>
                <div className="relative">
                  <Image
                    src={miamiqrcode}
                    alt="Miami QR code"
                    className="rounded-md border border-stone-200 w-full h-full object-contain"
                  />
                  <div className="absolute top-4 left-4 bg-black text-white text-sm font-bold px-2 py-1 rounded-lg">
                    1236 new clicks!
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="relative">
                  <Image
                    src={tshirt}
                    alt="T-shirt"
                    className="rounded-md w-full h-full object-contain"
                  />
                  <div className="absolute top-4 left-4 bg-black text-white text-sm font-bold px-2 py-1 rounded-lg">
                    1503 new clicks!
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <a
          href="https://app.qrexperiences.com"
          className="mt-4 inline-flex justify-center items-center gap-2 font-medium text-sm text-white bg-gray-800 hover:bg-gray-600 active:bg-gray-900 max-w-[200px] py-2.5 px-4 text-center rounded-lg duration-150"
        >
          <span className="text-white">Explore QR Experiences</span>
        </a>
      </div>
    </div>
  </SectionWrapper>
);

const SectionWrapper = ({ children, ...props }: any) => (
  <section {...props} className={`py-16 pb-60 ${props.className || ''}`}>
    {children}
  </section>
);

export default CTA;
