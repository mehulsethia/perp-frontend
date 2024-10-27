import React, { useState } from "react";
import {
  Box,
  HStack,
  Image,
  Spacer,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import CardLineIcon from "../assets/icons/Card-line.svg";

import CustomBarChart from "./CustomBarChart";
import PerpetualPoolsInstance from "./PerpetualPoolsInstance";
import SpotPoolInstance from "./SpotPoolInstance";

const PerpetualPools = () => {
  const bg = useColorModeValue("white", "#1B1C39");
  const tableBg = useColorModeValue("white", "#28294B");
  const boxBg = useColorModeValue("white", "#0B0B20");
  const borderColor = useColorModeValue(
    "blackAlpha.300",
    "rgba(255, 255, 255, 0.07)"
  );
  const color = useColorModeValue("blackAlpha.900", "white");
  const lightColor = useColorModeValue(
    "blackAlpha.600",
    "rgba(255, 255, 255, 0.6)"
  );
  const greenBGColor = useColorModeValue("whiteAlpha.900", "#008D5B33");
  const greenColor = useColorModeValue("whiteAlpha.900", "#30E0A190");
  const lightButtonBg = useColorModeValue(
    "blackAlpha.300",
    "rgba(255, 255, 255, 0.05)"
  );
  const buttonBgColor = useColorModeValue("blackAlpha.800", "#0080FF");

  const [selected, setSelected] = useState("Volume");
  const [days, setDays] = useState("7 Days");
  const handleClick = (poolType: any) => {
    setSelected(poolType);
  };

  const handleDaysChange = (event: any) => {
    setDays(event.target.value);
  };

  return (
    <>
      <div className=" my-3 p-2 md:p-0">
        <div className="flex flex-col md:space-x-3  md:flex-row ">
          <div className="rounded-3xl ">
            <PerpetualPoolsInstance />
          </div>
          {/* Custom Chart */}
          <div className="rounded-3xl  border w-full  flex flex-col  justify-between my-4 md:my-0 items-center  bg-[#1B1C39] ">
            <div className="py-6  px-9 w-full flex flex-col md:flex-row justify-between space-y-6 md:space-y-0   md:items-center  ">
              <div className="font-extrabold text-4xl md:text-3xl ">
                $123,666,000
              </div>
              <div className="flex justify-between items-center  space-x-3">
                <div>
                  <div className=" py-1 w-full flex justify-start md:justify-between md:items-center rounded-xl">
                    <div className="flex  items-center justify-between space-x-1  bg-[#0B0B20] px-1 py-1 rounded-xl ">
                      <button
                        onClick={() => handleClick("Volume")}
                        className={`px-2 py-1 rounded-xl   transition-colors ${
                          selected === "Volume"
                            ? "bg-[#2F3055] text-white"
                            : "bg-transparent text-white"
                        } hover:bg-gray-900 hover:text-white`}
                      >
                        Volume
                      </button>
                      <button
                        onClick={() => handleClick("TVL")}
                        className={`px-2 py-1 rounded-xl  transition-colors ${
                          selected === "TVL"
                            ? "bg-[#2F3055] text-white"
                            : "bg-transparent text-white"
                        } hover:bg-gray-900 hover:text-white`}
                      >
                        TVL
                      </button>
                      <button
                        onClick={() => handleClick("Fees")}
                        className={`px-2 py-1 rounded-xl  transition-colors ${
                          selected === "Fees"
                            ? "bg-[#2F3055] text-white"
                            : "bg-transparent text-white"
                        } hover:bg-gray-900 hover:text-white`}
                      >
                        Fees
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <div className=" py-1 w-full flex justify-between items-center rounded-xl">
                      <div className="flex  items-center justify-between space-x-1  bg-[#0B0B20] px-1 py-1 rounded-xl ">
                        <button
                          className={`px-2 py-1 rounded-xl bg-[#2F3055]   `}
                        >
                          Time
                        </button>
                        <div className="relative">
                          <select
                            value={days}
                            onChange={handleDaysChange}
                            className="px-2 py-1 bg-[#0B0B20] text-white rounded-xl border-none cursor-pointer focus:outline-none"
                          >
                            <option value="7 Days">7 Days</option>
                            <option value="14 Days">14 Days</option>
                            <option value="30 Days">30 Days</option>
                            <option value="90 Days">90 Days</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full max-w-5xl flex justify-center items-center">
              <CustomBarChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PerpetualPools;
