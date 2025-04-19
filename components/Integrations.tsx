import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';

// Updated images with YouTube and Twitch logos
let IntegrationsImages = ['/youtube-logo.png', '/twitch-logo.png'];

export default function Integrations() {
  const [highlightedButtonIndex, setHighlightedButtonIndex] = useState<number>(0);

  const handleSlideChange = (swiper: SwiperType) => {
    setHighlightedButtonIndex(swiper.activeIndex);
  };

  return (
    <div className="bg-white pt-36 pb-96">
      <section className="z-0 w-full pb-36 bg-black">
        <div className="custom-screen pt-28 text-gray-600">
          <div className="space-y-5 max-w-4xl mx-auto text-center">
            <div className="bg-white bg-opacity-50 rounded-2xl backdrop-blur p-4">
              <h2 className="text-2xl text-white font-extrabold mx-auto sm:text-2xl">Choose your Platforms</h2>
              <div className="swiper-slide-transform">
                <Swiper
                  navigation={true}
                  modules={[Navigation]}
                  id="Swiper"
                  className="mySwiper pt-4 w-full"
                  slidesPerView={2}
                  spaceBetween={0}
                  loop={true}
                  autoplay={{ delay: 1000, disableOnInteraction: true }}
                  onSlideChange={handleSlideChange}
                >
                  {IntegrationsImages.map((image, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="flex justify-center items-center h-full">
                        <Image
                          alt="image"
                          src={image}
                          width={150}
                          height={150}
                          className="rounded-lg"
                          style={{
                            objectFit: 'contain',
                          }}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
