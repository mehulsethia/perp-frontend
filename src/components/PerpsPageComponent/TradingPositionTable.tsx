import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Flex,
  Text,
  Box,
} from "@chakra-ui/react";

const TradingPositionsTable = () => {
  // Sample data
  const positions = [
    {
      id: 1,
      market: "BTC-USDT",
      type: "Long",
      leverage: "0.5x",
      positionSize: "2.0332",
      sizeUsd: "$4,580",
      entryPrice: "$2,362",
      marketPrice: "$2,362",
      estLiqPrice: "$2,362",
      takeProfit: "$2,362/$2,362",
      pnl: "-$0.04",
      pnlPercent: "2%",
      borrowFee: "$0.00",
    },
    {
      id: 2,
      market: "BTC-USDT",
      type: "Long",
      leverage: "0.5x",
      positionSize: "2.0332",
      sizeUsd: "$4,580",
      entryPrice: "$2,362",
      marketPrice: "$2,362",
      estLiqPrice: "$2,362",
      takeProfit: "$2,362/$2,362",
      pnl: "-$0.04",
      pnlPercent: "2%",
      borrowFee: "$0.00",
    },
  ];

  return (
    <Box
      bg="#0B0B20"
      color="white"
      borderRadius="lg"
      overflow="hidden"
      w={{ base: "calc(85vw)", md: "100%" }} // Setting the width to 90% of the viewport width
      mx="auto" // To center the box horizontally
    >
      {/* Outer box to make the table responsive */}
      <Box overflowX="auto" w="100%" maxW="100vw">
        {/* Restrict table to viewport width */}
        <TableContainer minW="1000px">
          {/* Minimum width to avoid table squishing */}
          <Table variant="simple">
            <Thead bg="#1B1C39">
              <Tr>
                <Th color="white" fontWeight="normal" whiteSpace="nowrap">
                  Market/Action
                </Th>
                <Th color="white" fontWeight="normal" whiteSpace="nowrap">
                  Position Size ↑
                </Th>
                <Th color="white" fontWeight="normal" whiteSpace="nowrap">
                  Entry Price ↑
                </Th>
                <Th color="white" fontWeight="normal" whiteSpace="nowrap">
                  Market Price ↑
                </Th>
                <Th color="white" fontWeight="normal" whiteSpace="nowrap">
                  Est. LIQ Price ↑
                </Th>
                <Th color="white" fontWeight="normal" whiteSpace="nowrap">
                  TP/SL ↑
                </Th>
                <Th color="white" fontWeight="normal" whiteSpace="nowrap">
                  P/L ↑
                </Th>
                <Th color="white" fontWeight="normal" whiteSpace="nowrap">
                  Borrow Fee ↑
                </Th>
                <Th color="white" fontWeight="normal" whiteSpace="nowrap">
                  Action
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {positions.map((position) => (
                <Tr
                  key={position.id}
                  borderBottom="1px"
                  borderColor="#2A2B31"
                  _hover={{ bg: "#1E1F25" }}
                >
                  <Td py="4">
                    <Flex alignItems="center" gap="2">
                      <Box w="2" h="2" borderRadius="full" bg="green.500" />
                      <Text color="white">{position.market}</Text>
                    </Flex>
                    <Flex alignItems="center" gap="1" mt="1">
                      <Text color="green.500" fontSize="xs">
                        Long
                      </Text>
                      <Text color="gray.400" fontSize="xs">
                        0.5x
                      </Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Text color="white">{position.positionSize}</Text>
                    <Text color="gray.400" fontSize="xs">
                      {position.sizeUsd}
                    </Text>
                  </Td>
                  <Td color="white">{position.entryPrice}</Td>
                  <Td color="white">{position.marketPrice}</Td>
                  <Td color="white">{position.estLiqPrice}</Td>
                  <Td color="white">{position.takeProfit}</Td>
                  <Td>
                    <Flex alignItems="center" gap="1">
                      <Text color="red.500">{position.pnl}</Text>
                      <Text color="green.500" fontSize="xs">
                        {position.pnlPercent}
                      </Text>
                    </Flex>
                  </Td>
                  <Td color="white">{position.borrowFee}</Td>
                  <Td>
                    <Button
                      variant="outline"
                      bg="transparent"
                      color="white"
                      borderColor="gray.600"
                      _hover={{ bg: "#2A2B31", color: "white" }}
                    >
                      Remove
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot bg="#1B1C39">
              <Tr borderTop="1px" borderColor="#2A2B31">
                <Td colSpan={2}>
                  <Flex
                    gap="4"
                    bg="#0B0B20"
                    borderRadius="xl"
                    p="2"
                    color="white"
                  >
                    <Text bg="#1B1C39" color="white" p="2" borderRadius="lg">
                      Total Position Size:{" "}
                    </Text>
                    <Text
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      $49.75
                    </Text>
                  </Flex>
                </Td>
                <Td colSpan={2}>
                  <Flex
                    gap="4"
                    bg="#0B0B20"
                    borderRadius="xl"
                    p="2"
                    color="white"
                  >
                    <Text bg="#1B1C39" color="white" p="2" borderRadius="lg">
                      Total Position Size:{" "}
                    </Text>
                    <Text
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      $49.75
                    </Text>
                  </Flex>
                </Td>
                <Td colSpan={7}>
                  <Flex
                    justifyContent="flex-end"
                    alignItems="center"
                    gap="2"
                    color="gray.400"
                  >
                    <Text>1 of 1</Text>
                    <Button
                      variant="outline"
                      size="sm"
                      bg="transparent"
                      borderColor="gray.600"
                      color="gray.400"
                      _hover={{ bg: "#2A2B31" }}
                      isDisabled
                    >
                      First
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      bg="transparent"
                      borderColor="gray.600"
                      color="gray.400"
                      _hover={{ bg: "#2A2B31" }}
                      isDisabled
                    >
                      Last
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default TradingPositionsTable;
