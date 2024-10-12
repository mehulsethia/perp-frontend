import {
  Box,
  Table,
  TableContainer,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Button,
  Show,
  Hide,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  HStack,
  Spacer,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  Checkbox,
} from "@chakra-ui/react";
import { CHAIN_CONSTANTS } from "../../constants/addresses";
import { readContracts } from "wagmi";
import { readContract } from "@wagmi/core";
import { TradeManagerABI, TradeRouterABI } from "../../abi";
import { useEffect, useState } from "react";
import { formatEther, parseEther } from "viem";
import { getPairData, getPairDataFromIndex, getPairIndex, getPairPrice } from "../../helpers/pair";
import { ArrowForwardIcon, CloseIcon } from "@chakra-ui/icons";
import TokenSelect from "../tokenSelect";
import { tokenList } from "../../constants/tokens";
import { getTokenAddress, getTokenSymbol } from "../../helpers/token";
import { MarketPositionDecreaseBtn } from "../transactions/marketPositionDecreaseBtn";
import { getSlippage } from "../../helpers/utils";
import { LimitOrderDecreaseBtn } from "../transactions/limitOrderDecrease";
import { getExecutionFee } from "../../helpers/network";
import { EvmPriceServiceConnection } from "@pythnetwork/pyth-evm-js";
import { formatValue } from "../../helpers/trim";

interface IPositions {
  pythPriceService: EvmPriceServiceConnection;
  address: `0x${string}`;
  chainConstants: CHAIN_CONSTANTS;
  gasPrice: any | undefined;
  allPrices: number[];
  userUpdate: boolean;
  setUserUpdate: any;
}

type Position = {
  assetIndex: number;
  collateralToken: `0x${string}`;
  collateral: string;
  avgPrice: string;
  units: string;
  isLong: boolean;
  amountToRelease: string;
  profitAccrued: string;
  poolFees: string;
  liquidationPrice: string;
};

export default function Positions({
  pythPriceService,
  address,
  chainConstants,
  gasPrice,
  allPrices,
  userUpdate,
  setUserUpdate,
}: IPositions) {
  const [positions, setPositions] = useState<Position[]>([]);

  const [assetIndex, setAssetIndex] = useState<number>(0);
  const [assetLabel, setAssetLabel] = useState<string>("");
  const [isLong, setIsLong] = useState<boolean>(true);
  const [entryPrice, setEntryPrice] = useState<string>("");
  const [markPrice, setMarkPrice] = useState<string>("");
  const [liquidationPrice, setLiquidationPrice] = useState<string>("");
  const [collateralToken, setCollateralToken] = useState<`0x${string}`>(chainConstants.USDC_ADDRESS);
  const [collateral, setCollateral] = useState<string>("");
  const [multiplier, setMultiplier] = useState<number>(1);
  const [units, setUnits] = useState<number>(0);
  const [amountToRelease, setAmountToRelease] = useState<string>("");
  const [totalFees, setTotalFees] = useState<string>("");
  const [profitAmount, setProfitAmount] = useState<string>("");

  const [isMarket, setIsMarket] = useState<boolean>(true);
  const [executionPrice, setExecutionPrice] = useState<string>("");

  const [decreaseAmount, setDecreaseAmount] = useState<string>("");
  const [profitToken, setProfitToken] = useState<string>("usdc");

  const [useSl, setUseSl] = useState<boolean>(false);
  const [slPrice, setSlPrice] = useState<string>("");
  const [useTp, setUseTp] = useState<boolean>(false);
  const [tpPrice, setTpPrice] = useState<string>("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  async function getPositions() {
    if (allPrices.length) {
      const data = await readContract({
        address: chainConstants.TRADE_MANAGER_ADDRESS,
        abi: TradeManagerABI,
        functionName: "getUserPositionData",
        args: [address],
      });

      if (data) {
        let newPositions: Position[] = [];
        let contracts: any = [];
        const liquidationPrices = await readContract({
          address: chainConstants.TRADE_MANAGER_ADDRESS,
          abi: TradeManagerABI,
          functionName: "getLiquidationPrices",
          args: [data[0]],
        });
        for (let i = 0; i < data[1].length; i++) {
          const position = data[1][i];
          const pairIndex = getPairIndex(position.assetIndex);
          const pairPrice = getPairPrice(allPrices, pairIndex);
          contracts.push({
            address: chainConstants.TRADE_MANAGER_ADDRESS,
            abi: TradeManagerABI,
            functionName: "getDecreasePositionResult",
            args: [
              address,
              position.assetIndex,
              parseEther(pairPrice.toString()),
              position.collateral,
              position.isLong,
              position.collateralToken,
            ],
          });
        }
        const decreaseData = await readContracts({
          contracts: contracts,
        });
        for (let i = 0; i < data[1].length; i++) {
          const position = data[1][i];
          const collateral = formatEther(position.collateral);
          let amountToRelease = "0";
          let profitAccrued = "0";
          let poolFees = "0";
          if (decreaseData[i].status == "success") {
            //@ts-ignore
            amountToRelease = formatEther(decreaseData[i].result[0]);
            //@ts-ignore
            profitAccrued = formatEther(decreaseData[i].result[1]);
            //@ts-ignore
            poolFees = formatEther(decreaseData[i].result[2]);
          }
          const liquidationPrice = liquidationPrices ? formatEther(liquidationPrices[i]) : "";
          newPositions.push({
            collateralToken: position.collateralToken,
            assetIndex: position.assetIndex,
            collateral: collateral,
            avgPrice: formatEther(position.avgPrice),
            units: formatEther(position.units),
            isLong: position.isLong,
            amountToRelease: amountToRelease,
            profitAccrued: profitAccrued,
            poolFees: poolFees,
            liquidationPrice: liquidationPrice,
          });
        }
        setPositions(newPositions);
      }
    }
  }

  async function decreaseAmountChange(newAmount: string) {
    try {
      const data = await readContract({
        address: chainConstants.TRADE_MANAGER_ADDRESS,
        abi: TradeManagerABI,
        functionName: "getDecreasePositionResult",
        args: [address, assetIndex, parseEther(markPrice), parseEther(decreaseAmount), isLong, collateralToken],
      });
      if (data) {
        const amountToRelease = formatEther(data[0]);
        const profitAccrued = formatEther(data[1]);
        const poolFees = formatEther(data[2]);
        const totalFees = Number(poolFees);
        setAmountToRelease(amountToRelease);
        setProfitAmount(profitAccrued);
        setTotalFees(totalFees.toFixed(2));
      }
    } catch (e: any) {
      console.log(e);
    }
  }

  useEffect(() => {
    getPositions();
  }, [address, chainConstants, allPrices]);

  useEffect(() => {
    if (userUpdate) {
      getPositions();
    }
  }, [userUpdate]);

  const setMax = () => {
    setDecreaseAmount(collateral);
  };

  const setUseSlOption = (isChecked: boolean) => {
    if (isChecked) {
      setSlPrice(markPrice);
    } else {
      setSlPrice("0");
    }
    setUseSl(isChecked);
  };

  const setUseTpOption = (isChecked: boolean) => {
    if (isChecked) {
      setTpPrice(markPrice);
    } else {
      setTpPrice("0");
    }
    setUseTp(isChecked);
  };

  const openDecreaseModal = (
    assetIndex: number,
    label: string,
    isLong: boolean,
    collateral: string,
    collateralToken: `0x${string}`,
    multiplier: number,
    units: number,
    amountToRelease: string,
    profitAccrued: string,
    totalFees: number,
    entryPrice: string,
    markPrice: number,
    liquidationPrice: number
  ) => {
    setAssetIndex(assetIndex);
    setAssetLabel(label);
    setIsLong(isLong);
    setCollateral(collateral);
    setCollateralToken(collateralToken);
    setMultiplier(multiplier);
    setUnits(units);
    setAmountToRelease(amountToRelease);
    setProfitAmount(profitAccrued);
    setTotalFees(totalFees.toFixed(2));
    setEntryPrice(entryPrice);
    setMarkPrice(markPrice.toFixed(2));
    setLiquidationPrice(liquidationPrice.toFixed(2));

    setExecutionPrice(markPrice.toFixed(2));
    setProfitToken(getTokenSymbol(chainConstants, collateralToken));
    setDecreaseAmount(collateral);

    onOpen();
  };

  const getNewCollateral = () => {
    return Number(collateral) - Number(decreaseAmount);
  };

  const getNetValue = () => {
    return Number(amountToRelease) + Number(profitAmount);
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => decreaseAmountChange(decreaseAmount), 500);
    return () => clearTimeout(timeOutId);
  }, [decreaseAmount]);

  const getLimitPrice = () => {
    return isLong ? Number(markPrice) * (1 - getSlippage() / 100) : Number(markPrice) * (1 + getSlippage() / 100);
  };

  const getExecutionFeeLimit = () => {
    let numItems = 0;
    if (useSl) numItems += 1;
    if (useTp) numItems += 1;
    return getExecutionFee(gasPrice, numItems);
  };

  return (
    <>
      <TableContainer>
        <Table variant="simple" fontSize={{ base: "xs", md: "md" }}>
          <Tbody>
            <Tr color={"gray.400"}>
              <Td px={{ base: 2, md: 4 }}>Asset</Td>
              <Td px={{ base: 2, md: 4 }}>
                <Text>
                  <Show above="md">Collateral</Show>
                  <Hide above="md">Col.</Hide>
                </Text>
                <Text>(Size)</Text>
              </Td>
              <Td px={{ base: 2, md: 4 }}>
                Net<Text display={{ base: "none", md: "inline" }}> Value</Text>
                <Text display={{ base: "none", md: "block" }}>after fees</Text>
              </Td>
              <Td px={{ base: 2, md: 4 }}>
                <Text>
                  Mark
                  <Text display={{ base: "none", md: "inline" }}> Price</Text>
                </Text>
                <Text>
                  (Entry
                  <Text display={{ base: "none", md: "inline" }}> Price</Text>)
                </Text>
              </Td>
              <Td px={{ base: 2, md: 4 }}>
                Liq.<Text display={{ base: "none", md: "inline" }}> Price</Text>
              </Td>
              <Td px={{ base: 2, md: 4 }}>&nbsp;</Td>
            </Tr>
            {positions.map((position, index) => {
              const pairIndex = getPairIndex(position.assetIndex);
              const pairData = getPairDataFromIndex(pairIndex);
              const pairPrice = getPairPrice(allPrices, pairIndex);
              const size = Number(position.avgPrice) * Number(position.units);
              const multiplier = size / Number(position.collateral);
              const netValue = Number(position.amountToRelease) + Number(position.profitAccrued);
              const totalFees =
                Number(position.poolFees) + (Number(position.amountToRelease) - Number(position.amountToRelease));
              const liquidationPrice = Number(position.liquidationPrice);
              return (
                <Tr key={index}>
                  <Td px={{ base: 2, md: 4 }}>
                    <Text>{pairData.label}</Text>
                    <Text fontSize={"sm"} color={position.isLong ? "green.400" : "red.500"}>
                      {multiplier.toFixed(2)}x {position.isLong ? "LONG" : "SHORT"}
                    </Text>
                  </Td>
                  <Td px={{ base: 2, md: 4 }}>
                    <Text>${formatValue(position.collateral)}</Text>
                    <Text color={"gray"}>(${formatValue(size)})</Text>
                  </Td>
                  <Td px={{ base: 2, md: 4 }}>
                    <Text color={netValue >= Number(position.collateral) ? "green.400" : "red.500"}>
                      ${formatValue(netValue)}
                    </Text>
                    <Text color={"gray"}>(${formatValue(netValue - Number(position.collateral))})</Text>
                  </Td>
                  <Td px={{ base: 2, md: 4 }}>
                    <Text
                      color={
                        Number(position.avgPrice) >= pairPrice
                          ? position.isLong
                            ? "red.500"
                            : "green.400"
                          : position.isLong
                          ? "green.400"
                          : "red.500"
                      }
                    >
                      ${formatValue(pairPrice)}
                    </Text>
                    <Text color={"gray"}>(${formatValue(position.avgPrice)})</Text>
                  </Td>
                  <Td px={{ base: 2, md: 4 }}>
                    <Text>${formatValue(liquidationPrice)}</Text>
                    <Text color={"gray"}>(${formatValue(liquidationPrice - pairPrice)})</Text>
                  </Td>
                  <Td px={{ base: 2, md: 4 }}>
                    <Button
                      size={{ base: "xs", md: "sm" }}
                      p={{ base: 0, md: 2 }}
                      color={"blue.600"}
                      onClick={(e) =>
                        openDecreaseModal(
                          position.assetIndex,
                          pairData.label,
                          position.isLong,
                          position.collateral,
                          position.collateralToken,
                          multiplier,
                          Number(position.units),
                          position.amountToRelease,
                          position.profitAccrued,
                          totalFees,
                          position.avgPrice,
                          pairPrice,
                          liquidationPrice
                        )
                      }
                    >
                      <Show above="md">CLOSE</Show>
                      <Hide above="md">
                        <CloseIcon w={2} />
                      </Hide>
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Close {assetLabel} {isLong ? "Long" : "Short"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack my={2} spacing={8} justifyContent={"center"}>
              <Text
                fontSize={"lg"}
                color={isMarket ? "white" : "gray.500"}
                onClick={(e) => setIsMarket(true)}
                _hover={{ cursor: "pointer" }}
              >
                Market
              </Text>
              <Text
                fontSize={"lg"}
                color={!isMarket ? "white" : "gray.500"}
                onClick={(e) => setIsMarket(false)}
                _hover={{ cursor: "pointer" }}
              >
                Limit
              </Text>
            </HStack>
            <Box backgroundColor={"gray.700"} my={1} px={2} py={1} rounded={"md"}>
              <HStack color={"whiteAlpha.600"}>
                <Text>Close</Text>
                <Spacer />
                <Text>Collateral: ${formatValue(collateral)}</Text>
              </HStack>
              <HStack my={2}>
                <InputGroup>
                  <InputLeftElement>
                    <Button size={"sm"} onClick={setMax}>
                      Max
                    </Button>
                  </InputLeftElement>
                  <Input
                    type="number"
                    pl={12}
                    placeholder="0.0"
                    value={decreaseAmount}
                    onChange={(e) => setDecreaseAmount(e.target.value)}
                  />
                </InputGroup>
              </HStack>
            </Box>
            {isMarket ? (
              <Box backgroundColor={"gray.700"} my={1} px={2} py={1} rounded={"md"}>
                <HStack my={2}>
                  <Text>Profit: ${formatValue(profitAmount)}</Text>
                  <Spacer />
                  {Number(profitAmount) > 0 && (
                    <>
                      <Text fontSize={"12px"}>Profit Token:</Text>
                      {/* <TokenSelect value={profitToken} setValue={setProfitToken} options={tokenList} /> */}
                    </>
                  )}
                </HStack>
              </Box>
            ) : (
              <>
                <Box>
                  <Checkbox colorScheme="red" onChange={(e) => setUseSlOption(e.target.checked)}>
                    Stop Loss
                  </Checkbox>
                </Box>
                {useSl && (
                  <Box backgroundColor={"gray.700"} my={1} px={2} py={1} rounded={"md"}>
                    <HStack color={"whiteAlpha.600"}>
                      <Text>SL Price</Text>
                      <Spacer />
                      <Text>Mark: ${formatValue(markPrice)}</Text>
                    </HStack>
                    <HStack my={2}>
                      <Input
                        type="number"
                        placeholder={markPrice}
                        value={slPrice}
                        onChange={(e) => setSlPrice(e.target.value)}
                      />
                    </HStack>
                  </Box>
                )}
                <Box>
                  <Checkbox colorScheme="green" onChange={(e) => setUseTpOption(e.target.checked)}>
                    Take Profit
                  </Checkbox>
                </Box>
                {useTp && (
                  <Box backgroundColor={"gray.700"} my={1} px={2} py={1} rounded={"md"}>
                    <HStack color={"whiteAlpha.600"}>
                      <Text>TP Price</Text>
                      <Spacer />
                      <Text>Mark: ${formatValue(markPrice)}</Text>
                    </HStack>
                    <HStack my={2}>
                      <Input
                        type="number"
                        placeholder={markPrice}
                        value={tpPrice}
                        onChange={(e) => setTpPrice(e.target.value)}
                      />
                      <Spacer />
                      <Text fontSize={"xs"} align={"right"} color={"gray.400"}>
                        Profit token:
                      </Text>
                      {/* <TokenSelect value={profitToken} setValue={setProfitToken} options={tokenList} /> */}
                    </HStack>
                  </Box>
                )}
              </>
            )}
            <Flex direction={"column"} gap={2} mt={4} backgroundColor={"gray.700"} p={1} rounded={"md"}>
              <HStack>
                <Text>Entry Price:</Text>
                <Spacer />
                <Text>${formatValue(entryPrice)}</Text>
              </HStack>
              <HStack>
                <Text>Mark Price:</Text>
                <Spacer />
                <Text>${formatValue(markPrice)}</Text>
              </HStack>
              <HStack>
                <Text>Liq. Price:</Text>
                <Spacer />
                <Text>${formatValue(liquidationPrice)}</Text>
              </HStack>
              <HStack mt={2}>
                <Text>Collateral:</Text>
                <Spacer />
                <Text>
                  ${formatValue(collateral)} <ArrowForwardIcon /> ${getNewCollateral().toFixed(2)}
                </Text>
              </HStack>
              <HStack>
                <Text>Size:</Text>
                <Spacer />
                <Text>
                  ${formatValue(Number(collateral) * multiplier)} <ArrowForwardIcon /> $
                  {formatValue(getNewCollateral() * multiplier)}
                </Text>
              </HStack>
              <HStack>
                <Text>Fees:</Text>
                <Spacer />
                <Text>${formatValue(totalFees)}</Text>
              </HStack>
              <HStack>
                <Text>Net Value:</Text>
                <Spacer />
                <Flex>
                  <Text>${formatValue(getNetValue())}&nbsp;</Text>
                  <Text color={getNetValue() >= Number(decreaseAmount) ? "green.400" : "red.500"}>
                    (${formatValue(getNetValue() - Number(decreaseAmount))})
                  </Text>
                </Flex>
              </HStack>
            </Flex>
          </ModalBody>

          {(isMarket || useSl || useTp) && (
            <ModalFooter>
              {isMarket ? (
                <MarketPositionDecreaseBtn
                  pythPriceService={pythPriceService}
                  pythAddress={chainConstants.PYTH_DATA_SOURCE}
                  contract={chainConstants.TRADE_ROUTER_ADDRESS}
                  assetIndex={assetIndex}
                  collateral={decreaseAmount}
                  limitPrice={getLimitPrice().toString()}
                  isLong={isLong}
                  collateralToken={collateralToken}
                  profitToken={getTokenAddress(chainConstants, profitToken)}
                  setUserUpdate={setUserUpdate}
                />
              ) : (
                <LimitOrderDecreaseBtn
                  contract={chainConstants.TRADE_ROUTER_ADDRESS}
                  assetIndex={assetIndex}
                  collateral={decreaseAmount}
                  executionFee={getExecutionFeeLimit().toString()}
                  slPrice={slPrice}
                  tpPrice={tpPrice}
                  isLong={isLong}
                  collateralToken={collateralToken}
                  profitToken={getTokenAddress(chainConstants, profitToken)}
                  setUserUpdate={setUserUpdate}
                />
              )}
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
