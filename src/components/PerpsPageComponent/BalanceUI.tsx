import { ChevronDownIcon } from "@chakra-ui/icons";
import React from "react";
import Dropdown from "./Dropdown";

const BalanceUI = () => {
  const options = ["Honey","LP Honey"]
  return (
    <>
      <div className="space-y-2 ">
        <div className="bg-[#0B0B20] p-2 lg:p-3 rounded-2xl space-y-3">
          <div className=" flex justify-between items-center">
            <div className="p-2 bg-[#1B1C39] rounded-2xl flex justify-center items-center space-x-2">
              <div className="bg-[#0B0B20]  font-bold text-white rounded-lg  p-2 text-xs" >
                Balance
              </div>
              <div className=" font-bold font-sfPro text-xs">$1.29</div>
              <button className="text-[#30E0A1] bg-[#008D5B33]  p-2 rounded-lg text-xs">
                Max
              </button>
            </div>
            <div className="font-bold text-white text-sm xl:text-base">Amount</div>
          </div>
          <div className="flex justify-between items-center p-1">
          <Dropdown options={options} defaultOption="Select Token" />

            <div className="font-bold text-white">10</div>
          </div>
        </div>

        <div className="">
        <div className="bg-[#0B0B20] p-3 rounded-xl space-y-3">
          <div className="  flex justify-between items-center">
            <div className="p-2 bg-[#1B1C39] rounded-2xl flex justify-center items-center space-x-2">
              <div className="bg-[#0B0B20] font-bold text-white py-2 px-2   rounded-lg text-xs">
                Leverage
              </div>
              <div className="text-xs font-bold p-1 font-sfPro">5x</div>
            </div>
            <div className="font-bold text-white text-sm xl:text-base ">Quantity</div>
          </div>
          <div className="flex justify-between items-center p-1">
            <Dropdown options={options} defaultOption="Select Token" />
            <div className="font-bold text-white">0.003265</div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default BalanceUI;
