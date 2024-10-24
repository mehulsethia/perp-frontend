import React, { useState } from "react";
import MarketLimit from "./MarketLimit";
import BalanceUI from "./BalanceUI";
import LeverageSlider from "../PerpsPageComponent/LeverageSlider";
import ProfitLoss from "./ProfitLoss";
import OneClickTrading from "./OneClickTrading";
import Slippage from "./Slippage";
import AmountButton from "./AmountButton";

const LongShort = () => {
  const [activeTab, setActiveTab] = useState("Short");

  return (
    <>
      <div className="h-[calc(100vh-255px)]  flex flex-col ">
        {/* Top section with buttons */}
        <div>
          <div className="p-1 bg-[#2F3055] rounded-t-3xl">
            <div className="flex justify-between rounded-t-[22px] items-center">
              <button
                className={`font-semibold rounded-tl-3xl w-1/2 px-5 py-3 ${
                  activeTab === "Short" ? "bg-[#1B1C39]" : ""
                }`}
                onClick={() => setActiveTab("Short")}
              >
                Long
              </button>
              <button
                className={`font-semibold rounded-tr-3xl w-1/2 px-5 py-3 ${
                  activeTab === "Long" ? "bg-[#1B1C39]" : ""
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
        <div className="overflow-y-auto  mx-2 pr-2 ">
          <BalanceUI />
          <LeverageSlider />
          <ProfitLoss />
          {/* <OneClickTrading /> */}
          <Slippage />
        </div>

        {/* Amount button at the bottom */}
        <div className="mx-2 mt-auto">
          <AmountButton />
        </div>
      </div>
    </>
  );
};

export default LongShort;
