import { EvmPriceServiceConnection } from "@pythnetwork/pyth-evm-js";
import axios from "axios";
import { pairOptions } from "../constants/pairs";
import { formatUnits } from "viem";

const binanceAPI = "https://api.binance.com/api/v1/ticker/24hr";

export async function getAllPriceData(pythPriceService: EvmPriceServiceConnection) {
  const feedSet: Set<string> = new Set([]);
  pairOptions.map((item) => item.feedId.map((feed) => feedSet.add(feed)));
  const priceFeeds = await pythPriceService.getLatestPriceFeeds(Array.from(feedSet));
  let feedPrice: Map<string, number> = new Map([]);
  let result: number[] = [];
  if (priceFeeds) {
    let i = 0;
    for (; i < priceFeeds.length; i++) {
      const feed = priceFeeds[i];
      const priceObj = feed.getPriceUnchecked();
      const price = Number(formatUnits(BigInt(priceObj.price), -1 * priceObj.expo));
      feedPrice.set(pairOptions[i].feedId[0], price);
      result.push(price);
    }
    for (; i < pairOptions.length; i++) {
      const pairFeed = pairOptions[i].feedId;
      const price = Number(feedPrice.get(pairFeed[0])) / Number(feedPrice.get(pairFeed[1]));
      result.push(price);
    }
  }
  return result;
}

export async function getBinancePriceData(symbol: string) {
  const url = binanceAPI + "?symbol=" + symbol;
  const { data } = await axios.get(url);
  return data;
}
