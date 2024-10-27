import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

const TradesList = () => {
  const trades = [
    { price: 65302, size: 0.3256, time: "11:30:30", type: "buy" },
    { price: 65302, size: 0.3256, time: "11:30:30", type: "buy" },
    { price: 65302, size: 0.3256, time: "11:30:30", type: "sell" },
    { price: 65302, size: 0.3256, time: "11:30:30", type: "sell" },
    { price: 65302, size: 0.3256, time: "11:30:30", type: "sell" },
    { price: 65302, size: 0.3256, time: "11:30:30", type: "sell" },

  ];

  return (
    <div className="bg-[#1B1C39] rounded-2xl w-full   ">
        <div className="grid grid-cols-3 gap-1 py-2 px-1 bg-[#28294B] rounded-t-xl">
          <div className="text-white text-xs xl:text-sm font-bold flex items-center pl-2">
            Price $ <ArrowDown className="w-4 h-4 ml-1" />
          </div>
          <div className="text-white text-xs xl:text-sm font-bold flex items-center ">
            Size BTC <ArrowDown className="w-4 h-4 ml-1" />
          </div>
          <div className="text-white text-xs xl:text-sm font-bold flex justify-center pr-2 items-center">
            Time <ArrowDown className="w-4 h-4 ml-1" />
          </div>
        </div>

      <div className=" bg-[#0B0B20] rounded-b-[10px] ">
        {trades.map((trade, index) => (
          <div
            key={index}
            className="grid grid-cols-3 rounded-[10px]   p-2 "
          >
            <span
              className={`${
                trade.type === "buy" ? "text-[#30E0A1]" : "text-red-500"
              } flex items-center text-xs xl:text-sm pl-2 font-semibold`}
            >
              {trade.price.toLocaleString()}
            </span>
            <span className="text-white flex items-center text-xs xl:text-sm font-semibold pl-2">
              {trade.size}
            </span>
            <span className="text-white flex justify-center text-xs xl:text-sm font-semibold items-center">
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
