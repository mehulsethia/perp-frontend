import { parseEther } from "viem";
import { TradeManagerABI, TradeRouterABI } from "../../abi";
import { useContractWrite, useNetwork, useWaitForTransaction } from "wagmi";
import { readContract, readContracts } from "@wagmi/core";
import { useToast, Text, Link, Button, Spinner } from "@chakra-ui/react";
import { getTxnLink } from "../../helpers/network";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { EvmPriceServiceConnection } from "@pythnetwork/pyth-evm-js";
import { getPairData } from "../../helpers/pair";
import IPythAbi from "@pythnetwork/pyth-sdk-solidity/abis/IPyth.json";

interface IMarketPositionDecreaseBtn {
  pythPriceService: EvmPriceServiceConnection;
  pythAddress: `0x${string}`;
  contract: `0x${string}`;
  assetIndex: number;
  collateral: string;
  limitPrice: string;
  isLong: boolean;
  collateralToken: `0x${string}`;
  profitToken: `0x${string}`;
  setUserUpdate: any;
}

export function MarketPositionDecreaseBtn({
  pythPriceService,
  pythAddress,
  contract,
  assetIndex,
  collateral,
  limitPrice,
  isLong,
  collateralToken,
  profitToken,
  setUserUpdate,
}: IMarketPositionDecreaseBtn) {
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
    functionName: "decreasePosition",
    args: [
      pythUpdateData as `0x${string}`[],
      assetIndex,
      parseEther(collateral),
      parseEther(limitPrice),
      isLong,
      collateralToken,
      profitToken,
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
      backgroundColor={"blue.600"}
      _hover={{ backgroundColor: "blue.700" }}
      isDisabled={!write || isWriteLoading || isLoading || startLoading}
      onClick={initTxn}
    >
      {isLoading || isWriteLoading || startLoading ? (
        <Spinner />
      ) : isLong ? (
        "Decrease Long Position"
      ) : (
        "Decrease Short Position"
      )}
    </Button>
  );
}
