import { ArrowLeftIcon, ArrowLeftSquare, ArrowRightIcon } from "lucide-react";
import React, { useState } from "react";

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
      <div className="w-full px-3 py-1.5 my-3">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          <div className="flex flex-wrap justify-center bg-[#0B0B20] px-2 py-1.5 rounded-[10px] text-white space-x-2 md:space-x-4">
            <button onClick={() => setActiveTab("positions")} className={`px-4 py-1.5 rounded-lg ${activeTab === "positions" ? "bg-[#1B1C39]" : ""}`}>
              Positions <span className="ml-1 bg-[#1B1C39] py-1 rounded-full px-2">1</span>
            </button>
            <button onClick={() => setActiveTab("orders")} className={`px-4 py-1.5 rounded-lg ${activeTab === "orders" ? "bg-[#1B1C39]" : ""}`}>
              Open Orders <span className="ml-1 bg-[#0B0B20] rounded-full py-1 px-2">0</span>
            </button>
            <button onClick={() => setActiveTab("history")} className={`px-4 py-1.5 rounded-lg ${activeTab === "history" ? "bg-[#1B1C39]" : ""}`}>
              History
            </button>
            <button onClick={() => setActiveTab("realized")} className={`px-4 py-1.5 rounded-lg ${activeTab === "realized" ? "bg-[#1B1C39]" : ""}`}>
              RealizedPnL
            </button>
          </div>
          <button className="bg-[#28294B] rounded-lg p-2 w-full md:w-auto">
            Clear All Positions
          </button>
        </div>
      </div>

      {/* Table Header - Hidden on mobile, shown on larger screens */}
      <div className="hidden md:grid grid-cols-9 gap-4 px-2 py-3 font-semibold bg-[#28294B] rounded-t-xl text-gray-300">
        <span>Market/Action</span>
        <span>Position Size ↑</span>
        <span>Entry Price ↑</span>
        <span>Market Price ↑</span>
        <span>Est. LIQ Price ↑</span>
        <span>TP/SL ↑</span>
        <span>P/L ↑</span>
        <span>Borrow Fee ↑</span>
        <span>Action</span>
      </div>

      {/* Mobile-optimized Table Body */}
      <div className="h-full overflow-y-auto">
        {positions.map((position, index) => (
          <div key={index} className="p-2 border-b border-gray-700 bg-[#0B0B20]">
            {/* Mobile Layout */}
            <div className="md:hidden">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="font-semibold">{position.market}</span>
                  <div className="flex items-center gap-1 text-xs text-green-500">
                    <span>{position.type}</span>
                    <span className="text-gray-400">{position.leverage}</span>
                  </div>
                </div>
                <button className="text-sm font-bold rounded-md px-3 py-1 text-white bg-[#1B1C39]">
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between p-1 bg-[#1B1C39] rounded">
                  <span className="text-gray-400">Size:</span>
                  <span>{position.positionSize}</span>
                </div>
                <div className="flex justify-between p-1 bg-[#1B1C39] rounded">
                  <span className="text-gray-400">Entry:</span>
                  <span>{position.entryPrice}</span>
                </div>
                <div className="flex justify-between p-1 bg-[#1B1C39] rounded">
                  <span className="text-gray-400">Market:</span>
                  <span>{position.marketPrice}</span>
                </div>
                <div className="flex justify-between p-1 bg-[#1B1C39] rounded">
                  <span className="text-gray-400">LIQ:</span>
                  <span>{position.estLiqPrice}</span>
                </div>
                <div className="flex justify-between p-1 bg-[#1B1C39] rounded">
                  <span className="text-gray-400">TP/SL:</span>
                  <span>{position.takeProfit}</span>
                </div>
                <div className="flex justify-between p-1 bg-[#1B1C39] rounded">
                  <span className="text-gray-400">P/L:</span>
                  <div className="flex items-center gap-1">
                    <span className="text-red-500">{position.pnl}</span>
                    <span className="text-xs text-green-500">{position.pnlPercent}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-9 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>{position.market}</span>
                <div className="flex items-center gap-1 mt-1 text-xs text-green-500">
                  <span>{position.type}</span>
                  <span className="text-gray-400">{position.leverage}</span>
                </div>
              </div>
              <div>
                <span>{position.positionSize}</span>
                <div className="text-xs text-gray-400">{position.sizeUsd}</div>
              </div>
              <span>{position.entryPrice}</span>
              <span>{position.marketPrice}</span>
              <span>{position.estLiqPrice}</span>
              <span>{position.takeProfit}</span>
              <div className="flex items-center gap-1">
                <span className="text-red-500">{position.pnl}</span>
                <span className="text-xs text-green-500">{position.pnlPercent}</span>
              </div>
              <span className="">{position.borrowFee}</span>
              <button className="text-sm font-bold w-20 rounded-md text-white bg-[#1B1C39]">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex flex-col md:grid md:grid-cols-9 gap-4 p-2 font-semibold bg-[#28294B]  rounded-lg text-gray-300 mt-auto">
        <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:col-span-4">
          <div className="flex gap-4 w-full md:w-fit bg-[#0B0B20] rounded-xl p-2 text-white">
            <span className="bg-[#1B1C39] rounded-lg px-2 py-1 font-semibold whitespace-nowrap">
              Total Position Size:
            </span>
            <span className="font-semibold flex justify-center items-center">$49.75</span>
          </div>
        </div>
        <div className="flex justify-between md:col-span-5 items-center gap-2 text-white mt-2 md:mt-0">
          <span>1 of 1</span>
          <div className="flex items-center gap-2 px-3 py-2 bg-[#1B1C39] rounded-[10px]">
            <div>
              <button className="bg-[#28294B] py-1 px-2 rounded-[6px]">First</button>
            </div>
            <div className="flex justify-center items-center space-x-3"><ArrowLeftIcon className="h-4 w-4 mr-3" /> 1 of 1 <ArrowRightIcon className="h-4 w-4" /></div>
            <div>
              <button className="bg-[#28294B] py-1 px-2 rounded-[6px]">First</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingPositionsTable;
