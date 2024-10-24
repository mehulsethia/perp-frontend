import { Box, HStack, Icon, Image, Spacer, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import Logo from "../assets/icons/logos/logo_white.svg";

export default function Footer() {
  const location = useLocation();
  const bg = useColorModeValue("white", "#1B1C39");
  const color = useColorModeValue("black", "white");
  const borderColor = useColorModeValue("blackAlpha.300", "whiteAlpha.300");
  const lightColor = useColorModeValue("blackAlpha.600", "rgba(255, 255, 255, 0.6)");
  const lightIconColor = useColorModeValue("blackAlpha.600", "rgba(156, 163, 175, 1)");

  return (
    <HStack as={"footer"} bgColor={bg} p={"1.25rem"}>
      <VStack gap={"0.625rem"} w="100%">
        <HStack w="100%" justifyContent={"space-between"}>
          <Link to={"/"}>
            <HStack gap={"0.4rem"}>
              <Image alt="Mantis" src={Logo} w={"1.75rem"} />
              <Text color={color} fontSize={"1rem"} fontWeight="700">
                Mantis
              </Text>
            </HStack>
          </Link>
          <HStack>
            <Link to="https://x.com/MantisSwap" target="_blank">
              <Icon as={FaTwitter} fontSize={"2xl"} color={lightIconColor} _hover={{ color: color }} />
            </Link>
            <Link to="https://discord.com/invite/pghwwJXCTN" target="_blank">
              <Icon as={FaDiscord} fontSize={"2xl"} color={lightIconColor} _hover={{ color: color }} />
            </Link>
          </HStack>
        </HStack>
        <HStack w="100%" justifyContent={"space-between"} flexWrap={"wrap"}>
          <Text color={lightColor} fontSize={"1rem"}>
            © 2024 Mantissa Labs — All rights reserved
          </Text>
          {/* <HStack>
            <Text color={lightColor} fontSize={"1rem"}>
              Terms of Service
            </Text>
            <Text color={lightColor} fontSize={"1rem"}>
              |
            </Text>
            <Text color={lightColor} fontSize={"1rem"}>
              Privacy Policy
            </Text>
          </HStack> */}
        </HStack>
      </VStack>
    </HStack>
  );
}
