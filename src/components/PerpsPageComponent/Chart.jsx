import React from "react";
import TradingViewWidget from "react-tradingview-widget";
const Chart = () => {
  return (
    <>
      <div
        className="bg-transparent rounded-2xl h-[400px] md:h-full overflow-hidden" // Add overflow-hidden here
        style={{ borderRadius: "16px" }} // Optional: Adjust the radius as needed
      >
        <TradingViewWidget
          symbol="ETHUSD"
          theme="dark"
          locale="en"
          interval="15"
          style="1"
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
