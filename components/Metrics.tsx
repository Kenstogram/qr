import React from 'react';
import Image from "next/image";

const Metrics = () => (
  <SectionWrapper className="pt-40 bg-black text-white">
    <div className="custom-screen">
      <div className="max-w-2xl mx-auto text-center mt-8">
        <div className="rounded-xl relative">
          {/* Title before the video */}
          <h2 className="text-3xl font-bold mb-8">
            Empower Interactive QR Experiences with our AI Powered No-Code QR Page Builder
          </h2>
          <p className="text-md mb-8">
            Learn how QR Experiences is transforming how businesses engage with their audience across social media platforms and mediums.
          </p>

          {/* Image Layering */}
          <div className="rounded-xl max-w-2xl mx-auto text-center mt-8 relative">
            <div className="overflow-hidden relative">
              {/* Main Image */}
              <Image
                src="/Social.png"  // Correct path for images in the public directory
                alt="socials"
                className="rounded-md w-full h-auto mb-8"
              />

                {/* Third Image on top of the first one */}
                <Image
                src="/billboard2.png"  // Correct path for images in the public directory
                alt="billboard"
                className="absolute top-5 right-5 transform rotate-6 w-60 h-40 border border-stone-200 rounded-lg"  // Added border and stone color
              />
                            {/* Second Image on top of the first one */}
                            <Image
                src="/tshirt.png"  // Correct path for images in the public directory
                alt="Sweats"
                className="absolute top-5 right-40 transform rotate-12 w-40 h-30 border border-stone-200 rounded-lg"  // Added border and stone color
              />
                                          {/* Second Image on top of the first one */}
                                          <Image
                src="/miamiqrcode.png"  // Correct path for images in the public directory
                alt="qr"
                className="absolute top-10 right-60 w-24 h-24 border border-stone-200 rounded-lg"  // Added border and stone color
              />

            </div>
          </div>
        </div>

        {/* Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="metric-item text-center">
            <h3 className="text-5xl font-extrabold text-pink-500">5x</h3>
            <p className="text-lg">More Channels: Reach your customers across multiple touchpoints.</p>
          </div>
          <div className="metric-item text-center">
            <h3 className="text-5xl font-extrabold rotate-6 text-purple-500">3x</h3>
            <p className="text-lg">More User Experiences: Increase conversion rates with streamlined in-person customer interactions with the global reach of digital user experiences.</p>
          </div>
          <div className="metric-item text-center">
            <h3 className="text-5xl font-extrabold text-lime-500">Global Reach</h3>
            <p className="text-lg">Opportunities: Unlock new ways to engage your customers with interactive QR experiences.</p>
          </div>
        </div>

        {/* CTA Button */}
        <a
          href="https://app.qrexperiences.com"
          className="mt-4 inline-flex justify-center items-center gap-2 font-medium text-sm text-black bg-white hover:bg-gray-200 active:bg-gray-300 max-w-[200px] py-2.5 px-4 text-center rounded-lg duration-150"
        >
          <span className="text-black">Explore QR Experiences</span>
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

export default Metrics;
