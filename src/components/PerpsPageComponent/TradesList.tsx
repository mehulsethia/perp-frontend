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
    <div className="bg-[#1B1C39] rounded-2xl w-full  relative">
      <div className="grid grid-cols-3 gap-1 py-2 px-1 bg-[#28294B] rounded-t-xl">
        <div className="text-white text-xs xl:text-sm font-bold flex gap-1 items-center pl-2">
          Price{" "}
          <span className=" rounded py-.5 px-[3px] bg-[#1B1C39] text-[8px]">
            $
          </span>{" "}
          <div className="bg-[#0B0B20] rounded p-1 flex items-center justify-center">
            <img src="/assets/icons/sorting.svg" className="w-2 h-2 " alt="" />
          </div>
        </div>
        <div className="text-white text-xs xl:text-sm font-bold flex items-center gap-1">
          Size{" "}
          <span className=" rounded py-.5 px-[3px] bg-[#1B1C39] text-[8px]">
            BTC
          </span>{" "}
          <div className="bg-[#0B0B20] rounded p-1 flex items-center justify-center">
            <img src="/assets/icons/sorting.svg" className="w-2 h-2 " alt="" />
          </div>
        </div>
        <div className="text-white text-xs xl:text-sm font-bold flex justify-center pr-2 items-center gap-1">
          Time{" "}
          <div className="bg-[#0B0B20] rounded p-1 flex items-center justify-center">
            <img src="/assets/icons/sorting.svg" className="w-2 h-2 " alt="" />
          </div>
        </div>
      </div>

      <div className=" bg-[#0B0B20] rounded-b-[10px] ">
        {trades.map((trade, index) => (
          <div
            key={index}
            className="grid grid-cols-3 border-b border-[#FFFFFF24]  p-2 "
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
            <span className="text-white flex justify-center items-center gap-2 text-xs xl:text-sm font-semibold">
              {trade.time}
              <img src="/assets/icons/share.svg" alt="" className="w-3 h-3" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradesList;
