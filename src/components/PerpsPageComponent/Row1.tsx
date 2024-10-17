import { Box, HStack, Image, Text } from "@chakra-ui/react";
import React from "react";
import Logo from "../../assets/icons/Frame 156.png";
import { ChevronDownIcon } from "@chakra-ui/icons";
const Row1 = () => {
  return (
    <>
      <div className="flex w-full flex-col md:flex-row justify-between gap-4 items-center  space-y-4 md:space-y-0  rounded-lg">
        {/* Left Section */}
        <div className="flex w-full md:w-fit justify-between items-center py-4 px-1 space-x-4 rounded-lg bg-[#1B1C39] ">
          {/* Logo and Pair */}
          <div className="flex  items-center space-x-2">
            <div>
              {/* Replace this with your logo */}
              <Image src={Logo} w={10} h={8} alt="Logo" />
            </div>
            <div className="text-white text-sm flex">
              BTC—USD <ChevronDownIcon fontSize={"20px"} />
              <div className="text-[#30e0a1] bg-[#008d5b33]  text-sm p-0.5 rounded-lg">
                10X
              </div>
            </div>
          </div>

          {/* Market */}
          <div className=" text-sm text-gray-400 flex justify-center items-center rounded-md">
            All Market <ChevronDownIcon />
          </div>
        </div>

        {/* Middle Section */}
        <div className="px-4 py-3 flex flex-col w-full md:w-fit md:flex-row space-y-4 md:space-y-0   rounded-lg bg-[#1B1C39]">
          {/* Price Section */}
          <div className="text-white flex  flex-col mr-2">
            <div className="text-lg font-bold">6,654$</div>
            <div className="text-sm text-start text-gray-400 font-bold">
              6,654$
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-6 ">
            {/* 24h Change */}
            <div className=" text-gray-400">
              <div className="flex items-center justify-start space-x-1">
                <div className="w-[3px] h-3.5 bg-[#01C880] rounded-md"></div>
                <span className="text-white text-base whitespace-nowrap">24h Change</span>
              </div>
              <div className="text-sm text-start text-white">$2,302</div>
            </div>

            {/* 24h Volume */}
            <div className=" text-gray-400">
              <div className="flex items-center justify-start space-x-1">
                <div className="w-[3px] h-3.5 flex-shrink-0 bg-[#01C880] rounded-md"></div>
                <span className="text-white text-base whitespace-nowrap">24h Volume</span>
              </div>
              <div className="text-sm text-start text-white">$2,302,564</div>
            </div>

            {/* Open Interest (L) */}
            <div className=" text-gray-400">
              <div className="flex items-center justify-start space-x-1">
                <div className="w-[3px] h-3.5 bg-[#01C880] rounded-md"></div>
                <span className="text-white text-base whitespace-nowrap">Open Interest (L)</span>
              </div>
              <div className="text-sm text-start text-white">$2,302,564</div>
            </div>

            {/* Open Interest (S) */}
            <div className=" text-gray-400">
              <div className="flex items-center justify-start space-x-1">
                <div className="w-[3px] h-3.5 bg-[#F44141] rounded-md"></div>
                <span className="text-white text-base">Open Interest (S)</span>
              </div>
              <div className="text-sm text-white">$2,302,564</div>
            </div>

            {/* Borrow Fee (L) */}
            <div className=" text-gray-400">
              <div className="flex items-center justify-start space-x-1">
                <div className="w-[3px] h-3.5 bg-[#01C880] rounded-md"></div>
                <span className="text-white text-base">Borrow Fee (L)</span>
              </div>
              <div className="text-sm text-white">$2,302</div>
            </div>

            {/* Borrow Fee (S) */}
            <div className=" text-gray-400">
              <div className="flex items-center justify-start space-x-1">
                <div className="w-[3px] h-3.5 bg-[#F44141] rounded-md"></div>
                <span className="text-white text-base">Borrow Fee (S)</span>
              </div>
              <div className="text-sm text-white">$2,302</div>
            </div>
          </div>
        </div>
        {/* Right Section - Button */}
        <div className="flex w-full md:w-fit justify-between items-center py-4 px-3 rounded-lg bg-[#1B1C39] md:space-x-4 ">
          <div className="text-white font-bold">Enable One-Click Trading</div>
          <button className="bg-blue-500 font-bold text-white px-4 py-2 rounded-lg">
            Deposit
          </button>
        </div>
      </div>
    </>
  );
};

export default Row1;
