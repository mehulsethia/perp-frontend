import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
  Popover,
  PopoverAnchor,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  useMultiStyleConfig,
  useTab,
  VStack,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { readContracts, useAccount, useContractWrite, useFeeData, useNetwork, useWaitForTransaction } from "wagmi";
import { readContract } from "@wagmi/core";
import { BERA_CONSTANTS, CHAIN_CONSTANTS, getBeraChainConstants, getChainConstants } from "../constants/addresses";
import { getTokenAddress, getTokenDecimals, getTokenLpAddress } from "../helpers/token";
import { ERC20ABI, PoolABI } from "../abi";
import { Abi, Address, formatUnits, parseUnits } from "viem";
import { formatValue, formatValueDigits, trim } from "../helpers/trim";
import TokenSelect from "../components/tokenSelect";
import { getTokensList, Token, tokens } from "../constants/tokens";
import { InfoIcon, InfoOutlineIcon, LinkIcon, SettingsIcon, UpDownIcon } from "@chakra-ui/icons";
import { ApproveBtn } from "../components/transactions/approveBtn";
import { SwapBtn } from "../components/transactions/swapBtn";
import { DEFAULT_BUFFER, DEFAULT_DEADLINE, DEFAULT_SLIPPAGE } from "../constants/settings";
import { getSlippage } from "../helpers/utils";
import { FaWallet } from "react-icons/fa";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import SwapIcon from "../assets/icons/swap.svg";
import ArrowSwapIcon from "../assets/icons/Arrow_Swap.svg";
import { getExecutionFee } from "../helpers/network";
import axios from "axios";
import ArrowBackIcon from "../assets/icons/Arrow_Back.svg";
import SellIcon from "../assets/icons/sell_token.svg";
import ReceiveIcon from "../assets/icons/receive_token.svg";
import DashArrowIcon from "../assets/icons/dash_arrow.svg";
import Logo from "../assets/icons/logos/logo_white.svg";
import Loading from "../assets/icons/Loading.png";
import Completed from "../assets/icons/completed.svg";
import { BigNumber } from "ethers"; // If you're using BigNumber for balance
import defaultBG from "../assets/images/defaultBG.svg";
import polygonBG from "../assets/images/polygonBG.svg";
import mBG from "../assets/images/mBG.svg";
import beraBG from "../assets/images/beraBG.svg";

const chainMoonImgs: any = {
  919: mBG,
  137: polygonBG,
  1101: polygonBG,
  80084: beraBG,
};

const CustomTab = React.forwardRef<HTMLButtonElement, any>((props, ref) => {
  const activeTabBg = useColorModeValue("white", "#28294B");
  const color = useColorModeValue("blackAlpha.900", "white");
  const tabProps = useTab({ ...props, ref });
  const isSelected = !!tabProps["aria-selected"];

  // 2. Hook into the Tabs `size`, `variant`, props
  const styles = useMultiStyleConfig("Tabs", tabProps);

  return (
    <Button
      __css={styles.tab}
      {...tabProps}
      bg={isSelected ? activeTabBg : "transparent"}
      borderRadius={"0.375rem"}
      py="0.375rem"
      px="0.625rem"
      border={"none"}
      fontSize={"0.625rem"}
      color={color}
      fontWeight={500}
      m="0"
    >
      {tabProps.children}
    </Button>
  );
});

export default function Swap() {
  const { address, isConnected } = useAccount();
  const { data: gasData } = useFeeData();
  const { chain } = useNetwork();

  const { isOpen: isOpenSettings, onOpen: onOpenSettings, onClose: onCloseSettings } = useDisclosure();

  const [slippage, setSlippage] = useState<string>(localStorage.getItem("mantis_perp_slippage") || DEFAULT_SLIPPAGE);
  const [feeBuffer, setFeeBuffer] = useState<number>(
    Number(localStorage.getItem("mantis_perp_fee_buffer")) || DEFAULT_BUFFER
  );
  const [transactionDeadLine, setTransactionDeadLine] = useState<number>(
    Number(localStorage.getItem("mantis_perp_transaction_deadline")) || DEFAULT_DEADLINE
  );

  const [chainConstants, setChainConstants] = useState<CHAIN_CONSTANTS | any>(undefined);

  const [quantityFrom, setQuantityFrom] = useState<string>("");
  const [quantityTo, setQuantityTo] = useState<string>("");
  const [tokenFrom, setTokenFrom] = useState<string>("");
  const [tokenTo, setTokenTo] = useState<string>("");

  const [haircut, setHaircut] = useState<string>("");
  const [swapText, setSwapText] = useState<string>("Confirm Swap");
  const [previewText, setPreviewText] = useState<string>("Preview");

  const [rate, setRate] = useState<string>("");
  const [priceImpact, setPriceImpact] = useState<string>("");

  const [swapBtnDisabled, setSwapBtnDisabled] = useState<boolean>(true);

  const [tokenList, setTokenList] = useState<Token[] | any>([]);

  const [usdcBalance, setUsdcBalance] = useState<string>("");
  const [usdtBalance, setUsdtBalance] = useState<string>("");
  const [daiBalance, setDaiBalance] = useState<string>("");

  const [usdcAllowance, setUsdcAllowance] = useState<number>(0);
  const [usdtAllowance, setUsdtAllowance] = useState<number>(0);
  const [daiAllowance, setDaiAllowance] = useState<number>(0);
  const [approved, setApproved] = useState<boolean>(false);
  const [swapCompleted, setSwapCompleted] = useState<boolean>(false);
  const [swapLoading, setSwapLoading] = useState<boolean>(false);

  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [isPriceLoading, setIsPriceLoading] = useState<boolean>(false);

  type ContractInput = {
    address: Address; // Address is a string or type alias provided by Wagmi
    abi: Abi; // Abi can be any valid ABI array
    functionName: string;
    args: any[];
  };

  useEffect(() => {
    if (chain?.id && address && chainConstants) {
      const tokensList = getTokensList(chain?.id);
      const contracts: ContractInput[] = tokensList?.map((token) => ({
        address: token.address,
        abi: ERC20ABI,
        functionName: "balanceOf",
        args: [address],
      }));
      const allowanceContracts: ContractInput[] = tokensList?.map((token) => ({
        address: token.address,
        abi: ERC20ABI,
        functionName: "allowance",
        args: [address, chainConstants.POOL_ADDRESS],
      }));
      const getContracts = async () => {
        const data = await readContracts({
          contracts: contracts,
        });
        const allowanceData = await readContracts({
          contracts: allowanceContracts,
        });

        const updatedTokenList = tokensList?.map((token: Token, index: number) => {
          if (data[index].status === "success") {
            const result = data[index]?.result as string | BigNumber;
            const allowanceResult = allowanceData[index]?.result as string | number | bigint | boolean;
            const balance = typeof result === "string" ? BigInt(result) : BigInt(result.toString());
            const allowance = typeof result === "string" ? BigInt(allowanceResult) : BigInt(allowanceResult.toString());

            return {
              ...token,
              balance: formatUnits(balance, getTokenDecimals(token.name.toLowerCase())),
              allowance: formatUnits(allowance, getTokenDecimals(token.name.toLowerCase())),
            };
          }
          return token;
        });
        setTokenList(updatedTokenList);
      };
      getContracts();
      setTokenList(tokensList);
    }
  }, [chain?.id, address, approved, chainConstants, swapCompleted]);

  const gasPrice = useMemo(() => {
    let gasInGwei = Number(gasData?.formatted?.gasPrice);
    const executionFee = 500;
    const premiumMultiplier = 1 + Number(localStorage.getItem("mantis_perp_fee_buffer") || 20) / 100;
    return ((executionFee * gasInGwei * premiumMultiplier) / 1000000).toFixed(4);
  }, [gasData?.formatted?.gasPrice]);

  const setPositiveSlippage = (value: string) => {
    if (Number(value) >= 0 && Number(value) <= 100) {
      setSlippage(value);
      localStorage.setItem("mantis_perp_slippage", value.toString());
    } else {
      setSlippage(DEFAULT_SLIPPAGE);
      localStorage.setItem("mantis_perp_slippage", DEFAULT_SLIPPAGE.toString());
    }
  };

  const setPositiveFeeBuffer = (value: number) => {
    if (value >= 0) {
      setFeeBuffer(value);
      localStorage.setItem("mantis_perp_fee_buffer", value.toString());
    } else {
      setFeeBuffer(DEFAULT_BUFFER);
      localStorage.setItem("mantis_perp_fee_buffer", DEFAULT_BUFFER.toString());
    }
  };

  const setPositiveTransactionDeadLine = (value: number) => {
    if (value >= 0) {
      setTransactionDeadLine(value);
      localStorage.setItem("mantis_perp_transaction_deadline", value.toString());
    } else {
      setTransactionDeadLine(DEFAULT_DEADLINE);
      localStorage.setItem("mantis_perp_transaction_deadline", DEFAULT_DEADLINE.toString());
    }
  };

  // async function getTokenPricesInUSD(tokenIds: string[]) {
  //   try {
  //     // Join the token IDs into a comma-separated string
  //     const tokenIdsString = tokenIds.join(",");

  //     // Fetch prices from CoinGecko for the list of tokens
  //     const response = await axios.get(
  //       `https://api.coingecko.com/api/v3/simple/price?ids=${tokenIdsString}&vs_currencies=usd`
  //     );

  //     // Log and return the prices
  //     const prices = response.data;
  //     console.log("Token Prices:", prices);
  //     return prices;
  //   } catch (error) {
  //     console.error("Error fetching token prices:", error);
  //   }
  // }

  // const currentTokenPrice = useMemo(async () => {
  //   if ((tokenFrom || tokenTo) && chainConstants) {
  //     const tokenIds = [tokenFrom, tokenTo];
  //     return await getTokenPricesInUSD(tokenIds);
  //   }
  //   return {
  //     tokenFromPrice: 0,
  //     tokenToPrice: 0,
  //   };
  // }, [chainConstants, tokenFrom, tokenTo]);
  // console.log(currentTokenPrice);
  async function getUserAllowance() {
    if (address && chainConstants) {
      const data = await readContracts({
        contracts: [
          {
            address: getTokenAddress(chainConstants, "usdc"),
            abi: ERC20ABI,
            functionName: "allowance",
            args: [address, chainConstants.POOL_ADDRESS],
          },
          {
            address: getTokenAddress(chainConstants, "usdt"),
            abi: ERC20ABI,
            functionName: "allowance",
            args: [address, chainConstants.POOL_ADDRESS],
          },
          {
            address: getTokenAddress(chainConstants, "dai"),
            abi: ERC20ABI,
            functionName: "allowance",
            args: [address, chainConstants.POOL_ADDRESS],
          },
        ],
      });

      if (data[0].status == "success") {
        setUsdcAllowance(Number(formatUnits(data[0].result, getTokenDecimals("usdc"))));
      }
      if (data[1].status == "success") {
        setUsdtAllowance(Number(formatUnits(data[1].result, getTokenDecimals("usdt"))));
      }
      if (data[2].status == "success") {
        setDaiAllowance(Number(formatUnits(data[2].result, getTokenDecimals("dai"))));
      }
    }
  }

  async function getUserData() {
    if (address && chainConstants) {
      const data = await readContracts({
        contracts: [
          {
            address: getTokenAddress(chainConstants, "usdc"),
            abi: ERC20ABI,
            functionName: "balanceOf",
            args: [address],
          },
          {
            address: getTokenAddress(chainConstants, "usdt"),
            abi: ERC20ABI,
            functionName: "balanceOf",
            args: [address],
          },
          {
            address: getTokenAddress(chainConstants, "dai"),
            abi: ERC20ABI,
            functionName: "balanceOf",
            args: [address],
          },
        ],
      });

      if (data[0].status == "success") {
        setUsdcBalance(formatUnits(data[0].result, getTokenDecimals("usdc")));
      }
      if (data[1].status == "success") {
        setUsdtBalance(formatUnits(data[1].result, getTokenDecimals("usdt")));
      }
      if (data[2].status == "success") {
        setDaiBalance(formatUnits(data[2].result, getTokenDecimals("dai")));
      }
    }
  }

  // useEffect(() => {
  //   if (chainConstants) {
  //     getUserAllowance();
  //     getUserData();
  //   }
  // }, [chainConstants]);

  useEffect(() => {
    if (address && chain) {
      if (chain.id === 80084) {
        setChainConstants(getBeraChainConstants());
      } else {
        setChainConstants(getChainConstants(chain.id));
      }
    }
  }, [address, chain]);

  // useEffect(() => {
  //   if (approved) {
  //     // setApproved(false);
  //     getUserAllowance();
  //   }
  // }, [approved]);

  // useEffect(() => {
  //   if (swapCompleted) {
  //     // setSwapCompleted(false);
  //     getUserData();
  //     getUserAllowance();
  //   }
  // }, [swapCompleted]);

  const getAllowance = (tokenName: string): number => {
    return tokenList?.find((token: Token) => token?.name === tokenName)?.allowance;
  };

  const getTokenBalance = useCallback(
    (token: string): string => {
      if (token == "usdc") return usdcBalance;
      else if (token == "usdt") return usdtBalance;
      else if (token == "dai") return daiBalance;
      return "";
    },
    [usdcBalance, usdtBalance, daiBalance]
  );

  const getMinimumReceived = () => {
    return formatValueDigits((Number(quantityTo) * (1 - getSlippage() / 100)).toString(), 4);
  };

  const hasAllowance = () => {
    return getAllowance(tokenFrom) >= Number(quantityFrom);
  };
  const tokenFromBalance = useMemo((): string => {
    return tokenList?.find((token: Token) => token?.name === tokenFrom)?.balance || "0";
  }, [tokenFrom, tokenList]);

  const tokenToBalance = useMemo((): string => {
    return tokenList?.find((token: Token) => token?.name === tokenTo)?.balance || "0";
  }, [tokenTo, tokenList]);

  const switchToken = () => {
    const oldTokenFrom = tokenFrom;
    setTokenFrom(tokenTo);
    setTokenTo(oldTokenFrom);
    const tokenBalance = Number(tokenToBalance);

    if (Number(quantityFrom) === 0) {
      setSwapBtnDisabled(true);
      setSwapText("Confirm Swap");
      setPreviewText("Preview");
    } else if (Number(quantityFrom) > tokenBalance) {
      setSwapText("Insufficient Balance");
      setPreviewText("Insufficient Balance");
      setSwapBtnDisabled(true);
      if (Number(quantityFrom) > 999999999999) {
        setQuantityFrom("");
      }
    } else {
      setSwapBtnDisabled(false);
      setSwapText("Confirm Swap");
      setPreviewText("Preview");
    }
  };

  const setNewTokenFrom = (token: string) => {
    if (tokenTo == token) {
      setTokenTo("");
    }
    setTokenFrom(token);
  };

  const setPositiveQuantityFrom = useCallback(
    (value: string) => {
      if (isPriceLoading) {
        return;
      }
      value = value.replace(/[^\d.]/g, "");
      Number(value) >= 0 ? setQuantityFrom(value) : setQuantityFrom("");
      let tokenBalance = Number.MAX_SAFE_INTEGER;
      if (tokenFrom) {
        tokenBalance = Number(tokenFromBalance);
      }

      if (Number(value) === 0) {
        setSwapBtnDisabled(true);
        setSwapText("Confirm Swap");
        setPreviewText("Preview");
      } else if (Number(value) > tokenBalance) {
        setSwapText("Insufficient Balance");
        setPreviewText("Insufficient Balance");
        setSwapBtnDisabled(true);
        if (Number(value) > 999999999999) {
          setQuantityFrom("");
        }
      } else {
        if (tokenFrom && tokenTo) {
          setSwapBtnDisabled(false);
          setSwapText("Confirm Swap");
          setPreviewText("Preview");
        }
      }
    },
    [tokenFrom, tokenTo, tokenFromBalance, isPriceLoading]
  );

  useEffect(() => {
    if (tokenFrom && tokenTo) {
      setPositiveQuantityFrom(quantityFrom);
    }
  }, [tokenFrom, tokenTo, setPositiveQuantityFrom, quantityFrom]);

  const setMax = () => {
    setPositiveQuantityFrom(tokenFromBalance);
  };

  const tokenFromLPAddress = useMemo(
    () => tokenList?.find((token: Token) => token.name === tokenFrom)?.lpAddress,
    [tokenList, tokenFrom]
  );
  const tokenToLPAddress = useMemo(
    () => tokenList?.find((token: Token) => token.name === tokenTo)?.lpAddress,
    [tokenList, tokenTo]
  );

  const quantityFromChange = useCallback(
    async (value: string) => {
      let toAmount = 0;
      if (Number(value) > 0 && chainConstants && tokenFrom && tokenTo) {
        try {
          setIsPriceLoading(true);
          const contractValue = parseUnits(value, getTokenDecimals(tokenFrom.toLowerCase()));
          const tokenToDecimals = getTokenDecimals(tokenTo.toLowerCase());
          const quoteData = await readContract({
            address: chainConstants.POOL_ADDRESS,
            abi: PoolABI,
            functionName: "getSwapAmount",
            args: [tokenFromLPAddress, tokenToLPAddress, contractValue, false, BigInt(0), BigInt(0)],
          });
          toAmount = Number(formatUnits(quoteData[0], tokenToDecimals));
          const feeAmount = Number(formatUnits(quoteData[1], tokenToDecimals));
          const lpAmount = Number(formatUnits(quoteData[3], tokenToDecimals));
          setHaircut(formatValueDigits(feeAmount + lpAmount, 6));
          setQuantityTo(formatValueDigits(toAmount, 6));
          setRate(formatValueDigits(Number(toAmount) / Number(value), 4));
          setPriceImpact(
            formatValueDigits(
              ((Number(toAmount) + Number(feeAmount) + Number(lpAmount) - Number(value)) * -100) / Number(value),
              4
            )
          );
          setIsPriceLoading(false);
        } catch (e: any) {
          console.log(e);
          setIsPriceLoading(false);
        }
      } else {
        setQuantityTo("");
      }
    },
    [chainConstants, tokenFrom, tokenFromLPAddress, tokenTo, tokenToLPAddress]
  );

  useEffect(() => {
    const timeOutId = setTimeout(() => quantityFromChange(quantityFrom), 250);
    return () => clearTimeout(timeOutId);
  }, [quantityFrom, quantityFromChange]);

  const handleClose = () => {
    setIsPreview(false);
    setSwapCompleted(false);
    setApproved(false);
    setSwapLoading(false);
    setPreviewText("Preview");
    setTokenFrom("");
    setTokenTo("");
    setQuantityFrom("");
    setQuantityTo("");
    setSwapBtnDisabled(true);
  };

  const swapIcon = useColorModeValue(SwapIcon, SwapIcon);
  const swapArrowIcon = useColorModeValue(ArrowSwapIcon, ArrowSwapIcon);

  const bg = useColorModeValue("white", "#1B1C39");
  const swapIconbg = useColorModeValue("white", "#28294B");
  const inputBoxBg = useColorModeValue("white", "#0B0B20");
  const slippageBoxBg = useColorModeValue("white", "#2F3055");
  const lightBg = useColorModeValue("blackAlpha.100", "whiteAlpha.100");
  const hoverBg = useColorModeValue("blackAlpha.300", "whiteAlpha.300");
  const borderColor = useColorModeValue("blackAlpha.300", "rgba(255, 255, 255, 0.07)");
  const darkBorderColor = useColorModeValue("blackAlpha.300", "rgba(255, 255, 255, 0.14)");
  const darkerBorderColor = useColorModeValue("blackAlpha.300", "rgba(255, 255, 255, 0.3)");
  const color = useColorModeValue("blackAlpha.900", "white");
  const hoverColor = useColorModeValue("black", "white");
  const lightColor = useColorModeValue("blackAlpha.600", "rgba(255, 255, 255, 0.6)");
  const buttonColor = useColorModeValue("whiteAlpha.900", "white");
  const greenBGColor = useColorModeValue("whiteAlpha.900", "#008D5B33");
  const lightGreenTextColor = useColorModeValue("whiteAlpha.900", "#30E0A1");
  const activeFontColor = useColorModeValue("blackAlpha.800", "#0080FF");
  const buttonBgColor = useColorModeValue("blackAlpha.800", "#0080FF");
  const shadow = useColorModeValue(
    "drop-shadow(0px 4px 32px rgba(255,255,255,0.05))",
    "drop-shadow(0px 4px 32px #23232314)"
  );

  const spin = keyframes`  
  from {transform: rotate(0deg);}   
  to {transform: rotate(360deg)} 
`;

  const spinAnimation = `${spin} infinite 1s linear`;

  const tokenFromIcon = useMemo(
    () => tokenList?.find((token: Token) => token.name === tokenFrom)?.img || SellIcon,
    [tokenList, tokenFrom]
  );
  const tokenFromAddress = useMemo(
    () => tokenList?.find((token: Token) => token.name === tokenFrom)?.address,
    [tokenList, tokenFrom]
  );
  const tokenToIcon = useMemo(
    () => tokenList?.find((token: Token) => token.name === tokenTo)?.img || ReceiveIcon,
    [tokenList, tokenTo]
  );
  const tokenToAddress = useMemo(
    () => tokenList?.find((token: Token) => token.name === tokenTo)?.address,
    [tokenList, tokenTo]
  );

  const bgImg = React.useMemo(() => {
    return chain ? chainMoonImgs?.[chain?.id] || defaultBG : defaultBG;
  }, [chain]);

  return (
    <Box
      h={"100%"}
      w={"100%"}
      bgColor={bg}
      bg={`url(${bgImg})`}
      bgPos={"bottom"}
      bgSize={{ base: "contain", xl: "cover" }}
      bgRepeat={"no-repeat"}
    >
      <Box
        w={{ base: "sm", md: "31.063rem", sm: "80%" }}
        borderWidth="0.1rem"
        borderColor={borderColor}
        borderRadius={"2rem"}
        p="1rem"
        bgColor={bg}
        mx="auto"
        filter={shadow}
        boxShadow="xl"
        display="flex"
        flexDir={"column"}
        gap={"1.875rem"}
        my={"4%"}
      >
        {swapLoading ? (
          <VStack gap="1.875rem" pb="1rem">
            <Image src={Loading} alt="loading" animation={spinAnimation} />
            <VStack gap="0.625rem">
              <Text bg={greenBGColor} fontWeight={400} borderRadius={"0.625rem"} px="0.875rem">
                You are almost done!
              </Text>
              <Text fontSize={"1.25rem"} color={color}>
                waiting for token...
              </Text>
            </VStack>
          </VStack>
        ) : swapCompleted ? (
          <VStack gap="2.813rem" pb="1rem">
            <VStack w="100%" py="2.5rem" px="6.438rem" borderRadius="1.25rem" gap={"0.625rem"} bg={inputBoxBg}>
              <Image src={Completed} alt="completed" />
              <Text color={color} fontSize={"1.25rem"}>
                Transaction Successful
              </Text>
            </VStack>
            <HStack>
              <Text fontSize={"0.875rem"} color={color}>
                You just swapped
              </Text>
              <Text
                px="0.5rem"
                py="0.375"
                color={color}
                borderRadius={"0.625rem"}
                fontSize={"0.75rem"}
                gap={"0.625rem"}
                bg={slippageBoxBg}
              >{`${quantityFrom} ${tokenFrom?.toLocaleUpperCase()}`}</Text>
              <Text color={color} fontSize={"0.875rem"}>
                to
              </Text>
              <Text
                px="0.5rem"
                py="0.375"
                color={color}
                borderRadius={"0.625rem"}
                fontSize={"0.75rem"}
                gap={"0.625rem"}
                bg={slippageBoxBg}
              >{`${quantityTo} ${tokenTo?.toLocaleUpperCase()}`}</Text>
            </HStack>
          </VStack>
        ) : (
          <>
            <VStack>
              {isPreview ? (
                <HStack pl={"0.625rem"} gap={"0.625rem"} w={"100%"}>
                  <Image alt="Swap" src={ArrowBackIcon} onClick={() => setIsPreview(false)} cursor={"pointer"} />
                  <Text fontSize={"1.25rem"} color={color}>
                    Swap
                  </Text>
                </HStack>
              ) : (
                <HStack w={"100%"}>
                  <HStack px={"0.781rem"} gap={"0.625rem"}>
                    <Image alt="Swap" src={swapIcon} />
                    <Text fontSize={"1.25rem"} color={color}>
                      Swap
                    </Text>
                  </HStack>
                  <Spacer />
                  <HStack w="6.188rem" h="2rem" bg={slippageBoxBg} p="0.25rem" gap="0.625rem" borderRadius={"0.625rem"}>
                    <Text
                      fontSize={"0.625rem"}
                      px="0.625rem"
                      py="0.313rem"
                      bg={bg}
                      color={color}
                      borderRadius={"0.375rem"}
                    >
                      Slippage
                    </Text>
                    <Text fontSize={"0.625rem"} color={color}>
                      {slippage}%
                    </Text>
                  </HStack>
                  <Popover
                    isOpen={isOpenSettings}
                    onClose={onCloseSettings}
                    onOpen={onOpenSettings}
                    placement="bottom-end"
                  >
                    <PopoverAnchor>
                      <Button
                        bg={"transparent"}
                        p="0"
                        onClick={onOpenSettings}
                        color={color}
                        _hover={{ bg: "transparent" }}
                      >
                        <SettingsIcon fontSize={"16px"} />
                      </Button>
                    </PopoverAnchor>
                    <PopoverContent
                      bgColor={swapIconbg}
                      width={"16rem"}
                      borderColor={borderColor}
                      borderRadius={"1.25rem"}
                      p={"1rem"}
                    >
                      <PopoverBody p="0">
                        <VStack gap="1.438rem">
                          <VStack gap="0.875rem" w="100%">
                            <HStack gap="0.375rem" w="100%">
                              <Text fontSize={"0.875rem"} color={color}>
                                Allowed Slippage
                              </Text>
                              <InfoOutlineIcon w={3} h={3} />
                            </HStack>
                            <HStack w={"100%"}>
                              <Tabs
                                w={"100%"}
                                defaultIndex={localStorage.getItem("IS_SLIPPAGE_AUTO") === "false" ? 1 : 0}
                              >
                                <HStack w={"100%"} justifyContent={"space-between"}>
                                  <TabList bg={bg} borderRadius={"0.625rem"} px="0.25rem" py="0.25rem" border={"none"}>
                                    <CustomTab
                                      onClick={() => {
                                        setSlippage(DEFAULT_SLIPPAGE);
                                        localStorage.setItem("IS_SLIPPAGE_AUTO", "true");
                                        localStorage.setItem("mantis_perp_slippage", DEFAULT_SLIPPAGE.toString());
                                      }}
                                    >
                                      Auto
                                    </CustomTab>
                                    <CustomTab
                                      onClick={() => {
                                        localStorage.setItem("IS_SLIPPAGE_AUTO", "false");
                                      }}
                                    >
                                      Custom
                                    </CustomTab>
                                  </TabList>
                                  <TabPanels>
                                    <TabPanel p="0">
                                      <Input
                                        placeholder={DEFAULT_SLIPPAGE.toString()}
                                        value={slippage}
                                        type="text"
                                        pattern="^[0-9]*[.,]?[0-9]*$"
                                        onChange={(e) => setPositiveSlippage(DEFAULT_SLIPPAGE)}
                                        h="2rem"
                                        w="3.813rem"
                                        bg={bg}
                                        borderColor={darkBorderColor}
                                        borderRadius={"0.625rem"}
                                        borderWidth={"0.5px"}
                                        float={"right"}
                                        fontSize={"0.625rem"}
                                        disabled
                                      />
                                    </TabPanel>
                                    <TabPanel p="0">
                                      <Input
                                        placeholder={DEFAULT_SLIPPAGE.toString()}
                                        value={slippage}
                                        type="text"
                                        pattern="^[0-9]*[.,]?[0-9]*$"
                                        h="2rem"
                                        w="3.813rem"
                                        bg={bg}
                                        borderColor={darkBorderColor}
                                        borderRadius={"0.625rem"}
                                        borderWidth={"0.5px"}
                                        float={"right"}
                                        fontSize={"0.625rem"}
                                        onChange={(e) => setPositiveSlippage(e.target.value)}
                                      />
                                    </TabPanel>
                                  </TabPanels>
                                </HStack>
                              </Tabs>
                            </HStack>
                          </VStack>
                          <VStack gap="0.875rem" w="100%">
                            <HStack gap="0.375rem" w="100%">
                              <Text fontSize={"0.875rem"} color={color}>
                                Execution Fees Buffer
                              </Text>
                              <Tooltip
                                label="Execution fees premium that will be applied on limit orders. If this is too low then orders may not execute on time"
                                fontSize="sm"
                              >
                                <InfoOutlineIcon w={3} h={3} />
                              </Tooltip>
                            </HStack>
                            <HStack w={"100%"}>
                              <Tabs
                                w={"100%"}
                                defaultIndex={localStorage.getItem("IS_BUFFER_AUTO") === "false" ? 1 : 0}
                              >
                                <HStack w={"100%"} justifyContent={"space-between"}>
                                  <TabList bg={bg} borderRadius={"0.625rem"} px="0.25rem" py="0.25rem" border={"none"}>
                                    <CustomTab
                                      onClick={() => {
                                        setFeeBuffer(DEFAULT_BUFFER);
                                        localStorage.setItem("IS_BUFFER_AUTO", "true");
                                        localStorage.setItem("mantis_perp_fee_buffer", DEFAULT_BUFFER.toString());
                                      }}
                                    >
                                      Auto
                                    </CustomTab>
                                    <CustomTab
                                      onClick={() => {
                                        localStorage.setItem("IS_BUFFER_AUTO", "false");
                                      }}
                                    >
                                      Custom
                                    </CustomTab>
                                  </TabList>
                                  <TabPanels>
                                    <TabPanel p="0">
                                      <Input
                                        placeholder="20"
                                        value={feeBuffer}
                                        type="text"
                                        pattern="^[0-9]*[.,]?[0-9]*$"
                                        onChange={(e) => setPositiveFeeBuffer(DEFAULT_BUFFER)}
                                        h="2rem"
                                        w="3.813rem"
                                        bg={bg}
                                        borderColor={darkBorderColor}
                                        borderRadius={"0.625rem"}
                                        float={"right"}
                                        borderWidth={"0.5px"}
                                        fontSize={"0.625rem"}
                                        disabled
                                      />
                                    </TabPanel>
                                    <TabPanel p="0">
                                      <Input
                                        placeholder="20"
                                        value={feeBuffer}
                                        type="text"
                                        pattern="^[0-9]*[.,]?[0-9]*$"
                                        onChange={(e) => setPositiveFeeBuffer(Number(e.target.value))}
                                        h="2rem"
                                        w="3.813rem"
                                        bg={bg}
                                        borderColor={darkBorderColor}
                                        borderRadius={"0.625rem"}
                                        borderWidth={"0.5px"}
                                        fontSize={"0.625rem"}
                                        float={"right"}
                                      />
                                    </TabPanel>
                                  </TabPanels>
                                </HStack>
                              </Tabs>
                            </HStack>
                          </VStack>
                          <VStack gap="0.875rem" w="100%">
                            <HStack gap="0.375rem" w="100%">
                              <Text fontSize={"0.875rem"} color={color}>
                                Transaction Deadline
                              </Text>
                              <InfoOutlineIcon w={3} h={3} />
                            </HStack>
                            <HStack w={"100%"}>
                              <Tabs
                                w={"100%"}
                                defaultIndex={localStorage.getItem("IS_DEADLINE_AUTO") === "false" ? 1 : 0}
                              >
                                <HStack w={"100%"} justifyContent={"space-between"}>
                                  <TabList bg={bg} borderRadius={"0.625rem"} px="0.25rem" py="0.25rem" border={"none"}>
                                    <CustomTab
                                      onClick={() => {
                                        setTransactionDeadLine(DEFAULT_DEADLINE);
                                        localStorage.setItem("IS_DEADLINE_AUTO", "true");
                                        localStorage.setItem(
                                          "mantis_perp_transaction_deadline",
                                          DEFAULT_DEADLINE.toString()
                                        );
                                      }}
                                    >
                                      Auto
                                    </CustomTab>
                                    <CustomTab
                                      onClick={() => {
                                        localStorage.setItem("IS_DEADLINE_AUTO", "false");
                                      }}
                                    >
                                      Custom
                                    </CustomTab>
                                  </TabList>
                                  <TabPanels display={"flex"} justifyContent={"flex-end"}>
                                    <TabPanel w="3.813rem" p="0">
                                      <InputGroup w="3.813rem" h="2rem">
                                        <Input
                                          placeholder="20"
                                          value={transactionDeadLine}
                                          type="text"
                                          pattern="^[0-9]*[.,]?[0-9]*$"
                                          h="2rem"
                                          w="3.813rem"
                                          bg={bg}
                                          onChange={(e) => setPositiveTransactionDeadLine(DEFAULT_DEADLINE)}
                                          borderColor={darkBorderColor}
                                          borderRadius={"0.625rem"}
                                          borderWidth={"0.5px"}
                                          float={"right"}
                                          fontSize={"0.625rem"}
                                          textAlign={"right"}
                                          p="0"
                                          pr="1.5rem"
                                          disabled
                                        />
                                        <InputRightElement h="2.1rem" pr="1rem" w="1rem">
                                          <Text fontSize={"0.625rem"} color={"whiteAlpha.500"}>
                                            min
                                          </Text>
                                        </InputRightElement>
                                      </InputGroup>
                                    </TabPanel>
                                    <TabPanel p="0" w="3.813rem">
                                      <InputGroup w="3.813rem" h="2rem">
                                        <Input
                                          placeholder="20"
                                          value={transactionDeadLine}
                                          type="text"
                                          pattern="^[0-9]*[.,]?[0-9]*$"
                                          onChange={(e) => setPositiveTransactionDeadLine(Number(e.target.value))}
                                          h="2rem"
                                          w="3.813rem"
                                          bg={bg}
                                          borderColor={darkBorderColor}
                                          borderRadius={"0.625rem"}
                                          borderWidth={"0.5px"}
                                          textAlign={"right"}
                                          float={"right"}
                                          p="0"
                                          pr="1.5rem"
                                          fontSize={"0.625rem"}
                                        />
                                        <InputRightElement h="2.1rem" pr="1rem" w="1rem">
                                          <Text fontSize={"0.625rem"}>min</Text>
                                        </InputRightElement>
                                      </InputGroup>
                                    </TabPanel>
                                  </TabPanels>
                                </HStack>
                              </Tabs>
                            </HStack>
                          </VStack>
                        </VStack>
                        {/* <InputGroup size="sm">
                    <Input
                      placeholder={DEFAULT_SLIPPAGE}
                      value={slippage}
                      onChange={(e) => setPositiveSlippage(e.target.value)}
                      rounded={"24"}
                    />
                    <InputRightAddon children="%" />
                  </InputGroup>
                 
                  <InputGroup size="sm">
                    <Input
                      placeholder="20"
                      value={feeBuffer}
                      rounded={"24"}
                      onChange={(e) => setPositiveFeeBuffer(e.target.value)}
                    />
                    <InputRightAddon children="%" />
                  </InputGroup> */}
                      </PopoverBody>
                      {/* <PopoverFooter>
                <Button float="right" bg={buttonBgColor} color={buttonColor} onClick={saveSettings}>
                  Save
                </Button>
              </PopoverFooter> */}
                    </PopoverContent>
                  </Popover>
                </HStack>
              )}

              {isPreview ? (
                <Box py="1.275rem" px="3.375rem" w="100%" borderRadius="1.625rem" bg={inputBoxBg}>
                  <HStack w="100%" gap="2.5rem" justifyContent={"space-between"}>
                    <VStack gap="1.275rem">
                      <Text fontWeight={700} fontSize={"0.875rem"} color={color}>
                        Sell Amount
                      </Text>
                      <Center
                        borderWidth={"2px"}
                        borderColor={darkerBorderColor}
                        bg={bg}
                        borderStyle={"dashed"}
                        borderRadius={"1rem"}
                        padding="0.625rem"
                      >
                        <Image h="4.375rem" src={tokenFromIcon} alt="sell" />
                      </Center>
                      <VStack gap={"0.375rem"}>
                        <Text fontWeight={700} color={color}>
                          {trim(Number(quantityFrom), 5)}
                        </Text>
                        <Text fontWeight={700} color={color}>
                          {tokenFrom?.toLocaleUpperCase()}
                        </Text>
                        {/* <Text fontSize={"0.75rem"} color={lightColor}>
                        ≈ $1318.98
                      </Text> */}
                      </VStack>
                    </VStack>
                    <VStack>
                      <Image src={Logo} alt="Logo" />
                      <Image src={DashArrowIcon} alt="arrow" />
                    </VStack>
                    <VStack gap="1.275rem">
                      <Text fontWeight={700} fontSize={"0.875rem"} color={color}>
                        Receive
                      </Text>
                      <Center
                        borderWidth={"2px"}
                        borderColor={darkerBorderColor}
                        bg={bg}
                        borderStyle={"dashed"}
                        borderRadius={"1rem"}
                        padding="0.625rem"
                      >
                        <Image h="4.375rem" src={tokenToIcon} alt="receive" />
                      </Center>
                      <VStack gap={"0.375rem"}>
                        <Text fontWeight={700} color={color} wordBreak={"break-word"}>
                          {trim(Number(quantityTo), 5)}
                        </Text>
                        <Text fontWeight={700} color={color} wordBreak={"break-word"}>
                          {tokenTo?.toLocaleUpperCase()}
                        </Text>
                        {/* <Text fontSize={"0.75rem"} color={lightColor}>
                        ≈ $1318.98
                      </Text> */}
                      </VStack>
                    </VStack>
                  </HStack>
                </Box>
              ) : (
                <VStack pos={"relative"} bg={inputBoxBg} p={"0.625rem"} borderRadius={"1.625rem"}>
                  <InputGroup
                    borderWidth={"0.5px"}
                    borderColor={borderColor}
                    bg={bg}
                    borderRadius={"1.25rem"}
                    h={"7.313rem"}
                    p={"1.25rem"}
                  >
                    <VStack justifyContent={"space-between"}>
                      <HStack justifyContent={"space-between"} w={"100%"}>
                        <TokenSelect value={tokenFrom} setValue={setNewTokenFrom} options={tokenList} />
                        <Input
                          type="text"
                          pattern="^[0-9]*[.,]?[0-9]*$"
                          fontSize={"1.875rem"}
                          placeholder="0.00"
                          value={quantityFrom}
                          color={color}
                          fontWeight={"700"}
                          w={"50%"}
                          border="none"
                          borderRadius={"1.25rem"}
                          _focusVisible={{ borderColor: "none" }}
                          _disabled={{ borderColor: "none" }}
                          _placeholder={{ color: color }}
                          onChange={(e) => setPositiveQuantityFrom(e.target.value)}
                          textAlign={"right"}
                        />
                      </HStack>
                      <HStack justifyContent={"space-between"} w={"100%"}>
                        <HStack visibility={isConnected ? "visible" : "hidden"}>
                          <HStack gap={"0.2rem"}>
                            <Text fontSize={"0.875rem"}>Balance:</Text>
                            <Text fontSize={"0.875rem"} color={lightColor}>
                              {formatValue(tokenFromBalance)}
                            </Text>
                            <Text color={lightColor} fontSize={"0.875rem"}>
                              {tokenFrom?.toLocaleUpperCase()}
                            </Text>
                          </HStack>
                          {isConnected && Number(tokenFromBalance) > 0 && (
                            <Text
                              fontSize={"0.625rem"}
                              color={lightGreenTextColor}
                              cursor={"pointer"}
                              fontWeight={400}
                              onClick={setMax}
                              bg={greenBGColor}
                              borderRadius={"0.375rem"}
                              px={"0.375rem"}
                              h="1.25rem"
                              display={"flex"}
                              alignItems={"center"}
                              _hover={{ opacity: 0.9 }}
                            >
                              MAX
                            </Text>
                          )}
                        </HStack>
                        {/* <Text color={lightColor} fontSize={"0.875rem"}>
                        ≈0.00$
                      </Text> */}
                      </HStack>
                    </VStack>
                  </InputGroup>
                  <Button
                    pos={"absolute"}
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    zIndex={1}
                    onClick={switchToken}
                    borderRadius={"0.625rem"}
                    borderWidth={2}
                    borderColor={borderColor}
                    _hover={{ opacity: 0.9 }}
                    p={0}
                    bg={swapIconbg}
                  >
                    <Image alt="swap" src={swapArrowIcon} />
                  </Button>
                  <InputGroup
                    borderWidth={"0.5px"}
                    borderColor={borderColor}
                    bg={bg}
                    borderRadius={"1.25rem"}
                    h={"7.313rem"}
                    p={"1.25rem"}
                  >
                    <VStack justifyContent={"space-between"}>
                      <HStack justifyContent={"space-between"} w={"100%"}>
                        <TokenSelect
                          value={tokenTo}
                          setValue={setTokenTo}
                          options={tokenList?.filter((token: Token) => token.name != tokenFrom)}
                        />
                        <Input
                          fontSize={"1.875rem"}
                          placeholder="0.00"
                          value={formatValueDigits(quantityTo, 6)}
                          type="text"
                          pattern="^[0-9]*[.,]?[0-9]*$"
                          color={lightColor}
                          fontWeight={"700"}
                          border="none"
                          borderRadius={"1.25rem"}
                          _focusVisible={{ borderColor: "none" }}
                          _disabled={{ borderColor: "none" }}
                          onChange={(e) => setPositiveQuantityFrom(e.target.value)}
                          textAlign={"right"}
                          w={"50%"}
                          disabled
                        />
                      </HStack>
                      <HStack justifyContent={"space-between"} w={"100%"}>
                        <HStack visibility={isConnected ? "visible" : "hidden"}>
                          <HStack gap={"0.2rem"}>
                            <Text fontSize={"0.875rem"}>Balance:</Text>
                            <Text color={lightColor} fontSize={"0.875rem"}>
                              {formatValue(tokenToBalance)}
                            </Text>
                            <Text color={lightColor} fontSize={"0.875rem"}>
                              {tokenTo?.toLocaleUpperCase()}
                            </Text>
                          </HStack>
                        </HStack>
                        {/* <Text color={lightColor} fontSize={"0.875rem"}>
                        ≈0.00$
                      </Text> */}
                      </HStack>
                    </VStack>
                  </InputGroup>
                </VStack>
              )}
            </VStack>
            {quantityTo ? (
              <VStack gap={"0.625rem"} px={"0.625rem"}>
                <HStack w={"100%"}>
                  <Text fontSize="0.875rem" color={color}>
                    Price
                  </Text>
                  <Tooltip label="Exchange rate at which you will receive tokens (incl. fees)" fontSize="xs">
                    {/* <InfoOutlineIcon w={3} h={3} color={lightColor} /> */}
                    <Image alt="swap" w={3} h={3} src={swapArrowIcon} />
                  </Tooltip>
                  <Spacer />
                  <Text fontSize="0.875rem" color={color}>
                    1 {tokenFrom.toUpperCase()} = {rate} {tokenTo.toUpperCase()}
                  </Text>
                </HStack>
                <HStack w={"100%"}>
                  <Text fontSize="0.875rem" color={color}>
                    Fees:
                  </Text>
                  <Tooltip label="Amount that will be paid as fees" fontSize="xs">
                    <InfoIcon w={3} h={3} color={color} />
                  </Tooltip>
                  <Spacer />
                  <Text fontSize="0.875rem" color={color}>
                    0.01%
                  </Text>
                  {/* <Text
                  fontSize="0.875rem"
                  fontWeight={400}
                  color={"rgba(48, 224, 161, 1)"}
                  bg={"rgba(0, 141, 91, 0.2)"}
                  borderRadius={"0.375rem"}
                  px={"0.375rem"}
                  h={"1.25rem"}
                >
                  Free
                </Text> */}
                  {/* {haircut} {tokenTo.toUpperCase()} */}
                </HStack>
                <HStack w={"100%"}>
                  <Text fontSize="0.875rem" color={color}>
                    Price Impact:
                  </Text>
                  <Tooltip label="The impact your trade has on price of this pool" fontSize="xs">
                    <InfoIcon w={3} h={3} color={color} />
                  </Tooltip>
                  <Spacer />
                  <Text fontSize="0.875rem" color={color}>
                    {priceImpact} %
                  </Text>
                </HStack>
                {/* <HStack w={"100%"}>
                <HStack gap={"0.1rem"}>
                  <Text fontSize="0.875rem" color={color}>
                    Network costs
                  </Text>
                  <Text fontSize="0.875rem" color={lightColor}>
                    (est.):
                  </Text>
                </HStack>
                <InfoIcon w={3} h={3} color={color} />
                <Spacer />
                <Text fontSize="0.875rem" color={color}>
                  0.555719 USDC
                </Text>
                <Text fontSize="0.875rem" color={lightColor}>
                  + (≈ ${gasPrice})
                </Text>
              </HStack> */}
                <HStack w={"100%"}>
                  <Text fontSize="0.875rem" color={color}>
                    Expected to receive
                  </Text>
                  {/* <Tooltip
                label="Minimum Amount you will receive. If amount falls below this, the transaction will instead revert"
                fontSize="xs"
              >
                <InfoOutlineIcon w={3} h={3} color={color} />
              </Tooltip> */}
                  <Spacer />
                  <Text fontSize="0.875rem" color={color}>
                    {getMinimumReceived()} {tokenTo.toUpperCase()}
                  </Text>
                </HStack>
                {isPreview && (
                  <>
                    <Divider my="0.75rem" />
                    <HStack w={"100%"}>
                      <HStack gap={"0.1rem"}>
                        <Text fontSize="0.875rem" color={color}>
                          Slippage tolerance
                        </Text>
                        <Text fontSize="0.875rem" color={lightColor}>
                          (modified):
                        </Text>
                      </HStack>
                      <InfoIcon w={3} h={3} color={color} />
                      <Spacer />
                      <Text fontSize="0.875rem" color={color}>
                        {slippage} %
                      </Text>
                    </HStack>
                    <HStack w={"100%"}>
                      <HStack gap={"0.1rem"}>
                        <Text fontSize="0.875rem" color={color}>
                          Minimum receive
                        </Text>
                      </HStack>
                      <InfoIcon w={3} h={3} color={color} />
                      <Spacer />
                      <Text fontSize="0.875rem" color={color}>
                        {getMinimumReceived()} {tokenTo.toUpperCase()}
                      </Text>
                    </HStack>
                    <HStack w={"100%"}>
                      <HStack gap={"0.1rem"}>
                        <Text fontSize="0.875rem" color={color}>
                          Transaction expiration
                        </Text>
                        <Text fontSize="0.875rem" color={lightColor}>
                          (modified):
                        </Text>
                      </HStack>
                      <InfoIcon w={3} h={3} color={color} />
                      <Spacer />
                      <Text fontSize="0.875rem" color={color}>
                        {transactionDeadLine} minutes
                      </Text>
                    </HStack>
                  </>
                )}
              </VStack>
            ) : (
              <></>
            )}
          </>
        )}

        <Box>
          {swapCompleted ? (
            <Button
              w={"100%"}
              _hover={{ opacity: "0.9" }}
              h={"4.625rem"}
              borderRadius={"1.25rem"}
              bg={buttonBgColor}
              color={buttonColor}
              fontSize={"1.5rem"}
              onClick={handleClose}
              isDisabled={swapBtnDisabled}
            >
              Close
            </Button>
          ) : !isConnected ? (
            <ConnectButton.Custom>
              {({ openConnectModal }) => {
                return (
                  <Button
                    w={"100%"}
                    _hover={{ opacity: "0.9" }}
                    h={"4.625rem"}
                    borderRadius={"1.25rem"}
                    bg={buttonBgColor}
                    color={buttonColor}
                    fontSize={"1.5rem"}
                    onClick={openConnectModal}
                  >
                    Connect wallet
                  </Button>
                );
              }}
            </ConnectButton.Custom>
          ) : isPreview ? (
            hasAllowance() && approved ? (
              chainConstants &&
              address && (
                <SwapBtn
                  contract={chainConstants.POOL_ADDRESS}
                  tokenFrom={tokenFromAddress}
                  tokenTo={tokenToAddress}
                  recipient={address}
                  amount={parseUnits(quantityFrom, getTokenDecimals(tokenFrom.toLowerCase())).toString()}
                  minAmount={parseUnits(getMinimumReceived(), getTokenDecimals(tokenTo.toLowerCase())).toString()}
                  swapBtnDisabled={swapBtnDisabled}
                  swapText={swapText}
                  setSwapCompleted={setSwapCompleted}
                  setSwapLoading={setSwapLoading}
                />
              )
            ) : (
              chainConstants && (
                <ApproveBtn
                  contract={tokenFromAddress}
                  spender={chainConstants.POOL_ADDRESS}
                  amount={parseUnits(quantityFrom, getTokenDecimals(tokenFrom.toLowerCase()))}
                  setApproved={setApproved}
                />
              )
            )
          ) : (
            <Button
              w={"100%"}
              _hover={{ opacity: "0.9" }}
              h={"4.625rem"}
              borderRadius={"1.25rem"}
              bg={buttonBgColor}
              color={buttonColor}
              fontSize={"1.5rem"}
              onClick={() => setIsPreview(true)}
              isDisabled={swapBtnDisabled || !tokenFrom || !tokenTo}
            >
              {previewText}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
