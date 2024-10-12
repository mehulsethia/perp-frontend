import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  HStack,
  Text,
  Image,
  Flex,
  VStack,
  Show,
  NumberInput,
  NumberInputField,
  InputGroup,
  InputRightElement,
  Spacer,
  Input,
  Tooltip,
  Checkbox,
  Select as ChakraSelect,
} from "@chakra-ui/react";
import { useAccount, useBalance, useConnect, useDisconnect, useFeeData, useNetwork } from "wagmi";
import { fetchBalance, multicall } from "@wagmi/core";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { GroupBase, Select, SelectComponentsConfig, chakraComponents } from "chakra-react-select";
import { useEffect, useState } from "react";
import { PairOption, pairOptions } from "../constants/pairs";
import TradingViewWidget from "../components/tradingViewWidget";
import { InfoOutlineIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import PositionOrderTable from "../components/positionOrderTable";
import { tokenList } from "../constants/tokens";
import { CHAIN_CONSTANTS, getChainConstants } from "../constants/addresses";
import { ERC20ABI, TradeManagerABI } from "../abi";
import { formatUnits, parseEther, parseUnits } from "viem";
import LeverageSlider from "../components/leverageSlider";
import { readContract, readContracts } from "@wagmi/core";
import TokenSelect from "../components/tokenSelect";
import { getTokenAddress, getTokenDecimals, getTokenIcon } from "../helpers/token";
import { ApproveBtn } from "../components/transactions/approveBtn";
import { MarketPositionBtn } from "../components/transactions/marketPositionBtn";
import { getSlippage } from "../helpers/utils";
import { LimitOrderBtn } from "../components/transactions/limitOrderBtn";
import { getExecutionFee } from "../helpers/network";
import { getAllPriceData, getBinancePriceData } from "../helpers/api";
import { EvmPriceServiceConnection } from "@pythnetwork/pyth-evm-js";
import PairSelect from "../components/pairSelect";
import { formatValue } from "../helpers/trim";

const customAssetSelectComponents: SelectComponentsConfig<PairOption, true, GroupBase<PairOption>> = {
  Option: ({ children, ...props }) => (
    <chakraComponents.Option {...props}>
      <Image src={props.data.icon} mr={2} h={5} w={5} /> {children}
    </chakraComponents.Option>
  ),
  SingleValue: ({ children, ...props }) => (
    <chakraComponents.SingleValue {...props}>
      <Flex>
        <Image src={props.data.icon} mr={2} h={5} w={5} />
        {children}
      </Flex>
    </chakraComponents.SingleValue>
  ),
};

// const customTokenSelectComponents: SelectComponentsConfig<
//   TokenOption,
//   true,
//   GroupBase<TokenOption>
// > = {
//   Option: ({ children, ...props }) => (
//     <chakraComponents.Option {...props}>
//       <Image src={props.data.icon} mr={2} h={5} w={5} /> {children}
//     </chakraComponents.Option>
//   ),
//   SingleValue: ({ children, ...props }) => (
//     <chakraComponents.SingleValue {...props}>
//       <Flex>
//         <Image src={props.data.icon} h={8} w={8} />
//         {children}
//       </Flex>
//     </chakraComponents.SingleValue>
//   ),
// };

export default function Trade() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { data: gasData } = useFeeData();
  const [pythPriceService, setPythPriceService] = useState<EvmPriceServiceConnection>();

  const [chainConstants, setChainConstants] = useState<CHAIN_CONSTANTS | undefined>(undefined);
  const [usdcBalance, setUsdcBalance] = useState<string>("");
  const [usdtBalance, setUsdtBalance] = useState<string>("");
  const [daiBalance, setDaiBalance] = useState<string>("");

  const [selectedPair, setSelectedPair] = useState<number>(0);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [currentPrice2, setCurrentPrice2] = useState<number>(1);
  const [isPair, setIsPair] = useState<boolean>(false);

  const [change24, setChange24] = useState<number>(0);
  const [high24, setHigh24] = useState<number>(0);
  const [low24, setLow24] = useState<number>(0);
  const [assetLong, setAssetLong] = useState<number>(0);
  const [assetShort, setAssetShort] = useState<number>(0);

  const [isLong, setIsLong] = useState<boolean>(true);
  const [isMarket, setIsMarket] = useState<boolean>(true);

  const [collateralToken, setCollateralToken] = useState<string>("usdc");
  const [profitToken, setProfitToken] = useState<string>("usdc");
  const [collateral, setCollateral] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [multiplier, setMultiplier] = useState<number>(10);

  const [executionPrice, setExecutionPrice] = useState<string>("");
  const [useSl, setUseSl] = useState<boolean>(false);
  const [slPrice, setSlPrice] = useState<string>("");
  const [useTp, setUseTp] = useState<boolean>(false);
  const [tpPrice, setTpPrice] = useState<string>("");

  const [usdcRouterAllowance, setUsdcRouterAllowance] = useState<number>(0);
  const [usdtRouterAllowance, setUsdtRouterAllowance] = useState<number>(0);
  const [daiRouterAllowance, setDaiRouterAllowance] = useState<number>(0);

  const [approved, setApproved] = useState<boolean>(false);
  const [userUpdate, setUserUpdate] = useState<boolean>(false);

  const [allPrices, setAllPrices] = useState<number[]>([]);

  async function getUserAllowance() {
    if (address && chainConstants) {
      const data = await readContracts({
        contracts: [
          {
            address: getTokenAddress(chainConstants, "usdc"),
            abi: ERC20ABI,
            functionName: "allowance",
            args: [address, chainConstants.TRADE_ROUTER_ADDRESS],
          },
          {
            address: getTokenAddress(chainConstants, "usdt"),
            abi: ERC20ABI,
            functionName: "allowance",
            args: [address, chainConstants.TRADE_ROUTER_ADDRESS],
          },
          {
            address: getTokenAddress(chainConstants, "dai"),
            abi: ERC20ABI,
            functionName: "allowance",
            args: [address, chainConstants.TRADE_ROUTER_ADDRESS],
          },
        ],
      });

      if (data[0].status == "success") {
        setUsdcRouterAllowance(Number(formatUnits(data[0].result, 6)));
      }
      if (data[1].status == "success") {
        setUsdtRouterAllowance(Number(formatUnits(data[1].result, 6)));
      }
      if (data[2].status == "success") {
        setDaiRouterAllowance(Number(formatUnits(data[2].result, 18)));
      }
    }
  }

  async function getBalances() {
    if (address && chainConstants) {
      const data = await readContracts({
        contracts: [
          {
            address: chainConstants.USDC_ADDRESS,
            abi: ERC20ABI,
            functionName: "balanceOf",
            args: [address],
          },
          {
            address: chainConstants.USDT_ADDRESS,
            abi: ERC20ABI,
            functionName: "balanceOf",
            args: [address],
          },
          {
            address: chainConstants.DAI_ADDRESS,
            abi: ERC20ABI,
            functionName: "balanceOf",
            args: [address],
          },
        ],
      });

      if (data[0].status == "success") {
        setUsdcBalance(formatUnits(data[0].result, 6));
      }
      if (data[1].status == "success") {
        setUsdtBalance(formatUnits(data[1].result, 6));
      }
      if (data[2].status == "success") {
        setDaiBalance(formatUnits(data[2].result, 18));
      }
    }
  }

  async function initialize() {
    const priceService = new EvmPriceServiceConnection("https://hermes.pyth.network");
    setPythPriceService(priceService);
  }

  async function getAssetData() {
    if (chainConstants) {
      try {
        const data = await readContract({
          address: chainConstants.TRADE_MANAGER_ADDRESS,
          abi: TradeManagerABI,
          functionName: "assetMap",
          args: [pairOptions[selectedPair].assetIndex],
        });
        setAssetLong(Number(formatUnits(data[0], 18)));
        setAssetShort(Number(formatUnits(data[1], 18)));
      } catch {}
    }
  }

  async function currentPairUpdate() {
    if (pythPriceService) {
      const currentPair = pairOptions[selectedPair];
      if (allPrices.length) {
        setCurrentPrice(Number(allPrices[selectedPair]));
        if (currentPair.isPair) {
          setCurrentPrice2(1);
        }
      }
      await pythPriceService.closeWebSocket();
      const priceFeeds = currentPair.feedId;
      pythPriceService.subscribePriceFeedUpdates(priceFeeds, (priceFeed) => {
        const priceObj = priceFeed.getPriceUnchecked();
        const price = Number(formatUnits(BigInt(priceObj.price), -1 * priceObj.expo));
        if (currentPair.isPair) {
          // Slice used to remove 0x from feed
          if (priceFeed.id == priceFeeds[0].slice(2)) {
            setCurrentPrice(price);
          } else {
            setCurrentPrice2(price);
          }
        } else {
          setCurrentPrice(price);
        }
      });
      if (!currentPair.isPair) {
        const priceData = await getBinancePriceData(currentPair.binanceSymbol);
        // setCurrentPrice(Number(priceData.lastPrice));
        setChange24(Number(priceData.priceChangePercent));
        setHigh24(Number(priceData.highPrice));
        setLow24(Number(priceData.lowPrice));
      } else {
        const symbols = currentPair.binanceSymbol.split(",");
        const priceData1 = await getBinancePriceData(symbols[0]);
        const priceData2 = await getBinancePriceData(symbols[1]);
        const priceChangePercent1 = priceData1.priceChangePercent;
        const priceChangePercent2 = priceData2.priceChangePercent;
        const priceChangePercent =
          (100 * (100 + Number(priceChangePercent1))) / (100 + Number(priceChangePercent2)) - 100;
        setChange24(priceChangePercent);
      }
      setIsPair(currentPair.isPair);
    }
  }

  async function getPricesData() {
    if (pythPriceService) {
      const priceList = await getAllPriceData(pythPriceService);
      setAllPrices(priceList);
      setCurrentPrice(Number(priceList[selectedPair]));
      currentPairUpdate();

      setInterval(async () => {
        const priceList = await getAllPriceData(pythPriceService);
        setAllPrices(priceList);
      }, 10000);
      // for (let i = 0; i < allPrices.length; i++) {
      //   const data = allPrices[i];
      //   newPriceData[data.symbol] = {
      //     price: data.lastPrice,
      //     change24: data.priceChangePercent,
      //     high24: data.highPrice,
      //     low24: data.lowPrice,
      //   };
      // }
      // setPriceData(newPriceData);
      // const currentSymbol = pairOptions[selectedPair].binanceValue;
      // setChange24(Number(newPriceData[currentSymbol].change24));
      // setHigh24(Number(newPriceData[currentSymbol].high24));
      // setLow24(Number(newPriceData[currentSymbol].low24));
    }
  }

  useEffect(() => {
    if (address && chain) {
      setChainConstants(getChainConstants(chain.id));
    }
  }, [chain]);

  useEffect(() => {
    if (address && chain) {
      getUserAllowance();
      getBalances();
    }
  }, [address, chainConstants]);

  useEffect(() => {
    currentPairUpdate();
    if (address && chain) {
      getAssetData();
    }
  }, [selectedPair, chain]);

  useEffect(() => {
    if (approved) {
      setApproved(false);
      getUserAllowance();
    }
  }, [approved]);

  useEffect(() => {
    if (userUpdate) {
      setUserUpdate(false);
      getUserAllowance();
      getBalances();
    }
  }, [userUpdate]);

  useEffect(() => {
    setSize((Number(collateral) * multiplier).toString());
  }, [multiplier]);

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    getPricesData();
  }, [pythPriceService]);

  // const updateSelectedPair = (e: any) => {
  //   setSelectedPair(e.index);
  // };

  const setPairIndex = (index: number) => {
    setSelectedPair(index);
  };

  const updateSelectedToken = (token: string) => {
    setCollateralToken(token);
    setProfitToken(token);
  };

  const setPositiveCollateral = (value: string) => {
    if (Number(value) < 0) value = "0";
    setCollateral(value);
    setSize((Number(value) * multiplier).toString());
  };

  const setPositiveSize = (value: string) => {
    if (Number(value) < 0) value = "0";
    setSize(value);
    setCollateral((Number(value) / multiplier).toString());
  };

  const setBaseSlPrice = (price: number) => {
    // 20% loss
    const basePrice = isLong ? price * (1 - 0.2 / multiplier) : price * (1 + 0.2 / multiplier);
    setSlPrice(basePrice.toString());
  };

  const setBaseTpPrice = (price: number) => {
    // 50% profit
    const basePrice = isLong ? price * (1 + 0.5 / multiplier) : price * (1 - 0.5 / multiplier);
    setTpPrice(basePrice.toString());
  };

  const setLimitOrder = (e: any) => {
    setExecutionPrice(currentPrice.toString());
    setBaseSlPrice(currentPrice);
    setBaseTpPrice(currentPrice);
    setIsMarket(false);
  };

  const setExecutionPriceLimit = (value: string) => {
    setExecutionPrice(value);
    if (!useSl) {
      setBaseSlPrice(Number(value));
    }
    if (!useTp) {
      setBaseTpPrice(Number(value));
    }
  };

  const setUseSlOption = (isChecked: boolean) => {
    if (isChecked) {
      setBaseSlPrice(Number(executionPrice));
    } else {
      setSlPrice("0");
    }
    setUseSl(isChecked);
  };

  const setUseTpOption = (isChecked: boolean) => {
    if (isChecked) {
      setBaseTpPrice(Number(executionPrice));
    } else {
      setTpPrice("0");
    }
    setUseTp(isChecked);
  };

  const getAllowance = (): number => {
    if (collateralToken == "usdc") return usdcRouterAllowance;
    else if (collateralToken == "usdt") return usdtRouterAllowance;
    else if (collateralToken == "dai") return daiRouterAllowance;
    return 0;
  };

  const getCollateralBalance = () => {
    if (collateralToken == "usdc") return usdcBalance;
    else if (collateralToken == "usdt") return usdtBalance;
    else if (collateralToken == "dai") return daiBalance;
  };

  const getEntryPrice = () => {
    if (isMarket) {
      return getCurrentPrice();
    } else {
      return Number(executionPrice);
    }
  };

  const getFundingRate = () => {
    if (assetLong + assetShort == 0) {
      return 0;
    } else {
      return (0.01 * (assetLong - assetShort)) / (assetLong + assetShort);
    }
  };

  const getExecutionFeeLimit = () => {
    const gasPrice = gasData?.formatted.gasPrice;
    let numItems = 1;
    if (useSl) numItems += 1;
    if (useTp) numItems += 1;
    return getExecutionFee(gasPrice, numItems);
  };

  const getLiquidationPrice = () => {
    if (isLong) {
      return getEntryPrice() * 1.01 * (1 - 1 / multiplier);
    } else {
      return getEntryPrice() * 0.99 * (1 + 1 / multiplier);
    }
  };

  const getLimitPrice = () => {
    return isLong ? getEntryPrice() * (1 + getSlippage() / 100) : getEntryPrice() * (1 - getSlippage() / 100);
  };

  const getCurrentPrice = () => {
    return isPair ? currentPrice / currentPrice2 : currentPrice;
  };

  const getSlLossPercent = () => {
    const factor = isLong ? 1 : -1;
    return ((factor * ((Number(executionPrice) - Number(slPrice)) * multiplier * 100)) / getCurrentPrice()).toFixed(2);
  };

  const getTpProfitPercent = () => {
    const factor = isLong ? 1 : -1;
    return ((factor * ((Number(tpPrice) - Number(executionPrice)) * multiplier * 100)) / getCurrentPrice()).toFixed(2);
  };

  return (
    <Grid templateColumns="repeat(10, 1fr)" gap={6} px={{ md: "36px" }} py={{ base: "12px", md: "24px" }}>
      <GridItem
        colSpan={{ base: 10, md: 5, lg: 6, xl: 7 }}
        p={2}
        pt={4}
        border={"1"}
        borderWidth={1}
        borderColor={"gray.700"}
      >
        <Box mb={"24px"}>
          <HStack spacing={{ base: 6, md: 12 }}>
            {/* <Select
              useBasicStyles
              colorScheme="whiteAlpha"
              options={pairOptions}
              placeholder="Select Pair"
              onChange={(e) => updateSelectedPair(e)}
              defaultValue={pairOptions[0]}
              components={customAssetSelectComponents}
            /> */}
            <PairSelect
              options={pairOptions}
              pair={pairOptions[selectedPair]}
              setPairIndex={setPairIndex}
              minW={"144px"}
            />
            <Box ml={{ base: 0, md: 10 }}>
              <Text fontSize={{ base: "xs" }} color="whiteAlpha.500">
                PRICE
              </Text>
              <Text color={"gray.500"}>${getCurrentPrice().toFixed(2)}</Text>
            </Box>
            <Box>
              <Text fontSize={{ base: "xs" }} color="whiteAlpha.500">
                24H CHANGE
              </Text>
              <Text color={change24 < 0 ? "red.600" : "green.500"}>{change24.toFixed(2)}%</Text>
            </Box>
            {!isPair && (
              <Show above="lg">
                <Box>
                  <Text fontSize={{ base: "xs" }} color="whiteAlpha.500">
                    24H HIGH
                  </Text>
                  <Text color={"gray.500"}>${high24.toFixed(2)}</Text>
                </Box>
                <Box>
                  <Text fontSize={{ base: "xs" }} color="whiteAlpha.500">
                    24H LOW
                  </Text>
                  <Text color={"gray.500"}>${low24.toFixed(2)}</Text>
                </Box>
              </Show>
            )}
          </HStack>
        </Box>
        <TradingViewWidget symbol={pairOptions[selectedPair].tvSymbol} />
        {address && chainConstants && pythPriceService && (
          <PositionOrderTable
            pythPriceService={pythPriceService}
            address={address}
            chainConstants={chainConstants}
            gasPrice={gasData?.formatted.gasPrice}
            allPrices={allPrices}
            userUpdate={userUpdate}
            setUserUpdate={setUserUpdate}
          />
        )}
      </GridItem>
      <GridItem colSpan={{ base: 10, md: 5, lg: 4, xl: 3 }} p={2}>
        <HStack>
          <Button
            onClick={(e) => setIsLong(true)}
            width={"100%"}
            color={isLong ? "green.400" : "gray"}
            border="1"
            borderColor={"green.400"}
            borderWidth={isLong ? 1 : 0}
            backgroundColor={isLong ? "green.900" : "gray.800"}
            _hover={{ backgroundColor: isLong ? "green.700" : "gray.700" }}
            borderRadius={"16px"}
            py={7}
          >
            <TriangleUpIcon />
            <Text ml={2}>LONG</Text>
          </Button>
          <Button
            width={"100%"}
            color={!isLong ? "red.400" : "gray"}
            border="1"
            borderColor={"red.400"}
            borderWidth={!isLong ? 1 : 0}
            onClick={(e) => setIsLong(false)}
            backgroundColor={!isLong ? "red.900" : "gray.800"}
            _hover={{ backgroundColor: !isLong ? "red.700" : "gray.700" }}
            borderRadius={"16px"}
            py={7}
          >
            <TriangleDownIcon />
            <Text ml={2}>SHORT</Text>
          </Button>
        </HStack>
        <HStack mt={6} mb={2} justifyContent={"center"}>
          <Box
            border={"1"}
            borderBottomWidth={isMarket ? 2 : 0}
            borderColor={"blue.500"}
            bgColor={isMarket ? "#071241" : ""}
            px={4}
          >
            <Text
              fontSize={"lg"}
              color={isMarket ? "white" : "gray.500"}
              onClick={(e) => setIsMarket(true)}
              _hover={{ cursor: "pointer" }}
            >
              Market
            </Text>
          </Box>
          <Box
            border={"1"}
            borderBottomWidth={!isMarket ? 2 : 0}
            borderColor={"blue.500"}
            bgColor={!isMarket ? "#071241" : ""}
            px={4}
          >
            <Text
              fontSize={"lg"}
              color={!isMarket ? "white" : "gray.500"}
              onClick={setLimitOrder}
              _hover={{ cursor: "pointer" }}
            >
              Limit
            </Text>
          </Box>
        </HStack>
        <Box backgroundColor={"#0d152c"} my={2} px={2} py={2} rounded={"lg"} borderTopRadius={"30px"}>
          <HStack my={2}>
            {/* <TokenSelect options={tokenList} value={collateralToken} setValue={updateSelectedToken} /> */}
            <Spacer />
            <Input
              type="number"
              placeholder="0.0"
              value={collateral}
              fontSize={"lg"}
              dir="rtl"
              onChange={(e) => setPositiveCollateral(e.target.value)}
            />
          </HStack>
          <HStack color={"whiteAlpha.500"}>
            <Text fontSize={"sm"}>COLLATERAL</Text>
            <Spacer />
            <Text fontSize={"sm"}>
              Balance: <span style={{ color: "#dddddd" }}>{formatValue(Number(getCollateralBalance()))}</span>
            </Text>
            {<Image src={getTokenIcon(collateralToken)} w={3} />}
          </HStack>
        </Box>
        <Box backgroundColor={"#0d152c"} my={2} px={2} py={2} rounded={"md"}>
          <HStack color={"whiteAlpha.500"}>
            <Text fontSize={"sm"}>POSITION SIZE</Text>
            <Spacer />
            <Text fontSize={"sm"}>
              LEVERAGE: <span style={{ color: "#dddddd", backgroundColor: "gray.700" }}>{multiplier}X</span>
            </Text>
          </HStack>
          <HStack my={2}>
            <Image src={pairOptions[selectedPair].icon} w={6} h={6} />
            <Text>{pairOptions[selectedPair].label}</Text>
            <Spacer />
            <Input
              type="number"
              placeholder="0.0"
              value={size}
              fontSize={"lg"}
              dir="rtl"
              onChange={(e) => setPositiveSize(e.target.value)}
            />
          </HStack>
        </Box>
        <Box backgroundColor={"#0d152c"} my={2} px={2} py={2} rounded={"md"} borderBottomRadius={"30px"}>
          <HStack>
            <Box color={"whiteAlpha.500"} w={"100%"}>
              <Text fontSize={"sm"}>LEVERAGE SLIDER</Text>
              <LeverageSlider multiplier={multiplier} setMultiplier={setMultiplier} />
            </Box>
            <Text bgColor={"gray.700"}>{multiplier.toFixed(1)}X</Text>
          </HStack>
        </Box>
        {!isMarket && (
          <>
            <Box backgroundColor={"#0d152c"} mt={8} mb={1} px={2} py={1} rounded={"md"}>
              <HStack color={"whiteAlpha.500"}>
                <Text>Execution Price</Text>
                <Spacer />
                <Text>Current Price: ${getCurrentPrice().toFixed(2)}</Text>
              </HStack>
              <HStack my={2}>
                <Image src={pairOptions[selectedPair].icon} w={6} h={6} />
                <Text>{pairOptions[selectedPair].label}</Text>
                <Spacer />
                <Input
                  type="number"
                  placeholder={getCurrentPrice().toString()}
                  value={executionPrice}
                  fontSize={"lg"}
                  dir="rtl"
                  onChange={(e) => setExecutionPriceLimit(e.target.value)}
                />
              </HStack>
            </Box>
            <Box>
              <Checkbox colorScheme="red" onChange={(e) => setUseSlOption(e.target.checked)}>
                Stop Loss
              </Checkbox>
            </Box>
            {useSl && (
              <Box backgroundColor={"#0d152c"} my={1} px={2} py={1} rounded={"md"}>
                <HStack color={"whiteAlpha.500"}>
                  <Text>SL Price</Text>
                  <Spacer />
                  <Text>Loss: {getSlLossPercent()}%</Text>
                </HStack>
                <HStack my={2}>
                  <Image src={pairOptions[selectedPair].icon} w={6} h={6} />
                  <Text>{pairOptions[selectedPair].label}</Text>
                  <Spacer />
                  <Input
                    type="number"
                    placeholder={executionPrice}
                    value={slPrice}
                    fontSize={"lg"}
                    dir="rtl"
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
              <Box backgroundColor={"#0d152c"} my={1} px={2} py={1} rounded={"md"}>
                <HStack color={"whiteAlpha.500"}>
                  <Text>TP Price</Text>
                  <Spacer />
                  <Text>Profit: {getTpProfitPercent()}%</Text>
                </HStack>
                <HStack my={2}>
                  <Text fontSize={"xs"} align={"right"} color={"gray.400"}>
                    Profit token:
                  </Text>
                  {/* <TokenSelect value={profitToken} setValue={setProfitToken} options={tokenList} /> */}
                  <Spacer />
                  <Input
                    type="number"
                    placeholder={getCurrentPrice().toString()}
                    value={tpPrice}
                    fontSize={"lg"}
                    dir="rtl"
                    onChange={(e) => setTpPrice(e.target.value)}
                  />
                </HStack>
              </Box>
            )}
          </>
        )}
        <Flex direction={"column"} gap={2} mt={4} backgroundColor={"#040a1a"} color={"gray.500"} p={2} rounded={"md"}>
          <HStack>
            <Text>Entry Price:</Text>
            <Tooltip label="The price at which the position will be taken" fontSize="xs">
              <InfoOutlineIcon w={3} h={3} />
            </Tooltip>
            <Spacer />
            <Text color={"gray.400"}>${getEntryPrice().toFixed(2)}</Text>
          </HStack>
          <HStack>
            <Text>Liquidation Price:</Text>
            <Tooltip
              label="Liquidation Price will change with time due to funding rate and borrowing fees"
              fontSize="xs"
            >
              <InfoOutlineIcon w={3} h={3} />
            </Tooltip>
            <Spacer />
            <Text color={"gray.400"}>${getLiquidationPrice().toFixed(2)}</Text>
          </HStack>
          <HStack>
            <Text>Funding Rate:</Text>
            <Tooltip
              label={
                <Text>
                  +ve Funding Rate means that fees will be received
                  <br />
                  -ve Funding rate means that fees will be deducted
                </Text>
              }
              fontSize="xs"
            >
              <InfoOutlineIcon w={3} h={3} />
            </Tooltip>
            <Spacer />
            <Text color={"gray.400"}>
              {assetLong >= assetShort ? (isLong ? "-" : "+") : isLong ? "+" : "-"}
              {Math.abs(getFundingRate()).toFixed(4)}% / hr
            </Text>
          </HStack>
          <HStack>
            <Text>Borrowing Fees:</Text>
            <Tooltip
              label="Fees deducted for taking leverage. Becomes significant if position is left unattended"
              fontSize="xs"
            >
              <InfoOutlineIcon w={3} h={3} />
            </Tooltip>
            <Spacer />
            <Text color={"gray.400"}>-{pairOptions[selectedPair].borrowFee}% / hr</Text>
          </HStack>
          {!isMarket && (
            <HStack>
              <Text>Execution Gas Fees:</Text>
              <Tooltip label="Gas fees required to execute limit orders timely" fontSize="xs">
                <InfoOutlineIcon w={3} h={3} />
              </Tooltip>
              <Spacer />
              <Text>
                {getExecutionFeeLimit().toFixed(4)} {chainConstants?.NATIVE_SYMBOL}
              </Text>
            </HStack>
          )}
        </Flex>
        {!isMarket && (
          <Text fontStyle={"italic"} fontSize={"sm"} p={1} color={"gray"}>
            Note: Limit/Trigger Orders are not guaranteed to be executed and will expire after 24 hrs.
          </Text>
        )}
        {chainConstants && pythPriceService && (
          <Box mt={2}>
            {getAllowance() >= Number(collateral) ? (
              isMarket ? (
                <MarketPositionBtn
                  pythPriceService={pythPriceService}
                  pythAddress={chainConstants.PYTH_DATA_SOURCE}
                  contract={chainConstants.TRADE_ROUTER_ADDRESS}
                  assetIndex={pairOptions[selectedPair].assetIndex}
                  amount={collateral}
                  multiplier={multiplier}
                  limitPrice={getLimitPrice().toString()}
                  isLong={isLong}
                  collateralToken={getTokenAddress(chainConstants, collateralToken)}
                  setUserUpdate={setUserUpdate}
                />
              ) : (
                <LimitOrderBtn
                  contract={chainConstants.TRADE_ROUTER_ADDRESS}
                  assetIndex={pairOptions[selectedPair].assetIndex}
                  collateral={collateral}
                  multiplier={multiplier}
                  executionPrice={executionPrice}
                  executionFee={getExecutionFeeLimit().toString()}
                  slPrice={slPrice}
                  tpPrice={tpPrice}
                  isLong={isLong}
                  collateralToken={getTokenAddress(chainConstants, collateralToken)}
                  profitToken={getTokenAddress(chainConstants, profitToken)}
                  setUserUpdate={setUserUpdate}
                />
              )
            ) : (
              <ApproveBtn
                contract={getTokenAddress(chainConstants, collateralToken)}
                spender={chainConstants?.TRADE_ROUTER_ADDRESS}
                amount={parseUnits(collateral, getTokenDecimals(collateralToken))}
                setApproved={setApproved}
              />
            )}
          </Box>
        )}
      </GridItem>
    </Grid>
  );
}
