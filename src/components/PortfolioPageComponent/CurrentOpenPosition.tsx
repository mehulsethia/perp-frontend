import React from "react";
import TradingPositionsTable from "../PerpsPageComponent/TradingPositionTable";
import PortfolioTableTop from "./PortfolioTableTop";
import PortfolioTradingPositionTable from "./PortfolioTradingPositionTable";

const CurrentOpenPosition = () => {
  return (
    <>
      <div className="my-10 px-1">
        <div className="mx-6 md:mx-0 px-2">
          <div className="text-3xl font-bold text-white ">
            Current Open Position
          </div>
          <div className="pt-5 text-gray-400">
            Displays all current open positions, including asset details,
            quantity, and market value.
          </div>
        </div>
        <div className="py-6 bg-[#1B1C39] rounded-3xl my-4 mx-5 md:mx-0">
          <PortfolioTableTop />
          <PortfolioTradingPositionTable />
        </div>
      </div>
    </>
  );
};

export default CurrentOpenPosition;
