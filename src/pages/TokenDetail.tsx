import {
  Box,
  Text,
  Image,
  Flex,
  Heading,
  HStack,
  Spacer,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Input,
  Grid,
  GridItem,
  Divider,
  useColorModeValue,
  VStack,
  InputGroup,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { readContracts, useAccount, useNetwork } from "wagmi";
import { CHAIN_CONSTANTS, getChainConstants } from "../constants/addresses";
import { Abi, Address, formatUnits, parseUnits } from "viem";
import { ERC20ABI, LPABI, MasterMantisABI, PLPABI, PoolABI, TradeManagerABI } from "../abi";
import {
  getAllTokenPids,
  getTokenAddress,
  getTokenBorderColor,
  getTokenButtonBgColor,
  getTokenButtonHoverColor,
  getTokenDecimals,
  getTokenIcon,
  getTokenLpAddress,
  getTokenLpPid,
  getTokenPlpAddress,
  getTokenPlpPid,
  getTokenPrimaryBackgroundColor,
  getTokenPrimaryTextColor,
  getTokenSecondaryBackgroundColor,
  getTokenSecondaryTextColor,
  getTokenTernaryBackgroundColor,
} from "../helpers/token";
import { formatValue, formatValueDigits, trim } from "../helpers/trim";
import PerpPool from "../components/perpPool";
import { ClaimBtn } from "../components/transactions/claimBtn";
import StablePool from "../components/stablePool";
import defaultBG from "../assets/images/defaultBG.svg";
import polygonBG from "../assets/images/polygonBG.svg";
import mBG from "../assets/images/mBG.svg";
import beraBG from "../assets/images/beraBG.svg";
import TokenSelect from "../components/tokenSelect";
import ArrowIcon from "../assets/icons/arrow.svg";
import { getTokensList, Token } from "../constants/tokens";
import { BigNumber } from "ethers"; // If you're using BigNumber for balance
import { ApproveBtn } from "../components/transactions/approveBtn";
import { StableDepositBtn } from "../components/transactions/stableDepositBtn";
import Loading from "../assets/icons/Loading.png";
import Completed from "../assets/icons/completed.svg";
import { readContract } from "@wagmi/core";

const chainMoonImgs: any = {
  919: mBG,
  137: polygonBG,
  1101: polygonBG,
  80084: beraBG,
};

export default function TokenDetail() {
  let { token } = useParams();
  const navigate = useNavigate();
  // const borderColor = getTokenBorderColor(token || "");
  const primaryTextColor = getTokenPrimaryTextColor(token || "");
  const secondaryTextColor = getTokenSecondaryTextColor(token || "");
  const primaryBackgroundColor = getTokenPrimaryBackgroundColor(token || "");
  const secondaryBackgroundColor = getTokenSecondaryBackgroundColor(token || "");
  const ternaryBackgroundColor = getTokenTernaryBackgroundColor(token || "");
  const bgColor = getTokenButtonBgColor(token || "");
  // const hoverColor = getTokenButtonHoverColor(token || "");

  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  const [chainConstants, setChainConstants] = useState<CHAIN_CONSTANTS | any>(undefined);

  const [tokenBalance, setTokenBalance] = useState<string>("");

  const [lpAsset, setLpAsset] = useState<string>("");
  const [lpLiability, setLpLiability] = useState<string>("0");
  const [lpSupply, setLpSupply] = useState<string>("");

  const [plpAsset, setPlpAsset] = useState<string>("");
  const [plpSupply, setPlpSupply] = useState<string>("");

  const [lpBalance, setLpBalance] = useState<string>("0");
  const [lpStake, setLpStake] = useState<string>("0");

  const [plpBalance, setPlpBalance] = useState<string>("0");
  const [plpStake, setPlpStake] = useState<string>("0");

  const [lpMntsEarned, setLpMntsEarned] = useState<string>("");
  const [plpMntsEarned, setPlpMntsEarned] = useState<string>("");
  const [openInterest, setOpenInterest] = useState<string>("");

  const [userUpdate, setUserUpdate] = useState<boolean>(false);
  const [tokenFrom, setTokenFrom] = useState<string>("");
  const [quantityFrom, setQuantityFrom] = useState<string>("");
  const [tokenList, setTokenList] = useState<Token[] | any>([]);

  const [approveText, setApproveText] = useState<string>("Approve");
  const [approveDisable, setApproveDisable] = useState<boolean>(true);
  const [approved, setApproved] = useState<boolean>(false);

  const [depositCompleted, setDepositCompleted] = useState<boolean>(false);
  const [depositLoading, setDepositLoading] = useState<boolean>(false);

  const [depositQuote, setDepositQuote] = useState<string>("");
  const [depositFees, setDepositFees] = useState<number>(0);

  type ContractInput = {
    address: Address; // Address is a string or type alias provided by Wagmi
    abi: Abi; // Abi can be any valid ABI array
    functionName: string;
    args: any[];
  };

  useEffect(() => {
    if (token) {
      setTokenFrom(token.toUpperCase());
    }
  }, [token]);

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
      setTokenList(tokensList);
      getContracts();
    }
  }, [chain?.id, address, approved, chainConstants, depositCompleted]);

  const tokenFromBalance = useMemo((): string => {
    return tokenList?.find((token: Token) => token?.name === tokenFrom)?.balance || "0";
  }, [tokenFrom, tokenList]);

  const setPositiveQuantityFrom = useCallback(
    (value: string) => {
      value = value.replace(/[^\d.]/g, "");
      Number(value) >= 0 ? setQuantityFrom(value) : setQuantityFrom("");
      let tokenBalance = Number.MAX_SAFE_INTEGER;
      if (tokenFrom) {
        tokenBalance = Number(tokenFromBalance);
      }

      if (Number(value) === 0) {
        setApproveDisable(true);
        setApproveText("Approve");
      } else if (Number(value) > tokenBalance) {
        setApproveText("Insufficient Balance");
        setApproveDisable(true);
        if (Number(value) > 999999999999) {
          setQuantityFrom("");
        }
      } else {
        setApproveDisable(false);
        setApproveText("Approve");
      }
    },
    [tokenFrom, tokenFromBalance]
  );

  const setMax = () => {
    setPositiveQuantityFrom(tokenFromBalance);
  };

  async function getTokenData() {
    if (address && tokenFrom && chainConstants) {
      const token: Token = tokenList.find((token: Token) => tokenFrom === token.name);
      const data = await readContracts({
        contracts: [
          {
            address: token.lpAddress,
            abi: LPABI,
            functionName: "asset",
          },
          {
            address: token.lpAddress,
            abi: LPABI,
            functionName: "liability",
          },
          {
            address: token.lpAddress,
            abi: LPABI,
            functionName: "totalSupply",
          },
          {
            address: token.plpAddress,
            abi: PLPABI,
            functionName: "asset",
          },
          {
            address: token.plpAddress,
            abi: PLPABI,
            functionName: "totalSupply",
          },
          // {
          //   address: chainConstants.TRADE_MANAGER_ADDRESS,
          //   abi: TradeManagerABI,
          //   functionName: "collateralOI",
          //   args: [token.address],
          // },
        ],
      });

      if (data[0].status == "success") {
        setLpAsset(formatUnits(data[0].result, getTokenDecimals(tokenFrom?.toLowerCase())));
      }
      if (data[1].status == "success") {
        setLpLiability(formatUnits(data[1].result, getTokenDecimals(tokenFrom?.toLowerCase())));
      }
      if (data[2].status == "success") {
        setLpSupply(formatUnits(data[2].result, getTokenDecimals(tokenFrom?.toLowerCase())));
      }
      if (data[3].status == "success") {
        setPlpAsset(formatUnits(data[3].result, getTokenDecimals(tokenFrom?.toLowerCase())));
      }
      if (data[4].status == "success") {
        setPlpSupply(formatUnits(data[4].result, getTokenDecimals(tokenFrom?.toLowerCase())));
      }
      // if (data[5].status == "success") {
      //   setOpenInterest(formatUnits(data[5].result, getTokenDecimals(tokenFrom?.toLowerCase())));
      // }
    }
  }

  async function getUserData() {
    if (address && tokenFrom && chainConstants) {
      const token: Token = tokenList.find((token: Token) => tokenFrom === token?.name);
      const data = await readContracts({
        contracts: [
          {
            address: token?.address,
            abi: ERC20ABI,
            functionName: "balanceOf",
            args: [address],
          },
          {
            address: token?.lpAddress,
            abi: LPABI,
            functionName: "balanceOf",
            args: [address],
          },
          {
            address: token?.plpAddress,
            abi: PLPABI,
            functionName: "balanceOf",
            args: [address],
          },
          {
            address: chainConstants.MASTER_MANTIS_ADDRESS,
            abi: MasterMantisABI,
            functionName: "userInfo",
            args: [BigInt(token?.lpId), address],
          },
          {
            address: chainConstants.MASTER_MANTIS_ADDRESS,
            abi: MasterMantisABI,
            functionName: "userInfo",
            args: [BigInt(token?.plpId), address],
          },
          {
            address: chainConstants.MASTER_MANTIS_ADDRESS,
            abi: MasterMantisABI,
            functionName: "pendingMnts",
            args: [BigInt(token?.lpId), address],
          },
          {
            address: chainConstants.MASTER_MANTIS_ADDRESS,
            abi: MasterMantisABI,
            functionName: "pendingMnts",
            args: [BigInt(token?.plpId), address],
          },
        ],
      });

      if (data[0].status == "success") {
        setTokenBalance(formatUnits(data[0].result, getTokenDecimals(tokenFrom?.toLowerCase())));
      }
      if (data[1].status == "success") {
        setLpBalance(formatUnits(data[1].result, getTokenDecimals(tokenFrom?.toLowerCase())));
      }
      if (data[2].status == "success") {
        setPlpBalance(formatUnits(data[2].result, getTokenDecimals(tokenFrom?.toLowerCase())));
      }
      if (data[3].status == "success") {
        setLpStake(formatUnits(data[3].result[0], getTokenDecimals(tokenFrom?.toLowerCase())));
      }
      if (data[4].status == "success") {
        setPlpStake(formatUnits(data[4].result[0], getTokenDecimals(tokenFrom?.toLowerCase())));
      }
      if (data[5].status == "success") {
        setLpMntsEarned(formatUnits(data[5].result, getTokenDecimals(tokenFrom?.toLowerCase())));
      }
      if (data[6].status == "success") {
        setPlpMntsEarned(formatUnits(data[6].result, getTokenDecimals(tokenFrom?.toLowerCase())));
      }
    }
  }

  useEffect(() => {
    if (tokenList?.length > 0 && address && tokenFrom && chainConstants) {
      if (!tokenFrom) {
        setTokenFrom(tokenList[0]?.name);
      }
      getTokenData();
      getUserData();
    }
  }, [chainConstants, address, tokenFrom, tokenList]);

  useEffect(() => {
    if (address && chain) {
      setChainConstants(getChainConstants(chain.id));
    }
  }, [address, chain]);

  useEffect(() => {
    if (userUpdate) {
      setUserUpdate(false);
      // getUserData();
    }
  }, [userUpdate]);

  useEffect(() => {
    const getDepositQuote = async () => {
      if (Number(quantityFrom) > 0) {
        try {
          const quoteData = await readContract({
            address: chainConstants.POOL_ADDRESS,
            abi: PoolABI,
            functionName: "getDepositAmount",
            args: [
              getTokenLpAddress(chainConstants, tokenFrom),
              parseUnits(quantityFrom, getTokenDecimals(tokenFrom.toLowerCase())),
              false,
              BigInt(0),
            ],
          });
          const contractDepositQuote = formatUnits(quoteData[0], getTokenDecimals(tokenFrom.toLowerCase()));
          setDepositQuote(contractDepositQuote);
          setDepositFees(Number(formatUnits(quoteData[1], getTokenDecimals(tokenFrom.toLowerCase()))));
        } catch (e: any) {
          console.log(e);
        }
      } else {
        setDepositQuote("");
        setDepositFees(0);
      }
    };
    const timeOutId = setTimeout(() => getDepositQuote(), 250);
    return () => clearTimeout(timeOutId);
  }, [quantityFrom, chainConstants, tokenFrom]);

  const getLiquidityRatio = () => {
    return Number(lpLiability) == 0 ? 100 : (Number(lpAsset) / Number(lpLiability)) * 100;
  };

  const getLpRatio = () => {
    return Number(lpSupply) == 0 ? 1 : Number(lpLiability) / Number(lpSupply);
  };

  const getPlpRatio = () => {
    return Number(plpSupply) == 0 ? 1 : Number(plpAsset) / Number(plpSupply);
  };

  const getPlpPrice = () => {
    return getLpRatio() * getPlpRatio();
  };

  const getTotalDepositValue = () => {
    return Number(lpBalance) * getLpRatio() + Number(plpBalance) * getPlpPrice();
  };

  const getTotalStakedValue = () => {
    return Number(lpStake) * getLpRatio() + Number(plpStake) * getPlpPrice();
  };

  const getAllowance = (tokenName: string): number => {
    return tokenList?.find((token: Token) => token?.name === tokenName)?.allowance;
  };

  const hasDepositAllowance = () => {
    return quantityFrom && Number(quantityFrom) > 0 && getAllowance(tokenFrom) >= Number(quantityFrom);
  };

  const getDepositPoolShare = () => {
    if (Number(lpLiability) + Number(quantityFrom) - Number(depositFees) > 0) {
      return trim(
        ((Number(lpBalance) + Number(quantityFrom) - Number(depositFees)) * 100) /
          (Number(lpLiability) + Number(quantityFrom) - Number(depositFees)),
        4
      );
    }
    return 0;
  };
  const getDefaultDepositPoolShare = () => {
    if (Number(lpLiability) > 0) {
      return trim((Number(lpBalance) * 100) / Number(lpLiability), 4);
    }
    return 0;
  };

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
  const textInfoBgColor = useColorModeValue("blackAlpha.800", "#0080FF24");
  const shadow = useColorModeValue(
    "drop-shadow(0px 4px 32px rgba(255,255,255,0.05))",
    "drop-shadow(0px 4px 32px #23232314)"
  );

  const spin = keyframes`  
  from {transform: rotate(0deg);}   
  to {transform: rotate(360deg)} 
`;

  const spinAnimation = `${spin} infinite 1s linear`;

  const bgImg = useMemo(() => {
    return chain ? chainMoonImgs?.[chain?.id] || defaultBG : defaultBG;
  }, [chain]);

  const tokenFromAddress = useMemo(
    () => tokenList?.find((token: Token) => token.name === tokenFrom)?.address,
    [tokenList, tokenFrom]
  );

  const handleClose = () => {
    setDepositCompleted(false);
    setApproved(false);
    setDepositLoading(false);
    setTokenFrom("");
    setQuantityFrom("");
    navigate("/pools");
  };

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
        {depositLoading ? (
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
        ) : depositCompleted ? (
          <VStack gap="2.813rem" pb="1rem">
            <VStack w="100%" py="2.5rem" px="6.438rem" borderRadius="1.25rem" gap={"0.625rem"} bg={inputBoxBg}>
              <Image src={Completed} alt="completed" />
              <Text color={color} fontSize={"1.25rem"}>
                Transaction Successful
              </Text>
            </VStack>
            <HStack>
              <Text color={color} fontSize={"1.25rem"}>
                You just deposited
              </Text>
              <Text
                px="0.5rem"
                py="0.375"
                color={color}
                borderRadius={"0.625rem"}
                fontSize={"0.875rem"}
                gap={"0.625rem"}
                bg={slippageBoxBg}
              >
                {quantityFrom} {tokenFrom.toUpperCase()}
              </Text>
            </HStack>
          </VStack>
        ) : (
          <>
            <HStack w="100%" px={"0.625rem"} pt="0.625rem">
              <Text fontSize={"1.25rem"} color={color}>
                Deposit
              </Text>
              <Text fontSize={"1.25rem"} textTransform={"uppercase"} fontWeight={700} color={color}>
                {tokenFrom}
              </Text>
            </HStack>
            <VStack gap={"1.875rem"}>
              <Box
                display={"grid"}
                gridTemplateColumns={"1fr 1fr"}
                w="100%"
                p="0.375rem"
                bg={slippageBoxBg}
                borderRadius={"1rem"}
                gap="0.625rem"
              >
                <HStack bg={bg} borderRadius={"0.75rem"} justifyContent={"center"} alignItems={"center"} py="0.625rem">
                  <Text fontSize={"0.875rem"} color={color}>
                    Stable Pool
                  </Text>
                </HStack>
                <HStack alignItems={"center"} justifyContent={"center"} gap="0.375rem" py="0.625rem">
                  <Text fontSize={"0.875rem"} color={color}>
                    Perpetual Pool
                  </Text>
                  <Text fontSize={"0.625rem"} color={lightColor}>
                    (Coming soon)
                  </Text>
                </HStack>
              </Box>
              <InputGroup bg={inputBoxBg} p={"1rem"} borderRadius={"1.25rem"} borderColor={borderColor} h={"6.875rem"}>
                <VStack justifyContent={"space-between"}>
                  <HStack justifyContent={"space-between"} w={"100%"}>
                    <TokenSelect value={tokenFrom} setValue={setTokenFrom} options={tokenList} isDisabled />
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
            </VStack>
            <VStack gap={"0.625rem"} px={"0.625rem"}>
              <HStack w={"100%"}>
                <Text fontSize="0.875rem" color={color}>
                  You Receive
                </Text>
                <Spacer />
                <Text fontSize="0.875rem" color={color}>
                  {formatValue(depositQuote) || 0} LP-{tokenFrom.toUpperCase()}
                  {/* 1 {tokenFrom.toUpperCase()} = 1000$ */}
                </Text>
              </HStack>
              <HStack w={"100%"}>
                <Text fontSize="0.875rem" color={color}>
                  Your Deposits
                </Text>
                <Spacer />
                <HStack gap={"0.625rem"}>
                  <Text
                    fontSize="0.875rem"
                    borderRadius={"0.375rem"}
                    px={"0.375rem"}
                    bg={textInfoBgColor}
                    color={activeFontColor}
                  >
                    {formatValue(Number(lpBalance) + Number(lpStake))}
                  </Text>
                  <Image src={ArrowIcon} alt="arrow" />
                  <Text
                    fontSize="0.875rem"
                    borderRadius={"0.375rem"}
                    px={"0.375rem"}
                    bg={textInfoBgColor}
                    color={activeFontColor}
                  >
                    {formatValue(Number(lpBalance) + Number(lpStake) + Number(depositQuote || 0))} LP -{" "}
                    {tokenFrom.toUpperCase()}
                  </Text>
                </HStack>
              </HStack>
              <HStack w={"100%"}>
                <Text fontSize="0.875rem" color={color}>
                  Your Pool Shares
                </Text>
                <Spacer />
                <HStack gap={"0.625rem"}>
                  <Text
                    fontSize="0.875rem"
                    borderRadius={"0.375rem"}
                    px={"0.375rem"}
                    bg={textInfoBgColor}
                    color={activeFontColor}
                  >
                    {getDefaultDepositPoolShare()}%
                  </Text>
                  <Image src={ArrowIcon} alt="arrow" />
                  <Text
                    fontSize="0.875rem"
                    borderRadius={"0.375rem"}
                    px={"0.375rem"}
                    bg={textInfoBgColor}
                    color={activeFontColor}
                  >
                    {getDepositPoolShare()}%
                  </Text>
                </HStack>
              </HStack>
            </VStack>
          </>
        )}
        {/* <Button
            w={"100%"}
            _hover={{ opacity: "0.9" }}
            h={"4.625rem"}
            borderRadius={"1.25rem"}
            bg={buttonBgColor}
            color={buttonColor}
            fontSize={"1.5rem"}
            onClick={() => setIsPreview(true)}
            isDisabled={approveDisable}
          >
            {approveText}
          </Button> */}
        {depositCompleted ? (
          <Button
            w={"100%"}
            _hover={{ opacity: "0.9" }}
            h={"4.625rem"}
            borderRadius={"1.25rem"}
            bg={buttonBgColor}
            color={buttonColor}
            fontSize={"1.5rem"}
            onClick={handleClose}
          >
            Close
          </Button>
        ) : hasDepositAllowance() && !approveDisable ? (
          chainConstants &&
          address && (
            <StableDepositBtn
              contract={chainConstants.POOL_ADDRESS}
              token={tokenFromAddress}
              recipient={address}
              amount={parseUnits(quantityFrom, getTokenDecimals(tokenFrom.toLowerCase()))}
              autoStake={false}
              //  bgColor={bgColor}
              //  hoverColor={hoverColor}
              setDepositLoading={setDepositLoading}
              setUserUpdate={setDepositCompleted}
            />
          )
        ) : approveDisable ? (
          <Button
            w={"100%"}
            _hover={{ opacity: "0.9" }}
            h={"4.625rem"}
            borderRadius={"1.25rem"}
            bg={buttonBgColor}
            color={buttonColor}
            fontSize={"1.5rem"}
            isDisabled
          >
            {approveText}
          </Button>
        ) : (
          <ApproveBtn
            contract={tokenFromAddress}
            spender={chainConstants?.POOL_ADDRESS}
            amount={parseUnits(quantityFrom, getTokenDecimals(tokenFrom.toLowerCase()))}
            // bgColor={bgColor}
            // hoverColor={hoverColor}
            setApproved={setApproved}
          />
        )}
      </Box>
    </Box>
  );
}

{
  /* <Box px={{ md: "60px" }}>
  <Grid templateColumns="repeat(10, 1fr)" gap={4}>
    <GridItem colSpan={{ base: 10, lg: 3 }}>
      <HStack pb={4}>
        <Spacer />
        <Image src={getTokenIcon(token)} alt={token} w={12} />
        <Heading color={primaryTextColor}>{token?.toUpperCase()} Pool</Heading>
        <Spacer />
      </HStack>
      <Flex
        bgColor={primaryBackgroundColor}
        border={"1"}
        borderWidth={1}
        borderColor={borderColor}
        rounded={"lg"}
        fontWeight={700}
        p={2}
        mb={4}
      >
        <Text color={primaryTextColor} fontSize={"lg"}>
          TVL
        </Text>
        <Spacer />
        <Text fontSize={"lg"}>${formatValueDigits(lpSupply, 0)}</Text>
      </Flex>
      <Box bgColor={ternaryBackgroundColor}>
        <Flex bgColor={secondaryBackgroundColor} rounded={"lg"} p={2} mb={1} direction={"column"} gap={2}>
          <Flex w={"100%"} justifyContent={"space-between"}>
            <Text color={secondaryTextColor} fontSize={"sm"}>
              LP PRICE
            </Text>
            <Text>${getLpRatio().toFixed(2)}</Text>
          </Flex>
          <Flex w={"100%"} justifyContent={"space-between"}>
            <Text color={secondaryTextColor} fontSize={"sm"}>
              LP APR
            </Text>
            <Text>10%</Text>
          </Flex>
          <Divider />
          <Flex w={"100%"} justifyContent={"space-between"}>
            <Text color={secondaryTextColor} fontSize={"sm"}>
              PLP PRICE
            </Text>
            <Text>${getPlpPrice().toFixed(2)}</Text>
          </Flex>
          <Flex w={"100%"} justifyContent={"space-between"}>
            <Text color={secondaryTextColor} fontSize={"sm"}>
              PLP APR
            </Text>
            <Text>10%</Text>
          </Flex>
          <Divider />
          <Flex w={"100%"} justifyContent={"space-between"}>
            <Text color={secondaryTextColor} fontSize={"sm"}>
              LIQUIDITY RATIO
            </Text>
            <Text>{getLiquidityRatio().toFixed(2)}%</Text>
          </Flex>
        </Flex>
        <Flex rounded={"lg"} p={2} mb={1} direction={"column"} gap={2}>
          <Flex w={"100%"} justifyContent={"space-between"}>
            <Text color={secondaryTextColor} fontSize={"sm"}>
              MY {token?.toUpperCase()} BALANCE
            </Text>
            <Text>${formatValue(tokenBalance)}</Text>
          </Flex>
          <Flex w={"100%"} justifyContent={"space-between"}>
            <Text color={secondaryTextColor} fontSize={"sm"}>
              MY DEPOSITS
            </Text>
            <Text>${formatValue(getTotalDepositValue())}</Text>
          </Flex>
          <Flex w={"100%"} justifyContent={"space-between"}>
            <Text color={secondaryTextColor} fontSize={"sm"}>
              MY STAKED
            </Text>
            <Text>${formatValue(getTotalStakedValue())}</Text>
          </Flex>
          <Divider />
          <Flex w={"100%"} justifyContent={"space-between"}>
            <Box>
              <Text color={secondaryTextColor} fontSize={"sm"}>
                MNTS EARNED
              </Text>
              <Text>{formatValue(Number(lpMntsEarned) + Number(plpMntsEarned))} MNTS</Text>
            </Box>
            <Box>
              {chainConstants && token && (
                <ClaimBtn
                  contract={chainConstants.MASTER_MANTIS_ADDRESS}
                  pids={getAllTokenPids(token)}
                  bgColor={bgColor}
                  hoverColor={hoverColor}
                  setUserUpdate={setUserUpdate}
                />
              )}
            </Box>
          </Flex>
        </Flex>
      </Box>
    </GridItem>
    <GridItem colSpan={{ base: 10, lg: 7 }}>
      {address && token && chainConstants && (
        <PerpPool
          address={address}
          chainConstants={chainConstants}
          token={token}
          tokenBalance={tokenBalance}
          lpBalance={lpBalance}
          plpBalance={plpBalance}
          plpStake={plpStake}
          plpMntsEarned={plpMntsEarned}
          lpRatio={getLpRatio()}
          plpRatio={getPlpRatio()}
          userUpdate={userUpdate}
          setUserUpdate={setUserUpdate}
        />
      )}
      {address && token && chainConstants && (
        <Box mt={8}>
          <StablePool
            address={address}
            chainConstants={chainConstants}
            token={token}
            tokenBalance={tokenBalance}
            lpBalance={lpBalance}
            lpStake={lpStake}
            lpMntsEarned={plpMntsEarned}
            lpRatio={getLpRatio()}
            userUpdate={userUpdate}
            setUserUpdate={setUserUpdate}
          />
        </Box>
      )}
    </GridItem>
  </Grid>
</Box> */
}
