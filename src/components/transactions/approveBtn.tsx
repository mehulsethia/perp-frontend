import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { ERC20ABI } from "../../abi";
import { useEffect } from "react";
import { Button, Spinner, useColorModeValue } from "@chakra-ui/react";

interface IApproveBtn {
  contract: `0x${string}`;
  spender: `0x${string}`;
  amount: bigint;
  bgColor?: string;
  hoverColor?: string;
  setApproved: any;
}

export function ApproveBtn({ contract, spender, amount, bgColor, hoverColor, setApproved }: IApproveBtn) {
  const {
    data,
    isLoading: isWriteLoading,
    error,
    isError,
    write,
  } = useContractWrite({
    address: contract,
    abi: ERC20ABI,
    functionName: "approve",
    args: [spender, amount],
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (isSuccess) {
      setApproved(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError]);

  const buttonColor = useColorModeValue("whiteAlpha.900", "white");
  const buttonBgColor = useColorModeValue("blackAlpha.800", "#0080FF");

  return (
    <Button
      w={"100%"}
      _hover={{ opacity: "0.4" }}
      isDisabled={!write || isWriteLoading || isLoading}
      onClick={() => write?.()}
      h={"4.625rem"}
      borderRadius={"1.25rem"}
      bg={buttonBgColor}
      color={buttonColor}
      fontSize={"1.5rem"}
    >
      {isLoading || isWriteLoading ? <Spinner /> : "Approve"}
    </Button>
  );
}
