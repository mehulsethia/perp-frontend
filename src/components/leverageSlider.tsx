import { Box, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Tooltip } from "@chakra-ui/react";
import { useState } from "react";

interface ILeverageSlider {
  multiplier: number;
  setMultiplier: any;
}

const labelStyles = {
  mt: "2",
  ml: "-2.5",
  fontSize: "sm",
};

const sliderMarks = [1, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50];

export default function LeverageSlider({ multiplier, setMultiplier }: ILeverageSlider) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  return (
    <Box px={2} mb={8}>
      <Slider
        defaultValue={10}
        min={1.1}
        max={50}
        step={0.1}
        aria-label="slider-ex-6"
        onChange={(val) => setMultiplier(val)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {sliderMarks.map((mark, index) => (
          <SliderMark key={index} value={mark} {...labelStyles}>
            {mark == 1 || mark == 50 ? <span>{mark}x</span> : "|"}
          </SliderMark>
        ))}
        <SliderTrack bg={"#434a7d"}>
          <SliderFilledTrack bg={"#4061da"} />
        </SliderTrack>
        <Tooltip hasArrow bg="#4061da" color="white" placement="top" isOpen={showTooltip} label={`${multiplier}x`}>
          <SliderThumb />
        </Tooltip>
      </Slider>
    </Box>
  );
}
