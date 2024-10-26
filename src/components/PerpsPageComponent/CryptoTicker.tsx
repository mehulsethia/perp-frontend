import React from "react";
import { ArrowRight } from "lucide-react";
import Frame76 from "../../assets/icons/Frame 76.png";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/react";
import Dropdown from "./Dropdown";
import CryptoDropdown from "./CryptoNavigation";
const CryptoTicker = () => {
  const metrics = [
    { label: "24h Change", value: "$2,302", isPositive: true },
    { label: "24h Volume", value: "$2,302,564", isPositive: true },
    { label: "Open Interest (L)", value: "$2,302,564", isPositive: true },
    { label: "Open Interest (S)", value: "$2,302,564", isPositive: false },
    { label: "Borrow Fee (L)", value: "$2,302", isPositive: true },
    { label: "Borrow Fee (S)", value: "$2,302", isPositive: false },
  ];
  const options = ["Market 01", "Market 02", "Market 03"];

  return (
    <div className="rounded-lg grid grid-cols-1 md:grid-cols-[auto,1fr] items-center text-sm gap-4 my-2 mx-2">
      {/* Market Info and Ticker */}
      <div className="flex  space-x-4 bg-[#1B1C39] px-4 py-1.5 rounded-xl w-full md:w-auto">
        <div className="flex justify-between items-center w-full  space-x-3">
          <CryptoDropdown />
          <div className="text-white flex font-bold items-center space-x-2">
            <div className="text-[#30e0a1] bg-[#008d5b33] text-sm px-2 py-1 rounded-lg">
              10X
            </div>
          </div>
        </div>
      </div>

      {/* Ticker and Metrics */}
      <div className="w-full bg-[#1B1C39] py-2 px-3 rounded-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between ">
          {/* Price Section */}
          <div className="flex flex-col mb-6 lg:mb-0">
            <span className="text-2xl font-bold text-white">6,654$</span>
            <span className="text-gray-400">6,654</span>
          </div>

          {/* Metrics Section */}
          <div className="grid grid-cols-2  md:grid-cols-2 lg:flex lg:items-center lg:space-x-12 gap-6 lg:gap-0">
            {metrics.map((metric, index) => (
              <div key={index} className="flex items-start">
                <div
                  className={`w-1 h-4 mt-1 mr-2 rounded ${
                    metric.isPositive ? "bg-emerald-500" : "bg-red-500"
                  }`}
                />
                <div className="flex flex-col">
                  <span className="text-md font-bold text-white">
                    {metric.label}
                  </span>
                  <span className="text-sm text-gray-400 mt-0.5">
                    {metric.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoTicker;
