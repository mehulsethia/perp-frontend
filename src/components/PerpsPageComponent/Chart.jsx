import React from "react";
import TradingViewWidget from "react-tradingview-widget";
const Chart = () => {
  return (
    <>
      <div className="text-white text-lg p-4  font-bold flex gap-4 items-center">
        <div className="w-[3px] h-3.5 bg-[#01C880] rounded-md"></div>
        Ethereum — USD(Dollar)
      </div>
      <div className="h-[500px] bg-transparent my-4 rounded-lg">
        <TradingViewWidget
          symbol="ETHUSD"
          theme="dark"
          locale="en"
          interval="15"
          style="1" // Style can be set to 1 for a candlestick chart
          hide_side_toolbar={false}
          enable_publishing={false}
          allow_symbol_change={true}
          autosize
        />
      </div>
    </>
  );
};

export default Chart;
