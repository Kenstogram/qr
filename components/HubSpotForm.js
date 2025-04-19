"use client";
import { useEffect } from 'react';

export default function HubSpotForm() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.hsforms.net/forms/v2.js';
    document.body.appendChild(script);

    script.addEventListener('load', () => {
      if (window.hbspt) {
        // Use the environment variables with NEXT_PUBLIC_ prefix
        window.hbspt.forms.create({
          portalId: process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID,  // Use the correct environment variable
          formId: process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID,      // Use the correct environment variable
          target: '#hubspot-form-wrapper'
        });
      }
    });
  }, []);

  return (
    <div id="hubspot-form-wrapper" className="hubspot-form-wrapper"></div>
  );
}
