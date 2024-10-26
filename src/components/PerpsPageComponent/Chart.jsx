import React from "react";
import TradingViewWidget from "react-tradingview-widget";
const Chart = () => {
  return (
    <>
      
      <div className="bg-transparent rounded-lg h-[400px] md:h-full">
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
