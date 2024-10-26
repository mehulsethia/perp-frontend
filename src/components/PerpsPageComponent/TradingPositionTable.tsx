import React from "react";

const   TradingPositionsTable = () => {
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
    <div className="w-full bg-[#28294B] text-left text-sm text-white p-4 h-full flex flex-col ">
      {/* Header */}
      <div className="grid grid-cols-9 gap-4 p-2 font-semibold bg-[#1B1C39] text-gray-300">
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

<div className="h-full overflow-y-auto">

      {positions.map((position, index) => (
        <div
          key={index}
          className="grid grid-cols-9 gap-4 p-2 border-b border-gray-700 hover:bg-[#1B1C39]"
        >
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
          <span>{position.borrowFee}</span>
          <button className="px-2 py-1 text-sm border border-gray-600 text-white bg-transparent hover:bg-[#2A2B31]">
            Remove
          </button>
        </div>
      ))}
</div>


      <div className="grid grid-cols-9 gap-4 p-2 font-semibold bg-[#1B1C39] text-gray-300 mt-auto">
        <div className="col-span-2 flex gap-4 bg-[#0B0B20] rounded-xl p-2 text-white">
          <span className="bg-[#1B1C39] rounded-lg px-2 py-1 font-semibold">
            Total Position Size:    
          </span>   
          <span className="font-semibold">$49.75</span>
        </div>
        <div className="col-span-2 flex gap-4 bg-[#0B0B20] rounded-xl p-2 text-white">
          <span className="bg-[#1B1C39] rounded-lg px-2 py-1 font-semibold">
            Total Position Size:
          </span>
          <span className="font-semibold">$49.75</span>
        </div>
        <div className="col-span-5 flex justify-end items-center gap-2 text-gray-400">
          <span>1 of 1</span>
          <button
            className="px-2 py-1 border border-gray-600 bg-transparent text-gray-400 hover:bg-[#2A2B31]"
            disabled
          >
            First
          </button>
          <button
            className="px-2 py-1 border border-gray-600 bg-transparent text-gray-400 hover:bg-[#2A2B31]"
            disabled
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradingPositionsTable;
