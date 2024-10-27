import React from "react";
import Row1 from "../components/PerpsPageComponent/Row1";
import ChartAndList from "../components/PerpsPageComponent/ChartAndList";
import CryptoTicker from "../components/PerpsPageComponent/CryptoTicker";
import CryptoDropdown from "../components/PerpsPageComponent/CryptoNavigation";
import { ChevronDown } from "lucide-react";
import Chart from "../components/PerpsPageComponent/Chart";
import TradesList from "../components/PerpsPageComponent/TradesList";
import TradingPositionsTable from "../components/PerpsPageComponent/TradingPositionTable";
import LongShort from "../components/PerpsPageComponent/LongShort";

const Perps = () => {
  const trades = Array(15).fill({
    price: "65,302",
    size: "0.3256",
    time: "11:30:30",
    type: Math.random() > 0.5 ? "buy" : "sell",
  });
  return (
    <>
      <div className="h-auto md:h-[calc(100vh-150px)] w-full  text-white flex flex-col">
        <CryptoTicker />

        <div className="flex-col md:flex-row flex-1 flex h-auto md:min-h-0 gap-2 mx-2">
          <div className="flex-[2] flex flex-col space-y-2 ">
            <div className="md:flex-1 h-auto md:min-h-0 md:flex   flex-col md:flex-row rounded-2xl ">
              <div className="md:flex-1 relative   flex flex-col h-[24rem] md:h-full">
                <div className="absolute inset-0 bg-[#1B1C39] rounded-2xl  md:p-2 h-[24rem] md:h-full">
                  <Chart />
                </div>
              </div>
              <div className="md:w-64 md:mx-1 lg:mx-2 bg-[#1B1C39] rounded-2xl flex flex-col my-1 xl:my-2 md:my-0  w-full">
                <div className="px-3 xl:px-2 py-2 xl:py-3 font-bold lg:text-sm xl:text-base">Trades</div>
                <div className="h-[300px] md:h-full md:min-h-0 pb-2 px-1.5 overflow-auto">
                  <div className="   ">
                    <TradesList />
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[500px] md:h-auto md:flex-1 md:flex  w-full relative">
              <div className="absolute inset-0  ">
                <TradingPositionsTable />
              </div>
            </div>
          </div>
          <div className=" md:w-80 lg:w-72 flex flex-col rounded-2xl  bg-[#1B1C39] overflow-y-auto">
            <LongShort />
          </div>
        </div>
      </div>
    </>
  );
};

export default Perps;
