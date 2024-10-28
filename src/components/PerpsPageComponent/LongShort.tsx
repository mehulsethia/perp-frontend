import { useState } from "react";
import AmountButton from "./AmountButton";
import BalanceUI from "./BalanceUI";
import LeverageSlider from "./LeverageSlider";
import MarketLimit from "./MarketLimit";
import ProfitLoss from "./ProfitLoss";
import Slippage from "./Slippage";
import Dropdown from "./Dropdown";

// LongShort.js
const LongShort = () => {
  const [activeTab, setActiveTab] = useState("Short");
  const [selected, setSelected] = useState("Market");
  const [inputValue, setInputValue] = useState("");

  const handleClick = (poolType: any) => {
    setSelected(poolType);
  };

  const options = ["Honey", "LP Honey"];


  const PriceSection = () => (
    <div className="bg-[#0B0B20] py-2 px-2 rounded-2xl my-2">
      <div className="flex justify-between items-center p-1">
        <div className="font-bold text-white">Price</div>
      </div>
      <div className="flex justify-between items-center">
        <Dropdown options={options} defaultOption="Select Token" />
        <div>
          <div className="flex items-center justify-between space-x-1 bg-[#1B1C39] px-1.5 py-1.5 rounded-[10px]">
            <button className="py-2 px-1  text-xs rounded-[6px] bg-[#0B0B20] hover:text-white font-bold">
              Enter Price
            </button>
            <input
              className="outline-none text-center text-white w-12 bg-transparent"
              placeholder="0"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col w-full md:w-auto">
      {/* Top section with buttons */}
      <div>
        <div className="p-1 bg-[#2F3055] ">
          <div className="flex justify-between  items-center">
            <button
              className={`font-semibold rounded-tl-[16px] w-1/2 px-5 py-3 ${
                activeTab === "Short" ? "bg-[#30E0A199]" : ""
              }`}
              onClick={() => setActiveTab("Short")}
            >
              Long
            </button>
            <button
              className={`font-semibold rounded-tr-[16px] w-1/2 px-5 py-3 ${
                activeTab === "Long" ? "bg-[#A53A49]" : ""
              }`}
              onClick={() => setActiveTab("Long")}
            >
              Short
            </button>
          </div>
        </div>

        {/* Market Limit placed right below the tabs */}
        <div className="mx-2 mt-2">
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
        </div>
      </div>

      {/* Scrollable content section in the middle */}
      <div className="flex-1 overflow-y-auto mx-2 pr-2">
        <BalanceUI />
        {/*  */}
        {selected === "Limit" && <PriceSection />}
        {/*  */}
        <LeverageSlider />
        <ProfitLoss />
        <Slippage />
      </div>

      {/* Amount button at the bottom */}
      <div className="mx-2 mt-auto">
        <AmountButton />
      </div>
    </div>
  );
};

export default LongShort;
