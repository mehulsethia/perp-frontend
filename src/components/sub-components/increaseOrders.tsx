import {
  Box,
  Button,
  Flex,
  HStack,
  Hide,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Show,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { CHAIN_CONSTANTS } from "../../constants/addresses";
import { IncreaseOrder } from "../positionOrderTable";
import { getPairData, getPairDataFromIndex, getPairIndex, getPairPrice } from "../../helpers/pair";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { getTokenSymbol } from "../../helpers/token";
import { getExpiryDatetime } from "../../helpers/utils";
import { EditIncreaseBtn } from "../transactions/editIncreaseBtn";
import { CancelIncreaseBtn } from "../transactions/cancelIncreaseBtn";
import { formatValue } from "../../helpers/trim";

interface IIncreaseOrders {
  address: `0x${string}`;
  chainConstants: CHAIN_CONSTANTS;
  orders: IncreaseOrder[];
  allPrices: number[];
  setOrderUpdate: any;
}

export default function IncreaseOrders({
  address,
  chainConstants,
  orders,
  allPrices,
  setOrderUpdate,
}: IIncreaseOrders) {
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isCancelOpen, onOpen: onCancelOpen, onClose: onCancelClose } = useDisclosure();

  const [assetIndex, setAssetIndex] = useState<number>(0);
  const [assetLabel, setAssetLabel] = useState<string>("");
  const [isLong, setIsLong] = useState<boolean>(true);
  const [markPrice, setMarkPrice] = useState<string>("");
  const [collateralToken, setCollateralToken] = useState<`0x${string}`>(chainConstants.USDC_ADDRESS);
  const [collateral, setCollateral] = useState<string>("");
  const [multiplier, setMultiplier] = useState<number>(1);
  const [expiryTime, setExpiryTime] = useState<Date>(new Date());
  const [key, setKey] = useState<string>("");

  const [executionPrice, setExecutionPrice] = useState<string>("");
  const [newPrice, setNewPrice] = useState<string>("");

  const openModal = (
    isEdit: boolean,
    orderKey: string,
    assetIndex: number,
    label: string,
    isLong: boolean,
    collateral: string,
    collateralToken: `0x${string}`,
    multiplier: number,
    executionPrice: string,
    markPrice: number,
    expiry: Date
  ) => {
    setKey(orderKey);
    setAssetIndex(assetIndex);
    setAssetLabel(label);
    setIsLong(isLong);
    setCollateral(collateral);
    setCollateralToken(collateralToken);
    setMultiplier(multiplier);
    setExecutionPrice(executionPrice);
    setMarkPrice(markPrice.toFixed(2));
    setExpiryTime(expiry);

    setNewPrice(executionPrice);

    isEdit ? onEditOpen() : onCancelOpen();
  };

  return (
    <>
      <TableContainer>
        <Table variant={"simple"} fontSize={{ base: "xs", md: "md" }}>
          <Tbody>
            <Tr color={"gray.400"}>
              <Td px={{ base: 2, md: 4 }}>Asset</Td>
              <Td px={{ base: 2, md: 4 }}>
                <Text>Size</Text>
                <Text>(Col.)</Text>
              </Td>
              <Td px={{ base: 2, md: 4 }}>
                Mark
                <Text display={{ base: "none", md: "inline" }}> Price</Text>
              </Td>
              <Td px={{ base: 2, md: 4 }}>
                Exec.
                <Text display={{ base: "none", md: "inline" }}> Price</Text>
              </Td>
              <Td px={{ base: 2, md: 4 }}>Expiry</Td>
              <Td px={{ base: 2, md: 4 }}>&nbsp;</Td>
            </Tr>
            {orders.map((order, index) => {
              const pairIndex = getPairIndex(order.assetIndex);
              const pairData = getPairDataFromIndex(pairIndex);
              const pairPrice = getPairPrice(allPrices, pairIndex);
              const expiry = getExpiryDatetime(order.blockTime);
              return (
                <Tr key={index}>
                  <Td px={{ base: 2, md: 4 }}>
                    <Text>{pairData.label}</Text>
                    <Text fontSize={"sm"} color={order.isLong ? "green.400" : "red.500"}>
                      {order.multiplier.toFixed(2)}x {order.isLong ? "Long" : "Short"}
                    </Text>
                  </Td>
                  <Td px={{ base: 2, md: 4 }}>
                    <Text>${formatValue(Number(order.collateral) * order.multiplier)}</Text>
                    <Text color={"gray"}>(${formatValue(order.collateral)})</Text>
                  </Td>
                  <Td px={{ base: 2, md: 4 }}>${formatValue(pairPrice)}</Td>
                  <Td px={{ base: 2, md: 4 }}>${formatValue(order.executionPrice)}</Td>
                  <Td px={{ base: 2, md: 4 }}>
                    <Text>{expiry.toLocaleDateString()}</Text>
                    <Text>{expiry.toLocaleTimeString()}</Text>
                  </Td>
                  <Td px={{ base: 2, md: 4 }}>
                    <Button
                      size={{ base: "xs", md: "sm" }}
                      mr={{ base: 0, md: 2 }}
                      onClick={(e) =>
                        openModal(
                          true,
                          order.key,
                          order.assetIndex,
                          pairData.label,
                          order.isLong,
                          order.collateral,
                          order.collateralToken,
                          order.multiplier,
                          order.executionPrice,
                          pairPrice,
                          expiry
                        )
                      }
                    >
                      <EditIcon />
                    </Button>
                    <Hide above="md">
                      <br />
                    </Hide>
                    <Button
                      size={{ base: "xs", md: "sm" }}
                      onClick={(e) =>
                        openModal(
                          false,
                          order.key,
                          order.assetIndex,
                          pairData.label,
                          order.isLong,
                          order.collateral,
                          order.collateralToken,
                          order.multiplier,
                          order.executionPrice,
                          pairPrice,
                          expiry
                        )
                      }
                    >
                      <DeleteIcon />
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Edit {assetLabel} {isLong ? "Long" : "Short"} Order
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box backgroundColor={"gray.700"} my={1} px={2} py={1} rounded={"md"}>
              <HStack color={"whiteAlpha.600"}>
                <Text>Execution Price</Text>
                <Spacer />
                <Text>Mark: ${formatValue(markPrice)}</Text>
              </HStack>
              <HStack my={2}>
                <Input type="number" placeholder="0.0" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
              </HStack>
            </Box>
            <Flex direction={"column"} gap={2} mt={4} backgroundColor={"gray.700"} p={1} rounded={"md"}>
              <HStack>
                <Text>Collateral:</Text>
                <Spacer />
                <Text>
                  {formatValue(collateral)} {getTokenSymbol(chainConstants, collateralToken).toUpperCase()}
                </Text>
              </HStack>
              <HStack>
                <Text>Multiplier:</Text>
                <Spacer />
                <Text>{multiplier}x</Text>
              </HStack>
              <HStack>
                <Text>Size:</Text>
                <Spacer />
                <Text>${formatValue(Number(collateral) * multiplier)}</Text>
              </HStack>
              <HStack mt={2}>
                <Text>Mark Price:</Text>
                <Spacer />
                <Text>${formatValue(markPrice)}</Text>
              </HStack>
              <HStack>
                <Text>Current Execution Price:</Text>
                <Spacer />
                <Text>${formatValue(executionPrice)}</Text>
              </HStack>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <EditIncreaseBtn
              contract={chainConstants.TRADE_ROUTER_ADDRESS}
              orderKey={key}
              newPrice={newPrice}
              setUserUpdate={setOrderUpdate}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isCancelOpen} onClose={onCancelClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Cancel {assetLabel} {isLong ? "Long" : "Short"} Order
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction={"column"} gap={2} mt={4} backgroundColor={"gray.700"} p={1} rounded={"md"}>
              <HStack>
                <Text>Collateral:</Text>
                <Spacer />
                <Text>
                  {formatValue(collateral)} {getTokenSymbol(chainConstants, collateralToken).toUpperCase()}
                </Text>
              </HStack>
              <HStack>
                <Text>Multiplier:</Text>
                <Spacer />
                <Text>{multiplier}x</Text>
              </HStack>
              <HStack>
                <Text>Size:</Text>
                <Spacer />
                <Text>${formatValue(Number(collateral) * multiplier)}</Text>
              </HStack>
              <HStack mt={2}>
                <Text>Mark Price:</Text>
                <Spacer />
                <Text>${formatValue(markPrice)}</Text>
              </HStack>
              <HStack>
                <Text>Execution Price:</Text>
                <Spacer />
                <Text>${formatValue(executionPrice)}</Text>
              </HStack>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <CancelIncreaseBtn
              contract={chainConstants.TRADE_ROUTER_ADDRESS}
              orderKey={key}
              setUserUpdate={setOrderUpdate}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
