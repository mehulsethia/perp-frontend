import { InfoOutlineIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import React from "react";

const ProfitLoss = () => {
  return (
    <>
      <div className="my-4 px-1">
        <div>
          <div className="flex justify-between items-center">
            <div className="flex justify-between items-center space-x-2">
              <div className="font-semibold">Take Profit</div>
              <div className="text-[#30E0A1] bg-[#008D5B33] text-sm p-1 rounded-lg">
                99.26%
              </div>
            </div>
            <div>
              <Tooltip
                label="Execution fees premium that will be applied on limit orders. If this is too low then orders may not execute on time"
                fontSize="sm"
              >
                <InfoOutlineIcon w={3} h={3} />
              </Tooltip>
            </div>
          </div>
          <div className="flex items-center text-center gap-2 text-sm my-4">
            <input placeholder="68,000" className="bg-[#0B0B20]    py-2 px-4 w-full rounded-xl text-white" />
            <div className="bg-[#28294B] py-2 px-4 w-full rounded-xl text-white">25%</div>
            <div className="bg-[#28294B] py-2 px-4 w-full rounded-xl text-white">50%</div>
            <div className="bg-[#28294B] py-2 px-4 w-full rounded-xl text-white">100%</div>
            <div className="bg-[#28294B] py-2 px-4 w-full rounded-xl text-white">300%</div>
          </div>
        </div>
        <div>
          <div>
            <div className="flex justify-between items-center">
              <div className="flex justify-between items-center space-x-2">
                <div>Stop Loss</div>
                <div className="text-[#30E0A1] bg-[#008D5B33] text-sm p-1 rounded-lg">
                  -10%
                </div>
              </div>
              <div>
                <Tooltip
                  label="Execution fees premium that will be applied on limit orders. If this is too low then orders may not execute on time"
                  fontSize="sm"
                >
                  <InfoOutlineIcon w={3} h={3} />
                </Tooltip>
              </div>
            </div>
            <div className="flex items-center text-center gap-2 text-sm my-4">
            <input placeholder="68,000" className="bg-[#0B0B20]    py-2 px-4 w-full rounded-xl text-white" />
            <div className="bg-[#28294B] py-2 px-4 w-full rounded-xl text-white">-20%</div>
            <div className="bg-[#28294B] py-2 px-4 w-full rounded-xl text-white">-30%</div>
            <div className="bg-[#28294B] py-2 px-4 w-full rounded-xl text-white">-40%</div>
            <div className="bg-[#28294B] py-2 px-4 w-full rounded-xl text-white">-50%</div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfitLoss;

{
  /* <div>
          <div>
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
          </div>
        </div> */
}
