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
        <div className=" w-full max-w-5xl my-4  h-full rounded-lg space-y-4">
          <div className="bg-[#1B1C39] rounded-lg p-2 ">
            <Chart />
          </div>
          <div className="bg-[#1B1C39] rounded-lg">
            <TableTop />
            {/* <GraphTable /> */}
            <TradingPositionsTable />
          </div>
        </div>
        {/* Side Components */}
        <div className=" flex flex-col md:flex-row justify-between items-center w-full space-y-6 md:space-y-0 gap-1  my-4 rounded-lg">
          <div className="bg-[#1B1C39] rounded-3xl  md:w-1/2 w-full h-full">
            <TradesList />
          </div>
          <div className="bg-[#1B1C39] rounded-3xl  md:w-1/2 w-full h-full ">
            <LongShort />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartAndList;
