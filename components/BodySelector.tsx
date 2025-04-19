"use client";

import { useState } from 'react';
import Body from '@/components/Body';
import BodyImage from '@/components/BodyImage';
import BodyTok from '@/components/BodyTok';

export default function BodySelector() {
  // Manage the selected option for the radio buttons
  const [selectedOption, setSelectedOption] = useState<'qr' | 'sana' | 'tok'>('tok');

  // Handle the change of selected radio button
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value as 'qr' | 'sana');
  };

  return (
    <div className="flex justify-center items-center flex-col space-y-1 p-2">
      <h2 className="text-xl font-bold mb-2">Create Experience</h2>
      <div className="flex items-center gap-2">
        <label className="flex items-center text-sm font-bold"> 
          <input
            type="radio"
            name="experienceType"
            value="tok"
            checked={selectedOption === 'tok'}
            onChange={handleOptionChange}
            className="mr-2 text-sm font-bold"
          />
          Image
        </label>
        <label className="flex items-center text-sm font-bold">
          <input
            type="radio"
            name="experienceType"
            value="qr"
            checked={selectedOption === 'qr'}
            onChange={handleOptionChange}
            className="mr-2 text-sm font-bold"
          />
          QR
        </label>
        {/* <label className="flex items-center text-sm font-bold">
          <input
            type="radio"
            name="experienceType"
            value="sana"
            checked={selectedOption === 'sana'}
            onChange={handleOptionChange}
            className="mr-2 text-sm font-bold"
          />
          Logo
        </label>*/}
      </div>

      {/* Conditionally Render the Body or BodyImage based on the selected option */}
      { selectedOption === 'qr' ? (
        <Body />
      ) : selectedOption === 'tok' ? (
        <BodyTok />
      ): (
        <BodyImage />
      )}
    </div>
  );
}
