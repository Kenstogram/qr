"use client";

import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Site } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { gradient } from "@/components/Gradient";
import { useEffect } from 'react';
// import { ArrowLeft } from "lucide-react";
import { VolumeSelector } from './VolumeSelector'; 

export default function LivestreamRoom({ data }: { data: Site }) {
      const livestreamUrl = `${data.livestreamVideoUrl}`;
      const [isPlayerVisible, setPlayerVisible] = useState(true);
      const [volume, setVolume] = useState(0.5); // State for controlling volume
      // Updated gradient colors to fixed rainbow colors
      const gradient1 = '#FF0000'; // Red
      const gradient2 = '#FFA500'; // Orange
      const gradient3 = '#FFFF00'; // Yellow
      const gradient4 = '#008000'; // Green
      
      const handleButtonClick = () => {
            // Toggle the visibility of the player
            setPlayerVisible(!isPlayerVisible);
      };


      const handleVolumeChange = (newVolume: number) => {
            setVolume(newVolume); // Update the volume state
      };
  
      // Initialize the gradient canvas
      useEffect(() => {
            gradient.initGradient("#gradient-canvas");
          }, [gradient1, gradient2, gradient3, gradient4]);

      return (
            <>
            <AnimatePresence>
    <div>
      <div className="h-screen bg-[#F1F2F4] bg-opacity-20 relative overflow-hidden z-0">
        <motion.div className="z-0 relative w-full h-full">
          <motion.canvas
            id="gradient-canvas"
            data-transition-in
            className="bg-transparent z-0 shadow-lg h-full w-full"
          ></motion.canvas>
        </motion.div>
      </div>
                  <div className="player-wrapper" hidden={!livestreamUrl}>
                        {/* Adjust the React Player style using globals.css */}
                        {isPlayerVisible && (
                              <ReactPlayer
                                    className='react-player z-0 absolute top-0 right-0 mr-1 border-black dark:border-white rounded-lg'
                                    controls={true}
                                    playing={true}
                                    volume={volume} // Set the volume prop
                                    url={livestreamUrl}
                                    width='100%'
                                    height='100%'
                              />
                        )}
                        <button className="absolute top-10 right-2 z-30 rounded-full px-1 py-0.5 bg-white text-black" onClick={handleButtonClick}>x</button>
                  </div>
                        {/* <div className="fixed bottom-36 right-20 z-30">
                        {isPlayerVisible && (
                              <VolumeSelector defaultValue={[volume]} onVolumeChange={handleVolumeChange} />
                              )}
                        </div> */}
                  </div>
    </AnimatePresence>
            </>
      );
};
