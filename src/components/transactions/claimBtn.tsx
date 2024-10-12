import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { ERC20ABI, MasterMantisABI } from "../../abi";
import { useEffect } from "react";
import { Button, Spinner, useToast } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

interface IClaimBtn {
  contract: `0x${string}`;
  pids: number[];
  bgColor?: string;
  hoverColor?: string;
  setUserUpdate: any;
}

export function ClaimBtn({ contract, pids, bgColor, hoverColor, setUserUpdate }: IClaimBtn) {
  const toast = useToast();

  const showSuccessToast = () => {
    toast({
      title: "Transaction Successful",
      description: "MNTS claimed successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const showErrorToast = () => {
    toast({
      title: "Error",
      description: error?.message.slice(0, 200) + "...",
      status: "error",
      duration: 5000,
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
    abi: MasterMantisABI,
    functionName: "claim",
    args: [pids.map((pid) => BigInt(pid))],
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

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

  return (
    <Button
      // size={"sm"}
      border={"1"}
      borderWidth={1}
      // borderColor={"blue.600"}
      // color={"whiteAlpha.800"}
      backgroundColor={bgColor || "#0f2b75"}
      _hover={{ backgroundColor: hoverColor || "#0a2065" }}
      isDisabled={!write || isWriteLoading || isLoading}
      onClick={() => write?.()}
    >
      {isLoading || isWriteLoading ? (
        <Spinner />
      ) : (
        <>
          CLAIM
          <ArrowForwardIcon ml={2} w={5} h={5} />
        </>
      )}
    </Button>
  );
}
