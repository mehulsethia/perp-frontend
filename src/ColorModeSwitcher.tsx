import * as React from "react";
import { useColorMode, useColorModeValue, IconButton, IconButtonProps, Image } from "@chakra-ui/react";
import { FaSun } from "react-icons/fa";
import DarkModeIcon from "./assets/icons/Dark_Mode.svg";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

const DarkModeImage = () => <Image alt="Dark Mode" src={DarkModeIcon} />;

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaSun, DarkModeImage);
  const color = useColorModeValue("black", "white");

  return (
    <IconButton
      size="md"
      fontSize="lg"
      variant="ghost"
      color={color}
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  );
};
