import React from "react";
import PortfolioHistoryTable from "./PortfolioHistoryTable";

const TradingHistory = () => {
  return (
    <>
      <div className="my-10 px-1">
        <div className="mx-6 md:mx-0 px-2">
          <div className="text-3xl font-bold text-white ">
            Trading History
          </div>
          <div className="pt-5 text-gray-400">
          Shows a record of all past trades, including dates, assets, and execution details.
          </div>
        </div>
        <div className="py-6  my-4">
          {/* <PortfolioTableTop /> */}
          <PortfolioHistoryTable />
        </div>
      </div>
    </>
  );
};

export default TradingHistory;
