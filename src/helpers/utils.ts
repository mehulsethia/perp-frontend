import { DEFAULT_SLIPPAGE } from "../constants/settings";

export const getSlippage = () => {
  return Number(localStorage.getItem("mantis_perp_slippage") || DEFAULT_SLIPPAGE);
};

const getExpiryTimestamp = (blockTime: number) => {
  return blockTime + 86400;
};

export const getExpiryDatetime = (blockTime: number) => {
  const timestamp = getExpiryTimestamp(blockTime);
  return new Date(timestamp * 1000);
};
