import { CHAIN_CONSTANTS } from "../constants/addresses";
import USDCIcon from "../assets/tokens/USDC.svg";
import USDTIcon from "../assets/tokens/USDT.svg";
import DAIIcon from "../assets/tokens/DAI.svg";

export function getTokenDecimals(token: string) {
  if (token == "usdc" || token == "usdt") return 6;
  else return 18;
}

export function getTokenIcon(token: string | undefined) {
  if (token == "usdc") return USDCIcon;
  else if (token == "usdt") return USDTIcon;
  else if (token == "dai") return DAIIcon;
  // else throw "Wrong token";
  else return USDCIcon;
}

export function getTokenLpPid(token: string) {
  if (token == "usdc") return 0;
  else if (token == "usdt") return 1;
  else if (token == "dai") return 2;
  // else throw "Wrong token";
  else return 0;
}

export function getTokenPlpPid(token: string) {
  if (token == "usdc") return 3;
  else if (token == "usdt") return 4;
  else if (token == "dai") return 5;
  // else throw "Wrong token";
  else return 3;
}

export function getTokenAddress(chainConstants: CHAIN_CONSTANTS, token: string) {
  if (token == "usdc") return chainConstants.USDC_ADDRESS;
  else if (token == "usdt") return chainConstants.USDT_ADDRESS;
  else if (token == "dai") return chainConstants.DAI_ADDRESS;
  // else throw "Wrong token";
  else return chainConstants.USDC_ADDRESS;
}

export function getTokenLpAddress(chainConstants: CHAIN_CONSTANTS, token: string) {
  if (token == "usdc") return chainConstants.LP_USDC_ADDRESS;
  else if (token == "usdt") return chainConstants.LP_USDT_ADDRESS;
  else if (token == "dai") return chainConstants.LP_DAI_ADDRESS;
  // else throw "Wrong token";
  else return chainConstants.LP_USDC_ADDRESS;
}

export function getTokenPlpAddress(chainConstants: CHAIN_CONSTANTS, token: string) {
  if (token == "usdc") return chainConstants.PLP_USDC_ADDRESS;
  else if (token == "usdt") return chainConstants.PLP_USDT_ADDRESS;
  else if (token == "dai") return chainConstants.PLP_DAI_ADDRESS;
  // else throw "Wrong token";
  else return chainConstants.PLP_USDC_ADDRESS;
}

export function getAllPids() {
  return [0, 1, 2, 3, 4, 5];
}

export function getAllTokenPids(token: string) {
  if (token == "usdc") return [0, 3];
  else if (token == "usdt") return [1, 4];
  else if (token == "dai") return [2, 5];
  // else throw "Wrong token";
  else return [];
}

export function getTokenSymbol(chainConstants: CHAIN_CONSTANTS, addr: `0x${string}`) {
  const lowerAddr = addr.toLowerCase();
  if (chainConstants.USDC_ADDRESS.toLowerCase() == lowerAddr) return "usdc";
  else if (chainConstants.USDT_ADDRESS.toLowerCase() == lowerAddr) return "usdt";
  else if (chainConstants.DAI_ADDRESS.toLowerCase() == lowerAddr) return "dai";
  // else throw "Wrong token";
  else return "usdc";
}

export function getTokenBorderColor(token: string) {
  if (token == "usdc") return "blue.400";
  else if (token == "usdt") return "green.500";
  else if (token == "dai") return "yellow.400";
  else return "";
}

export function getTokenHoverColor(token: string) {
  if (token == "usdc") return "#0c1833";
  else if (token == "usdt") return "#0c3317";
  else if (token == "dai") return "#33270c";
  else return "";
}

export function getTokenPrimaryTextColor(token: string) {
  if (token == "usdc") return "blue.400";
  else if (token == "usdt") return "green.500";
  else if (token == "dai") return "yellow.400";
  else return "";
}

export function getTokenSecondaryTextColor(token: string) {
  if (token == "usdc") return "blue.500";
  else if (token == "usdt") return "green.600";
  else if (token == "dai") return "yellow.500";
  else return "";
}

export function getTokenLightColor(token: string) {
  if (token == "usdc") return "blue.200";
  else if (token == "usdt") return "green.300";
  else if (token == "dai") return "yellow.200";
  else return "";
}

export function getTokenGrayColor(token: string) {
  if (token == "usdc") return "blue.600";
  else if (token == "usdt") return "green.700";
  else if (token == "dai") return "yellow.600";
  else return "";
}

export function getTokenPrimaryBackgroundColor(token: string) {
  if (token == "usdc") return "#142657";
  else if (token == "usdt") return "#14573b";
  else if (token == "dai") return "#574b14";
  else return "";
}

export function getTokenSecondaryBackgroundColor(token: string) {
  if (token == "usdc") return "#0c2236";
  else if (token == "usdt") return "#0c3616";
  else if (token == "dai") return "#36310c";
  else return "";
}

export function getTokenTernaryBackgroundColor(token: string) {
  if (token == "usdc") return "#081826";
  else if (token == "usdt") return "#082617";
  else if (token == "dai") return "#262508";
  else return "";
}

export function getTokenColorScheme(token: string) {
  if (token == "usdc") return "blue";
  else if (token == "usdt") return "green";
  else if (token == "dai") return "yellow";
  else return "";
}

export function getTokenButtonBgColor(token: string) {
  if (token == "usdc") return "#0f2b75";
  else if (token == "usdt") return "green.800";
  else if (token == "dai") return "yellow.700";
  else return "";
}

export function getTokenButtonHoverColor(token: string) {
  if (token == "usdc") return "#0a2065";
  else if (token == "usdt") return "green.900";
  else if (token == "dai") return "yellow.800";
  else return "";
}
