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
  const handleSliderChange = (val: any) => {
    setSliderValue(val);
    setInputValue(val.toString());
  };

  // Handle input change
  const handleInputChange = (e: any) => {
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
      <div className="py-1 px-0.5 w-full flex justify-between mt-1 items-center rounded-xl">
        <div className="text-md font-bold">
          Leverage <br /> Slider
        </div>

        <div className="flex items-center justify-between space-x-1 bg-[#0B0B20] p-1 rounded-[10px]">
          <button className="rounded-[6px] px-2.5 py-1.5 text-xs bg-[#1B1C39] hover:bg-gray-900 hover:text-white font-bold">
            Leverage
          </button>
          <input
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="outline-none w-12 bg-transparent text-sfPro font-medium text-xs text-white text-right pr-1"
            placeholder="0"
          />
        </div>
      </div>

      <div className="m-1 md:m-0">
        <Box className="w-full p-2 my-2 bg-transparent rounded-lg  relative">
          {/* Track markers - positioned absolutely to appear behind the slider */}
          <Box className="absolute w-full h-3 top-[49px] z-10  left-0 px-4">
            {[20, 40, 60, 80].map((mark) => (
              <Box
                key={mark}
                position="absolute"
                left={`${mark}%`}
                top="50%"
                transform="translate(-45%, -45%)"
                width="12px"
                height="12px"
                borderRadius="full"
                bg="#0B0B20"
                border="3px solid"
                borderColor="#1B1C39"
                zIndex={1}
              />
            ))}
          </Box>

          {/* Numbers */}
          <Box className="flex justify-between mt-1 text-gray-400 text-sm">
            {[0, 20, 40, 60, 80, 100].map((mark) => (
              <Box key={mark}>{mark}</Box>
            ))}
          </Box>

          {/* Slider */}
          <Box position="relative" zIndex={9}>
            <Slider
              aria-label="leverage-slider"
              defaultValue={0}
              min={0}
              max={100}
              step={5}
              value={sliderValue}
              onChange={handleSliderChange}
              mt={4}
            >
              <SliderTrack bg="#0B0B20" h={3} borderRadius="full">
                <SliderFilledTrack bg="blue.500" />
              </SliderTrack>

              <SliderThumb
                boxSize={4}
                bg="blue.500"
                border="2px solid white"
                zIndex={3}
                _focus={{
                  boxShadow: "none",
                }}
              />
            </Slider>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default LeverageSlider;
