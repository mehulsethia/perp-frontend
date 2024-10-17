import React from "react";
import Row1 from "../components/PerpsPageComponent/Row1";
import ChartAndList from "../components/PerpsPageComponent/ChartAndList";
import CryptoTicker from "../components/PerpsPageComponent/CryptoTicker";

const Perps = () => {


  return (
    <>
      <div className="m-4">
        <CryptoTicker />
        {/* <Row1 /> */}
        <ChartAndList />
        
      </div>
    </>
  );
};

export default Perps;
