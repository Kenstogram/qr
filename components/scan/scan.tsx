"use client";
import { useState } from "react";
import { useZxing } from "react-zxing";
import Iframe from 'react-iframe';
import Navbar from '@/components/Navbar';
import { secureHeapUsed } from "crypto";

const Scan = () => {
  const [result, setResult] = useState("");
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
    },
  });

  return (
    <>
        <section>
            <div className="items-center px-4 container w-full flex flex-1 flex-col pt-6 pb-8 md:py-10">
      {/* Navbar Section */}
      {/* <Navbar /> */}
      <div id="livestream-scanner" className="mx-auto flex w-full flex-col items-center gap-6">
      <a
        href="/"
        className="bg-black hover:bg-slate-700 text-white font-bold py-2 px-4 rounded bottom-5 left-5 absolute z-50"
      >
        <button>Close Scanner</button>
      </a>
      <div className="flex items-center justify-between mx-auto">
        <video ref={ref} className="items-center z-80" />
      </div>
      {result && (
          <p>
            <a
              href={'https://google.com/search?q=' + result}
              target="_blank"
              rel="noreferrer"
              className="break-words max-w-48 w-48 rounded-md bg-yellow-300 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-yellow-200 dark:bg-yellow-800 dark:text-stone-400 dark:hover:bg-yellow-700"
            >
              Search: {result} ↗
            </a>
          </p>
        )}
      {/* {result.includes("livestreamqr") && (
        <Iframe 
          url={result}
          id="QRResult"
          className="absolute left-0 right-0 w-full h-full"
        />
      )}
      {result.includes("qrexperiences") && (
        <Iframe 
          url={result}
          id="QRResult"
          className="absolute left-0 right-0 w-full h-full"
        />
      )}
            {result.includes("kennyqr") && (
        <Iframe 
          url={result}
          id="QRResult"
          className="absolute left-0 right-0 w-full h-full"
        />
      )} */}
      </div>
      </div>
      </section>
    </>
  );
};

export default Scan;
