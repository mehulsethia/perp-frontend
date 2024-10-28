import { Checkbox, CheckboxIcon } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowLeftSquare, ArrowRightIcon } from "lucide-react";
import React, { useState } from "react";
import { IoMdCheckmark } from "react-icons/io";

const TradingPositionsTable = () => {
  const [activeTab, setActiveTab] = useState("position");
  // Sample data
  const positions = [
    {
      id: 1,
      market: "BTC-USDT",
      type: "Long",
      leverage: "0.5x",
      positionSize: "2.0332",
      sizeUsd: "$4,580",
      entryPrice: "$2,362",
      marketPrice: "$2,362",
      estLiqPrice: "$2,362",
      takeProfit: "$2,362/$2,362",
      pnl: "-$0.04",
      pnlPercent: "2%",
      borrowFee: "$0.00",
    },
    {
      id: 1,
      market: "BTC-USDT",
      type: "Long",
      leverage: "0.5x",
      positionSize: "2.0332",
      sizeUsd: "$4,580",
      entryPrice: "$2,362",
      marketPrice: "$2,362",
      estLiqPrice: "$2,362",
      takeProfit: "$2,362/$2,362",
      pnl: "-$0.04",
      pnlPercent: "2%",
      borrowFee: "$0.00",
    },
    {
      id: 1,
      market: "BTC-USDT",
      type: "Long",
      leverage: "0.5x",
      positionSize: "2.0332",
      sizeUsd: "$4,580",
      entryPrice: "$2,362",
      marketPrice: "$2,362",
      estLiqPrice: "$2,362",
      takeProfit: "$2,362/$2,362",
      pnl: "-$0.04",
      pnlPercent: "2%",
      borrowFee: "$0.00",
    },
    {
      id: 1,
      market: "BTC-USDT",
      type: "Long",
      leverage: "0.5x",
      positionSize: "2.0332",
      sizeUsd: "$4,580",
      entryPrice: "$2,362",
      marketPrice: "$2,362",
      estLiqPrice: "$2,362",
      takeProfit: "$2,362/$2,362",
      pnl: "-$0.04",
      pnlPercent: "2%",
      borrowFee: "$0.00",
    },
    {
      id: 1,
      market: "BTC-USDT",
      type: "Long",
      leverage: "0.5x",
      positionSize: "2.0332",
      sizeUsd: "$4,580",
      entryPrice: "$2,362",
      marketPrice: "$2,362",
      estLiqPrice: "$2,362",
      takeProfit: "$2,362/$2,362",
      pnl: "-$0.04",
      pnlPercent: "2%",
      borrowFee: "$0.00",
    },
    {
      id: 1,
      market: "BTC-USDT",
      type: "Long",
      leverage: "0.5x",
      positionSize: "2.0332",
      sizeUsd: "$4,580",
      entryPrice: "$2,362",
      marketPrice: "$2,362",
      estLiqPrice: "$2,362",
      takeProfit: "$2,362/$2,362",
      pnl: "-$0.04",
      pnlPercent: "2%",
      borrowFee: "$0.00",
    },
    {
      id: 1,
      market: "BTC-USDT",
      type: "Long",
      leverage: "0.5x",
      positionSize: "2.0332",
      sizeUsd: "$4,580",
      entryPrice: "$2,362",
      marketPrice: "$2,362",
      estLiqPrice: "$2,362",
      takeProfit: "$2,362/$2,362",
      pnl: "-$0.04",
      pnlPercent: "2%",
      borrowFee: "$0.00",
    },
    {
      id: 1,
      market: "BTC-USDT",
      type: "Long",
      leverage: "0.5x",
      positionSize: "2.0332",
      sizeUsd: "$4,580",
      entryPrice: "$2,362",
      marketPrice: "$2,362",
      estLiqPrice: "$2,362",
      takeProfit: "$2,362/$2,362",
      pnl: "-$0.04",
      pnlPercent: "2%",
      borrowFee: "$0.00",
    },
    {
      id: 1,
      market: "BTC-USDT",
      type: "Long",
      leverage: "0.5x",
      positionSize: "2.0332",
      sizeUsd: "$4,580",
      entryPrice: "$2,362",
      marketPrice: "$2,362",
      estLiqPrice: "$2,362",
      takeProfit: "$2,362/$2,362",
      pnl: "-$0.04",
      pnlPercent: "2%",
      borrowFee: "$0.00",
    },
    // Add more positions here as needed...
  ];

  return (
    <div className="w-full bg-[#1B1C39] rounded-2xl text-left text-sm text-white  h-full flex flex-col">
      {/* Top section remains the same */}
      <div className="w-full  2xl:px-3 py-0.5 2xl:py-1.5 px-4 my-1 2xl:my-3">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 xl:space-y-3 md:space-y-0">
          <div className="flex flex-wrap justify-center bg-[#0B0B20] px-1 py-0.5 xl:px-2 xl:py-1.5 rounded-[14px] text-white space-x-2 xl:space-x-4">
            <button
              onClick={() => setActiveTab("positions")}
              className={`px-4 py-1.5 xl:text-sm 2xl:text-base lg:text-xs rounded-lg ${
                activeTab === "positions" ? "bg-[#1B1C39]" : ""
              }`}
            >
              Positions{" "}
              <span className="ml-1 bg-[#1B1C39] py-1 rounded-full px-2">
                1
              </span>
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-1.5 xl:text-sm 2xl:text-base lg:text-xs rounded-lg ${
                activeTab === "orders" ? "bg-[#1B1C39]" : ""
              }`}
            >
              Open Orders{" "}
              <span className="ml-1 xl:text-sm 2xl:text-base lg:text-xs bg-[#0B0B20] rounded-full py-1 px-2">
                0
              </span>
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-4 xl:text-sm 2xl:text-base lg:text-xs py-1.5 rounded-lg ${
                activeTab === "history" ? "bg-[#1B1C39]" : ""
              }`}
            >
              History
            </button>
            <button
              onClick={() => setActiveTab("realized")}
              className={`px-4 xl:text-sm 2xl:text-base lg:text-xs py-1.5 rounded-lg ${
                activeTab === "realized" ? "bg-[#1B1C39]" : ""
              }`}
            >
              RealizedPnL
            </button>
          </div>
          <button className="bg-[#28294B] rounded-lg p-2 xl:text-sm 2xl:text-base lg:text-xs w-full md:w-auto">
            Clear All Positions
          </button>
        </div>
      </div>

      {/* Table Header - Hidden on mobile, shown on larger screens */}
      <div className="hidden md:grid grid-cols-9 px-[9px] py-3 font-semibold bg-[#28294B] rounded-t-xl text-gray-300">
        <div className="col-span-1 flex items-center justify-start space-x-1">
          <Checkbox />
          <div>Market/Action</div>
        </div>
        <div className="col-span-1 text-center">Position Size ↑</div>
        <div className="col-span-1 text-center">Entry Price ↑</div>
        <div className="col-span-1 text-center">Market Price ↑</div>
        <div className="col-span-1 text-center">Est. LIQ Price ↑</div>
        <div className="col-span-1 text-center">TP/SL ↑</div>
        <div className="col-span-1 text-center">P/L ↑</div>
        <div className="col-span-1 text-center">Borrow Fee ↑</div>
        <div className="col-span-1 flex justify-end">Action</div>
      </div>
      {/* Mobile-optimized Table Body */}
      <div className="h-full overflow-y-auto border-l border-r">
        {positions.map((position, index) => (
          <div
            key={index}
            className="p-2 border-b border-gray-700 bg-[#0B0B20]"
          >
            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-9 gap-4">
              <div className="col-span-1 flex items-center justify-start space-x-1">
                <Checkbox className="w-10" />
                <div className="flex flex-col">
                  <span className="text-md">{position.market}</span>
                  <div className="flex justify-start gap-1 mt-1 text-xs text-green-500">
                    <span className="bg-[#008D5B33] text-[#30E0A1] p-1 rounded-md">
                      {position.type}
                    </span>
                    <span className="text-gray-400 text-xs flex justify-center items-center">
                      {position.leverage}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-span-1 text-center flex flex-col justify-center items-center">
                <span className="xl:text-sm">{position.positionSize}</span>
                <div className="text-xs text-gray-400">{position.sizeUsd}</div>
              </div>
              <span className="col-span-1 text-center flex justify-center items-center">
                {position.entryPrice}
              </span>
              <span className="col-span-1 text-center flex justify-center items-center">
                {position.marketPrice}
              </span>
              <span className="col-span-1 text-center flex justify-center items-center">
                {position.estLiqPrice}
              </span>
              <span className="col-span-1 text-center flex justify-center items-center">
                {position.takeProfit}
              </span>
              <div className="col-span-1 flex items-center justify-center gap-1">
                <span className="text-red-500">{position.pnl}</span>
                <span className="text-xs text-green-500">
                  {position.pnlPercent}
                </span>
              </div>
              <span className="col-span-1 text-center flex justify-center items-center">
                {position.borrowFee}
              </span>
              <div className="col-span-1 flex justify-end">
                <button className="text-xs font-bold px-4  rounded-md text-white bg-[#1B1C39]">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex flex-col md:grid md:grid-cols-9 gap-4 p-1 xl:p-2 font-semibold bg-[#28294B]  rounded-b-lg text-gray-300 mt-auto">
        <div className="flex flex-col space-y-1 xl:space-y-2 md:space-y-0 md:flex-row md:col-span-4">
          <div className="flex gap-4 w-full md:w-fit bg-[#0B0B20] rounded-xl justify-center items-center p-1 xl:p-2 text-white">
            <span className="bg-[#1B1C39] rounded-lg px-2 py-1 text-xs xl:text-sm 2xl:text-base font-semibold whitespace-nowrap">
              Total Position Size:
            </span>
            <span className="font-semibold flex justify-center items-center text-xs xl:text-sm 2xl:text-base">
              $49.75
            </span>
          </div>
        </div>
        <div className="flex justify-between md:col-span-5 items-center gap-2 text-white mt-2 md:mt-0">
          <span className="text-xs text-[#28294B] xl:text-sm 2xl:text-base">
            {" "}
            1 of 1
          </span>
          <div className="flex items-center gap-2 px-3 py-2 bg-[#1B1C39] rounded-[10px]">
            <div>
              <button className="bg-[#28294B] py-1 px-2 rounded-[6px] text-xs xl:text-sm 2xl:text-base">
                First
              </button>
            </div>
            <div className="flex justify-center items-center space-x-3">
              <ArrowLeftIcon className="h-3 w-3 xl:h-4 xl:w-4  xl:mr-3 " />{" "}
              <span className="text-xs xl:text-sm 2xl:text-base">1 of 1 </span>
              <ArrowRightIcon className="h-3 w-3 xl:h-4 xl:w-4" />
            </div>
            <div>
              <button className="bg-[#28294B] py-1 px-2 rounded-[6px] text-xs xl:text-sm 2xl:text-base">
                First
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingPositionsTable;
