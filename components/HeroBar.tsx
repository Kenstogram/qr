import React, { useState, useEffect, FC } from 'react';
import { CornerRightDown, Lock, Monitor, Clipboard, Scan, Smartphone, Shirt, Tag, Tv, QrCode, ShoppingCart } from 'lucide-react';
import NavLink from './NavLink';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Navigation } from 'swiper/modules';
import Scanner from '@components/Scanner'; // Assuming you have this component
import Codeblock from "../public/Codeblock.png";
import QRGuide from "../public/darksweats.png";
import QRLink from "../public/QR-Link.png";
import QRPay from "../public/QR-Pay.png";
import QRSubscribe from "../public/QR-Subscribe.png";
import QRWatch from "../public/QR-Watch.png";
import Iframe from "react-iframe";
import JoinEmailForm from "../app/app/(auth)/login/JoinEmailForm";

const StackedIcon: FC<{ Icon: typeof Smartphone; SmallIcon: typeof QrCode }> = ({ Icon, SmallIcon }) => (
  <div className="relative inline-block">
    <Icon className="w-16 h-16 text-gray-800" />
    <div className={`absolute inset-0 flex items-center justify-center 
      ${Icon === Tv ? 'mt-3' : 
        Icon === Smartphone ? 'mb-2' : 
        Icon === Lock ? 'mt-6' : 
        Icon === Monitor ? 'mb-3' : 
        Icon === ShoppingCart ? 'mb-0.5 ml-2' : 
        ''}`}>
      <SmallIcon className="w-5 h-5 text-black" />
    </div>
  </div>
);

interface CardProps {
  title: string;
  content: string[];
  url: string;
  Icon: typeof Smartphone;
  SmallIcon: typeof QrCode;
  image: string; // Image prop remains as PNG
}

const Card: FC<CardProps> = ({ title, content, url, Icon, SmallIcon, image }) => (
  <a href={url} className="block border border-gray-700 rounded-lg p-2 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
    <div className="flex justify-center mb-4">
      <StackedIcon Icon={Icon} SmallIcon={SmallIcon} />
    </div>
    <h2 className="text-md font-semibold mb-4 text-gray-800">{title}</h2>
    <div className="space-y-2 text-sm text-gray-600">
      {content.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
    {/* <img 
      src={image} 
      alt={title} 
      className="w-full h-auto rounded-t-lg mt-4 mb-4" 
      loading="lazy" // Lazy load image
      style={{ maxWidth: '100%', height: 'auto' }} // Ensure responsiveness
    /> */}
  </a>
);

export default function HeroBar() {
  const [highlightedButtonIndex, setHighlightedButtonIndex] = useState<number>(1);
  const [showScanner, setShowScanner] = useState<boolean>(false);

  const handleSlideChange = (index: number) => {
    setHighlightedButtonIndex(index);
  };

  useEffect(() => {
    setHighlightedButtonIndex(1);
  }, []);

  const cards = [
    {
      title: 'QR Experiences',
      content: [
        'Create QRs with Click Analytics',
        'Brand your QR Experiences',
        'Customize Styles, Colors, and Logos',
        'Download QR Experiences in HD'
      ],
      url: 'https://app.qrexperiences.com',
      Icon: Scan,
      SmallIcon: QrCode,
      image: QRLink.src
    },
    {
      title: 'Checkout',
      content: [
        'Easily Accept QR Payments',
        'Seamless Checkout QR Experiences',
        'Quick and Secure Transactions',
        'Integrated POS for Product Barcodes'
      ],
      url: '/checkout',
      Icon: ShoppingCart,
      SmallIcon: QrCode,
      image: QRPay.src
    },
    {
      title: 'Liveshop',
      content: [
        'Host Live Shopping Events',
        'Embed Checkout with QR Experiences',
        'Scan Barcodes and QR Experiences',
        'Automate POS with QR Analytics'
      ],
      url: '/liveshop',
      Icon: Tag,
      SmallIcon: QrCode,
      image: QRWatch.src
    },
    {
      title: 'Influencers',
      content: [
        'Meet and Measure Brand Ambassadors',
        'Track Referral Influencer Performance Analytics',
        'Boost Product Visibility',
        'Analyze QR Campaign Success'
      ],
      url: '/influencers',
      Icon: Clipboard,
      SmallIcon: QrCode,
      image: QRLink.src
    },
    {
      title: 'Livestream',
      content: [
        'Stream Live Events on Socials',
        'Generate QRs for Access',
        'Enhance Engagement with Content',
        'Use QR Analytics for Engagement'
      ],
      url: '/livestream',
      Icon: Tv,
      SmallIcon: QrCode,
      image: QRPay.src
    },
    // {
    //   title: 'Subscriber',
    //   content: [
    //     'Manage Subscribers and Memberships',
    //     'Generate Club QR Experiences',
    //     'Simplify Membership Payments',
    //     'Track Subscriber Analytics'
    //   ],
    //   url: '/subscriber',
    //   Icon: Lock,
    //   SmallIcon: QrCode,
    //   image: QRSubscribe.src
    // },
    {
      title: 'Custom QR Merch',
      content: [
        'Create Custom QR Sweatpants',
        'Design Unique Styles',
        'Better Understand Customer Present Relationships',
        'Grow New Markets in Comfortable Pants'
      ],
      url: '/sweatpants',
      Icon: Shirt,
      SmallIcon: QrCode,
      image: QRGuide.src
    },
    {
      title: 'QR Super Apps',
      content: [
        'Build Multi-Tenant QR Super Apps',
        'Monetize with In-App Liveshops',
        'Utilize QR Analytics for Insights',
        'Track Affiliate Marketing and Payouts'
      ],
      url: '/superapp',
      Icon: Smartphone,
      SmallIcon: QrCode,
      image: Codeblock.src
    },
    // {
    //   title: 'Tokens QR',
    //   content: [
    //     'Tokenize Cards on File',
    //     'Manage Network Tokens',
    //     'Track with QR Analytics',
    //     'Leverage Hardware Security Modules'
    //   ],
    //   url: '/tokens',
    //   Icon: Lock,
    //   SmallIcon: QrCode,
    //   image: QRGuide.src
    // },
    // {
    //   title: 'Enterprise QR',
    //   content: [
    //     'Multi-Tenant Super Apps',
    //     'Developer Resources Made Simple',
    //     'Embeddable QR Checkout UX',
    //     'Fully Customizable Livestreaming'
    //   ],
    //   url: '/enterprise',
    //   Icon: Monitor,
    //   SmallIcon: QrCode,
    //   image: Codeblock.src
    // },
  ];

  const toggleScanner = () => {
    setShowScanner(!showScanner);
  };

  return (
    <section className="top-0 z-0 w-full">
          <div className="bg-red-100 border-stone-200 border p-4 pb-20">
            <div className="flex items-center justify-center gap-x-3 font-medium text-sm">
              <div className="relative top-0 left-0 text-black font-bold text-md inline-flex">
                Create QR Experiences in Seconds
                <CornerRightDown />
              </div>
            </div>
              {/* <div className="relative w-full rounded-lg shadow-md overflow-hidden border md:rounded-lg ring-1 ring-gray-900/5 mb-2 mt-2">
                  <Iframe
                    url="https://domainqr.com"
                    width="100%"
                    height="840px"
                    id="Free QR Experiences"
                    display="block"
                    position="relative"
                  />
                </div>
                <div className="relative pt-5 top-0 left-0 text-black font-bold text-md inline-flex">
                Customizable QR Experiences
                <CornerRightDown />
              </div> */}
            <div className="flex flex-wrap pt-2 gap-x-3 items-center justify-center gap-x-3 font-medium text-sm">
              {cards.map((card, index) => (
                <a key={index} className={`text-sm p-2 mr-1 ml-1 border border-gray-700 rounded-full ${highlightedButtonIndex === index ? 'bg-black text-white' : 'bg-white text-black'} hover:text-black hover:bg-gray-50`} href={card.url} onClick={() => handleSlideChange(index)}>
                  {card.title}
                </a>
              ))}
            </div>
            <div className="pt-0 swiper-slide-transform">
              <Swiper
                navigation={true}
                modules={[Navigation, Autoplay]}
                id="Swiper"
                className="mySwiper pt-1 w-full border-6 border-black rounded-lg"
                slidesPerView={2}
                spaceBetween={0}
                loop={true}
                autoplay={{ delay: 1500, disableOnInteraction: true }}
                onSlideChange={({ realIndex }) => handleSlideChange(realIndex)}
              >
                {cards.map((card, index) => (
                  <SwiperSlide key={index} className={`${highlightedButtonIndex === index ? 'border border-yellow-500' : ''}`}>
                    <Card title={card.title} content={card.content} url={card.url} Icon={card.Icon} SmallIcon={card.SmallIcon} image={card.image} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <NavLink target="_blank" href="/waitlist" className="text-md text-gray-700 border border-gray-700 hover:bg-gray-50 text-center py-2.5 px-4 rounded-lg" scroll={false}>
                Get Started
              </NavLink>
              <NavLink target="_blank" href="/support" className="text-md text-gray-700 border border-gray-700 hover:bg-gray-50 text-center py-2.5 px-4 rounded-lg" scroll={false}>
                Learn more
              </NavLink>
            </div>
      </div>
    </section>
  );
}