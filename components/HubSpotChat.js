"use client";
import { useEffect } from 'react';

const HubSpotChat = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//js.hs-scripts.com/45759644.js'; // Updated protocol-relative URL
    script.async = true;

    document.body.appendChild(script);

    return () => {
      // Clean up the script tag
      document.body.removeChild(script);
    };
  }, []);

  return <div id="hubspot-chat-wrapper" className="hubspot-chat-wrapper z-70"></div>;
};

export default HubSpotChat;
