import {
  Box,
  Card,
  CardBody,
  Image,
  Text,
  Heading,
  Stack,
  Center,
  SimpleGrid,
  Flex,
  Divider,
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
import USDCIcon from "../assets/tokens/USDC.svg";
import USDTIcon from "../assets/tokens/USDT.svg";
import DAIIcon from "../assets/tokens/DAI.svg";
import CardLineIcon from "../assets/icons/Card-line.svg";
import { useEffect, useMemo, useState } from "react";
import { readContracts } from "@wagmi/core";
import { Abi, Address, formatUnits } from "viem";
import { ERC20ABI, LPABI, MasterMantisABI, PLPABI } from "../abi";
import { CHAIN_CONSTANTS, getChainConstants } from "../constants/addresses";
import { Link, useNavigate } from "react-router-dom";
import { formatValue, formatValueDigits } from "../helpers/trim";
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
} from "../helpers/token";
import { ClaimBtn } from "../components/transactions/claimBtn";
import { getTokensList, Token } from "../constants/tokens";
import { BigNumber } from "ethers"; // If you're using BigNumber for balance
import axios from "axios";
import PoolSearchBar from "../components/PoolSearchBar";
import { Search2Icon } from "@chakra-ui/icons";
import { ArrowDownUp } from 'lucide-react';
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

export default function Pools() {
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

  // const [usdcLpAsset, setUsdcLpAsset] = useState<string>("");
  // const [usdtLpAsset, setUsdtLpAsset] = useState<string>("");
  // const [daiLpAsset, setDaiLpAsset] = useState<string>("");

  // const [usdcLpLiability, setUsdcLpLiability] = useState<string>("");
  // const [usdtLpLiability, setUsdtLpLiability] = useState<string>("");
  // const [daiLpLiability, setDaiLpLiability] = useState<string>("");

  // const [usdcLpSupply, setUsdcLpSupply] = useState<string>("");
  // const [usdtLpSupply, setUsdtLpSupply] = useState<string>("");
  // const [daiLpSupply, setDaiLpSupply] = useState<string>("");

  // const [usdcPlpAsset, setUsdcPlpAsset] = useState<string>("");
  // const [usdtPlpAsset, setUsdtPlpAsset] = useState<string>("");
  // const [daiPlpAsset, setDaiPlpAsset] = useState<string>("");

  // const [usdcPlpSupply, setUsdcPlpSupply] = useState<string>("");
  // const [usdtPlpSupply, setUsdtPlpSupply] = useState<string>("");
  // const [daiPlpSupply, setDaiPlpSupply] = useState<string>("");

  // const [usdcLpBalance, setUsdcLpBalance] = useState<string>("");
  // const [usdtLpBalance, setUsdtLpBalance] = useState<string>("");
  // const [daiLpBalance, setDaiLpBalance] = useState<string>("");

  // const [usdcPlpBalance, setUsdcPlpBalance] = useState<string>("");
  // const [usdtPlpBalance, setUsdtPlpBalance] = useState<string>("");
  // const [daiPlpBalance, setDaiPlpBalance] = useState<string>("");

  // const [usdcLpStake, setUsdcLpStake] = useState<string>("");
  // const [usdtLpStake, setUsdtLpStake] = useState<string>("");
  // const [daiLpStake, setDaiLpStake] = useState<string>("");

  // const [usdcPlpStake, setUsdcPlpStake] = useState<string>("");
  // const [usdtPlpStake, setUsdtPlpStake] = useState<string>("");
  // const [daiPlpStake, setDaiPlpStake] = useState<string>("");

  // const [usdcLpMntsEarned, setUsdcLpMntsEarned] = useState<string>("");
  // const [usdtLpMntsEarned, setUsdtLpMntsEarned] = useState<string>("");
  // const [daiLpMntsEarned, setDaiLpMntsEarned] = useState<string>("");

  // const [usdcPlpMntsEarned, setUsdcPlpMntsEarned] = useState<string>("");
  // const [usdtPlpMntsEarned, setUsdtPlpMntsEarned] = useState<string>("");
  // const [daiPlpMntsEarned, setDaiPlpMntsEarned] = useState<string>("");

  // const [userUpdate, setUserUpdate] = useState<boolean>(false);
  // const [depositView, setDepositView] = useState<boolean | string>(false);

  // async function getTokenData() {
  //   if (chainConstants) {
  //     const lpData = await readContracts({
  //       contracts: [
  //         {
  //           address: chainConstants.LP_USDC_ADDRESS,
  //           abi: LPABI,
  //           functionName: "asset",
  //         },
  //         {
  //           address: chainConstants.LP_USDT_ADDRESS,
  //           abi: LPABI,
  //           functionName: "asset",
  //         },
  //         {
  //           address: chainConstants.LP_DAI_ADDRESS,
  //           abi: LPABI,
  //           functionName: "asset",
  //         },
  //         {
  //           address: chainConstants.LP_USDC_ADDRESS,
  //           abi: LPABI,
  //           functionName: "liability",
  //         },
  //         {
  //           address: chainConstants.LP_USDT_ADDRESS,
  //           abi: LPABI,
  //           functionName: "liability",
  //         },
  //         {
  //           address: chainConstants.LP_DAI_ADDRESS,
  //           abi: LPABI,
  //           functionName: "liability",
  //         },
  //         {
  //           address: chainConstants.LP_USDC_ADDRESS,
  //           abi: LPABI,
  //           functionName: "totalSupply",
  //         },
  //         {
  //           address: chainConstants.LP_USDT_ADDRESS,
  //           abi: LPABI,
  //           functionName: "totalSupply",
  //         },
  //         {
  //           address: chainConstants.LP_DAI_ADDRESS,
  //           abi: LPABI,
  //           functionName: "totalSupply",
  //         },
  //       ],
  //     });

  //     const plpData = await readContracts({
  //       contracts: [
  //         {
  //           address: chainConstants.PLP_USDC_ADDRESS,
  //           abi: PLPABI,
  //           functionName: "asset",
  //         },
  //         {
  //           address: chainConstants.PLP_USDT_ADDRESS,
  //           abi: PLPABI,
  //           functionName: "asset",
  //         },
  //         {
  //           address: chainConstants.PLP_DAI_ADDRESS,
  //           abi: PLPABI,
  //           functionName: "asset",
  //         },
  //         {
  //           address: chainConstants.PLP_USDC_ADDRESS,
  //           abi: PLPABI,
  //           functionName: "totalSupply",
  //         },
  //         {
  //           address: chainConstants.PLP_USDT_ADDRESS,
  //           abi: PLPABI,
  //           functionName: "totalSupply",
  //         },
  //         {
  //           address: chainConstants.PLP_DAI_ADDRESS,
  //           abi: PLPABI,
  //           functionName: "totalSupply",
  //         },
  //       ],
  //     });

  //     if (lpData[0].status == "success") {
  //       setUsdcLpAsset(formatUnits(lpData[0].result, 6));
  //     }
  //     if (lpData[1].status == "success") {
  //       setUsdtLpAsset(formatUnits(lpData[1].result, 6));
  //     }
  //     if (lpData[2].status == "success") {
  //       setDaiLpAsset(formatUnits(lpData[2].result, 18));
  //     }
  //     if (lpData[3].status == "success") {
  //       setUsdcLpLiability(formatUnits(lpData[3].result, 6));
  //     }
  //     if (lpData[4].status == "success") {
  //       setUsdtLpLiability(formatUnits(lpData[4].result, 6));
  //     }
  //     if (lpData[5].status == "success") {
  //       setDaiLpLiability(formatUnits(lpData[5].result, 18));
  //     }
  //     if (lpData[6].status == "success") {
  //       setUsdcLpSupply(formatUnits(lpData[6].result, 6));
  //     }
  //     if (lpData[7].status == "success") {
  //       setUsdtLpSupply(formatUnits(lpData[7].result, 6));
  //     }
  //     if (lpData[8].status == "success") {
  //       setDaiLpSupply(formatUnits(lpData[8].result, 18));
  //     }

  //     if (plpData[0].status == "success") {
  //       setUsdcPlpAsset(formatUnits(plpData[0].result, 6));
  //     }
  //     if (plpData[1].status == "success") {
  //       setUsdtPlpAsset(formatUnits(plpData[1].result, 6));
  //     }
  //     if (plpData[2].status == "success") {
  //       setDaiPlpAsset(formatUnits(plpData[2].result, 18));
  //     }
  //     if (plpData[3].status == "success") {
  //       setUsdcPlpSupply(formatUnits(plpData[3].result, 6));
  //     }
  //     if (plpData[4].status == "success") {
  //       setUsdtPlpSupply(formatUnits(plpData[4].result, 6));
  //     }
  //     if (plpData[5].status == "success") {
  //       setDaiPlpSupply(formatUnits(plpData[5].result, 18));
  //     }
  //   }
  // }

  // async function getUserData() {
  //   if (address && chainConstants) {
  //     const lpData = await readContracts({
  //       contracts: [
  //         {
  //           address: chainConstants.LP_USDC_ADDRESS,
  //           abi: PLPABI,
  //           functionName: "balanceOf",
  //           args: [address],
  //         },
  //         {
  //           address: chainConstants.LP_USDT_ADDRESS,
  //           abi: PLPABI,
  //           functionName: "balanceOf",
  //           args: [address],
  //         },
  //         {
  //           address: chainConstants.LP_DAI_ADDRESS,
  //           abi: PLPABI,
  //           functionName: "balanceOf",
  //           args: [address],
  //         },
  //         {
  //           address: chainConstants.MASTER_MANTIS_ADDRESS,
  //           abi: MasterMantisABI,
  //           functionName: "userInfo",
  //           args: [BigInt(getTokenLpPid("usdc")), address],
  //         },
  //         {
  //           address: chainConstants.MASTER_MANTIS_ADDRESS,
  //           abi: MasterMantisABI,
  //           functionName: "userInfo",
  //           args: [BigInt(getTokenLpPid("usdt")), address],
  //         },
  //         {
  //           address: chainConstants.MASTER_MANTIS_ADDRESS,
  //           abi: MasterMantisABI,
  //           functionName: "userInfo",
  //           args: [BigInt(getTokenLpPid("dai")), address],
  //         },
  //         {
  //           address: chainConstants.MASTER_MANTIS_ADDRESS,
  //           abi: MasterMantisABI,
  //           functionName: "pendingMnts",
  //           args: [BigInt(getTokenLpPid("usdc")), address],
  //         },
  //         {
  //           address: chainConstants.MASTER_MANTIS_ADDRESS,
  //           abi: MasterMantisABI,
  //           functionName: "pendingMnts",
  //           args: [BigInt(getTokenLpPid("usdt")), address],
  //         },
  //         {
  //           address: chainConstants.MASTER_MANTIS_ADDRESS,
  //           abi: MasterMantisABI,
  //           functionName: "pendingMnts",
  //           args: [BigInt(getTokenLpPid("dai")), address],
  //         },
  //       ],
  //     });
  //     if (lpData[0].status == "success") {
  //       setUsdcLpBalance(formatUnits(lpData[0].result, 6));
  //     }
  //     if (lpData[1].status == "success") {
  //       setUsdtLpBalance(formatUnits(lpData[1].result, 6));
  //     }
  //     if (lpData[2].status == "success") {
  //       setDaiLpBalance(formatUnits(lpData[2].result, 18));
  //     }
  //     if (lpData[3].status == "success") {
  //       setUsdcLpStake(formatUnits(lpData[3].result[0], 6));
  //     }
  //     if (lpData[4].status == "success") {
  //       setUsdtLpStake(formatUnits(lpData[4].result[0], 6));
  //     }
  //     if (lpData[5].status == "success") {
  //       setDaiLpStake(formatUnits(lpData[5].result[0], 18));
  //     }
  //     if (lpData[6].status == "success") {
  //       setUsdcLpMntsEarned(formatUnits(lpData[6].result, 18));
  //     }
  //     if (lpData[7].status == "success") {
  //       setUsdtLpMntsEarned(formatUnits(lpData[7].result, 18));
  //     }
  //     if (lpData[8].status == "success") {
  //       setDaiLpMntsEarned(formatUnits(lpData[8].result, 18));
  //     }

  //     const plpData = await readContracts({
  //       contracts: [
  //         {
  //           address: chainConstants.PLP_USDC_ADDRESS,
  //           abi: PLPABI,
  //           functionName: "balanceOf",
  //           args: [address],
  //         },
  //         {
  //           address: chainConstants.PLP_USDT_ADDRESS,
  //           abi: PLPABI,
  //           functionName: "balanceOf",
  //           args: [address],
  //         },
  //         {
  //           address: chainConstants.PLP_DAI_ADDRESS,
  //           abi: PLPABI,
  //           functionName: "balanceOf",
  //           args: [address],
  //         },
  //         {
  //           address: chainConstants.MASTER_MANTIS_ADDRESS,
  //           abi: MasterMantisABI,
  //           functionName: "userInfo",
  //           args: [BigInt(getTokenPlpPid("usdc")), address],
  //         },
  //         {
  //           address: chainConstants.MASTER_MANTIS_ADDRESS,
  //           abi: MasterMantisABI,
  //           functionName: "userInfo",
  //           args: [BigInt(getTokenPlpPid("usdt")), address],
  //         },
  //         {
  //           address: chainConstants.MASTER_MANTIS_ADDRESS,
  //           abi: MasterMantisABI,
  //           functionName: "userInfo",
  //           args: [BigInt(getTokenPlpPid("dai")), address],
  //         },
  //         {
  //           address: chainConstants.MASTER_MANTIS_ADDRESS,
  //           abi: MasterMantisABI,
  //           functionName: "pendingMnts",
  //           args: [BigInt(getTokenPlpPid("usdc")), address],
  //         },
  //         {
  //           address: chainConstants.MASTER_MANTIS_ADDRESS,
  //           abi: MasterMantisABI,
  //           functionName: "pendingMnts",
  //           args: [BigInt(getTokenPlpPid("usdt")), address],
  //         },
  //         {
  //           address: chainConstants.MASTER_MANTIS_ADDRESS,
  //           abi: MasterMantisABI,
  //           functionName: "pendingMnts",
  //           args: [BigInt(getTokenPlpPid("dai")), address],
  //         },
  //       ],
  //     });

  //     if (plpData[0].status == "success") {
  //       setUsdcPlpBalance(formatUnits(plpData[0].result, 6));
  //     }
  //     if (plpData[1].status == "success") {
  //       setUsdtPlpBalance(formatUnits(plpData[1].result, 6));
  //     }
  //     if (plpData[2].status == "success") {
  //       setDaiPlpBalance(formatUnits(plpData[2].result, 18));
  //     }
  //     if (plpData[3].status == "success") {
  //       setUsdcPlpStake(formatUnits(plpData[3].result[0], 6));
  //     }
  //     if (plpData[4].status == "success") {
  //       setUsdtPlpStake(formatUnits(plpData[4].result[0], 6));
  //     }
  //     if (plpData[5].status == "success") {
  //       setDaiPlpStake(formatUnits(plpData[5].result[0], 18));
  //     }
  //     if (plpData[6].status == "success") {
  //       setUsdcPlpMntsEarned(formatUnits(plpData[6].result, 18));
  //     }
  //     if (plpData[7].status == "success") {
  //       setUsdtPlpMntsEarned(formatUnits(plpData[7].result, 18));
  //     }
  //     if (plpData[8].status == "success") {
  //       setDaiPlpMntsEarned(formatUnits(plpData[8].result, 18));
  //     }
  //   }
  // }

  // useEffect(() => {
  //   getTokenData();
  //   getUserData();
  // }, [chainConstants]);

  useEffect(() => {
    if (address && chain) {
      setChainConstants(getChainConstants(chain.id));
    }
  }, [address, chain]);

  // useEffect(() => {
  //   if (userUpdate) {
  //     setUserUpdate(false);
  //     getUserData();
  //   }
  // }, [userUpdate]);

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
      my={"4%"}
      className=" w-full mx-auto max-w-sm p-2 md:max-w-7xl "
    >
      <HStack
        borderWidth={"0.1rem"}
        borderColor={borderColor}
        borderRadius={"1.5rem"}
        bgColor={bg}
        className="py-4 justify-around"
        // gap={"1rem"}
        flexWrap={"wrap"}
        
      >
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
          <VStack gap="1rem">
            <HStack w="100%" alignItems="baseline">
              <Text
                fontWeight={700}
                fontSize={"1.5rem"}
                gap="0.313rem"
                color={color}
              >
                ${totalTVL}
              </Text>
              <Text fontWeight={400} fontSize={"0.875rem"} color={lightColor}>
                ETH
              </Text>
              <Spacer />
              <Text fontWeight={400} fontSize={"1rem"} color={color}>
                ≈{totalTVL}$
              </Text>
            </HStack>
            <HStack>
              <Image src={CardLineIcon} alt="card-line" />
            </HStack>
          </VStack>
        </VStack>

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
          <VStack gap="1rem">
            <HStack w="100%" alignItems="baseline">
              <Text
                fontWeight={700}
                fontSize={"1.5rem"}
                gap="0.313rem"
                color={color}
              >
                ${formatValue(getTotalVolume())}
              </Text>
              <Text fontWeight={400} fontSize={"0.875rem"} color={lightColor}>
                ETH
              </Text>
              <Spacer />
              <Text fontWeight={400} fontSize={"0.875rem"} color={color}>
                ≈0$
              </Text>
            </HStack>
            <HStack>
              <Image src={CardLineIcon} alt="card-line" />
            </HStack>
          </VStack>
        </VStack>

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
          <VStack gap="1rem">
            <HStack w="100%" alignItems="baseline">
              <Text
                fontWeight={700}
                fontSize={"1.5rem"}
                gap="0.313rem"
                color={color}
              >
                ${formatValue(getTotalDepositValue())}
              </Text>
              <Text fontWeight={400} fontSize={"0.875rem"} color={lightColor}>
                ETH
              </Text>
              <Spacer />
              <Text fontWeight={400} fontSize={"0.875rem"} color={color}>
                ≈{formatValue(getTotalDepositValue())}$
              </Text>
            </HStack>
            <HStack>
              <Image src={CardLineIcon} alt="card-line" />
            </HStack>
          </VStack>
        </VStack>

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
          <VStack gap="1rem">
            <HStack w="100%" alignItems="baseline">
              <Text
                fontWeight={700}
                fontSize={"1.5rem"}
                gap="0.313rem"
                color={color}
              >
              $0
              </Text>
              <Text fontWeight={400} fontSize={"0.875rem"} color={lightColor}>
                ETH
              </Text>
              <Spacer />
              <Text fontWeight={400} fontSize={"0.875rem"} color={color}>
                ≈0$
              </Text>
            </HStack>
            <HStack>
              <Image src={CardLineIcon} alt="card-line" />
            </HStack>
          </VStack>
        </VStack>
      </HStack>

      {/* Filter Tabs And Search Start Here */}
      <PoolSearchBar />

      {/* Table Starts Here */}
      <Box className="">
        <TableContainer
          borderLeftRadius={"1.25rem"}
          borderRightRadius={"1.25rem"}
          borderLeft='1px'
          borderRight='1px'
          borderColor={tableBg}
        >
          <Table >
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
                          onClick={() => navigate("/pools-details")}
                          
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

{
  /* <Box px={{ md: "60px" }} py={{ base: "12px", md: "24px" }}>
  <Flex>
    <Box>
      <Text color={"gray.500"} fontSize={"md"}>
        Total Deposit Value:
      </Text>
      <Center>
        <Text>${formatValue(getTotalDepositValue())}</Text>
      </Center>
    </Box>
    <Spacer />
    <Box>
      <HStack>
        <Box>
          <Text color={"gray.500"} fontSize={"sm"}>
            Total MNTS Earned
          </Text>
          <Text>{getTotalPendingMnts().toFixed(2)} MNTS</Text>
        </Box>
        {chainConstants && (
          <ClaimBtn
            contract={chainConstants.MASTER_MANTIS_ADDRESS}
            pids={getAllPids()}
            setUserUpdate={setUserUpdate}
          />
        )}
      </HStack>
    </Box>
  </Flex>
  <Flex mt={4} gap={6} wrap={"wrap"} align={"center"} justify={"space-around"}>
    {tokens.map((token, index) => {
      const borderColor = getTokenBorderColor(token.symbol);
      const primaryTextColor = getTokenPrimaryTextColor(token.symbol);
      const secondaryTextColor = getTokenSecondaryTextColor(token.symbol);
      const primaryBackgroundColor = getTokenPrimaryBackgroundColor(token.symbol);
      const secondaryBackgroundColor = getTokenSecondaryBackgroundColor(token.symbol);
      const ternaryBackgroundColor = getTokenTernaryBackgroundColor(token.symbol);
      return (
        <Link to={token.link} key={index}>
          <Card
            w={"sm"}
            key={index}
            border={"1"}
            borderWidth={1}
            borderColor={borderColor}
            backgroundColor={"whiteAlpha.50"}
            _hover={{ backgroundColor: ternaryBackgroundColor }}
          >
            <CardBody color={"gray.300"}>
              <Center>
                <Image src={token.icon} alt={token.symbol} w={24} />
              </Center>
              <Stack mt="6" spacing="2">
                <Center>
                  <Heading size="md" color={primaryTextColor}>
                    {token.symbol.toUpperCase()} Pool
                  </Heading>
                </Center>
                <Flex
                  bgColor={primaryBackgroundColor}
                  border={"1"}
                  borderWidth={1}
                  borderColor={borderColor}
                  rounded={"lg"}
                  fontWeight={700}
                  p={2}
                  mb={1}
                >
                  <Text color={primaryTextColor} fontSize={"lg"}>
                    TVL
                  </Text>
                  <Spacer />
                  <Text fontSize={"lg"}>${formatValueDigits(getLpSupply(token.symbol), 0)}</Text>
                </Flex>
                <Box bgColor={ternaryBackgroundColor}>
                  <Flex direction={"column"} gap={2} bgColor={secondaryBackgroundColor} p={2} rounded={"lg"}>
                    <Flex>
                      <Text color={secondaryTextColor} fontSize={"sm"}>
                        LP PRICE
                      </Text>
                      <Spacer />
                      <Text>${Number(getLpRatio(token.symbol)).toFixed(2)}</Text>
                    </Flex>
                    <Flex>
                      <Text color={secondaryTextColor} fontSize={"sm"}>
                        LP APR
                      </Text>
                      <Spacer />
                      <Text>10%</Text>
                    </Flex>
                    <Divider borderWidth={1} />
                    <Flex>
                      <Text color={secondaryTextColor} fontSize={"sm"}>
                        PLP PRICE
                      </Text>
                      <Spacer />
                      <Text>${Number(getPlpPrice(token.symbol)).toFixed(2)}</Text>
                    </Flex>
                    <Flex>
                      <Text color={secondaryTextColor} fontSize={"sm"}>
                        PLP APR
                      </Text>
                      <Spacer />
                      <Text>10%</Text>
                    </Flex>
                    <Divider borderWidth={1} />
                    <Flex>
                      <Text color={secondaryTextColor} fontSize={"sm"}>
                        LIQUIDITY RATIO
                      </Text>
                      <Spacer />
                      <Text>{getLiquidityRatio(token.symbol).toFixed(2)}%</Text>
                    </Flex>
                  </Flex>
                  <Flex direction={"column"} gap={2} p={2} rounded={"lg"}>
                    <Flex>
                      <Text color={secondaryTextColor} fontSize={"sm"}>
                        MY DEPOSITS
                      </Text>
                      <Spacer />
                      <Box>
                        <Text align={"right"}>
                          {formatValue(getLpBalance(token.symbol))}{" "}
                          <span style={{ color: "#777" }}>LP-{token.symbol.toUpperCase()}</span>
                        </Text>
                        <Text align={"right"}>
                          {formatValue(getPlpBalance(token.symbol))}{" "}
                          <span style={{ color: "#777" }}>
                            PLP-
                            {token.symbol.toUpperCase()}
                          </span>
                        </Text>
                      </Box>
                    </Flex>
                    <Divider borderWidth={1} />
                    <Flex>
                      <Text color={secondaryTextColor} fontSize={"sm"}>
                        MY STAKED
                      </Text>
                      <Spacer />
                      <Box>
                        <Text align={"right"}>
                          {formatValue(getLpStake(token.symbol))}{" "}
                          <span style={{ color: "#777" }}>
                            LP-
                            {token.symbol.toUpperCase()}
                          </span>
                        </Text>
                        <Text align={"right"}>
                          {formatValue(getPlpStake(token.symbol))}{" "}
                          <span style={{ color: "#777" }}>
                            PLP-
                            {token.symbol.toUpperCase()}
                          </span>
                        </Text>
                      </Box>
                    </Flex>
                    <Divider borderWidth={1} />
                    <Flex>
                      <Text color={secondaryTextColor} fontSize={"sm"}>
                        MNTS EARNED
                      </Text>
                      <Spacer />
                      <Text>{formatValue(getMntsEarned(token.symbol))} MNTS</Text>
                    </Flex>
                  </Flex>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </Link>
      );
    })}
  </Flex>
</Box> */
}

