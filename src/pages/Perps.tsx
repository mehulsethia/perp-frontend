import React from "react";
import Row1 from "../components/PerpsPageComponent/Row1";
import ChartAndList from "../components/PerpsPageComponent/ChartAndList";
import CryptoTicker from "../components/PerpsPageComponent/CryptoTicker";
import CryptoDropdown from "../components/PerpsPageComponent/CryptoNavigation";

const Perps = () => {


  return (
    <>
      <div className="mx-4 my-2 ">
        <CryptoTicker />
        {/* <Row1 /> */}
        <ChartAndList />
        
      </div>
    </>
  );
};

export default Perps;
