"use client";

import { useEffect, useRef } from "react";
import { QRCodeSVG } from 'qrcode.react';

const SwirlyQRCode = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");

      const animate = () => {
        if (ctx) {
          const scale = Math.sin(Date.now() / 500) * 0.1 + 1; // Scaling effect
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          ctx.save();
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.scale(scale, scale);
          ctx.translate(-canvas.width / 2, -canvas.height / 2);

          // Create QR Experience as an image
          const qrCodeElement = document.createElement('div');
          qrCodeElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            ${QRCodeSVG({ value: "https://qrexperiences.com", size: 200, bgColor: "transparent", level: "L" }).props.children}
          </svg>`;

          const qrCodeCanvas = document.createElement('canvas');
          qrCodeCanvas.width = 200;
          qrCodeCanvas.height = 200;
          const qrCodeCtx = qrCodeCanvas.getContext('2d');

          if (qrCodeCtx) {
            const img = new Image();
            img.src = 'data:image/svg+xml;base64,' + btoa(qrCodeElement.innerHTML);
            img.onload = () => {
              qrCodeCtx.drawImage(img, 0, 0);
              ctx.drawImage(qrCodeCanvas, canvas.width / 2 - 100, canvas.height / 2 - 100);
              ctx.restore();
            };
          }
          ctx.restore();
        }

        requestAnimationFrame(animate);
      };

      animate(); // Start animation
    }
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
  );
};

export default SwirlyQRCode;
