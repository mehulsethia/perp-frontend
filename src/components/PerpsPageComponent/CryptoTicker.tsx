import React from "react";
import { ArrowRight } from "lucide-react";
import Frame76 from "../../assets/icons/Frame 76.png";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/react";
const CryptoTicker = () => {
  const metrics = [
    { label: "24h Change", value: "$2,302", color: "#01C880" },
    { label: "24h Volume", value: "$2,302,564", color: "#01C880" },
    { label: "Open Interest (L)", value: "$2,302,564", color: "#01C880" },
    { label: "Open Interest (S)", value: "$2,302,564", color: "#FF5656" },
    { label: "Borrow Fee (L)", value: "$2,302", color: "#01C880" },
    { label: "Borrow Fee (S)", value: "$2,302", color: "#FF5656" },
  ];

  return (
    <div className=" rounded-lg grid grid-cols-1 md:grid-cols-[auto,1fr,auto] items-center text-sm gap-2">
      <div className="flex items-center justify-between space-x-2 bg-[#1B1C39] w-full md:w-auto p-4 rounded-xl">
        <div className="flex  md:space-x-1">
          <div className="flex flex-shrink-0 w-16 relative">
            {/* Replace this with your logo */}
            <Image
              src={Frame76}
              w={10}
              h={8}
              alt="Logo"
              className="flex-shrink-0 left-6 absolute"
            />
            <Image
              src={Frame76}
              w={10}
              h={8}
              alt="Logo"
              className="flex-shrink-0 "
            />
          </div>
          <div className="text-white text-sm flex justify-center items-center">
            BTC—USD <ChevronDownIcon fontSize={"20px"} />
            <div className="text-[#30e0a1] bg-[#008d5b33] h-fit  text-sm px-1.5 py-1 rounded-lg">
              10X
            </div>
          </div>
        </div>
        <div className="text-white text-sm flex justify-center items-center">
          All Market <ChevronDownIcon fontSize={"20px"} />
        </div>
      </div>

      {/* Crypto Ticker */}

      <div className="bg-[#1B1C39] py-3 px-2 rounded-xl w-full">
        <div className="flex flex-col p-2 md:p-0 space-y-4 md:space-y-0 md:space-x-4 md:flex-row justify-between">
          <div className="md:px-2">
            <div className="text-lg font-bold text-white">6,654$</div>
            <div className="text-gray-400">6,654$</div>
          </div>

          <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-6 ">
            {metrics.map((metric, index) => (
              <div key={index} className="min-w-[140px] ">
                <div className="flex items-center space-x-1">
                  <div
                    className="w-[2px] h-3.5 mr-1 rounded-md"
                    style={{ backgroundColor: metric.color }}
                  />
                  <span className="text-white  text-base font-semibold whitespace-nowrap">
                    {metric.label}
                  </span>
                </div>
                <div className="text-sm text-white mt-1">{metric.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enable One-Click Trading */}

      <div className="flex items-center justify-between w-full md:w-auto space-x-4 bg-[#1B1C39] p-4 rounded-xl">
        <div className="px-4 py-1 rounded font-bold text-white hover:bg-gray-700 transition-colors">
          Enable One-Click Trading
        </div>
        <button className="p-1.5 font-semibold rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors">
          Deposit
        </button>
      </div>
    </div>
  );
};

export default CryptoTicker;
