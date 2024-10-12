import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { CHAIN_CONSTANTS } from "../constants/addresses";
import { readContracts } from "wagmi";
import { TradeRouterABI } from "../abi";
import { useEffect, useState } from "react";
import { formatEther } from "viem";
import Positions from "./sub-components/positions";
import IncreaseOrders from "./sub-components/increaseOrders";
import SlOrders from "./sub-components/slOrders";
import TpOrders from "./sub-components/tpOrders";
import { EvmPriceServiceConnection } from "@pythnetwork/pyth-evm-js";

interface IPositionOrderTable {
  pythPriceService: EvmPriceServiceConnection;
  address: `0x${string}`;
  chainConstants: CHAIN_CONSTANTS;
  gasPrice: any | undefined;
  allPrices: number[];
  userUpdate: boolean;
  setUserUpdate: any;
}

export type IncreaseOrder = {
  collateralToken: `0x${string}`;
  key: string;
  assetIndex: number;
  collateral: string;
  multiplier: number;
  executionPrice: string;
  blockTime: number;
  isLong: boolean;
};

export type DecreaseOrder = {
  collateralToken: `0x${string}`;
  profitToken: `0x${string}`;
  key: string;
  assetIndex: number;
  collateral: string;
  executionPrice: string;
  blockTime: number;
  isLong: boolean;
};

export default function PositionOrderTable({
  pythPriceService,
  address,
  chainConstants,
  gasPrice,
  allPrices,
  userUpdate,
  setUserUpdate,
}: IPositionOrderTable) {
  const [increaseOrders, setIncreaseOrders] = useState<IncreaseOrder[]>([]);
  const [slOrders, setSlOrders] = useState<DecreaseOrder[]>([]);
  const [tpOrders, setTpOrders] = useState<DecreaseOrder[]>([]);

  const [orderUpdate, setOrderUpdate] = useState<boolean>(false);

  async function getOrders() {
    const data = await readContracts({
      contracts: [
        {
          address: chainConstants.TRADE_ROUTER_ADDRESS,
          abi: TradeRouterABI,
          functionName: "getUserIncreaseRequests",
          args: [address],
        },
        {
          address: chainConstants.TRADE_ROUTER_ADDRESS,
          abi: TradeRouterABI,
          functionName: "getUserDecreaseRequests",
          args: [address],
        },
      ],
    });

    if (data[0].status == "success") {
      let newIncreaseOrders: IncreaseOrder[] = [];
      const increaseRequests = data[0].result;
      for (let i = 0; i < increaseRequests.length; i++) {
        const request = increaseRequests[i];
        newIncreaseOrders.push({
          collateralToken: request.collateralToken,
          key: request.key,
          assetIndex: request.assetIndex,
          collateral: formatEther(request.collateral),
          multiplier: Number(request.multiplier) / 100,
          executionPrice: formatEther(request.executionPrice),
          blockTime: Number(request.blockTime),
          isLong: request.isLong,
        });
      }
      setIncreaseOrders(newIncreaseOrders);
    }
    if (data[1].status == "success") {
      let newSlOrders: DecreaseOrder[] = [];
      let newTpOrders: DecreaseOrder[] = [];
      const decreaseRequests = data[1].result;
      for (let i = 0; i < decreaseRequests.length; i++) {
        const request = decreaseRequests[i];
        if (request.isSL) {
          newSlOrders.push({
            collateralToken: request.collateralToken,
            profitToken: request.profitToken,
            key: request.key,
            assetIndex: request.assetIndex,
            collateral: formatEther(request.collateral),
            executionPrice: formatEther(request.executionPrice),
            blockTime: Number(request.blockTime),
            isLong: request.isLong,
          });
        } else {
          newTpOrders.push({
            collateralToken: request.collateralToken,
            profitToken: request.profitToken,
            key: request.key,
            assetIndex: request.assetIndex,
            collateral: formatEther(request.collateral),
            executionPrice: formatEther(request.executionPrice),
            blockTime: Number(request.blockTime),
            isLong: request.isLong,
          });
        }
      }
      setSlOrders(newSlOrders);
      setTpOrders(newTpOrders);
    }
  }

  useEffect(() => {
    getOrders();
  }, [address, chainConstants]);

  useEffect(() => {
    if (userUpdate) {
      getOrders();
    }
  }, [userUpdate]);

  useEffect(() => {
    if (orderUpdate) {
      setOrderUpdate(false);
      getOrders();
    }
  }, [orderUpdate]);

  return (
    <Box mt={4}>
      <Tabs>
        <TabList bgColor={"#040A1A"}>
          <Tab>Open Positions</Tab>
          <Tab>Limit Orders</Tab>
          <Tab>Stop Loss</Tab>
          <Tab>Take Profit</Tab>
        </TabList>

        <TabPanels>
          <TabPanel py={0}>
            <Positions
              pythPriceService={pythPriceService}
              address={address}
              chainConstants={chainConstants}
              gasPrice={gasPrice}
              allPrices={allPrices}
              userUpdate={userUpdate}
              setUserUpdate={setUserUpdate}
            />
          </TabPanel>
          <TabPanel py={0}>
            <IncreaseOrders
              address={address}
              chainConstants={chainConstants}
              orders={increaseOrders}
              allPrices={allPrices}
              setOrderUpdate={setOrderUpdate}
            />
          </TabPanel>
          <TabPanel py={0}>
            <SlOrders
              address={address}
              chainConstants={chainConstants}
              orders={slOrders}
              allPrices={allPrices}
              setOrderUpdate={setOrderUpdate}
            />
          </TabPanel>
          <TabPanel py={0}>
            <TpOrders
              address={address}
              chainConstants={chainConstants}
              orders={tpOrders}
              allPrices={allPrices}
              setOrderUpdate={setOrderUpdate}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
