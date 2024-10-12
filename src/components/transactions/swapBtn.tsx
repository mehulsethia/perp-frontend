import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, useNetwork } from "wagmi";
import { PoolABI } from "../../abi";
import { useEffect } from "react";
import { Button, Link, Spinner, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { getTxnLink } from "../../helpers/network";
import { ArrowForwardIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { DEFAULT_DEADLINE } from "../../constants/settings";

interface ISwapBtn {
  contract: `0x${string}`;
  tokenFrom: `0x${string}`;
  tokenTo: `0x${string}`;
  recipient: `0x${string}`;
  amount: string;
  minAmount: string;
  swapBtnDisabled: boolean;
  swapText: string;
  setSwapCompleted: any;
  setSwapLoading: any;
}

export function SwapBtn({
  contract,
  tokenFrom,
  tokenTo,
  recipient,
  amount,
  minAmount,
  swapBtnDisabled,
  swapText,
  setSwapCompleted,
  setSwapLoading,
}: ISwapBtn) {
  const { chain } = useNetwork();
  const toast = useToast();
  const transactionDeadline = Math.floor(Date.now() / 1000) + DEFAULT_DEADLINE * 60;
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
    abi: PoolABI,
    functionName: "swap",
    args: [tokenFrom, tokenTo, recipient, BigInt(amount), BigInt(minAmount), BigInt(transactionDeadline)],
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (isLoading || isWriteLoading) {
      setSwapLoading(true);
    }
  }, [isLoading, isWriteLoading]);

  useEffect(() => {
    if (isSuccess) {
      showSuccessToast();
      setSwapCompleted(true);
      setSwapLoading(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      showErrorToast();
      setSwapCompleted(false);
      setSwapLoading(false);
    }
  }, [isError]);

  const buttonColor = useColorModeValue("whiteAlpha.900", "white");
  const buttonBgColor = useColorModeValue("blackAlpha.800", "#0080FF");

  return (
    <Button
      w={"100%"}
      _hover={{ opacity: "0.4" }}
      isDisabled={!write || isWriteLoading || isLoading || swapBtnDisabled}
      onClick={() => write?.()}
      // rightIcon={<ArrowForwardIcon />}
      h={"4.625rem"}
      borderRadius={"1.25rem"}
      bg={buttonBgColor}
      color={buttonColor}
      fontSize={"1.5rem"}
    >
      {isLoading || isWriteLoading ? "Cancel" : swapText.slice(0, 1).toUpperCase() + swapText.slice(1)}
    </Button>
  );
}
