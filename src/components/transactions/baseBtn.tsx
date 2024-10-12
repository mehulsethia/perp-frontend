import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, useNetwork } from "wagmi";
import { useEffect } from "react";
import { Button, Link, Spinner, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { getTxnLink } from "../../helpers/network";
import { ArrowForwardIcon, ExternalLinkIcon } from "@chakra-ui/icons";

interface IBaseBtn {
  contract: `0x${string}`;
  abi: any;
  functionName: string;
  args: any[];
  btnText: string;
  bgColor?: string;
  hoverColor?: string;
  setUserUpdate: any;
  setDepositLoading?: any;
}

export function BaseBtn({
  contract,
  abi,
  functionName,
  args,
  btnText,
  bgColor,
  hoverColor,
  setUserUpdate,
  setDepositLoading,
}: IBaseBtn) {
  const { chain } = useNetwork();
  const toast = useToast();

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
      setDepositLoading(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      showErrorToast();
      setUserUpdate(false);
      setDepositLoading(false);
    }
  }, [isError]);

  useEffect(() => {
    if (isLoading || isWriteLoading) {
      setDepositLoading(true);
    }
  }, [isLoading, isWriteLoading, setDepositLoading]);

  const buttonColor = useColorModeValue("whiteAlpha.900", "white");
  const buttonBgColor = useColorModeValue("blackAlpha.800", "#0080FF");

  return (
    <Button
      w={"100%"}
      h={"4.625rem"}
      borderRadius={"1.25rem"}
      fontSize={"1.5rem"}
      // borderColor={"blue.600"}
      color={buttonColor}
      backgroundColor={buttonBgColor || bgColor || "#0f2b75"}
      _hover={{ opacity: "0.4" }}
      // _hover={{ backgroundColor: hoverColor || "#0a2065" }}
      isDisabled={!write || isWriteLoading || isLoading}
      onClick={() => write?.()}
    >
      {isLoading || isWriteLoading ? <Spinner /> : <>{btnText.toUpperCase()}</>}
    </Button>
  );
}
