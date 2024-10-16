import {
  Box,
  Image,
  Text,
  Spacer,
  Button,
  HStack,
  VStack,
  useColorModeValue,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { useAccount, useNetwork } from "wagmi";
import USDCIcon from "../../assets/tokens/USDC.svg";
import USDTIcon from "../../assets/tokens/USDT.svg";
import DAIIcon from "../../assets/tokens/DAI.svg";
import CardLineIcon from "../../assets/icons/Card-line.svg";
import { useEffect, useMemo, useState } from "react";
import { readContracts } from "@wagmi/core";
import { Abi, Address, formatUnits } from "viem";
import { ERC20ABI, LPABI, MasterMantisABI, PLPABI } from "../../abi";
import { CHAIN_CONSTANTS, getChainConstants } from "../../constants/addresses";
import { Link, useNavigate } from "react-router-dom";
import { formatValue, formatValueDigits } from "../../helpers/trim";
import {
  getAllPids,
  getTokenBorderColor,
  getTokenDecimals,
  getTokenHoverColor,
  getTokenLpPid,
  getTokenPlpPid,
  getTokenPrimaryBackgroundColor,
  getTokenPrimaryTextColor,
  getTokenSecondaryBackgroundColor,
  getTokenSecondaryTextColor,
  getTokenTernaryBackgroundColor,
} from "../../helpers/token";
import { ClaimBtn } from "../../components/transactions/claimBtn";
import { getTokensList, Token } from "../../constants/tokens";
import { BigNumber } from "ethers"; // If you're using BigNumber for balance
import axios from "axios";
import PoolSearchBar from "../../components/PoolSearchBar";

const tokens = [
  {
    symbol: "usdc",
    icon: USDCIcon,
    link: "/pools/usdc",
  },
  {
    symbol: "usdt",
    icon: USDTIcon,
    link: "/pools/usdt",
  },
  {
    symbol: "dai",
    icon: DAIIcon,
    link: "/pools/dai",
  },
];

export default function GraphTable() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const navigate = useNavigate();

  const [chainConstants, setChainConstants] = useState<
    CHAIN_CONSTANTS | undefined
  >(undefined);

  const [tokenList, setTokenList] = useState<Token[] | any>([]);

  type ContractInput = {
    address: Address; // Address is a string or type alias provided by Wagmi
    abi: Abi; // Abi can be any valid ABI array
    functionName: string;
  };

  useEffect(() => {
    if (chain?.id && address && chainConstants) {
      const tokensList = getTokensList(chain?.id);
      const lpAssetData: ContractInput[] = tokensList?.map((token) => ({
        address: token.lpAddress,
        abi: LPABI,
        functionName: "asset",
      }));

      const lpLiabilityData: ContractInput[] = tokensList?.map((token) => ({
        address: token.lpAddress,
        abi: LPABI,
        functionName: "liability",
      }));
      const lpTotalSupplyData: ContractInput[] = tokensList?.map((token) => ({
        address: token.lpAddress,
        abi: LPABI,
        functionName: "totalSupply",
      }));

      const plpAssetData: ContractInput[] = tokensList?.map((token) => ({
        address: token.plpAddress,
        abi: PLPABI,
        functionName: "asset",
      }));
      const plpTotalSupplyData: ContractInput[] = tokensList?.map((token) => ({
        address: token.plpAddress,
        abi: PLPABI,
        functionName: "totalSupply",
      }));

      const lpBalanceData: ContractInput[] = tokensList?.map((token) => ({
        address: token.lpAddress,
        abi: PLPABI,
        functionName: "balanceOf",
        args: [address],
      }));
      const lpUserInfoData: ContractInput[] = tokensList?.map(
        (token, index) => ({
          address: token.mmAddress,
          abi: MasterMantisABI,
          functionName: "userInfo",
          args: [BigInt(token.lpId), address],
        })
      );
      const lpPendingMntsData: ContractInput[] = tokensList?.map(
        (token, index) => ({
          address: token.mmAddress,
          abi: MasterMantisABI,
          functionName: "pendingMnts",
          args: [BigInt(token.lpId), address],
        })
      );

      const plpBalanceData: ContractInput[] = tokensList?.map((token) => ({
        address: token.plpAddress,
        abi: PLPABI,
        functionName: "balanceOf",
        args: [address],
      }));
      const plpUserInfoData: ContractInput[] = tokensList?.map(
        (token, index) => ({
          address: token.mmAddress,
          abi: MasterMantisABI,
          functionName: "userInfo",
          args: [BigInt(token.plpId), address],
        })
      );
      const plpPendingMntsData: ContractInput[] = tokensList?.map(
        (token, index) => ({
          address: token.mmAddress,
          abi: MasterMantisABI,
          functionName: "pendingMnts",
          args: [BigInt(token.plpId), address],
        })
      );

      const getContracts = async () => {
        const lpdata = await readContracts({
          contracts: [...lpAssetData, ...lpLiabilityData, ...lpTotalSupplyData],
        });
        const plpData = await readContracts({
          contracts: [...plpAssetData, ...plpTotalSupplyData],
        });
        const lpUserdata = await readContracts({
          contracts: [
            ...lpBalanceData,
            ...lpUserInfoData,
            ...lpPendingMntsData,
          ],
        });
        const plpUserData = await readContracts({
          contracts: [
            ...plpBalanceData,
            ...plpUserInfoData,
            ...plpPendingMntsData,
          ],
        });

        const volumeData = await axios.get(
          "https://api.mantissa.finance/api/pool/stats/volume/daily/" +
            chain?.id +
            "/"
        );

        const updatedTokenList = tokensList?.map(
          (token: Token, index: number, arr: Token[]) => {
            if (
              (lpdata[index].status === "success" &&
                lpdata[index + arr.length].status === "success" &&
                lpdata[index + arr.length + arr.length].status === "success") ||
              (lpUserdata[index].status === "success" &&
                lpUserdata[index + arr.length].status === "success" &&
                lpUserdata[index + arr.length + arr.length].status ===
                  "success") ||
              (plpData[index].status === "success" &&
                plpData[index + arr.length].status === "success") ||
              (plpUserData[index].status === "success" &&
                plpUserData[index + arr.length].status === "success" &&
                plpUserData[index + arr.length + arr.length].status ===
                  "success")
            ) {
              const assetLPResult =
                lpdata[index].status === "success"
                  ? (lpdata[index]?.result as string | BigNumber)
                  : 0;
              const libilityLPResult =
                lpdata[index + arr.length].status === "success"
                  ? (lpdata[index + arr.length]?.result as string | BigNumber)
                  : 0;
              const totalSupplyLPResult =
                lpdata[index + arr.length + arr.length].status === "success"
                  ? (lpdata[index + arr.length + arr.length]?.result as
                      | string
                      | BigNumber)
                  : 0;
              const assetpLPResult =
                plpData[index].status === "success"
                  ? (plpData[index]?.result as string | BigNumber)
                  : 0;
              const totalSupplyPLPResult =
                plpData[index + arr.length].status === "success"
                  ? (plpData[index + arr.length]?.result as string | BigNumber)
                  : 0;

              const balanceLPResult =
                lpUserdata[index].status === "success"
                  ? (lpUserdata[index]?.result as string | BigNumber)
                  : 0;
              const userInfoLPResult =
                lpUserdata[index + arr.length].status === "success"
                  ? ((
                      lpUserdata[index + arr.length]?.result as Array<any>
                    )[0] as string | BigNumber)
                  : 0;
              const pendingMntsLPResult =
                lpUserdata[index + arr.length + arr.length].status === "success"
                  ? (lpUserdata[index + arr.length + arr.length]?.result as
                      | string
                      | BigNumber)
                  : 0;
              const balancePLPResult =
                plpUserData[index].status === "success"
                  ? (plpUserData[index]?.result as string | BigNumber)
                  : 0;
              const userInfoPLPResult =
                plpUserData[index + arr.length].status === "success"
                  ? ((
                      plpUserData[index + arr.length]?.result as Array<any>
                    )[0] as string | BigNumber)
                  : 0;
              const pendingMntsPLPResult =
                plpUserData[index + arr.length + arr.length].status ===
                "success"
                  ? (plpUserData[index + arr.length + arr.length]?.result as
                      | string
                      | BigNumber)
                  : 0;

              const lpAsset =
                typeof assetLPResult === "string"
                  ? BigInt(assetLPResult)
                  : BigInt(assetLPResult.toString());
              const lpLiability =
                typeof libilityLPResult === "string"
                  ? BigInt(libilityLPResult)
                  : BigInt(libilityLPResult.toString());
              const lpTotalSupply =
                typeof totalSupplyLPResult === "string"
                  ? BigInt(totalSupplyLPResult)
                  : BigInt(totalSupplyLPResult.toString());
              const plpAsset =
                typeof assetpLPResult === "string"
                  ? BigInt(assetpLPResult)
                  : BigInt(assetpLPResult.toString());
              const plpTotalSupply =
                typeof totalSupplyPLPResult === "string"
                  ? BigInt(totalSupplyPLPResult)
                  : BigInt(totalSupplyPLPResult.toString());

              const lpBalance =
                typeof balanceLPResult === "string"
                  ? BigInt(balanceLPResult)
                  : BigInt(balanceLPResult.toString());
              const lpUserInfo =
                typeof userInfoLPResult === "string"
                  ? BigInt(userInfoLPResult)
                  : BigInt(userInfoLPResult.toString());
              const lpPendingMnts =
                typeof pendingMntsLPResult === "string"
                  ? BigInt(pendingMntsLPResult)
                  : BigInt(pendingMntsLPResult.toString());
              const plpBalance =
                typeof balancePLPResult === "string"
                  ? BigInt(balancePLPResult)
                  : BigInt(balancePLPResult.toString());
              const plpUserInfo =
                typeof userInfoPLPResult === "string"
                  ? BigInt(userInfoPLPResult)
                  : BigInt(userInfoPLPResult.toString());
              const plpPendingMnts =
                typeof pendingMntsPLPResult === "string"
                  ? BigInt(pendingMntsPLPResult)
                  : BigInt(pendingMntsPLPResult.toString());

              let tokenVolume = "-";
              try {
                tokenVolume =
                  volumeData.data["token_volume"][
                    token.name.toLowerCase()
                  ].toString();
              } catch {}

              return {
                ...token,
                lpAsset: formatUnits(
                  lpAsset,
                  getTokenDecimals(token.name.toLowerCase())
                ),
                lpLiability: formatUnits(
                  lpLiability,
                  getTokenDecimals(token.name.toLowerCase())
                ),
                lpTotalSupply: formatUnits(
                  lpTotalSupply,
                  getTokenDecimals(token.name.toLowerCase())
                ),
                plpAsset: formatUnits(
                  plpAsset,
                  getTokenDecimals(token.name.toLowerCase())
                ),
                plpTotalSupply: formatUnits(
                  plpTotalSupply,
                  getTokenDecimals(token.name.toLowerCase())
                ),
                lpBalance: formatUnits(
                  lpBalance,
                  getTokenDecimals(token.name.toLowerCase())
                ),
                lpUserInfo: formatUnits(
                  lpUserInfo,
                  getTokenDecimals(token.name.toLowerCase())
                ),
                lpPendingMnts: formatUnits(
                  lpPendingMnts,
                  getTokenDecimals(token.name.toLowerCase())
                ),
                plpBalance: formatUnits(
                  plpBalance,
                  getTokenDecimals(token.name.toLowerCase())
                ),
                plpUserInfo: formatUnits(
                  plpUserInfo,
                  getTokenDecimals(token.name.toLowerCase())
                ),
                plpPendingMnts: formatUnits(
                  plpPendingMnts,
                  getTokenDecimals(token.name.toLowerCase())
                ),
                volume: tokenVolume,
              };
            }
            return token;
          }
        );
        setTokenList(updatedTokenList);
      };
      setTokenList(tokensList);
      getContracts();
    }
  }, [chain?.id, address, chainConstants]);

  useEffect(() => {
    if (address && chain) {
      setChainConstants(getChainConstants(chain.id));
    }
  }, [address, chain]);

  const getLpAsset = (tokenName: string) => {
    return tokenList?.find((token: Token) => tokenName === token.name)?.lpAsset;
  };

  const getLpLiability = (tokenName: string) => {
    return tokenList?.find((token: Token) => tokenName === token.name)
      ?.lpLiability;
  };

  const getLpSupply = (tokenName: string) => {
    return tokenList?.find((token: Token) => tokenName === token.name)
      ?.lpTotalSupply;
  };

  const getPlpAsset = (tokenName: string) => {
    return tokenList?.find((token: Token) => tokenName === token.name)
      ?.plpAsset;
  };

  const getPlpSupply = (tokenName: string) => {
    return tokenList?.find((token: Token) => tokenName === token.name)
      ?.plpTotalSupply;
  };

  const getLpBalance = (tokenName: string) => {
    return tokenList?.find((token: Token) => tokenName === token.name)
      ?.lpBalance;
  };

  const getPlpBalance = (tokenName: string) => {
    return tokenList?.find((token: Token) => tokenName === token.name)
      ?.plpBalance;
  };

  const getLpStake = (tokenName: string) => {
    return tokenList?.find((token: Token) => tokenName === token.name)
      ?.lpUserInfo;
  };

  const getPlpStake = (tokenName: string) => {
    return tokenList?.find((token: Token) => tokenName === token.name)
      ?.plpUserInfo;
  };

  const getMntsEarned = (tokenName: string) => {
    const tokenInfo = tokenList?.find(
      (token: Token) => tokenName === token.name
    );
    return tokenInfo?.lpPendingMnts + tokenInfo?.plpPendingMnts;
  };

  const getLiquidityRatio = (token: string) => {
    const liability = Number(getLpLiability(token));
    return liability == 0 ? 100 : (Number(getLpAsset(token)) / liability) * 100;
  };

  const getLpRatio = (token: string) => {
    const supply = Number(getLpSupply(token));
    return supply == 0 ? 1 : Number(getLpLiability(token)) / supply;
  };

  const getPlpRatio = (token: string) => {
    const supply = Number(getPlpSupply(token));
    return supply == 0 ? 1 : Number(getPlpAsset(token)) / supply;
  };

  const getPlpPrice = (token: string) => {
    const lpRatio = getLpRatio(token);
    const plpRatio = getPlpRatio(token);
    return lpRatio * plpRatio;
  };

  const getTotalDepositValue = () => {
    let total = 0;
    for (let i = 0; i < tokenList.length; i++) {
      total +=
        Number(tokenList[i]?.lpBalance) * getLpRatio(tokenList[i].name) +
        Number(tokenList[i]?.plpBalance) * getPlpPrice(tokenList[i].name);
    }
    return total || 0;
  };

  const getTotalVolume = () => {
    let total = 0;
    for (let i = 0; i < tokenList.length; i++) {
      total += Number(tokenList[i]?.volume);
    }
    return total || 0;
  };

  const getTotalPendingMnts = () => {
    let total = 0;
    for (let i = 0; i < tokens.length; i++) {
      total += Number(getMntsEarned(tokens[i].symbol));
    }
    return total;
  };

  const totalTVL = useMemo(() => {
    let total = 0;

    tokenList.forEach((token: Token | any) => {
      total += Number(token?.lpTotalSupply);
    });
    return formatValueDigits(total, 0) || 0;
  }, [tokenList]);

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
    <Box
      display="flex"
      flexDir={"column"}
      gap={"1.875rem"}
      my={"1%"}
      className=" w-full mx-auto max-w-sm p-2 md:max-w-7xl "
    >
      {/* Table Starts Here */}
      <Box className="">
        <TableContainer
          borderLeftRadius={"1.25rem"}
          borderRightRadius={"1.25rem"}
        >
          <Table>
            <Thead bg={tableBg} h="3.125rem">
              <Tr>
                <Th
                  fontSize={"1rem"}
                  color={color}
                  style={{ textTransform: "capitalize" }}
                  fontWeight={500}
                >
                  Token
                </Th>
                <Th
                  fontSize={"1rem"}
                  color={color}
                  style={{ textTransform: "capitalize" }}
                  fontWeight={500}
                >
                  Liquidty Ratio
                </Th>
                <Th
                  fontSize={"1rem"}
                  color={color}
                  style={{ textTransform: "capitalize" }}
                  fontWeight={500}
                >
                  TVL
                </Th>
                <Th
                  fontSize={"1rem"}
                  color={color}
                  style={{ textTransform: "capitalize" }}
                  fontWeight={500}
                >
                  My Deposits
                </Th>
                <Th
                  fontSize={"1rem"}
                  color={color}
                  style={{ textTransform: "capitalize" }}
                  fontWeight={500}
                >
                  Volume
                </Th>
                <Th
                  fontSize={"1rem"}
                  color={color}
                  style={{ textTransform: "capitalize" }}
                  fontWeight={500}
                >
                  APR
                </Th>
                <Th
                  fontSize={"1rem"}
                  color={color}
                  style={{ textTransform: "capitalize" }}
                  fontWeight={500}
                >
                  Action
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {tokenList?.map((token: Token | any) => {
                return (
                  <Tr h="4.375rem" key={token?.id}>
                    <Td fontSize={"0.75rem"} color={color}>
                      <HStack gap="0.625rem">
                        <Image
                          boxSize={"2.375rem"}
                          src={token.img}
                          alt="token"
                        />
                        <VStack gap="0.25rem" alignItems={"flex-start"}>
                          <Text fontSize={"0.875rem"}>
                            {token.name?.toUpperCase()}
                          </Text>
                          <Text
                            fontSize={"0.75rem"}
                            fontWeight={400}
                            h={"1rem"}
                            borderRadius={"0.25rem"}
                            pl={"0.25rem"}
                            pr={"0.25rem"}
                            bg={greenBGColor}
                            color={greenColor}
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                          >
                            0.01%
                          </Text>
                        </VStack>
                      </HStack>
                    </Td>
                    <Td>
                      <Text
                        fontSize={"1rem"}
                        fontWeight={400}
                        borderRadius={"0.375rem"}
                        bg={greenBGColor}
                        color={greenColor}
                        w="3rem"
                        h="2rem"
                        className="ml-3 md:ml-0"
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        30%
                      </Text>
                    </Td>
                    <Td>
                      <Text fontSize={"1rem"} color={color}>
                        ${formatValueDigits(token?.lpTotalSupply, 0)}
                        {/* ${formatValueDigits(getLpSupply(token.symbol), 0)} */}
                      </Text>
                    </Td>
                    <Td>
                      <Text fontSize={"1rem"} color={color}>
                        ${formatValue(token?.lpBalance)}
                        {/* ${formatValue(getLpBalance(token.symbol))} */}
                      </Text>
                    </Td>
                    <Td>
                      <Text fontSize={"1rem"} color={color}>
                        ${formatValue(token?.volume)}
                      </Text>
                    </Td>
                    <Td>
                      <Text
                        fontSize={"1rem"}
                        fontWeight={400}
                        borderRadius={"0.375rem"}
                        bg={greenBGColor}
                        color={greenColor}
                        w="3rem"
                        h="2rem"
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        30%
                      </Text>
                    </Td>
                    <Td>
                      <HStack gap="0.625rem">
                        <Button
                          px="0.5rem"
                          bg={buttonBgColor}
                          borderRadius={"0.375rem"}
                          h="1.75rem"
                          fontSize={"0.75rem"}
                          color={color}
                          onClick={() => navigate(`/pools/${token.name}`)}
                        >
                          Deposit
                        </Button>
                        <Button
                          px="0.5rem"
                          bg={lightButtonBg}
                          borderRadius={"0.375rem"}
                          h="1.75rem"
                          fontSize={"0.75rem"}
                          color={color}
                          borderWidth={"0.5px"}
                          borderColor={borderColor}
                          isDisabled
                        >
                          Details
                        </Button>
                      </HStack>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
