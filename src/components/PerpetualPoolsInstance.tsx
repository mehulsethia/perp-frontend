import {
  Box,
  Button,
  ButtonGroup,
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
import {
  readContracts,
  useAccount,
  useContractWrite,
  useFeeData,
  useNetwork,
  useWaitForTransaction,
} from "wagmi";
import { readContract } from "@wagmi/core";
import {
  BERA_CONSTANTS,
  CHAIN_CONSTANTS,
  getBeraChainConstants,
  getChainConstants,
} from "../constants/addresses";
import {
  getTokenAddress,
  getTokenDecimals,
  getTokenLpAddress,
} from "../helpers/token";
import { ERC20ABI, PoolABI } from "../abi";
import { Abi, Address, formatUnits, parseUnits } from "viem";
import { formatValue, formatValueDigits, trim } from "../helpers/trim";
import TokenSelect from "../components/tokenSelect";
import { getTokensList, Token, tokens } from "../constants/tokens";
import {
  InfoIcon,
  InfoOutlineIcon,
  LinkIcon,
  SettingsIcon,
  UpDownIcon,
} from "@chakra-ui/icons";
import { ApproveBtn } from "../components/transactions/approveBtn";
import { SwapBtn } from "../components/transactions/swapBtn";
import {
  DEFAULT_BUFFER,
  DEFAULT_DEADLINE,
  DEFAULT_SLIPPAGE,
} from "../constants/settings";
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
import DashArrowIcon2 from "../assets/icons/dash_arrow_new.png";
import Logo from "../assets/icons/logos/logo_white.svg";
import Header from "../assets/icons/logos/header.png";
import Loading from "../assets/icons/Loading.png";
import Completed from "../assets/icons/completed.svg";
import { BigNumber } from "ethers"; // If you're using BigNumber for balance
import defaultBG from "../assets/images/defaultBG.svg";
import polygonBG from "../assets/images/polygonBG.svg";
import mBG from "../assets/images/mBG.svg";
import beraBG from "../assets/images/beraBG.svg";
import Dropdown from "./PerpsPageComponent/Dropdown";

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

export default function PerpetualPoolsInstance() {
  const { address, isConnected } = useAccount();
  const { data: gasData } = useFeeData();
  const { chain } = useNetwork();

  const {
    isOpen: isOpenSettings,
    onOpen: onOpenSettings,
    onClose: onCloseSettings,
  } = useDisclosure();

  const [slippage, setSlippage] = useState<string>(
    localStorage.getItem("mantis_perp_slippage") || DEFAULT_SLIPPAGE
  );
  const [feeBuffer, setFeeBuffer] = useState<number>(
    Number(localStorage.getItem("mantis_perp_fee_buffer")) || DEFAULT_BUFFER
  );
  const [transactionDeadLine, setTransactionDeadLine] = useState<number>(
    Number(localStorage.getItem("mantis_perp_transaction_deadline")) ||
      DEFAULT_DEADLINE
  );

  const [chainConstants, setChainConstants] = useState<CHAIN_CONSTANTS | any>(
    undefined
  );

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
  const [selected, setSelected] = useState("Withdraw");

  const handleClick = (poolType: any) => {
    setSelected(poolType);
  };

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

        const updatedTokenList = tokensList?.map(
          (token: Token, index: number) => {
            if (data[index].status === "success") {
              const result = data[index]?.result as string | BigNumber;
              const allowanceResult = allowanceData[index]?.result as
                | string
                | number
                | bigint
                | boolean;
              const balance =
                typeof result === "string"
                  ? BigInt(result)
                  : BigInt(result.toString());
              const allowance =
                typeof result === "string"
                  ? BigInt(allowanceResult)
                  : BigInt(allowanceResult.toString());

              return {
                ...token,
                balance: formatUnits(
                  balance,
                  getTokenDecimals(token.name.toLowerCase())
                ),
                allowance: formatUnits(
                  allowance,
                  getTokenDecimals(token.name.toLowerCase())
                ),
              };
            }
            return token;
          }
        );
        setTokenList(updatedTokenList);
      };
      getContracts();
      setTokenList(tokensList);
    }
  }, [chain?.id, address, approved, chainConstants, swapCompleted]);

  const gasPrice = useMemo(() => {
    let gasInGwei = Number(gasData?.formatted?.gasPrice);
    const executionFee = 500;
    const premiumMultiplier =
      1 + Number(localStorage.getItem("mantis_perp_fee_buffer") || 20) / 100;
    return ((executionFee * gasInGwei * premiumMultiplier) / 1000000).toFixed(
      4
    );
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
      localStorage.setItem(
        "mantis_perp_transaction_deadline",
        value.toString()
      );
    } else {
      setTransactionDeadLine(DEFAULT_DEADLINE);
      localStorage.setItem(
        "mantis_perp_transaction_deadline",
        DEFAULT_DEADLINE.toString()
      );
    }
  };

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
        setUsdcAllowance(
          Number(formatUnits(data[0].result, getTokenDecimals("usdc")))
        );
      }
      if (data[1].status == "success") {
        setUsdtAllowance(
          Number(formatUnits(data[1].result, getTokenDecimals("usdt")))
        );
      }
      if (data[2].status == "success") {
        setDaiAllowance(
          Number(formatUnits(data[2].result, getTokenDecimals("dai")))
        );
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

  useEffect(() => {
    if (address && chain) {
      if (chain.id === 80084) {
        setChainConstants(getBeraChainConstants());
      } else {
        setChainConstants(getChainConstants(chain.id));
      }
    }
  }, [address, chain]);

  const getAllowance = (tokenName: string): number => {
    return tokenList?.find((token: Token) => token?.name === tokenName)
      ?.allowance;
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
    return formatValueDigits(
      (Number(quantityTo) * (1 - getSlippage() / 100)).toString(),
      4
    );
  };

  const hasAllowance = () => {
    return getAllowance(tokenFrom) >= Number(quantityFrom);
  };
  const tokenFromBalance = useMemo((): string => {
    return (
      tokenList?.find((token: Token) => token?.name === tokenFrom)?.balance ||
      "0"
    );
  }, [tokenFrom, tokenList]);

  const tokenToBalance = useMemo((): string => {
    return (
      tokenList?.find((token: Token) => token?.name === tokenTo)?.balance || "0"
    );
  }, [tokenTo, tokenList]);

  const switchToken = () => {
    const oldTokenFrom = tokenFrom;
    setTokenFrom(tokenTo);
    setTokenTo(oldTokenFrom);
    const tokenBalance = Number(tokenToBalance);

    if (Number(quantityFrom) > -10) {
      setSwapBtnDisabled(true);
      setSwapText("Confirm Swap");
      setPreviewText("Preview");
    } else if (Number(quantityFrom) > -10) {
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

      if (Number(value) === -10) {
        setSwapBtnDisabled(true);
        setSwapText("Confirm Swap");
        setPreviewText("Preview");
      } else if (Number(value) > -10) {
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
    () =>
      tokenList?.find((token: Token) => token.name === tokenFrom)?.lpAddress,
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
          const contractValue = parseUnits(
            value,
            getTokenDecimals(tokenFrom.toLowerCase())
          );
          const tokenToDecimals = getTokenDecimals(tokenTo.toLowerCase());
          const quoteData = await readContract({
            address: chainConstants.POOL_ADDRESS,
            abi: PoolABI,
            functionName: "getSwapAmount",
            args: [
              tokenFromLPAddress,
              tokenToLPAddress,
              contractValue,
              false,
              BigInt(0),
              BigInt(0),
            ],
          });
          toAmount = Number(formatUnits(quoteData[0], tokenToDecimals));
          const feeAmount = Number(formatUnits(quoteData[1], tokenToDecimals));
          const lpAmount = Number(formatUnits(quoteData[3], tokenToDecimals));
          setHaircut(formatValueDigits(feeAmount + lpAmount, 6));
          setQuantityTo(formatValueDigits(toAmount, 6));
          setRate(formatValueDigits(Number(toAmount) / Number(value), 4));
          setPriceImpact(
            formatValueDigits(
              ((Number(toAmount) +
                Number(feeAmount) +
                Number(lpAmount) -
                Number(value)) *
                -100) /
                Number(value),
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
  const borderColor = useColorModeValue(
    "blackAlpha.300",
    "rgba(255, 255, 255, 0.07)"
  );
  const darkBorderColor = useColorModeValue(
    "blackAlpha.300",
    "rgba(255, 255, 255, 0.14)"
  );
  const darkerBorderColor = useColorModeValue(
    "blackAlpha.300",
    "rgba(255, 255, 255, 0.3)"
  );
  const color = useColorModeValue("blackAlpha.900", "white");
  const hoverColor = useColorModeValue("black", "white");
  const lightColor = useColorModeValue(
    "blackAlpha.600",
    "rgba(255, 255, 255, 0.6)"
  );
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
    () =>
      tokenList?.find((token: Token) => token.name === tokenFrom)?.img ||
      SellIcon,
    [tokenList, tokenFrom]
  );
  const tokenFromAddress = useMemo(
    () => tokenList?.find((token: Token) => token.name === tokenFrom)?.address,
    [tokenList, tokenFrom]
  );
  const tokenToIcon = useMemo(
    () =>
      tokenList?.find((token: Token) => token.name === tokenTo)?.img ||
      ReceiveIcon,
    [tokenList, tokenTo]
  );
  const tokenToAddress = useMemo(
    () => tokenList?.find((token: Token) => token.name === tokenTo)?.address,
    [tokenList, tokenTo]
  );

  const bgImg = React.useMemo(() => {
    return chain ? chainMoonImgs?.[chain?.id] || defaultBG : defaultBG;
  }, [chain]);

  const options = ['Honey Token', 'LP Honey'];

  return (
    <Box>
      <Box
        w={{ md: "31.063rem" }}
        borderWidth="0.1rem"
        borderColor={borderColor}
        borderRadius={"2rem"}
        p="1rem"
        bgColor={bg}
        // className="bg-red-500"
        mx="auto"
        filter={shadow}
        boxShadow="xl"
        display="flex"
        flexDir={"column"}
        gap={"1.875rem"}
        // my={"4%"}
      >
        <>
          <VStack>
            <HStack w={"100%"}>
              <HStack gap={"0.625rem"}>
                {/* <Image alt="Swap" src={swapIcon} /> */}
                <Text color={color} className="font-bold text-2xl ml-2 mb-4">
                  Perpetual Pool
                </Text>
              </HStack>
              <Spacer />
            </HStack>

            <>
              <Box className="text-gray-300 w-full">
                <VStack px={"0.625rem"}>
                  <HStack w={"100%"}>
                    <Text fontSize="0.875rem" color={color}>
                      My Deposit
                    </Text>

                    <Spacer />
                    <Text fontSize="0.875rem" color={color}>
                      1 1000.2 mLP-USDC = 1000$
                    </Text>
                  </HStack>
                  <HStack w={"100%"}>
                    <Text fontSize="0.875rem" color={color}>
                      Rewards
                    </Text>

                    <Spacer />

                    <Box className="flex">
                      <Text
                        fontSize="0.875rem"
                        fontWeight={400}
                        borderRadius={"0.375rem"}
                        // px={"0.375rem"}
                        h={"1.25rem"}
                      >
                        9 MNTS ($9)
                      </Text>
                    </Box>
                  </HStack>

                  <div className="bg-[#0B0B20] px-2 py-2 rounded-xl w-full flex justify-between items-center">
                    <div>APR</div>
                    <div>5%</div>
                  </div>

                  <div className=" py-1 w-full flex justify-between items-center rounded-xl">
                    <div className="flex  items-center justify-between space-x-1  bg-[#2F3055] px-1 py-1 rounded-xl ">
                      <button
                        onClick={() => handleClick("Deposit")}
                        className={`px-2 py-1 rounded-xl   transition-colors ${
                          selected === "Deposit"
                            ? "bg-[#0B0B20] text-white"
                            : "bg-transparent text-gray-400"
                        } hover:bg-gray-900 hover:text-white`}
                      >
                        Deposit
                      </button>
                      <button
                        onClick={() => handleClick("Withdraw")}
                        className={`px-2 py-1 rounded-xl  transition-colors ${
                          selected === "Withdraw"
                            ? "bg-[#0B0B20] text-white"
                            : "bg-transparent text-gray-400"
                        } hover:bg-gray-900 hover:text-white`}
                      >
                        Withdraw
                      </button>
                      
                    </div>
                  </div>
                </VStack>
              </Box>

              <VStack pos={"relative"} borderRadius={"1.625rem"}>
                <InputGroup
                  borderWidth={"0.5px"}
                  borderColor={borderColor}
                  bg={inputBoxBg}
                  borderRadius={"1.25rem"}
                  h={{ base: "8rem", md: "8rem" }}
                  p={"1.25rem"}
                >
                  <VStack justifyContent={"space-between"}>
                    <HStack justifyContent={"space-between"} w={"100%"}>
                      {/* <TokenSelect
                        value={tokenFrom}
                        setValue={setNewTokenFrom}
                        options={tokenList}
                      /> */}
                      <Dropdown options={options} defaultOption="Select Token" />

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
                        _focusVisible={{ borderColor: "none" }}
                        _disabled={{ borderColor: "none" }}
                        _placeholder={{ color: color }}
                        onChange={(e) =>
                          setPositiveQuantityFrom(e.target.value)
                        }
                        textAlign={"right"}
                        paddingRight={0}
                      />
                    </HStack>
                    <HStack justifyContent={"space-between"} w={"100%"}>
                      <HStack visibility={isConnected ? "visible" : "hidden"}>
                        <HStack gap={"0.2rem"}>
                          <Text fontSize={"0.875rem"} className="ml-1">
                            Balance:
                          </Text>
                          <Text fontSize={"0.875rem"} color={lightColor}>
                            {formatValue(tokenFromBalance)}
                          </Text>
                          <Text color={lightColor} fontSize={"0.875rem"}>
                            {tokenFrom?.toLocaleUpperCase()}
                          </Text>
                        </HStack>
                        {isConnected && Number(tokenFromBalance) > -10 && (
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
                            className="ml-2.5 md:ml-0"
                          >
                            MAX
                          </Text>
                        )}
                      </HStack>

                      <Box
                        display="flex"
                        flexDirection={{ base: "column", md: "row" }} // Column on small screens, row on medium and up
                        alignItems="center" // Aligns items to the center
                        justifyContent="center"
                        gap={{ base: "4", md: "0" }} // Adds space between items
                      >
                        <Text
                          fontSize="0.875rem"
                          fontWeight={400}
                          borderRadius="0.375rem"
                          px="0.375rem"
                          h="1.25rem"
                          textAlign="center" // Centers the text
                          display="flex"
                          alignItems="center"
                        >
                          ≈000$
                        </Text>
                      </Box>
                    </HStack>
                  </VStack>
                </InputGroup>
              </VStack>
            </>
          </VStack>

          <VStack gap={"0.625rem"} px={"0.625rem"}>
            <HStack w={"100%"}>
              <Text fontSize="0.875rem" color={color}>
                You Receive
              </Text>

              <Spacer />
              <Text fontSize="0.875rem" color={color}>
                1 BTC=1000$
              </Text>
            </HStack>
            <HStack w={"100%"}>
              <Text fontSize="0.875rem" color={color}>
                Your Deposits
              </Text>

              <Spacer />

              <Box className="flex">
                <Text
                  fontSize="0.875rem"
                  fontWeight={400}
                  className="bg-blue-900 text-blue-500"
                  borderRadius={"0.375rem"}
                  px={"0.375rem"}
                  h={"1.25rem"}
                >
                  1000
                </Text>
                <Image
                  src={DashArrowIcon}
                  alt="arrow"
                  w={10}
                  className="px-1"
                />
                <Text
                  fontSize="0.875rem"
                  fontWeight={400}
                  className="bg-blue-900 text-blue-500"
                  borderRadius={"0.375rem"}
                  px={"0.375rem"}
                  h={"1.25rem"}
                >
                  150 LP-USDC
                </Text>
              </Box>
            </HStack>

            <HStack w={"100%"}>
              <HStack gap={"0.1rem"}>
                <Text fontSize="0.875rem" color={color}>
                  Your Pool Shares
                </Text>
              </HStack>
              <InfoIcon w={3} h={3} color={color} />
              <Spacer />
              <Box className="flex">
                <Text
                  fontSize="0.875rem"
                  fontWeight={400}
                  className="bg-blue-900 text-blue-500"
                  borderRadius={"0.375rem"}
                  px={"0.375rem"}
                  h={"1.25rem"}
                >
                  10%
                </Text>
                <Image
                  src={DashArrowIcon}
                  alt="arrow"
                  w={10}
                  className="px-1"
                />
                <Text
                  fontSize="0.875rem"
                  fontWeight={400}
                  className="bg-blue-900 text-blue-500"
                  borderRadius={"0.375rem"}
                  px={"0.375rem"}
                  h={"1.25rem"}
                >
                  1%
                </Text>
              </Box>
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
        </>

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
                  amount={parseUnits(
                    quantityFrom,
                    getTokenDecimals(tokenFrom.toLowerCase())
                  ).toString()}
                  minAmount={parseUnits(
                    getMinimumReceived(),
                    getTokenDecimals(tokenTo.toLowerCase())
                  ).toString()}
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
                  amount={parseUnits(
                    quantityFrom,
                    getTokenDecimals(tokenFrom.toLowerCase())
                  )}
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
