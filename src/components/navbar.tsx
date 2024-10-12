import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Show,
  Hide,
  Image,
  Spacer,
  Button,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, LinkIcon } from "@chakra-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Logo from "../assets/icons/logos/logo_white.svg";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { useAccount } from "wagmi";

interface INavLink {
  label: string;
  href: string;
  isSelected: boolean;
}

const Links = [
  { label: "Swap", href: "/swap" },
  { label: "Pools", href: "/pools" },
  { label: "Perps", href: "#" },
  // { label: "Lock", href: "/lock" },
  // { label: "Vote", href: "/vote" },
  // { label: "Bridge", href: "/bridge" },
  { label: "Faucet", href: "#" },
];

const NavLink = ({ label, href, isSelected }: INavLink) => {
  const color = useColorModeValue("blackAlpha.700", "whiteAlpha.700");
  const colorSelected = useColorModeValue("black", "white");
  return (
    <Link to={href}>
      <Box
        p={2}
        rounded={"12"}
        fontWeight={isSelected ? 700 : 500}
        color={isSelected ? colorSelected : color}
        _hover={{
          textDecoration: "none",
          bg: useColorModeValue("gray.200", "gray.700"),
        }}
      >
        {label}
      </Box>
    </Link>
  );
};

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isConnected } = useAccount();
  const location = useLocation();
  const bg = useColorModeValue("white", "#1B1C39");
  const color = useColorModeValue("black", "white");
  const borderColor = useColorModeValue("blackAlpha.300", "rgba(255, 255, 255, 0.07)");
  const buttonColor = useColorModeValue("whiteAlpha.900", "white");
  const buttonBgColor = useColorModeValue("blackAlpha.800", "#0080FF");
  const lightColor = useColorModeValue("blackAlpha.600", "rgba(255, 255, 255, 0.6)");
  return (
    <Box bgColor={bg} borderBottomWidth="0.1rem" borderColor={borderColor} px={{ base: 2, md: 6 }}>
      <Flex h={"3.75rem"} alignItems={"center"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          mr={2}
          onClick={isOpen ? onClose : onOpen}
        />
        {/* <HStack spacing={8} alignItems={"center"}>
            <Image alt="Mantis" src={Logo} width={{ base: "75%", md: "60%" }} />
          </HStack> */}
        <Link to={"/"}>
          <HStack gap={"0.4rem"}>
            <Image alt="Mantis" src={Logo} w={"1.75rem"} />
            <Text color={color} fontSize={"1rem"} fontWeight="700">
              Mantis
            </Text>
          </HStack>
        </Link>
        <Box ml={{ base: 4, md: 8 }}>
          <HStack as={"nav"} gap={"1.875rem"} display={{ base: "none", lg: "flex" }}>
            {Links.map((link, index) => (
              <NavLink
                key={index}
                label={link.label}
                href={link.href}
                isSelected={link.href == location.pathname || (link.href == "/swap" && location.pathname == "/")}
              />
            ))}
          </HStack>
        </Box>
        <Spacer />
        <Flex alignItems={"center"} gap={2}>
          {/* <Button
            variant={"solid"}
            colorScheme={"purple"}
            size={"sm"}
            mr={4}
            leftIcon={<AddIcon />}
          >
            Connect Wallet
          </Button> */}
          <Link to="https://app.mantissa.finance">
            <Box
              p={2}
              rounded={"12"}
              fontWeight={700}
              color={lightColor}
              _hover={{
                textDecoration: "none",
                bg: useColorModeValue("gray.200", "gray.700"),
              }}
              mr={2}
            >
              Old UI
            </Box>
          </Link>
          {isConnected ? (
            <ConnectButton
              showBalance={false}
              accountStatus={{
                smallScreen: "avatar",
                largeScreen: "full",
              }}
              label="Connect"
            />
          ) : (
            <ConnectButton.Custom>
              {({ openConnectModal }) => {
                return (
                  <Button
                    _hover={{ opacity: "0.9" }}
                    borderRadius={"1.75rem"}
                    bg={buttonBgColor}
                    color={buttonColor}
                    onClick={openConnectModal}
                  >
                    Connect wallet
                  </Button>
                );
              }}
            </ConnectButton.Custom>
          )}
          {/* <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <HamburgerIcon />
            </MenuButton>
            <MenuList>
              <MenuItem>Link 1</MenuItem>
              <MenuItem>Link 2</MenuItem>
              <MenuDivider />
              <MenuItem>Link 3</MenuItem>
            </MenuList>
          </Menu> */}
          {/* <Button onClick={onOpenSettings}>
              <SettingsIcon />
            </Button> */}
          {/* <ColorModeSwitcher /> */}
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ lg: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link, index) => (
              <NavLink
                key={index}
                label={link.label}
                href={link.href}
                isSelected={link.href == location.pathname || (link.href == "/trade" && location.pathname == "/")}
              />
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
