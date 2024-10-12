import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { EvmPriceServiceConnection } from "@pythnetwork/pyth-evm-js";
import IPythAbi from "@pythnetwork/pyth-sdk-solidity/abis/IPyth.json";
import { readContracts } from "wagmi";
import { readContract, writeContract } from "@wagmi/core";
import { useEffect } from "react";
import { PythFeedABI } from "../abi/PythFeed";
import TradingViewWidget from "../components/tradingViewWidget";

async function test() {
  // const pythPriceService = new EvmPriceServiceConnection("https://hermes.pyth.network");
  // const priceFeedUpdateData = await pythPriceService.getPriceFeedsUpdateData([
  //   "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43",
  // ]);
  // const data = await readContract({
  //   address: "0xFC6bd9F9f0c6481c6Af3A7Eb46b296A5B85ed379",
  //   abi: IPythAbi,
  //   functionName: "getUpdateFee",
  //   args: [priceFeedUpdateData],
  // });
  // console.log(data);
  // const priceFeeds = await pythPriceService.getLatestPriceFeeds([
  //   "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43",
  //   "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
  // ]);
  // console.log(priceFeeds);
  // pythPriceService.subscribePriceFeedUpdates(
  //   ["0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43"],
  //   (priceFeed) => {
  //     console.log(priceFeed.getPriceNoOlderThan(60)?.price);
  //     // console.log(`Received update for ${priceFeed.id}: ${priceFeed.getPriceNoOlderThan(60)}`);
  //   }
  // );
  // const { hash } = await writeContract({
  //   address: "0xa4a9B5223594Ee7363A03d68DFA9593B05b76d48",
  //   abi: PythFeedABI,
  //   functionName: "setPrice",
  //   //@ts-ignore
  //   args: [priceFeedUpdateData],
  //   //@ts-ignore
  //   value: data,
  // });
}

export default function Vote() {
  return (
    <Box py={{ base: "12px", md: "24px" }}>
      <VStack>
        <Text fontSize={"3xl"}>Coming Soon..</Text>
      </VStack>
    </Box>
  );
}
