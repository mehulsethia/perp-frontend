import React from "react";
import ArrowBackIcon from "../assets/icons/Arrow_Back.svg";
import ETH from "../assets/icons/ethereum.png";
import Open from "../assets/icons/open.png";
import { Image, Text, Tooltip } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { InfoOutlineIcon } from "@chakra-ui/icons";
const PoolDetailsStart = () => {
  return (
    <>
      <div className="container mx-auto mt-12  ">
        <div className="m-4">
          <Link to="/pools">
            <button className="bg-[#1B1C39] flex justify-center items-center w-20 p-2 rounded-xl space-x-2">
              <Image alt="Swap" src={ArrowBackIcon} cursor={"pointer"} />{" "}
              <div>Back</div>
            </button>
          </Link>
        </div>
        <div className="bg-[#1B1C39] mt-10 mx-2   rounded-2xl p-3 ">
          <div className="mx-2 my-1 flex flex-col">
            <div className="bg-[#28294B] w-36 border flex flex-row justify-center items-center p-2 space-x-2 rounded-xl ">
              <Image w={8} h={8} alt="Swap" src={ETH} cursor={"pointer"} />
              <div className="text-xl">Bitcoin</div>
            </div>
            {/* List Start Here */}
            <div className="py-4 flex flex-col md:justify-between md:flex-row  space-y-4  ">
              <div className=" flex flex-col">
                {/* Execution Buffer Div */}
                <div className="flex flex-col md:flex-row space-y-4  md:space-x-2">
                  <div className="flex justify-start px-1 items-center space-x-2 mt-4">
                    <Text className="font-semibold" fontSize={"0.875rem"}>
                      Liquidity Ratio
                    </Text>
                    <Tooltip
                      label="Execution fees premium that will be applied on limit orders. If this is too low then orders may not execute on time"
                      fontSize="sm"
                    >
                      <InfoOutlineIcon w={3} h={3} />
                    </Tooltip>
                    <Text
                      fontSize={"0.85rem"}
                      cursor={"pointer"}
                      fontWeight={400}
                      borderRadius={"0.375rem"}
                      px={"0.375rem"}
                      h="1.5rem"
                      display={"flex"}
                      alignItems={"center"}
                      _hover={{ opacity: 0.9 }}
                      className="ml-2.5 md:ml-0 bg-[#008D5B33] text-[#30E0A1]"
                    >
                      75%
                    </Text>
                  </div>
                  {/* Pool Fee Div */}
                  <div className="px-2 w-fit   bg-[#28294B] flex  space-x-3 items-center rounded-xl  py-2">
                    <div
                      className="bg-[#1B1C39]  font-semibold flex space-x-2 px-2 py-1  rounded-lg "
                    >
                      <div>Pool Fee </div>

                      <div>
                        <Tooltip
                          label="Execution fees premium that will be applied on limit orders. If this is too low then orders may not execute on time"
                          fontSize="sm"
                        >
                          <InfoOutlineIcon w={3} h={3} />
                        </Tooltip>
                      </div>
                    </div>
                    <div className="text-white font-semibold">0.5%</div>
                  </div>
                  <div className="bg-[#28294B]"></div>
                  {/* Token Contarct Div */}
                  <div>
                    <div className="px-2 w-full  bg-[#28294B] flex justify-center items-center space-x-2 rounded-xl  py-2">
                      <div
                        className="bg-[#1B1C39] font-semibold flex justify-center items-center
                     px-4 py-1 rounded-lg gap-1"
                      >
                        Token Contract{" "}
                        <Tooltip
                          label="Execution fees premium that will be applied on limit orders. If this is too low then orders may not execute on time"
                          fontSize="sm"
                        >
                          <InfoOutlineIcon w={3} h={3} />
                        </Tooltip>
                      </div>
                      <div className="flex justify-center items-center">
                        <Text
                          fontSize={"0.85rem"}
                          cursor={"pointer"}
                          fontWeight={400}
                          borderRadius={"0.375rem"}
                          px={"0.375rem"}
                          h="1.9rem"
                          display={"flex"}
                          alignItems={"center"}
                          _hover={{ opacity: 0.9 }}
                          className="ml-2.5 md:ml-0 bg-[#008D5B33] text-[#30E0A1]"
                        >
                          0x4b20....2C02db{" "}
                          <Image
                            w={8}
                            h={4}
                            alt="Swap"
                            src={Open}
                            cursor={"pointer"}
                            className="px-2"
                          />
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-4 justify-center pt-4 md:py-0 items-center">
                <div>
                  <button className="bg-blue-500 px-5 py-2 rounded-xl font-semibold">
                    Deposit
                  </button>
                </div>
                <div>
                  <button className="bg-[#28294B] px-5 py-2  rounded-xl font-semibold">
                    Withdraw
                  </button>
                </div>
                <div>
                  <button className="bg-[#28294B] px-5 py-2 rounded-xl font-semibold">
                    Rebalance
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PoolDetailsStart;
