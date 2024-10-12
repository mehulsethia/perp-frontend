import {
  Box,
  Text,
  Flex,
  Spacer,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  HStack,
  Input,
  Tooltip,
  Select,
  Button,
  Center,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { formatValue, formatValueDigits, trim } from "../helpers/trim";
import { useEffect, useState } from "react";
import { CHAIN_CONSTANTS } from "../constants/addresses";
import { readContracts } from "wagmi";
import { readContract } from "@wagmi/core";
import {
  getTokenAddress,
  getTokenBorderColor,
  getTokenButtonBgColor,
  getTokenButtonHoverColor,
  getTokenColorScheme,
  getTokenDecimals,
  getTokenGrayColor,
  getTokenLightColor,
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
import { ERC20ABI, LPABI, LiquidityManagerABI, PLPABI, PoolABI } from "../abi";
import { formatUnits, parseUnits } from "viem";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { tokenList } from "../constants/tokens";
import TokenSelect from "./tokenSelect";
import { ApproveBtn } from "./transactions/approveBtn";
import { PerpDepositBtn } from "./transactions/perpDepositBtn";
import { PerpWithdrawBtn } from "./transactions/perpWithdrawBtn";
import { getSlippage } from "../helpers/utils";
import { TokenStakeBtn } from "./transactions/tokenStakeBtn";
import { TokenUnstakeBtn } from "./transactions/tokenUnstakeBtn";
import { StableDepositBtn } from "./transactions/stableDepositBtn";
import { StableWithdrawBtn } from "./transactions/stableWithdrawBtn";

interface IStablePool {
  address: `0x${string}`;
  token: string;
  chainConstants: CHAIN_CONSTANTS;
  tokenBalance: string;
  lpBalance: string;
  lpStake: string;
  lpMntsEarned: string;
  lpRatio: number;
  userUpdate: boolean;
  setUserUpdate: any;
}

export default function StablePool({
  address,
  token,
  chainConstants,
  tokenBalance,
  lpBalance,
  lpStake,
  lpMntsEarned,
  lpRatio,
  userUpdate,
  setUserUpdate,
}: IStablePool) {
  const borderColor = getTokenBorderColor(token);
  const primaryTextColor = getTokenPrimaryTextColor(token);
  const secondaryTextColor = getTokenSecondaryTextColor(token);
  const primaryBackgroundColor = getTokenPrimaryBackgroundColor(token);
  const secondaryBackgroundColor = getTokenSecondaryBackgroundColor(token);
  const ternaryBackgroundColor = getTokenTernaryBackgroundColor(token);
  const lightColor = getTokenLightColor(token);
  const grayColor = getTokenGrayColor(token);
  const colorScheme = getTokenColorScheme(token);
  const bgColor = getTokenButtonBgColor(token);
  const hoverColor = getTokenButtonHoverColor(token);

  const [depositQuantity, setDepositQuantity] = useState<string>("");
  const [withdrawQuantity, setWithdrawQuantity] = useState<string>("");
  const [stakeQuantity, setStakeQuantity] = useState<string>("");
  const [unstakeQuantity, setUnstakeQuantity] = useState<string>("");

  const [depositQuote, setDepositQuote] = useState<string>("");
  const [depositFees, setDepositFees] = useState<number>(0);
  const [withdrawQuote, setWithdrawQuote] = useState<string>("");
  const [withdrawFees, setWithdrawFees] = useState<number>(0);

  const [tokenAllowance, setTokenAllowance] = useState<number>(0);
  const [lpAllowance, setLpAllowance] = useState<number>(0);
  const [lpStakeAllowance, setLpStakeAllowance] = useState<number>(0);

  const [withdrawToken, setWithdrawToken] = useState<string>(token);
  const [withdrawableTokens, setWithdrawableTokens] = useState<string[]>([token]);

  const [approved, setApproved] = useState<boolean>(false);

  const decimals = getTokenDecimals(token);
  const numberDecimals = 6;

  async function getUserAllowance() {
    const data = await readContracts({
      contracts: [
        {
          address: getTokenAddress(chainConstants, token),
          abi: ERC20ABI,
          functionName: "allowance",
          args: [address, chainConstants.POOL_ADDRESS],
        },
        {
          address: getTokenLpAddress(chainConstants, token),
          abi: LPABI,
          functionName: "allowance",
          args: [address, chainConstants.POOL_ADDRESS],
        },
        {
          address: getTokenPlpAddress(chainConstants, token),
          abi: PLPABI,
          functionName: "allowance",
          args: [address, chainConstants.MASTER_MANTIS_ADDRESS],
        },
      ],
    });

    if (data[0].status == "success") {
      setTokenAllowance(Number(formatUnits(data[0].result, decimals)));
    }
    if (data[1].status == "success") {
      setLpAllowance(Number(formatUnits(data[1].result, decimals)));
    }
    if (data[2].status == "success") {
      setLpStakeAllowance(Number(formatUnits(data[2].result, decimals)));
    }
  }

  async function updateWithdrawableTokens() {
    const otherTokens = tokenList.filter((item) => item != token);
    const data = await readContracts({
      contracts: otherTokens.map((item) => ({
        address: getTokenLpAddress(chainConstants, item),
        abi: LPABI,
        functionName: "getLR",
      })),
    });

    let allowedTokens = [token];
    otherTokens.map((item, index) => {
      if (data[index].status == "success") {
        if (data[index].result) {
          //@ts-ignore
          const lr = Number(formatUnits(data[index].result, 18));
          if (lr > 1) {
            allowedTokens.push(item);
          }
        }
      }
    });
    setWithdrawableTokens(allowedTokens);
  }

  const setPositiveStakeQuantity = (value: string) => {
    if (Number(value) > Number(lpBalance)) value = trim(Number(lpBalance), numberDecimals);
    Number(value) >= 0 ? setStakeQuantity(trim(Number(value), numberDecimals)) : setStakeQuantity("");
  };

  const setPositiveUnstakeQuantity = (value: string) => {
    if (Number(value) > Number(lpStake)) value = trim(Number(lpStake), numberDecimals);
    Number(value) >= 0 ? setUnstakeQuantity(trim(Number(value), numberDecimals)) : setUnstakeQuantity("");
  };

  const setPositiveDepositQuantity = (value: string) => {
    if (Number(value) > Number(tokenBalance)) value = trim(Number(tokenBalance), numberDecimals);
    Number(value) >= 0 ? setDepositQuantity(trim(Number(value), numberDecimals)) : setDepositQuantity("");
  };

  const setPositiveWithdrawQuantity = (value: string) => {
    if (Number(value) > Number(lpBalance)) value = trim(Number(lpBalance), numberDecimals);
    Number(value) >= 0
      ? setWithdrawQuantity(formatValueDigits(Number(value), numberDecimals))
      : setWithdrawQuantity("");
  };

  useEffect(() => {
    getUserAllowance();
    updateWithdrawableTokens();
  }, [chainConstants, address]);

  useEffect(() => {
    if (lpRatio < 1) {
      updateWithdrawableTokens();
    }
  }, [lpRatio]);

  useEffect(() => {
    if (approved) {
      setApproved(false);
      getUserAllowance();
    }
  }, [approved]);

  useEffect(() => {
    if (userUpdate) {
      getUserAllowance();
    }
  }, [userUpdate]);

  useEffect(() => {
    const getDepositQuote = async () => {
      if (Number(depositQuantity) > 0) {
        try {
          const quoteData = await readContract({
            address: chainConstants.POOL_ADDRESS,
            abi: PoolABI,
            functionName: "getDepositAmount",
            args: [getTokenLpAddress(chainConstants, token), parseUnits(depositQuantity, decimals), false, BigInt(0)],
          });
          const contractDepositQuote = formatUnits(quoteData[0], decimals);
          setDepositQuote(formatValue(contractDepositQuote));
          setDepositFees(Number(formatUnits(quoteData[1], decimals)));
        } catch (e: any) {
          console.log(e);
        }
      }
    };
    const timeOutId = setTimeout(() => getDepositQuote(), 250);
    return () => clearTimeout(timeOutId);
  }, [depositQuantity]);

  useEffect(() => {
    const getWithdrawQuote = async () => {
      if (Number(withdrawQuantity) > 0) {
        try {
          if (token == withdrawToken) {
            const quoteData = await readContract({
              address: chainConstants.POOL_ADDRESS,
              abi: PoolABI,
              functionName: "getWithdrawAmount",
              args: [getTokenLpAddress(chainConstants, token), parseUnits(withdrawQuantity, decimals), false],
            });
            const contractWithdrawQuote = formatUnits(quoteData[0], decimals);
            setWithdrawQuote(formatValue(contractWithdrawQuote));
            setWithdrawFees(Number(formatUnits(quoteData[1], decimals)));
          } else {
            const quoteData = await readContract({
              address: chainConstants.POOL_ADDRESS,
              abi: PoolABI,
              functionName: "getWithdrawAmountOtherToken",
              args: [
                getTokenLpAddress(chainConstants, token),
                getTokenLpAddress(chainConstants, withdrawToken),
                parseUnits(withdrawQuantity, decimals),
              ],
            });
            const contractWithdrawOriginalQuote = formatUnits(quoteData[0], decimals);
            const contractWithdrawOtherQuote = formatUnits(quoteData[1], getTokenDecimals(withdrawToken));
            setWithdrawQuote(formatValue(contractWithdrawOtherQuote));
            let fees = 0;
            const expectedAmount = Number(withdrawQuantity) * lpRatio;
            if (expectedAmount > Number(contractWithdrawOtherQuote)) {
              fees = expectedAmount - Number(contractWithdrawOtherQuote);
            }
            setWithdrawFees(fees);
          }
        } catch (e: any) {
          console.log(e);
        }
      }
    };
    const timeOutId = setTimeout(() => getWithdrawQuote(), 250);
    return () => clearTimeout(timeOutId);
  }, [withdrawQuantity, withdrawToken]);

  const hasDepositAllowance = () => {
    return tokenAllowance >= Number(depositQuantity);
  };

  const getDepositFeePercent = () => {
    return Number(depositQuantity) == 0 ? "0.00" : formatValue((depositFees / Number(depositQuantity)) * 100);
  };

  const getWithdrawFeePercent = () => {
    return Number(withdrawQuantity) == 0 ? "0.00" : formatValue((withdrawFees / Number(withdrawQuantity)) * 100);
  };

  return (
    <Box backgroundColor={ternaryBackgroundColor} mt={2} mx={{ base: 2, md: 4, lg: 8 }} rounded={"md"}>
      <Grid templateColumns="repeat(7, 1fr)" gap={1}>
        <GridItem colSpan={{ base: 7, lg: 3 }}>
          <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight={500} pl={4} color={lightColor}>
            Stable Pool
          </Text>
          <Flex direction={"column"} px={4} pt={4} gap={1} color={"gray.500"} fontSize={{ base: "sm" }}>
            <Text>
              Deposit {token?.toUpperCase()} to get LP-{token?.toUpperCase()} tokens.
            </Text>
            <Text>Earn swap fees with minimal risk.</Text>
            <Text>Stake LP-{token?.toUpperCase()} tokens to earn MNTS emissions.</Text>
          </Flex>
          <Flex
            direction={"column"}
            w={"100%"}
            p={4}
            rounded={"md"}
            gap={2}
            color={"gray.400"}
            fontSize={{ base: "sm", md: "md" }}
          ></Flex>
          <Flex direction={"column"} gap={2} w={"100%"} rounded={"md"} p={4}>
            <Flex>
              <Text color={secondaryTextColor} fontSize={"sm"}>
                MY DEPOSIT
              </Text>
              <Spacer />
              <Text>
                {formatValue(Number(lpBalance) + Number(lpStake))}{" "}
                <span style={{ color: "gray" }}>LP-{token?.toUpperCase()}</span>
              </Text>
            </Flex>
            <Flex>
              <Text color={secondaryTextColor} fontSize={"sm"}>
                MY STAKE
              </Text>
              <Spacer />
              <Text>
                {formatValue(lpStake)} <span style={{ color: "gray" }}>LP-{token?.toUpperCase()}</span>
              </Text>
            </Flex>
            <Flex>
              <Text color={secondaryTextColor} fontSize={"sm"}>
                MNTS EARNED
              </Text>
              <Spacer />
              <Text>
                {formatValue(lpMntsEarned)} <span style={{ color: "gray" }}>MNTS</span>
              </Text>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem colSpan={{ base: 7, lg: 4 }}>
          <Flex
            gap={1}
            direction={{ base: "column", md: "row" }}
            justify={{ base: "space-between", lg: "space-around" }}
            align={"center"}
          >
            <Tabs
              w={{ base: "100%" }}
              mx={{ base: 2, md: 4, xl: 8 }}
              isFitted
              colorScheme={colorScheme}
              size={{ base: "sm", md: "md" }}
              mb={"auto"}
            >
              <TabList color={grayColor}>
                <Tab>Deposit</Tab>
                <Tab>Withdraw</Tab>
                <Tab>Stake</Tab>
                <Tab>Unstake</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box my={1} px={2} py={1} rounded={"md"}>
                    <HStack color={"whiteAlpha.600"} fontSize={"sm"}>
                      <Text>Deposit</Text>
                      <Spacer />
                      <Text>
                        Balance: {formatValue(tokenBalance)} {token.toUpperCase()}
                      </Text>
                    </HStack>
                    <Input
                      type="number"
                      placeholder="0.0"
                      my={2}
                      value={depositQuantity}
                      dir="rtl"
                      onChange={(e) => setPositiveDepositQuantity(e.target.value)}
                    />
                    <HStack>
                      <Text color={secondaryTextColor} fontSize={"sm"}>
                        FEES
                      </Text>
                      <Spacer />
                      <Text>
                        ${formatValue(depositFees)} ({getDepositFeePercent()}%)
                      </Text>
                    </HStack>
                    <HStack>
                      <Text color={secondaryTextColor} fontSize={"sm"}>
                        YOU WILL RECEIVE
                      </Text>
                      <Spacer />
                      <Text>
                        {depositQuote} LP-{token.toUpperCase()}
                      </Text>
                    </HStack>
                    {hasDepositAllowance() ? (
                      <HStack mt={8}>
                        <StableDepositBtn
                          contract={chainConstants.POOL_ADDRESS}
                          token={getTokenAddress(chainConstants, token)}
                          recipient={address}
                          amount={parseUnits(depositQuantity, decimals)}
                          autoStake={false}
                          bgColor={bgColor}
                          hoverColor={hoverColor}
                          setUserUpdate={setUserUpdate}
                        />
                        <StableDepositBtn
                          contract={chainConstants.POOL_ADDRESS}
                          token={getTokenAddress(chainConstants, token)}
                          recipient={address}
                          amount={parseUnits(depositQuantity, decimals)}
                          autoStake={true}
                          bgColor={bgColor}
                          hoverColor={hoverColor}
                          setUserUpdate={setUserUpdate}
                        />
                      </HStack>
                    ) : (
                      <Box mt={8}>
                        <ApproveBtn
                          contract={getTokenAddress(chainConstants, token)}
                          spender={chainConstants.POOL_ADDRESS}
                          amount={parseUnits(depositQuantity, decimals)}
                          bgColor={bgColor}
                          hoverColor={hoverColor}
                          setApproved={setApproved}
                        />
                      </Box>
                    )}
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box my={1} px={2} py={1} rounded={"md"}>
                    <HStack color={"whiteAlpha.600"} fontSize={"sm"}>
                      <Text>Withdraw</Text>
                      <Spacer />
                      <Text>
                        Balance: {formatValue(lpBalance)} LP-{token.toUpperCase()}
                      </Text>
                    </HStack>
                    <HStack my={2}>
                      {/* <TokenSelect
                        options={withdrawableTokens}
                        value={withdrawToken}
                        setValue={setWithdrawToken}
                        minW={{
                          base: "100px",
                          md: "96px",
                          lg: "140px",
                          xl: "180px",
                        }}
                      /> */}
                      <Spacer />
                      <Input
                        type="number"
                        placeholder="0.0"
                        value={withdrawQuantity}
                        dir="rtl"
                        onChange={(e) => setPositiveWithdrawQuantity(e.target.value)}
                      />
                    </HStack>
                    <HStack>
                      <Text color={secondaryTextColor} fontSize={"sm"}>
                        FEES
                      </Text>
                      <Spacer />
                      <Text>
                        ${formatValue(withdrawFees)} ({getWithdrawFeePercent()}
                        %)
                      </Text>
                    </HStack>
                    <HStack>
                      <Text color={secondaryTextColor} fontSize={"sm"}>
                        YOU WILL RECEIVE
                      </Text>
                      <Spacer />
                      <Text>
                        {withdrawQuote} {withdrawToken.toUpperCase()}
                      </Text>
                    </HStack>
                    <Box mt={8}>
                      {lpAllowance >= Number(withdrawQuantity) ? (
                        <StableWithdrawBtn
                          contract={chainConstants.POOL_ADDRESS}
                          token={getTokenAddress(chainConstants, token)}
                          otherToken={getTokenAddress(chainConstants, withdrawToken)}
                          recipient={address}
                          lpAmount={parseUnits(withdrawQuantity, decimals)}
                          minAmount={parseUnits(
                            (Number(withdrawQuantity) * (1 - getSlippage() / 100)).toString(),
                            decimals
                          )}
                          bgColor={bgColor}
                          hoverColor={hoverColor}
                          setUserUpdate={setUserUpdate}
                        />
                      ) : (
                        <ApproveBtn
                          contract={getTokenLpAddress(chainConstants, token)}
                          spender={chainConstants.POOL_ADDRESS}
                          amount={parseUnits(withdrawQuantity, decimals)}
                          bgColor={bgColor}
                          hoverColor={hoverColor}
                          setApproved={setApproved}
                        />
                      )}
                    </Box>
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box my={1} px={2} py={1} rounded={"md"}>
                    <HStack color={"whiteAlpha.600"} fontSize={"sm"}>
                      <Text>Stake</Text>
                      <Spacer />
                      <Text>
                        Balance: {formatValue(lpBalance)} LP-{token.toUpperCase()}
                      </Text>
                    </HStack>
                    <Input
                      type="number"
                      placeholder="0.0"
                      value={stakeQuantity}
                      dir="rtl"
                      onChange={(e) => setPositiveStakeQuantity(e.target.value)}
                    />
                    <HStack mt={8}>
                      {lpStakeAllowance >= Number(stakeQuantity) ? (
                        <TokenStakeBtn
                          contract={chainConstants.MASTER_MANTIS_ADDRESS}
                          _user={address}
                          _pid={getTokenLpPid(token)}
                          _amount={parseUnits(stakeQuantity, decimals)}
                          bgColor={bgColor}
                          hoverColor={hoverColor}
                          setUserUpdate={setUserUpdate}
                        />
                      ) : (
                        <ApproveBtn
                          contract={getTokenLpAddress(chainConstants, token)}
                          spender={chainConstants.MASTER_MANTIS_ADDRESS}
                          amount={parseUnits(stakeQuantity, decimals)}
                          bgColor={bgColor}
                          hoverColor={hoverColor}
                          setApproved={setApproved}
                        />
                      )}
                    </HStack>
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box my={1} px={2} py={1} rounded={"md"}>
                    <HStack color={"whiteAlpha.600"} fontSize={"sm"}>
                      <Text>Unstake</Text>
                      <Spacer />
                      <Text>
                        Balance: {formatValue(lpStake)} Staked LP-
                        {token.toUpperCase()}
                      </Text>
                    </HStack>
                    <Input
                      type="number"
                      placeholder="0.0"
                      value={unstakeQuantity}
                      dir="rtl"
                      onChange={(e) => setPositiveUnstakeQuantity(e.target.value)}
                    />
                    <Box mt={4}>
                      <TokenUnstakeBtn
                        contract={chainConstants.MASTER_MANTIS_ADDRESS}
                        _pid={getTokenLpPid(token)}
                        _amount={parseUnits(unstakeQuantity, decimals)}
                        bgColor={bgColor}
                        hoverColor={hoverColor}
                        setUserUpdate={setUserUpdate}
                      />
                    </Box>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
}
