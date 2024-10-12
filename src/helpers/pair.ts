import { pairOptions } from "../constants/pairs";

export function getPairIndex(assetIndex: number) {
  return pairOptions.findIndex((item) => item.assetIndex == assetIndex);
}

export function getPairData(assetIndex: number) {
  return pairOptions[getPairIndex(assetIndex)];
}

export function getPairDataFromIndex(index: number) {
  return pairOptions[index];
}

export function getPairPrice(allPrices: number[], pairIndex: number) {
  if (pairIndex >= allPrices.length) return 0;
  return allPrices[pairIndex];
}
