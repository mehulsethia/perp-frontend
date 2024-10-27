import React from "react";
import {
  Box,
  HStack,
  Image,
  Spacer,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import CardLineIcon from "../assets/icons/Card-line.svg";

const PoolsStats = () => {
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
  const greenBGColor = useColorModeValue("whiteAlpha.900", "#008D5B33");
  const greenColor = useColorModeValue("whiteAlpha.900", "#30E0A190");
  const lightButtonBg = useColorModeValue(
    "blackAlpha.300",
    "rgba(255, 255, 255, 0.05)"
  );
  const buttonBgColor = useColorModeValue("blackAlpha.800", "#0080FF");

  return (
    <>
      <div>
        <div className=" rounded-xl  ">
          <div className="flex p-2   gap-2">
            <div className="rounded-2xl  w-full flex flex-col md:flex-row justify-between  items-center bg-[#1B1C39]">
              <div className="w-full p-3">
                <VStack
                  borderRadius={"1rem"}
                  // p="1rem"
                  className="px-7 py-4"
                  gap="1.875rem"
                  bg={boxBg}
                  
                >
                  <HStack w="100%" gap="0.375rem">
                    <Box
                      w={"3px"}
                      h="0.875rem"
                      bgColor={"#00A3FF"}
                      borderRadius={"3px"}
                    />
                    <HStack gap="0.2rem">
                      <Text fontSize={"0.875rem"} color={color} className="font-bold">
                        TVL
                      </Text>
                      <Text fontSize={"0.875rem"} color={lightColor}>
                        (Total Value Locked)
                      </Text>
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
                        $0000
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
                      <Image src={CardLineIcon} alt="card-line" className="w-full" />
                    </HStack>
                  </VStack>
                </VStack>
              </div>
              <div className="w-full p-3">
                <VStack
                  borderRadius={"1rem"}
                  className="px-7 py-4"
                  gap="1.875rem"
                  bg={boxBg}
                >
                  <HStack w="100%" gap="0.375rem">
                    <Box
                      w={"3px"}
                      h="0.875rem"
                      bgColor={"#AB69FF"}
                      borderRadius={"3px"}
                    />
                    <HStack gap="0.2rem">
                      <Text fontSize={"0.875rem"} color={color} className="font-bold">
                        Volume
                      </Text>
                      <Text fontSize={"0.875rem"} color={lightColor}>
                        (24 Hours)
                      </Text>
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
                        $0000
                      </Text>
                      <Text
                        fontWeight={400}
                        fontSize={"0.875rem"}
                        color={lightColor}
                      >
                        ETH
                      </Text>
                      <Spacer />
                      <Text
                        fontWeight={400}
                        fontSize={"0.875rem"}
                        color={color}
                      >
                        ≈0$
                      </Text>
                    </HStack>
                    <HStack>
                      <Image src={CardLineIcon} alt="card-line" className="w-full" />
                    </HStack>
                  </VStack>
                </VStack>
              </div>
              <div className="w-full p-3">
                <VStack
                  borderRadius={"1rem"}
                  className="px-7 py-4"
                  gap="1.875rem"
                  bg={boxBg}
                >
                  <HStack w="100%" gap="0.375rem">
                    <Box
                      w={"3px"}
                      h="0.875rem"
                      bgColor={"#BDFF00"}
                      borderRadius={"3px"}
                    />
                    <HStack gap="0.2rem">
                      <Text fontSize={"0.875rem"} color={color} className="font-bold">
                        My Deposits
                      </Text>
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
                        $0000
                      </Text>
                      <Text
                        fontWeight={400}
                        fontSize={"0.875rem"}
                        color={lightColor}
                      >
                        ETH
                      </Text>
                      <Spacer />
                      <Text
                        fontWeight={400}
                        fontSize={"0.875rem"}
                        color={color}
                      >
                        ≈0000$
                      </Text>
                    </HStack>
                    <HStack className="w-full">
                      <Image src={CardLineIcon} alt="card-line" />
                    </HStack>
                  </VStack>
                </VStack>
              </div>
              <div className=" w-full p-3">
                <VStack
                  borderRadius={"1rem"}
                  className="px-7 py-4"
                  gap="1.875rem"
                  bg={boxBg}
                >
                  <HStack w="100%" gap="0.375rem">
                    <Box
                      w={"3px"}
                      h="0.875rem"
                      bgColor={"#FFFFFF"}
                      borderRadius={"3px"}
                    />
                    <HStack gap="0.2rem">
                      <Text fontSize={"0.875rem"} color={color} className="font-bold">
                        My Rewards
                      </Text>
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
                        $0
                      </Text>
                      <Text
                        fontWeight={400}
                        fontSize={"0.875rem"}
                        color={lightColor}
                      >
                        ETH
                      </Text>
                      <Spacer />
                      <Text
                        fontWeight={400}
                        fontSize={"0.875rem"}
                        color={color}
                      >
                        ≈0$
                      </Text>
                    </HStack>
                    <HStack className="w-full">
                      <Image src={CardLineIcon} alt="card-line" />
                    </HStack>
                  </VStack>
                </VStack>
              </div>
            </div>

            <div className=" bg-[#1B1C39] hidden p-4 space-y-3 max-w-sm w-full md:flex flex-col rounded-lg ">
              <div className="font-bold text-white ">
                Deposit LP in Vault to earn BGT
              </div>
              <div>
                After adding liqudity to a stable pool, deposit your LP ib BGT
                Vault to earn{" "}
                <span className="text-white font-semibold">BGT Reward</span>{" "}
              </div>
              <div>
                <button className="bg-blue-500 px-4 py-2.5 w-full rounded-xl font-bold text-lg">
                  Deposit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PoolsStats;
