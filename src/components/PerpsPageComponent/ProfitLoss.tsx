import { InfoOutlineIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import React, { useState } from "react";
import { InfoIcon } from 'lucide-react';
const ProfitLoss = () => {

  const [profitPercentage, setProfitPercentage] = useState(99.26);
  const [inputValue, setInputValue] = useState("0");
  const percentageOptions = [25, 50, 100, 300];
  const handlePercentageClick = (percentage: number) => {
    setProfitPercentage(percentage);
  };



  const [lossPercentage, setLossPercentage] = useState(-10);
  const [inputlossValue, setInputLossValue] = useState('0');
  const lossPercentageOptions = [-20, -30, -40, -50];
  const handleLossPercentageClick = (losspercentage:any) => {
    setLossPercentage(losspercentage);
  };

  return (
    <>
      <div className=" px-1">
        <div>
          <div className="flex justify-between items-center">
            <div className="flex justify-between items-center space-x-2">
              <div className="font-semibold">Take Profit</div>
              <div className="text-[#30E0A1] bg-[#008D5B33] text-sm p-1 rounded-lg">
                {profitPercentage}%
              </div>
            </div>
            <div>
              <InfoIcon
                className="w-3 h-3"
                
              />
            </div>
          </div>

          <div className="flex items-center text-center gap-1 text-sm my-4">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="bg-[#0B0B20] py-2 px-4 w-full rounded-xl text-white"
              placeholder="0"
            />

            {percentageOptions.map((percentage) => (
              <button
                key={percentage}
                onClick={() => handlePercentageClick(percentage)}
                className="bg-[#28294B] py-2 px-2 text-xs w-full rounded-xl text-white hover:bg-[#363764] transition-colors"
              >
                {percentage}%
              </button>
            ))}
          </div>
        </div>
        <div>
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center space-x-2">
          <div>Stop Loss</div>
          <div className="text-[#30E0A1] bg-[#008D5B33] text-sm p-1 rounded-lg">
            {lossPercentage}%
          </div>
        </div>
        <div>
          <InfoIcon 
            className="w-3 h-3" 
          />
        </div>
      </div>
      
      <div className="flex items-center text-center gap-1 text-sm my-4">
      <input
              value={inputlossValue}
              onChange={(e) => setInputLossValue(e.target.value)}
              className="bg-[#0B0B20] py-2 px-4 w-full rounded-xl text-white"
              placeholder="0"
            />
        
        {lossPercentageOptions.map((losspercentage) => (
          <button
            key={losspercentage}
            onClick={() => handleLossPercentageClick(losspercentage)}
            className="bg-[#28294B] text-xs py-2 px-[7px] w-full rounded-xl text-white hover:bg-[#363764] transition-colors"
          >
            {losspercentage}%
          </button>
        ))}
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
