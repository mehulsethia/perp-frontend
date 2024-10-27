import { InfoIcon } from "@chakra-ui/icons";
import {
  Divider,
  HStack,
  Image,
  Spacer,
  Text,
  Tooltip,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import ArrowSwapIcon from "../../assets/icons/Arrow_Swap.svg";
const Slippage = () => {
  const color = useColorModeValue("blackAlpha.900", "white");
  const lightColor = useColorModeValue(
    "blackAlpha.600",
    "rgba(255, 255, 255, 0.6)"
  );

  const swapArrowIcon = useColorModeValue(ArrowSwapIcon, ArrowSwapIcon);

  return (
    <>
      <VStack gap={"0.625rem"} className="p-1">
        <HStack w={"100%"}>
          <Text className="font-semibold" color={color}>
            Estimated Execution Time
          </Text>

          <Spacer />
          <Text className="font-semibold" color={color}>
            263,263,263$
          </Text>
        </HStack>
        <HStack w={"100%"}>
          <Text className="font-semibold" color={color}>
            Estimated LIQ Price
          </Text>

          <Spacer />
          <Text className="font-semibold" color={color}>
            263,263,263$
          </Text>
        </HStack>
        <HStack w={"100%"}>
          <Text className="font-semibold" color={color}>
            Leverage (est):
          </Text>
          <Tooltip label="Amount that will be paid as fees" fontSize="xs">
            <InfoIcon w={3} h={3} color={color} />
          </Tooltip>
          <Spacer />
          {/* <Text
                    fontSize={"1rem"}
                    color={lightGreenTextColor}
                    cursor={"pointer"}
                    fontWeight={400}
                    onClick={setMax}
                    bg={greenBGColor}
                    borderRadius={"0.375rem"}
                    px={"0.375rem"}
                    h="1.75rem"
                    display={"flex"}
                    alignItems={"center"}
                    _hover={{ opacity: 0.9 }}
                    className="ml-2.5 md:ml-0"
                  >
                    Free
                  </Text> */}
          <Text
            fontSize="0.875rem"
            fontWeight={400}
            color={"#30e0a1"}
            bg={"#008d5b33"}
            borderRadius={"0.375rem"}
            px={"0.375rem"}
            h={"1.25rem"}
            
          >
            5x
          </Text>
          {/* {haircut} {tokenTo.toUpperCase()} */}
        </HStack>

        <HStack w={"100%"}>
          <Text fontSize="0.875rem" color={color}>
            Slippage
          </Text>
          {/* <Tooltip
                  label="Minimum Amount you will receive. If amount falls below this, the transaction will instead revert"
                  fontSize="xs"
                >
                  <InfoOutlineIcon w={3} h={3} color={color} />
                </Tooltip> */}
          <Spacer />
          <div className="flex  items-center justify-between space-x-1  bg-[#0B0B20] px-2 py-1 rounded-lg ">
            <input
              placeholder="2%"
              className="outline-none text-left text-white w-14  bg-transparent"
            />
          </div>
        </HStack>
      </VStack>
      <Divider my="0.75rem" />
      <VStack gap={"0.625rem"} className="p-1 mb-2">
        <HStack w={"100%"}>
          <Text className="font-semibold" color={color}>
            Position Margin (modified)
          </Text>
          <Tooltip label="Amount that will be paid as fees" fontSize="xs">
            <InfoIcon w={3} h={3} color={color} />
          </Tooltip>
          <Spacer />

          <Text className="font-semibold" color={color}>
            263,333,263$
          </Text>
        </HStack>
        <HStack w={"100%"}>
          <Text className="font-semibold" color={color}>
            Position Leverage (modified)
          </Text>
          <Tooltip label="Amount that will be paid as fees" fontSize="xs">
            <InfoIcon w={3} h={3} color={color} />
          </Tooltip>
          <Spacer />

          <Text className="font-semibold "  >
            4.99x
          </Text>
        </HStack>
        <HStack w={"100%"}>
          <Text className="font-semibold" color={color}>
            Estimated Rewards
          </Text>

          <Spacer />

          <Text className="font-semibold text-white" >
            -
          </Text>
        </HStack>
      </VStack>
    </>
  );
};

export default Slippage;
