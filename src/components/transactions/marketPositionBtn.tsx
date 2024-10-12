import { parseEther } from "viem";
import { TradeManagerABI, TradeRouterABI } from "../../abi";
import { useContractWrite, useNetwork, useWaitForTransaction } from "wagmi";
import { readContract, readContracts } from "@wagmi/core";
import { useToast, Text, Link, Button, Spinner } from "@chakra-ui/react";
import { getTxnLink } from "../../helpers/network";
import { ArrowForwardIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { EvmPriceServiceConnection } from "@pythnetwork/pyth-evm-js";
import { getPairData } from "../../helpers/pair";
import IPythAbi from "@pythnetwork/pyth-sdk-solidity/abis/IPyth.json";

interface IMarketPositionBtn {
  pythPriceService: EvmPriceServiceConnection;
  pythAddress: `0x${string}`;
  contract: `0x${string}`;
  assetIndex: number;
  amount: string;
  multiplier: number;
  limitPrice: string;
  isLong: boolean;
  collateralToken: `0x${string}`;
  setUserUpdate: any;
}

export function MarketPositionBtn({
  pythPriceService,
  pythAddress,
  contract,
  assetIndex,
  amount,
  multiplier,
  limitPrice,
  isLong,
  collateralToken,
  setUserUpdate,
}: IMarketPositionBtn) {
  const { chain } = useNetwork();
  const toast = useToast();

  const [txnValue, setTxnValue] = useState<bigint>();
  const [pythUpdateData, setPythUpdateData] = useState<string[]>([]);
  const [startLoading, setStartLoading] = useState<boolean>(false);

  const showSuccessToast = () => {
    toast({
      title: "Transaction Successful",
      description: (
        <Text>
          View your txn on the{" "}
          <Link href={getTxnLink(data?.hash, chain?.id)} textDecoration={"underline"} isExternal>
            {" "}
            block explorer <ExternalLinkIcon mx="2px" />
          </Link>
        </Text>
      ),
      status: "success",
      duration: 8000,
      isClosable: true,
    });
  };

  const showErrorToast = () => {
    toast({
      title: "Error",
      description: error?.message.slice(0, 200) + "...",
      status: "error",
      duration: 6000,
      isClosable: true,
    });
  };

  const {
    data,
    isLoading: isWriteLoading,
    error,
    isError,
    write,
  } = useContractWrite({
    address: contract,
    abi: TradeRouterABI,
    functionName: "increasePosition",
    args: [
      pythUpdateData as `0x${string}`[],
      assetIndex,
      parseEther(amount),
      BigInt((multiplier * 100).toFixed(0)),
      parseEther(limitPrice),
      isLong,
      collateralToken,
    ],
    value: txnValue,
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const initTxn = async (e: any) => {
    setStartLoading(true);
    setTxnValue(undefined);
    try {
      const pairData = getPairData(assetIndex);
      const priceFeedUpdateData = await pythPriceService.getPriceFeedsUpdateData(pairData.feedId);
      setPythUpdateData(priceFeedUpdateData);
      const data = await readContract({
        address: pythAddress,
        abi: IPythAbi,
        functionName: "getUpdateFee",
        args: [priceFeedUpdateData],
      });
      if (data) {
        //@ts-ignore
        setTxnValue(data);
      }
    } catch {}
    setStartLoading(false);
  };

  useEffect(() => {
    if (isSuccess) {
      showSuccessToast();
      setUserUpdate(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      showErrorToast();
    }
  }, [isError]);

  useEffect(() => {
    if (pythUpdateData.length && txnValue) {
      write?.();
    }
  }, [txnValue]);

  return (
    <Button
      w={"100%"}
      py={6}
      border={"1"}
      borderWidth={1}
      // borderColor={"blue.600"}
      // color={"whiteAlpha.800"}
      backgroundColor={"#0f2b75"}
      _hover={{ backgroundColor: "#0a2065" }}
      isDisabled={!write || isWriteLoading || isLoading || startLoading}
      onClick={initTxn}
    >
      {isLoading || isWriteLoading || startLoading ? (
        <Spinner />
      ) : isLong ? (
        <>
          CREATE LONG POSITION
          <ArrowForwardIcon ml={2} w={5} h={5} />
        </>
      ) : (
        <>
          CREATE SHORT POSITION
          <ArrowForwardIcon ml={2} w={5} h={5} />
        </>
      )}
    </Button>
  );
}
