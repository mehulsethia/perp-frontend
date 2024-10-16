import React from "react";
import CustomSlider from "../CustomSlider";

const LeverageSlider = () => {
  return (
    <>
      <div className=" p-1 w-full flex justify-between items-center rounded-xl">
        <div className="text-md">Leverage Slider</div>

        <div className="flex  items-center justify-between space-x-1  bg-[#0B0B20] px-1 py-2 rounded-xl ">
          <button
            className={`px-2 py-1 rounded-xl bg-[#1B1C39] hover:bg-gray-900 hover:text-white   `}
          >
            Leverage
          </button>
          <input className="outline-none text-right w-12 bg-transparent" />
        </div>
      </div>
      <div className="m-1">
      <CustomSlider />
      </div>
    </>
  );
};

export default LeverageSlider;
