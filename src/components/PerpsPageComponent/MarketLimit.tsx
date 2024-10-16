import React, { useState } from "react";

const MarketLimit = () => {
    const [selected, setSelected] = useState("Market");

    const handleClick = (poolType: any) => {
      setSelected(poolType);
    };
  return (
    <>
      <div className="flex my-4 items-center justify-between space-x-1  bg-[#0B0B20] p-2 rounded-xl w-full">
        <button
          onClick={() => handleClick("Market")}
          className={`px-10 py-2 rounded-xl w-full  transition-colors ${
            selected === "Market"
              ? "bg-[#1B1C39] text-white"
              : "bg-transparent text-gray-400"
          } hover:bg-gray-900 hover:text-white`}
        >
          Market
        </button>
        <button
          onClick={() => handleClick("Limit")}
          className={`px- py-2 rounded-xl w-full transition-colors ${
            selected === "Limit"
              ? "bg-[#1B1C39] text-white"
              : "bg-transparent text-gray-400"
          } hover:bg-gray-900 hover:text-white`}
        >
          Limit
        </button>
      </div>
    </>
  );
};

export default MarketLimit;
