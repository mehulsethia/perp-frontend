import React from "react";
import Chart from "./Chart";
import GraphTable from "./GraphTable";
import TableTop from "./TableTop";
import TradingPositionsTable from "./TradingPositionTable";
import TradesList from "./TradesList";
import LongShort from "./LongShort";

const ChartAndList = () => {
  return (
    <>
      <div className="flex gap-2 flex-col md:flex-row ">
        {/* Graph And Table Components */}
        <div className=" w-full  my-4 gap-4 h-full rounded-lg space-y-4">
          <div className="bg-[#1B1C39] w-full grid grid-cols-1 md:grid-cols-8 gap-4 rounded-lg p-2">
            <div className="md:col-span-6 ">
              <Chart />
            </div>
            <div className="md:col-span-2">
              <TradesList />
            </div>
          </div>
          <div>
            <div className="bg-[#1B1C39] w-full h-fit md:h-[40rem]  rounded-lg">
              <TableTop />
              <TradingPositionsTable />
            </div>
          </div>
        </div>

        {/* Side Components */}
        <div className=" flex flex-col md:flex-row justify-between items-center w-full space-y-6 md:space-y-0 gap-1  my-4 rounded-lg">
          <div className="bg-[#1B1C39] rounded-3xl  w-full ">
            <LongShort />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartAndList;
