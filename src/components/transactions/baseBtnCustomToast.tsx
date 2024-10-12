import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, useNetwork } from "wagmi";
import { useEffect } from "react";
import { Button, Link, Spinner, Text, useToast } from "@chakra-ui/react";
import { getTxnLink } from "../../helpers/network";
import { ArrowForwardIcon, ExternalLinkIcon } from "@chakra-ui/icons";

interface IBaseBtnCustomToast {
  contract: `0x${string}`;
  abi: any;
  functionName: string;
  args: any[];
  btnText: string;
  toastTitle: string;
  toastDesc: string;
  toastStatus: "info" | "success" | "warning";
  setUserUpdate: any;
}

export function BaseBtnCustomToast({
  contract,
  abi,
  functionName,
  args,
  btnText,
  toastTitle,
  toastDesc,
  toastStatus,
  setUserUpdate,
}: IBaseBtnCustomToast) {
  const { chain } = useNetwork();
  const toast = useToast();

  const showSuccessToast = () => {
    toast({
      title: toastTitle,
      description: toastDesc,
      status: toastStatus,
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
    abi: abi,
    functionName: functionName,
    args: args,
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
      w={"100%"}
      border={"1"}
      borderWidth={1}
      // borderColor={"blue.600"}
      // color={"whiteAlpha.800"}
      backgroundColor={"#0f2b75"}
      _hover={{ backgroundColor: "#0a2065" }}
      isDisabled={!write || isWriteLoading || isLoading}
      onClick={() => write?.()}
    >
      {isLoading || isWriteLoading ? <Spinner /> : <>{btnText.toUpperCase()}</>}
    </Button>
  );
}
