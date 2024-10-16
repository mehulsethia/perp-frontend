import { ChevronDownIcon } from "@chakra-ui/icons";
import React from "react";

const BalanceUI = () => {
  return (
    <>
      <div className="space-y-6 my-4">
        <div className="bg-[#0B0B20] p-3 rounded-2xl space-y-3">
          <div className="  flex justify-between items-center">
            <div className="p-2 bg-[#1B1C39] rounded-2xl flex justify-center items-center space-x-2">
              <div className="bg-[#0B0B20] p-1.5 rounded-xl text-sm">
                Balance
              </div>
              <div className="text-sm font-bold">$1.29</div>
              <button className="text-[#30E0A1] bg-[#008D5B33] text-sm p-1 rounded-lg">
                Max
              </button>
            </div>
            <div className="font-bold ">Amount</div>
          </div>
          <div className="flex justify-between items-center p-1">
            <div className="font-bold">Select Token <ChevronDownIcon  fontSize={"20px"}  /></div>
            <div className="font-bold">10</div>
          </div>
        </div>

        <div className="">
        <div className="bg-[#0B0B20] p-3 rounded-xl space-y-3">
          <div className="  flex justify-between items-center">
            <div className="py-1 px-1.5 bg-[#1B1C39] rounded-xl flex justify-center items-center space-x-2">
              <div className="bg-[#0B0B20] py-2 px-3   rounded-xl text-sm">
                Leverage
              </div>
              <div className="text-sm font-bold">5x</div>
            </div>
            <div className="font-bold ">Quantity</div>
          </div>
          <div className="flex justify-between items-center p-1">
            <div className="font-bold">Select Token <ChevronDownIcon  fontSize={"20px"}  /></div>
            <div className="font-bold">0.003265</div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default BalanceUI;
