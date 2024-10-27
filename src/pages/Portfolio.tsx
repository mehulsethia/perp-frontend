import React from "react";
import PositionAndGraph from "../components/PortfolioPageComponent/PositionAndGraph";
import CurrentOpenPosition from "../components/PortfolioPageComponent/CurrentOpenPosition";
import TradingHistory from "../components/PortfolioPageComponent/TradingHistory";
import VolumeChart from "../components/PortfolioPageComponent/VolumeChart";

const Portfolio = () => {
  return (
    <>
      <div className=" md:mx-20 my-20">
        <PositionAndGraph />
        <CurrentOpenPosition />
        <TradingHistory />
      </div>
    </>
  );
};

export default Portfolio;
