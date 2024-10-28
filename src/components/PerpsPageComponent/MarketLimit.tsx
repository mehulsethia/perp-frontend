import React, { useState } from "react";

const MarketLimit = () => {
  const [selected, setSelected] = useState("Market");

  const handleClick = (poolType:any) => {
    setSelected(poolType);
  };

  return (
    <>
      <div className="flex my-1 xl:my-2 items-center justify-between space-x-1 bg-[#0B0B20] p-2 rounded-[14px] w-full">
        <button
          onClick={() => handleClick("Market")}
          className={`flex-1 py-2 rounded-[10px] font-semibold transition-colors ${
            selected === "Market"
              ? "bg-[#1B1C39] text-white"
              : "bg-transparent text-gray-400"
          } hover:bg-gray-900 hover:text-white text-sm xl:text-base`}
        >
          Market
        </button>
        <button
          onClick={() => handleClick("Limit")}
          className={`flex-1 py-2 rounded-[10px] font-semibold transition-colors ${
            selected === "Limit"
              ? "bg-[#1B1C39] text-white"
              : "bg-transparent text-gray-400"
          } hover:bg-gray-900 hover:text-white text-sm xl:text-base`}
        >
          Limit
        </button>
      </div>
    </>
  );
};

export default MarketLimit;
