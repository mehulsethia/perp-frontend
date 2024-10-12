import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import XYSwap from "../components/xySwap";

export default function Bridge() {
  return (
    <Box py={{ base: "12px", md: "24px" }}>
      <VStack>
        <XYSwap />
      </VStack>
    </Box>
  );
}
