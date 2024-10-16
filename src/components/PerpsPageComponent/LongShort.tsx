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
      <div className="p-1 bg-[#2F3055] rounded-t-3xl">
        <div className=" flex justify-between rounded-t-[22px] items-center  ">
          <button
            className={` rounded-tl-3xl w-1/2 p-5 ${
              activeTab === "Short" ? "bg-[#1B1C39]" : ""
            }`}
            onClick={() => setActiveTab("Short")}
          >
            Short
          </button>
          <button
            className={` rounded-tr-3xl w-1/2 p-5 ${
              activeTab === "Long" ? "bg-[#1B1C39]" : ""
            }`}
            onClick={() => setActiveTab("Long")}
          >
            Long
          </button>
        </div>
      </div>
      {/* Market And Limit */}
      <div>
        <div className="mx-2">
          <MarketLimit />
          <BalanceUI />
          <LeverageSlider />
          <ProfitLoss />
          <OneClickTrading />
          <Slippage />
          <AmountButton />
        </div>
      </div>
    </>
  );
};

export default LongShort;
