// components/VolumeSelector.tsx
import * as React from "react";
import { SliderProps } from "@radix-ui/react-slider";
import { Slider } from "./slider/slider"; // Adjust the import path if necessary

interface VolumeSelectorProps {
  defaultValue: SliderProps["defaultValue"];
  onVolumeChange: (volume: number) => void; // Callback function to handle volume change
}

export function VolumeSelector({
  defaultValue,
  onVolumeChange,
}: VolumeSelectorProps) {
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (newValue: number[]) => {
    setValue(newValue); // Set the new value directly
    onVolumeChange(newValue[0]); // Pass the first value of the array to the callback function
  };
  

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between text-black">
        <label htmlFor="volume">Volume</label>
        <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
           {Math.round((value ?? [])[0] * 100)}%
        </span>
      </div>
      <Slider
        id="volume"
        max={1}
        defaultValue={value}
        step={0.01}
        onValueChange={handleChange}
        className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
        aria-label="Volume"
      />
    </div>
  );
}
