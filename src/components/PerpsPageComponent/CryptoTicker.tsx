import React from "react";
import { ArrowRight } from "lucide-react";
import Frame76 from "../../assets/icons/Frame 76.png";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/react";
import Dropdown from "./Dropdown";
const   CryptoTicker = () => {
  const metrics = [
    { label: "24h Change", value: "$2,302", color: "#01C880" },
    { label: "24h Volume", value: "$2,302,564", color: "#01C880" },
    { label: "Open Interest (L)", value: "$2,302,564", color: "#01C880" },
    { label: "Open Interest (S)", value: "$2,302,564", color: "#FF5656" },
    { label: "Borrow Fee (L)", value: "$2,302", color: "#01C880" },
    { label: "Borrow Fee (S)", value: "$2,302", color: "#FF5656" },
  ];

  return (
    <div className="rounded-lg grid grid-cols-1 md:grid-cols-[auto,1fr,auto] items-center text-sm gap-4 ">
      {/* Market Info and Ticker */}
      <div className="flex items-center justify-between space-x-4 bg-[#1B1C39] p-4 rounded-xl w-full md:w-auto">
        <div className="flex items-center space-x-3">
          <div className="relative flex-shrink-0 w-16">
            {/* Replace this with your logo */}
            <Image src={Frame76} alt="Logo" className="absolute w-10 h-8" />
            <Image src={Frame76} alt="Logo" className="w-10 h-8" />
          </div>
          <div className="text-white flex font-bold items-center space-x-2">
            <span>ETH—USD</span>
            <ChevronDownIcon fontSize={"20px"} className="text-gray-400" />
            <div className="text-[#30e0a1] bg-[#008d5b33] text-sm px-2 py-1 rounded-lg">
              10X
            </div>
          </div>
        </div>
        <div className="text-white flex items-center">
          <Dropdown />
        </div>
      </div>

      {/* Ticker and Metrics */}
      <div className="bg-[#1B1C39] py-2 px-6 rounded-xl w-full">
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
          {/* Price Info */}
          <div className="flex flex-col text-center md:text-left">
            <div className="text-2xl font-bold text-white">$6,654</div>
            <div className="text-gray-400">$6,654</div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-6 mt-4 md:mt-0">
            {metrics.map((metric, index) => (
              <div key={index} className="min-w-[140px]">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-[3px] h-4 rounded-md"
                    style={{ backgroundColor: metric.color }}
                  />
                  <span className="text-white text-base font-semibold">
                    {metric.label}
                  </span>
                </div>
                <div className="text-sm font-bold text-gray-300 mt-1">{metric.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoTicker;
