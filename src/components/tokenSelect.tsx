import {
  Image,
  Button,
  Menu,
  MenuButton,
  HStack,
  Text,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  InputGroup,
  InputLeftElement,
  Input,
  Divider,
  ListItem,
  List,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import USDCIcon from "../assets/tokens/USDC.svg";
import USDTIcon from "../assets/tokens/USDT.svg";
import DAIIcon from "../assets/tokens/DAI.svg";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { Fragment, useEffect, useState } from "react";
import ArrowBackIcon from "../assets/icons/Arrow_Back.svg";
import { Token } from "../constants/tokens";
interface ITokenSelect {
  options: Token[];
  value: string;
  setValue: any;
  minW?: any;
  isDisabled?: boolean;
}

export default function TokenSelect({ options, value, setValue, minW, isDisabled = false }: ITokenSelect) {
  const [open, setOpen] = useState<boolean>(false);
  const [searchVal, setSearchVal] = useState<string>("");
  const [optionsList, setOptionsList] = useState<Token[]>(options);

  useEffect(() => {
    if (options?.length > 0) {
      setOptionsList(options);
    }
  }, [options]);

  const handleSearch = (val: string) => {
    setSearchVal(val);
    if (val?.trim()) {
      setOptionsList(options?.filter((option) => option.name.toLowerCase().includes(val.toLowerCase())));
    } else {
      setOptionsList(options);
    }
  };

  const getTokenImage = (token: string) => {
    // if (token == "usdc") return USDCIcon;
    // else if (token == "usdt") return USDTIcon;
    // else if (token == "dai") return DAIIcon;
    // else return USDCIcon;
    return options?.find((option) => option.name === token)?.img || USDCIcon;
  };

  const handleModal = () => {
    setOpen(!open);
  };

  const handleSelect = (item: string) => {
    setValue(item);
    handleModal();
  };

  const bg = useColorModeValue("white", "#1B1C39");
  const inputBg = useColorModeValue("white", "#0B0B20");
  const buttonBg = useColorModeValue("blackAlpha.300", "#28294B");
  const buttonHoverBg = useColorModeValue("blackAlpha.200", "#0080FF");
  const hoverBg = useColorModeValue("blackAlpha.300", "whiteAlpha.300");
  const borderColor = useColorModeValue("blackAlpha.300", "rgba(255, 255, 255, 0.07)");
  const lightColor = useColorModeValue("blackAlpha.300", "rgba(255, 255, 255, 0.4)");
  const subLightColor = useColorModeValue("blackAlpha.300", "rgba(255, 255, 255, 0.6)");
  const color = useColorModeValue("blackAlpha.900", "whiteAlpha.900");

  const ArrowBack = () => <Image alt="back" src={useColorModeValue(ArrowBackIcon, ArrowBackIcon)} />;

  return (
    <Menu autoSelect={false}>
      <MenuButton
        minW={minW ? minW : undefined}
        as={Button}
        p={{ base: "0.325rem", sm: "0.75rem" }}
        onClick={handleModal}
        h={"3rem"}
        borderWidth={"0.5px"}
        borderRadius={10}
        borderColor={borderColor}
        bgColor={buttonBg}
        _hover={{ bgColor: buttonHoverBg }}
        _disabled={{ bg: buttonBg }}
        isDisabled={isDisabled}
      >
        <HStack w={"100%"} gap={{ base: "0.325rem", sm: "0.625rem" }}>
          {value ? (
            <>
              <Image boxSize={"24px"} src={getTokenImage(value)} />
              <Text color={color} fontSize={"1.25rem"}>
                {value.toUpperCase()}
              </Text>
            </>
          ) : (
            <Text color={color} fontSize={"1.25rem"}>
              Select Token
            </Text>
          )}
          <ChevronDownIcon color={color} fontSize={"20px"} style={{ visibility: isDisabled ? "hidden" : "visible" }} />
        </HStack>
      </MenuButton>
      <Modal isOpen={open} size={{ base: "sm", sm: "lg" }} onClose={handleModal}>
        <ModalOverlay />
        <ModalContent
          bg={bg}
          borderWidth={"0.1rem"}
          mt={{ base: "10%", lg: "6%" }}
          py={"1.5rem"}
          borderRadius={"1.5rem"}
          borderColor={borderColor}
          minH={"lg"}
        >
          <ModalHeader py={0} px={"1rem"}>
            <VStack gap={"1.5rem"}>
              <HStack w={"100%"} gap={"0.625rem"}>
                <IconButton
                  w={"1rem"}
                  icon={<ArrowBack />}
                  bg={"none"}
                  aria-label={"Close Modal"}
                  onClick={handleModal}
                />
                <Text fontSize={"1.25rem"}>Select a token</Text>
              </HStack>

              <InputGroup>
                <InputLeftElement h={"3.125rem"}>
                  <SearchIcon color={color} />
                </InputLeftElement>
                <Input
                  // pl={10}
                  h={"3.125rem"}
                  placeholder="Search by name or address"
                  borderRadius={"1rem"}
                  value={searchVal}
                  color={color}
                  bg={inputBg}
                  border="none"
                  _placeholder={{ fontWeight: "400", fontSize: "1.125rem", color: lightColor }}
                  _focusVisible={{ borderColor: borderColor }}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </InputGroup>
            </VStack>
          </ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody p={0}>
            <VStack gap={"1.125rem"} pt={"1.125rem"}>
              <List display={"flex"} flexDirection={"column"} w={"100%"}>
                {optionsList?.map((item, index) => (
                  <Fragment key={index}>
                    <Divider borderWidth={1} />
                    <ListItem
                      display={"flex"}
                      alignItems={"center"}
                      onClick={() => handleSelect(item?.name)}
                      cursor={"pointer"}
                      _hover={{ bg: hoverBg }}
                      p={"1rem"}
                    >
                      <HStack w="100%" gap="0.75rem">
                        <Image boxSize={"39px"} src={item?.img} mr={"10px"} />
                        <VStack gap="0.25rem" alignItems={"flex-start"}>
                          <Text color={color} fontSize={"1.125rem"}>
                            {item?.name?.toUpperCase()}
                          </Text>
                          <Text color={subLightColor} fontWeight={"400"} fontSize={"0.75rem"}>
                            {item?.fullName}
                          </Text>
                        </VStack>
                        <Spacer />
                        <Text color={color} fontSize={"1.125rem"}>
                          {item?.balance}
                        </Text>
                      </HStack>
                    </ListItem>
                  </Fragment>
                ))}
                <Divider borderWidth={1} />
              </List>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Menu>
  );
}
