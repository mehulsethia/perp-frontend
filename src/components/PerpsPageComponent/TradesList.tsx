import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

const TradesList = () => {
  const trades = [
    { price: 65302, size: 0.003256, time: "11:30:30", type: "buy" },
    { price: 65302, size: 0.003256, time: "11:30:30", type: "buy" },
    { price: 65302, size: 0.003256, time: "11:30:30", type: "sell" },
    { price: 65302, size: 0.003256, time: "11:30:30", type: "sell" },
    { price: 65302, size: 0.003256, time: "11:30:30", type: "buy" },
    { price: 65302, size: 0.003256, time: "11:30:30", type: "sell" },
    { price: 65302, size: 0.003256, time: "11:30:30", type: "buy" },
    { price: 65302, size: 0.003256, time: "11:30:30", type: "buy" },
    { price: 65302, size: 0.003256, time: "11:30:30", type: "buy" },
    { price: 65302, size: 0.003256, time: "11:30:30", type: "buy" },
    { price: 65302, size: 0.003256, time: "11:30:30", type: "sell" },
    { price: 65302, size: 0.003256, time: "11:30:30", type: "sell" },
    { price: 65302, size: 0.003256, time: "11:30:30", type: "buy" },
    { price: 65302, size: 0.003256, time: "11:30:30", type: "sell" },
    { price: 65302, size: 0.003256, time: "11:30:30", type: "buy" },
    { price: 65302, size: 0.003256, time: "11:30:30", type: "buy" },
  ];

  return (
    <div className="bg-[#1B1C39]   rounded-2xl ">
      <h2 className="text-white text-xl p-3 font-bold mb-4">Trades</h2>

      <div className="grid grid-cols-3 gap-4  p-3  bg-[#28294B] rounded-t-xl ">
        <div className="text-white text-sm flex items-center">
          Price $ <ArrowDown className="w-4 h-4 ml-1" />
        </div>
        <div className="text-white text-sm flex items-center">
          Size BTC <ArrowDown className="w-4 h-4 ml-1" />
        </div>
        <div className="text-white text-sm flex justify-center items-center">
          Time <ArrowDown className="w-4 h-4 ml-1" />
        </div>
      </div>

      <div className="space-y-2 border bg-[#0B0B20]">
        {trades.map((trade, index) => (
          <div
            key={index}
            className="grid grid-cols-3 gap-4 px-1 py-3 border-b border-l border-r"
          >
            <span
              className={`${
                trade.type === "buy" ? "text-[#30E0A1]" : "text-red-500"
              }`}
            >
              {trade.price.toLocaleString()}
            </span>
            <span className="text-white">{trade.size}</span>
            <span className="text-white flex items-center">
              {trade.time}
              <ArrowUp className="w-4 h-4 ml-2 text-gray-400" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradesList;
