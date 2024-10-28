import React, { useState } from "react";

const MarketLimit = () => {
  const [selected, setSelected] = useState("Market");

  const handleClick = (poolType:any) => {
    setSelected(poolType);
  };

  return (
    <>
      
    </>
  );
};

export default MarketLimit;
