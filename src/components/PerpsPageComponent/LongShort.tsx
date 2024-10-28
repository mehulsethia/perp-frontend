import { useState } from "react";
import AmountButton from "./AmountButton";
import BalanceUI from "./BalanceUI";
import LeverageSlider from "./LeverageSlider";
import MarketLimit from "./MarketLimit";
import ProfitLoss from "./ProfitLoss";
import Slippage from "./Slippage";

// LongShort.js
const LongShort = () => {
  const [activeTab, setActiveTab] = useState("Short");

  return (
    <div className="h-full flex flex-col w-full md:w-auto">
      {/* Top section with buttons */}
      <div>
        <div className="p-1 bg-[#2F3055] ">
          <div className="flex justify-between  items-center">
            <button
              className={`font-semibold rounded-tl-[14px] w-1/2 px-5 py-3 ${
                activeTab === "Short" ? "bg-[#30E0A199]" : ""
              }`}
              onClick={() => setActiveTab("Short")}
            >
              Long
            </button>
            <button
              className={`font-semibold rounded-tr-[14px] w-1/2 px-5 py-3 ${
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
          <MarketLimit />
        </div>
      </div>

      {/* Scrollable content section in the middle */}
      <div className="flex-1 overflow-y-auto mx-2 pr-2">
        <BalanceUI />
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
