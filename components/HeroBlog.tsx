import React, { useState, useEffect, FC } from 'react';
import { CornerRightDown } from 'lucide-react';
import NavLink from './NavLink';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Navigation } from 'swiper/modules';
// Import images
import Can from "../public/cans3.png";
import Car from "../public/car.png";
import Dude from "../public/dude.png";
//import Sweatpants from "../public/sweatpants.png";
import Grocery from "../public/grocery3.png";
import Garage from "../public/garage3.png";
import Bus from  "../public/bus.webp";
import Billboard from  "../public/billboard.png";
import Bills from  "../public/bills.png";
import Billboard4 from  "../public/billboard4.png";
import Donate from  "../public/donate4.png";

//import Miami from "../public/miamiqrcode.png";

const HeroBlog: FC = () => {
  const [highlightedButtonIndex, setHighlightedButtonIndex] = useState<number>(1);

  const handleSlideChange = (index: number) => {
    setHighlightedButtonIndex(index);
  };

  const cards = [
    {
      image: Dude.src
    },
    {
      image: Donate.src
    },
    {
      image: Billboard.src
    },
    {
      image: Bus.src
    },
    {
      image: Garage.src
    },
    {
      image: Car.src
    },
    {
      image: Bills.src
    },
    {
      image: Can.src
    },
    {
      image: Billboard4.src
    },
    {
      image: Grocery.src
    }
  ];

  return (
    <section className="top-0 z-0 w-full">
      <div className="bg-red-100 border-stone-200 border p-4 pb-10">
        <div className="flex items-center justify-center gap-x-3 font-medium text-sm">
          <div className="relative top-0 left-0 text-black font-bold text-md inline-flex">
            Create QR Experiences in Seconds
            <CornerRightDown />
          </div>
        </div>
        
        {/* Swiper for image autoplay */}
        <div className="pt-0 swiper-slide-transform">
          <Swiper
            navigation={true}
            modules={[Navigation, Autoplay]}
            id="Swiper"
            className="mySwiper pt-1 w-full border-6 border-black rounded-lg"
            slidesPerView={3}
            spaceBetween={1}
            loop={true}
            autoplay={{ delay: 0, disableOnInteraction: true }} // Slow down autoplay (3000ms delay)
            speed={1500} // Set the transition speed to 500ms for smooth transitions
            onSlideChange={({ realIndex }) => handleSlideChange(realIndex)}
          >
            {cards.map((card, index) => (
              <SwiperSlide key={index} className="relative">
                <div className="w-full h-full flex justify-center items-center">
                  <img 
                    src={card.image} 
                    alt={`QR Image ${index}`} 
                    className="rounded-sm transform transition-transform duration-500 ease-in-out"
                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }} // Smaller image (60% width)
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Additional content, like links */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <NavLink target="_blank" href="https://app.qrexperiences.com" className="text-md text-gray-700 border border-gray-700 bg-white hover:bg-gray-50 text-center py-2.5 px-4 rounded-lg" scroll={false}>
            Get Started
          </NavLink>
          <NavLink target="_blank" href="/waitlist" className="text-md text-gray-700 border border-gray-700 bg-white hover:bg-gray-50 text-center py-2.5 px-4 rounded-lg" scroll={false}>
            Get Demo
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default HeroBlog;
