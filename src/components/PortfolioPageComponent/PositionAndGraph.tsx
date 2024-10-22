import React from "react";
import {
  Box,
  Divider,
  HStack,
  Image,
  Spacer,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import CardLineIcon from "../../assets/icons/Card-line.svg";
import { InfoIcon } from "@chakra-ui/icons";
import DashArrowIcon from "../../assets/icons/dash_arrow.svg";
import CustomBarChart from "../CustomBarChart";
import BarChartForPortfolio from "./BarChartForPortfolio";
import BarChart from "./BarChart";

const PositionAndGraph = () => {
  const bg = useColorModeValue("white", "#1B1C39");
  const tableBg = useColorModeValue("white", "#28294B");
  const boxBg = useColorModeValue("white", "#0B0B20");
  const borderColor = useColorModeValue(
    "blackAlpha.300",
    "rgba(255, 255, 255, 0.07)"
  );
  const color = useColorModeValue("blackAlpha.900", "white");
  const lightColor = useColorModeValue(
    "blackAlpha.600",
    "rgba(255, 255, 255, 0.6)"
  );

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="space-y-7 ">
          <div className="flex justify-center items-center">
            <VStack
              borderRadius={"1rem"}
              // p="1rem"
              className="px-7 py-4"
              gap="1.875rem"
              bg={bg}
              w={"23rem"}
            >
              <HStack w="100%" gap="0.375rem">
                <Box
                  w={"3px"}
                  h="1.3rem"
                  bgColor={"#00A3FF"}
                  borderRadius={"3px"}
                />
                <HStack gap="0.2rem">
                  <Text fontSize={"1.5rem"} color={color} className="font-bold">
                    Current Option Position
                  </Text>
                  <Text fontSize={"0.875rem"} color={lightColor}></Text>
                </HStack>
              </HStack>
              <VStack gap="1rem" className="w-full">
                <HStack w="100%" alignItems="baseline">
                  <Text
                    fontWeight={700}
                    fontSize={"1.5rem"}
                    gap="0.313rem"
                    color={color}
                  >
                    0.00
                  </Text>
                  <Text
                    fontWeight={400}
                    fontSize={"0.875rem"}
                    color={lightColor}
                  >
                    ETH
                  </Text>
                  <Spacer />
                  <Text fontWeight={400} fontSize={"1rem"} color={color}>
                    ≈000$
                  </Text>
                </HStack>
                <HStack>
                  <Image src={CardLineIcon} alt="card-line" w={"20rem"} />
                </HStack>
              </VStack>
            </VStack>
          </div>
          <div className=" ">
            <div className="flex justify-center items-center gap-8 p-1">
              <div className="text-sm gap-4 text-gray-400 font-bold">
                Check Your <span className="text-white">PNL</span> and{" "}
                <span className="text-white">Track Profit</span> Instantly
              </div>
              <div>
                <button className="bg-[#0080FF] font-semibold px-2 py-1 rounded-lg">
                  Open PnL
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-center items-center">
              <VStack
                borderRadius={"1rem"}
                // p="1rem"
                className="px-7 py-4"
                gap="1.875rem"
                bg={bg}
                w={"23rem"}
              >
                <HStack w="100%" gap="0.375rem">
                  <Box
                    w={"3px"}
                    h="1.3rem"
                    bgColor={"#00A3FF"}
                    borderRadius={"3px"}
                  />
                  <HStack gap="0.2rem">
                    <Text
                      fontSize={"1.5rem"}
                      color={color}
                      className="font-bold"
                    >
                      LifeTime Stats
                    </Text>
                    <Text fontSize={"0.875rem"} color={lightColor}></Text>
                  </HStack>
                </HStack>
                <VStack gap={"0.625rem"} w={"100%"}>
                  <HStack w={"100%"}>
                    <Text fontSize="0.875rem" color={color}>
                      Total Trades
                    </Text>

                    <Spacer />
                    <Text fontSize="0.875rem" color={color}>
                      0.00$
                    </Text>
                  </HStack>
                  <HStack w={"100%"}>
                    <Text fontSize="0.875rem" color={color}>
                      Fee Paid
                    </Text>
                    <InfoIcon w={3} h={3} color={color} />
                    <Spacer />

                    <Text fontSize="0.875rem" color={color}>
                      0.00$
                    </Text>
                  </HStack>

                  <HStack w={"100%"}>
                    <HStack gap={"0.1rem"}>
                      <Text fontSize="0.875rem" color={color}>
                        Realized PnL
                      </Text>
                    </HStack>
                    <InfoIcon w={3} h={3} color={color} />
                    <Spacer />
                    <Text fontSize="0.875rem" color={color}>
                      0.00$
                    </Text>
                  </HStack>
                  <Divider my="0.75rem" />

                  <HStack w={"100%"}>
                    <HStack gap={"0.1rem"}>
                      <Text fontSize="0.875rem" color={color}>
                        Position Margin
                      </Text>
                    </HStack>
                    <InfoIcon w={3} h={3} color={color} />
                    <Spacer />
                    <Text fontSize="0.875rem" color={color}>
                      26,2,333,456$
                    </Text>
                  </HStack>
                </VStack>
              </VStack>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-fit md:w-full">
          <BarChart />
        </div>
      </div>
    </>
  );
};

export default PositionAndGraph;
