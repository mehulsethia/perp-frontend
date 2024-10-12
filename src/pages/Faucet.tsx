import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Hide,
  Image,
  Link,
  Show,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { getTokenDecimals, getTokenIcon } from "../helpers/token";
import { useEffect, useState } from "react";
import { readContracts, useAccount, useNetwork } from "wagmi";
import { CHAIN_CONSTANTS, getChainConstants } from "../constants/addresses";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ERC20ABI } from "../abi";
import { formatUnits } from "viem";
import USDCIcon from "../assets/tokens/USDC.svg";
import USDTIcon from "../assets/tokens/USDT.svg";
import DAIIcon from "../assets/tokens/DAI.svg";
import axios from "axios";

const addTokenToWallet = (tokenSymbol: string, tokenAddress: string) => async () => {
  const tokenImage = getTokenIcon(tokenSymbol);
  const decimals = getTokenDecimals(tokenSymbol);

  if ((window as any).ethereum) {
    try {
      await (window as any).ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol.toUpperCase(),
            decimals: decimals,
            image: tokenImage,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
};

const postUrl = "https://api.mantissa.finance/api/testnet/distribute/";

export default function Faucet() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  const [chainConstants, setChainConstants] = useState<CHAIN_CONSTANTS | undefined>(undefined);

  const [usdcBalance, setUsdcBalance] = useState<string>("");
  const [usdtBalance, setUsdtBalance] = useState<string>("");
  const [daiBalance, setDaiBalance] = useState<string>("");
  const [fundsRequested, setFundsRequested] = useState<boolean>(false);

  const toast = useToast();

  const showSuccessToast = () => {
    toast({
      title: "Request Successful",
      description: "Funds will arrive shortly",
      status: "success",
      duration: 8000,
      isClosable: true,
    });
  };

  const showErrorToast = (desc: string) => {
    toast({
      title: "Error",
      description: desc.slice(0, 200),
      status: "error",
      duration: 6000,
      isClosable: true,
    });
  };

  async function getUserData() {
    if (address && chainConstants) {
      const balData = await readContracts({
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

      if (balData[0].status == "success") {
        setUsdcBalance(formatUnits(balData[0].result, 6));
      }
      if (balData[1].status == "success") {
        setUsdtBalance(formatUnits(balData[1].result, 6));
      }
      if (balData[2].status == "success") {
        setDaiBalance(formatUnits(balData[2].result, 18));
      }
    }
  }

  useEffect(() => {
    if (address && chain) {
      setChainConstants(getChainConstants(chain.id));
    }
  }, [address, chain]);

  useEffect(() => {
    getUserData();
  }, [chainConstants]);

  function canRequestFunds() {
    return !fundsRequested && Number(usdcBalance) < 1000 && Number(usdtBalance) < 1000 && Number(daiBalance) < 1000;
  }

  const onFundRequest = async () => {
    setFundsRequested(true);
    try {
      const { data: response } = await axios.post(postUrl, { recipient: address });
      if (response.successful) {
        showSuccessToast();
      } else {
        showErrorToast(response.reason);
        setFundsRequested(false);
      }
    } catch {
      setFundsRequested(false);
      showErrorToast("Unable to request. Try Again Later");
    }
  };

  return (
    <Box py={{ base: "12px", md: "24px" }}>
      <VStack>
        {address ? (
          <Box w={{ base: "sm", md: "2xl" }} p={4} backgroundColor={"gray.700"}>
            <Heading textAlign={"center"}>Faucet</Heading>
            <Text mt={4}>
              The Faucet distributes <b>Mantis Testnet specific USDC, USDT, DAI</b> tokens on Polygon Mumbai network.
              The faucet can only be used once per wallet address.
              <br />
              To get MATIC tokens, go{" "}
              <Link href={"https://mumbaifaucet.com"} textDecoration={"underline"} isExternal>
                here
              </Link>
            </Text>
            <Flex my={4}>
              <Text>Your Address:</Text>
              <Text ml={2} fontWeight={700}>
                <Show above="md">{address}</Show>
                <Hide above="md">{address.slice(0, 8) + "..." + address.slice(-8)}</Hide>
              </Text>
            </Flex>
            {chainConstants && (
              <>
                {canRequestFunds() && (
                  <Flex justifyContent={"center"}>
                    <Button onClick={onFundRequest} bgColor={"blue.700"} size={"lg"}>
                      Get Test Tokens
                    </Button>
                  </Flex>
                )}
                <Text color={"gray.400"} mt={4}>
                  The following tokens and quantities will be sent to your wallet. To see tokens in your wallet, click
                  `Add to Wallet` button corresponding to each token.
                </Text>
                <TableContainer>
                  <Table variant={"simple"}>
                    <Tbody>
                      <Tr>
                        <Td>
                          <HStack>
                            <Image src={USDCIcon} w={6} />
                            <Text>USDC</Text>
                          </HStack>
                        </Td>
                        <Td>
                          <Text>100,000</Text>
                        </Td>
                        <Td>
                          <Button onClick={addTokenToWallet("usdc", chainConstants.USDC_ADDRESS)}>Add to Wallet</Button>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <HStack>
                            <Image src={USDTIcon} w={6} />
                            <Text>USDT</Text>
                          </HStack>
                        </Td>
                        <Td>
                          <Text>100,000</Text>
                        </Td>
                        <Td>
                          <Button onClick={addTokenToWallet("usdt", chainConstants.USDT_ADDRESS)}>Add to Wallet</Button>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <HStack>
                            <Image src={DAIIcon} w={6} />
                            <Text>DAI</Text>
                          </HStack>
                        </Td>
                        <Td>
                          <Text>100,000</Text>
                        </Td>
                        <Td>
                          <Button onClick={addTokenToWallet("dai", chainConstants.DAI_ADDRESS)}>Add to Wallet</Button>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </>
            )}
          </Box>
        ) : (
          <ConnectButton
            showBalance={false}
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
            label="Connect Your Wallet"
          />
        )}
      </VStack>
    </Box>
  );
}
