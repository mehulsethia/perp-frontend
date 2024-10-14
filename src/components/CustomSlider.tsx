import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import { useState } from "react";

export default function CustomSlider() {
  const [sliderValue, setSliderValue] = useState(0);

  return (
    <Box className="w-full max-w-md mx-auto p-1 bg-transparent rounded-lg">
      {/* Slider Marks */}
      <Box className="flex justify-between mt-1 text-gray-400 text-sm">
        <Box>0%</Box>
        <Box>20%</Box>
        <Box>40%</Box>
        <Box>60%</Box>
        <Box>80%</Box>
        <Box>100%</Box>
      </Box>

      <Slider
        aria-label="slider-ex"
        defaultValue={0}
        min={0}
        max={100}
        step={5}
        value={sliderValue}
        onChange={(val) => setSliderValue(val)}
        className="mt-4 z-10"
      >
        <SliderTrack
          bg={"#0B0B20"}
          h={3}
          borderRadius="full"
          position="relative"
          zIndex={1} // Ensuring track is behind
        >
          <SliderFilledTrack bg="blue.500" />

          {/* Circles properly aligned above the track */}
          {[0, 20, 40, 60, 80, 100].map((mark) => (
            <Box
              key={mark}
              position="absolute"
              left={`${mark}%`}
              transform="translateX(-50%)"
              bottom="20px" // Position circles above the track
              w="12px"
              h="12px"
              borderRadius="50%"
              bg="#0B0B20"
              className="border-[3px] z-50 border-[#1B1C39] "
              zIndex={2} // Higher zIndex to ensure they are on top
            />
          ))}
        </SliderTrack>

        <SliderThumb
          boxSize={4}
          bg="blue.500"
          border="2px solid white"
          zIndex={3} // Ensure thumb is on top
        />
      </Slider>
    </Box>
  );
}
