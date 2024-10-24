import React, { useState } from "react";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";

const LeverageSlider = () => {
  const [sliderValue, setSliderValue] = useState(0);
  const [inputValue, setInputValue] = useState("");

  // Handle slider change
  const handleSliderChange = (val:any) => {
    setSliderValue(val);
    setInputValue(val.toString());
  };

  // Handle input change
  const handleInputChange = (e:any) => {
    const value = e.target.value;
    
    // Allow empty input or numbers
    if (value === "" || /^\d*$/.test(value)) {
      setInputValue(value);
      
      // Only update slider if value is valid and in range
      const numValue = parseInt(value) || 0;
      if (numValue <= 100) {
        setSliderValue(numValue);
      }
    }
  };

  // Handle input blur
  const handleInputBlur = () => {
    // Ensure the final value is within range
    const numValue = parseInt(inputValue) || 0;
    const clampedValue = Math.min(Math.max(numValue, 0), 100);
    setSliderValue(clampedValue);
    setInputValue(clampedValue.toString());
  };

  return (
    <>
      <div className="p-1 w-full flex justify-between items-center rounded-xl">
        <div className="text-md font-bold">Leverage Slider</div>

        <div className="flex items-center justify-between space-x-1 bg-[#0B0B20] px-1.5 py-1.5 rounded-xl">
          <button className="px-2.5 py-2 rounded-lg bg-[#1B1C39] hover:bg-gray-900 hover:text-white font-bold">
            Leverage
          </button>
          <input
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="outline-none text-center w-12 bg-transparent"
            placeholder="0"
          />
        </div>
      </div>
      
      <div className="m-1 md:m-0">
        <Box className="w-full p-2 my-2 bg-transparent rounded-lg">
          <Box className="flex justify-between mt-1 text-gray-400 text-sm">
            {[0, 20, 40, 60, 80, 100].map((mark) => (
              <Box key={mark}>{mark}%</Box>
            ))}
          </Box>

          <Slider
            aria-label="leverage-slider"
            defaultValue={0}
            min={0}
            max={100}
            step={5}
            value={sliderValue}
            onChange={handleSliderChange}
            className="mt-4 z-10"
          >
            <SliderTrack
              bg="#0B0B20"
              h={3}
              borderRadius="full"
              position="relative"
              zIndex={1}
            >
              <SliderFilledTrack bg="blue.500" />

              {[0, 20, 40, 60, 80, 100].map((mark) => (
                <Box
                  key={mark}
                  position="absolute"
                  left={`${mark}%`}
                  transform="translateX(-50%)"
                  bottom="20px"
                  w="12px"
                  h="12px"
                  borderRadius="50%"
                  bg="#0B0B20"
                  className="border-[3px] z-50 border-[#1B1C39]"
                  zIndex={2}
                />
              ))}
            </SliderTrack>

            <SliderThumb
              boxSize={4}
              bg="blue.500"
              border="2px solid white"
              zIndex={3}
            />
          </Slider>
        </Box>
      </div>
    </>
  );
};

export default LeverageSlider;