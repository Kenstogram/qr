'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import NavLink from './NavLink';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import Scan from '@components/scan/scan';
import { Popover, Transition } from '@headlessui/react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [state, setState] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const openScanner = () => {
    setShowScanner(true);
  };

  const navigation = [
    {
      title: 'Products',
      icon: <ChevronDown className="ml-1 inline-block h-4 w-4" />,
      arrow: <ArrowRight className="ml-1 inline-block h-4 w-4" />,
      items: [
        { title: 'QR Analytics', path: 'https://app.qrexperiences.com/', descriptor: 'QR Experiences Platform' },
        { title: 'Free AI Article Generator', path: 'https://app.qrexperiences.com/', descriptor: 'Text to Article Generator' },
        { title: 'Text to QR Generator', path: 'https://app.qrexperiences.com/', descriptor: 'Text to QR Experiences' },
        { title: 'Text to Image Generator', path: 'https://app.qrexperiences.com/', descriptor: 'Text to Image Experiences' },
        { title: 'No Code QR Landing Pages', path: 'https://app.qrexperiences.com/', descriptor: 'QR Landing Pages' },
        { title: 'QR Checkouts', path: 'https://qrexperiences.com/checkout', descriptor: 'QR Checkout Platform' },
        //{ title: 'Influencer Referrals', path: 'https://qrexperiences.com/influencers', descriptor: 'Connect with Influencers' },
        //{ title: 'Liveshop', path: 'https://qrexperiences.com/liveshop', descriptor: 'Live Shopping Experience' },
        //{ title: 'Livestreams', path: 'https://qrexperiences.com/livestream', descriptor: 'Live Streaming Integration' },
        //{ title: 'SubscriberQR', path: 'https://qrexperiences.com/subscriber', descriptor: 'Engage with Subscribers' },
        // { title: 'QR Merch', path: 'https://qrexperiences.com/sweatpants', descriptor: 'Wear and Share QRs' },
        //{ title: 'TokensQR', path: 'https://qrexperiences.com/tokens', descriptor: 'Token-based Payments' },
      ],
    },
    // {
    //   title: 'Solutions',
    //   icon: <ChevronDown className="ml-1 inline-block h-4 w-4" />,
    //   arrow: <ArrowRight className="ml-1 inline-block h-4 w-4" />,
    //   items: [
    //     { title: 'Experiences', path: 'https://app.qrexperiences.com', descriptor: 'QR Experiences' },
    //     { title: 'Creators', path: 'https://qrexperiences.com/creators', descriptor: 'Solutions for Creators' },
    //     { title: 'Pants', path: 'https://qrexperiences.com/sweatpants', descriptor: 'Merch and QR Gear' },
    //     { title: 'Platforms', path: 'https://qrexperiences.com/platforms', descriptor: 'Platform Experiences' },
    //     //{ title: 'Restaurants', path: 'https://qrexperiences.com/restaurants', descriptor: 'Online Ordering Solutions' },
    //     //{ title: 'Events', path: 'https://qrexperiences.com/events', descriptor: 'Event Ticketing Platforms' },
    //     //{ title: 'Real Estate', path: 'https://qrexperiences.com/realestate', descriptor: 'Real Estate Experiences' },
    //     // { title: 'Healthcare', path: 'https://qrexperiences.com/healthcare', descriptor: 'Healthcare Solutions' },
    //     //{ title: 'Industrial', path: 'https://qrexperiences.com/industrial', descriptor: 'Industrial and Manufacturing' },
    //     { title: 'Training', path: 'https://qrexperiences.com/training', descriptor: 'Training Solutions' },
    //     // { title: 'Travel', path: 'https://qrexperiences.com/travel', descriptor: 'Travel Industry Solutions' },
    //     // { title: 'Transportation', path: 'https://qrexperiences.com/transportation', descriptor: 'Transportation Services' },
    //     // { title: 'Nonprofits', path: 'https://qrexperiences.com/nonprofits', descriptor: 'Supporting Nonprofits' },
    //     //{ title: 'Small Business', path: 'https://qrexperiences.com/smb', descriptor: 'Small Business Solutions' },
    //     { title: 'Enterprise', path: 'https://qrexperiences.com/enterprise', descriptor: 'Enterprise Solutions' },
    //   ],
    // },
    {
      title: 'Resources',
      icon: <ChevronDown className="ml-1 inline-block h-4 w-4" />,
      arrow: <ArrowRight className="ml-1 inline-block h-4 w-4" />,
      items: [
        { title: 'Documentation', path: 'https://qrexperiences.com/documentation', descriptor: 'Comprehensive Guides Available' },
        //{ title: 'API Reference', path: 'https://livestreamapi.vercel.app/', descriptor: 'Detailed API Documentation' },
        // { title: 'Guides', path: 'https://qrexperiences.com/waitlist', descriptor: 'Helpful How-To Guides' },
        { title: 'FAQ', path: 'https://qrexperiences.com/faq', descriptor: 'Frequently Asked Questions' },
        { title: 'Blog', path: 'https://qrexperiences.com/blog', descriptor: 'Insightful Blog Posts' },
        // { title: 'Case Studies', path: 'https://qrexperiences.com/waitlist', descriptor: 'Real-world Case Studies' },
        // { title: 'Webinars', path: 'https://qrexperiences.com/waitlist', descriptor: 'Interactive Webinars' },
        { title: 'Support', path: 'https://qrexperiences.com/support', descriptor: '24/7 Customer Support' },
      ],
    },
    {
      title: 'Company',
      icon: <ChevronDown className="ml-1 inline-block h-4 w-4" />,
      path: 'https://qrexperiences.com/company',
    },
    {
      title: 'Pricing',
      path: 'https://qrexperiences.com/pricing',
    },
    {
      title: 'Support',
      path: 'https://qrexperiences.com/waitlist',
    },
  ];

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleState = () => {
      document.body.classList.remove('overflow-hidden');
      setState(false);
    };

    handleState();
  }, [pathname, searchParams]);

  const handleNavMenu = () => {
    setState(!state);
    document.body.classList.toggle('overflow-hidden');
  };

  return (
    <header className="absolute top-0 w-full z-50">
      <nav className={`w-full z-50 md:text-sm text-black ${state ? 'fixed z-50 h-full' : ''}`}>
        <div className="custom-screen items-center mx-auto md:flex">
          <div className="flex z-50 items-center justify-between py-3 md:py-5 md:block">
            <Link href="https://qrexperiences.com" className="z-50 flex items-center gap-3">
              <div className="flex items-center gap-1 text-black">
                <Image src="/darkrainbowqr.svg" alt="logo" width={36} height={36} className="transform rotate-45 mr-2" />
                <span className="font-urban text-xl text-black">
                    QR <span className="font-bold font-urban text-xl text-black">Experiences</span>
                 </span>
              </div>
            </Link>
            <div className="md:hidden">
              <button
                role="button"
                aria-label="Open the menu"
                className="z-70 text-black hover:text-gray-800"
                onClick={handleNavMenu}
              >
                {state ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="z-70h-6 w-6" viewBox="0 0 20 20" fill="black">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 011.414 1.414L11.414 10l4.293 4.293a1 1 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 01-1.414-1.414L8.586 10 4.293 5.707a1 1 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className={`flex-1 pb-3 mt-8 md:pb-0 md:mt-0 md:block ${state ? '' : 'hidden'}`}>
            <ul className="z-50 w-3/4 absolute top-2 right-10 p-4 rounded-2xl backdrop-blur bg-white bg-opacity-90 text-black font-bold justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0 md:font-medium">
              {navigation.map((item, idx) => {
                if (item.items) {
                  return (
                    <Popover key={idx} className="relative">
                      {({ open }) => (
                        <>
                          <Popover.Button className="text-black text-sm hover:text-gray-900 flex items-center">
                            <div>{item.title}</div>
                            {item.icon}
                          </Popover.Button>
                          <Transition
                            show={open}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                          >
                            <Popover.Panel className="absolute z-10 w-48 mt-3 border border-gray-800 transform -translate-x-1/2 left-1/2 bg-white shadow-lg rounded-md">
                              <div className="p-4">
                                {item.items.map((subItem, subIdx) => (
                                  <Link
                                    key={subIdx}
                                    href={subItem.path}
                                    className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
                                  >
                                    <div>
                                      {subItem.title}
                                      {item.arrow}
                                      <div className="text-xs text-gray-500">{subItem.descriptor}</div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  );
                } else {
                  return (
                    <li key={idx} className="z-50 duration-150 text-sm hover:text-gray-900">
                      <Link href={item.path} className="block">
                        {item.title}
                      </Link>
                    </li>
                  );
                }
              })}
              <li>
                <NavLink
                  href="https://app.qrexperiences.com"
                  className="block font-medium text-sm text-black bg-white border border-gray-800 hover:bg-gray-300 active:bg-black md:inline"
                >
                  Sign In
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="https://app.qrexperiences.com"
                  className="block font-medium text-sm text-white bg-black border border-gray hover:bg-gray-600 active:bg-grey-900 md:inline"
                >
                  Sign Up
                </NavLink> 
              </li>
              {/* <li>
                <NavLink
                  href="https://qrexperiences.com/waitlist"
                  className="block font-medium text-sm text-white bg-black hover:bg-gray-600 active:bg-grey-800 md:inline"
                >
                  Get in Touch
                </NavLink>
                <button
                  type="button"
                  onClick={openScanner}
                  className="block font-medium text-sm text-white bg-black hover:bg-gray-600 active:bg-grey-900 md:inline"
                  >
                  Scan
                </button>
              </li>*/}
            </ul>
          </div>
        </div>
        {showScanner && <Scan />}
      </nav>
    </header>
  );
};

export default Navbar;
