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
      <div className="gap-2 grid md:grid-cols-8 h-[calc(100vh-400px)] ">
        {/* Graph And Table Components */}
        <div className=" w-full  my-2 gap-4  rounded-lg space-y-4 md:space-y-1 md:col-span-6">
          <div className="bg-[#1B1C39] h-[400px] overflow-hidden  w-full  grid grid-cols-1 md:grid-cols-8 gap-4 rounded-lg p-2">
            <div className="md:col-span-6">
              <Chart />
            </div>
            <div className="md:col-span-2">
              <TradesList />
            </div>
          </div>
              <TradingPositionsTable />
        </div>

        {/* Side Components */}
        <div className=" flex flex-col md:flex-row md:col-span-2   w-full mt-2  rounded-lg">
          <div className="bg-[#1B1C39]  rounded-3xl   w-full ">
            <LongShort />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartAndList;
