import {
  Box,
  HStack,
  Icon,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import Logo from "../assets/icons/logos/logo_white.svg";

export default function Footer() {
  const location = useLocation();
  const bg = useColorModeValue("white", "#1B1C39");
  const color = useColorModeValue("black", "white");
  const borderColor = useColorModeValue("blackAlpha.300", "whiteAlpha.300");
  const lightColor = useColorModeValue(
    "blackAlpha.600",
    "rgba(255, 255, 255, 0.6)"
  );
  const lightIconColor = useColorModeValue(
    "blackAlpha.600",
    "rgba(156, 163, 175, 1)"
  );

  return (
    <Box as="footer" bgColor={bg} py="1.5rem" px="2rem">
      <VStack w="100%" spacing="1rem">
        <HStack w="100%" justifyContent="space-between" align="center">
          <HStack spacing="0.5rem">
            <Link to="/">
              <HStack gap="0.4rem" align="center">
                <Image alt="Mantis" src={Logo} w="1.75rem" />
                <Text color={color} fontSize="1rem" fontWeight="700">
                  Mantis
                </Text>
              </HStack>
            </Link>
            <Text color={lightColor} fontSize="1rem">
              © 2024 Mantissa Labs — All rights reserved
            </Text>
          </HStack>
          <HStack spacing="1rem">
            <Link to="https://x.com/MantisSwap" target="_blank">
              <Icon
                as={FaTwitter}
                fontSize="2xl"
                color={lightIconColor}
                _hover={{ color: color }}
              />
            </Link>
            <Link to="https://discord.com/invite/pghwwJXCTN" target="_blank">
              <Icon
                as={FaDiscord}
                fontSize="2xl"
                color={lightIconColor}
                _hover={{ color: color }}
              />
            </Link>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
}
