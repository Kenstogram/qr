"use client";

import { useEffect, useRef } from "react";

const GradientCircle = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const radius = 50; // Adjust the radius for your desired circle size

      const drawGradient = () => {
        const width = canvas.width;
        const height = canvas.height;

        if (ctx) {
          const gradient = ctx.createRadialGradient(
            width / 2,
            height / 2,
            0,
            width / 2,
            height / 2,
            radius
          );
          gradient.addColorStop(0, "rgba(255, 0, 0, 1)"); // Red
          gradient.addColorStop(1, "rgba(0, 0, 255, 1)"); // Blue

          ctx.clearRect(0, 0, width, height);
          ctx.beginPath();
          ctx.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      };

      const animate = () => {
        if (ctx) {
          const time = Date.now() * 0.001;
          ctx.save();
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate(time);
          ctx.translate(-canvas.width / 2, -canvas.height / 2);
          drawGradient();
          ctx.restore();
        }
        requestAnimationFrame(animate);
      };

      drawGradient(); // Initial draw
      animate(); // Start animation
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={100} // Set to desired width for the circle
      height={100} // Set to desired height for the circle
      className="fixed top-10 left-10 w-24 h-24" // Set size in CSS
    />
  );
};

export default GradientCircle;
