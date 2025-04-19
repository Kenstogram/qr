import React from 'react';
import SwagCard from "@/components/SwagCard";

const Swag = () => (
  <SectionWrapper className="pt-40">
    <div className="custom-screen">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-gray-800 text-3xl font-semibold sm:text-4xl" id="oss">
          QR Experiences for {""}
          <span className="bg-gradient-to-tr from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent text-3xl font-semibold sm:text-4xl">
            {"Everyday"}
          </span>
        </h2>
        <p className="mt-3 text-gray-600">
          Show off QRs in Style.
        </p>
        <div className="rounded-xl max-w-2xl mx-auto text-center">
        <div className="overflow-hidden">
        <SwagCard/>
        </div>
      </div> 
        {/* <a
          href="https://app.qrexperiences.com"
          className="mt-4 inline-flex justify-center items-center gap-2 font-medium text-sm text-white bg-gray-800 hover:bg-gray-600 active:bg-gray-900 max-w-[200px] py-2.5 px-4 text-center rounded-lg duration-150"
        >
          <span className="text-white">Explore QR Experiences</span>
        </a> */}
      </div>
    </div>
  </SectionWrapper>
);

const SectionWrapper = ({ children, ...props }: any) => (
  <section {...props} className={`py-16 pb-60 ${props.className || ''}`}>
    {children}
  </section>
);

export default Swag;
