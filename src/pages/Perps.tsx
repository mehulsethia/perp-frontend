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
      <div className="h-auto md:h-[calc(100vh-150px)] w-full bg-slate-900 text-white flex flex-col">
        <CryptoTicker />

        <div className="flex-col md:flex-row flex-1 flex h-auto md:min-h-0 gap-2 m-2">
          <div className="flex-[2] flex flex-col  border-slate-700">
            <div className="md:flex-1 h-auto md:min-h-0 md:flex  py-2 flex-col md:flex-row">
              <div className="md:flex-1 relative bg-slate-900 flex flex-col h-[400px] md:h-full">
                  <div className="absolute inset-0 h-[400px] md:h-full">
                    <Chart />
                </div>
              </div>
              <div className="md:w-64 border-l border-slate-700 flex flex-col bg-slate-900 w-full">
                <div className="flex p-2 text-sm text-slate-400 border-b border-slate-700">
                  <div className="flex-1">Price</div>
                  <div className="w-20 text-right">Size</div>
                  <div className="w-24 text-right">Time</div>
                </div>

                <div className="h-[300px] md:h-full md:min-h-0 overflow-auto">
                  <div className="md:flex-1 md:flex">
                    <TradesList />
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[500px] md:h-atuo md:flex-1 md:flex border-t w-full relative">
              <div className="absolute inset-0  ">
                <TradingPositionsTable />
              </div>
            </div>
          </div>
          <div className="md:w-80 flex flex-col  border-slate-700 overflow-y-auto">
            <LongShort />
          </div>
        </div>
      </div>
    </>
  );
};

export default Perps;
