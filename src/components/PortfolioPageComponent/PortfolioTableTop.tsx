import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Input,
  HStack,
  VStack,
  Text,
} from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";
// Define types for pool data
interface PoolsData {
  allPools: string[];
  stableCoins: string[];
  lsts: string[];
  lrts: string[];
  myPools: string[];
}

// Mock data for pools (You can replace this with your actual data)
const poolsData: PoolsData = {
  allPools: ["Pool 1", "Pool 2", "Pool 3"],
  stableCoins: ["Stable Coin 1", "Stable Coin 2"],
  lsts: ["LST 1", "LST 2"],
  lrts: ["LRT 1", "LRT 2"],
  myPools: ["My Pool 1"],
};

// Define possible tab names
type TabName = "history" | "stableCoins" | "lsts" | "lrts" | "myPools";

function PortfolioTableTop() {
  // State for active tab and search term
  const [activeTab, setActiveTab] = useState("position");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Function to handle tab click
  const handleTabClick = (tabName: TabName) => {
    setActiveTab(tabName);
  };

  // Filter data based on the active tab and search term
  //   const filteredData = poolsData[activeTab].filter((item) =>
  //     item.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  return (
    <div className="w-full   p-3">
      <div className="flex bg-[#0B0B20]  justify-between items-center px-2 py-2 rounded-3xl  md:space-y-0">
        <div className="flex flex-wrap justify-center items-center bg-[#1B1C39] px-4 py-2 rounded-2xl text-white space-x-2 md:space-x-4">
          {/* Positions Tab */}
          <button
            className={`px-2 py-1  rounded-lg ${
              activeTab === "positions" ? "bg-[#1B1C39]" : ""
            }`}
            onClick={() => setActiveTab("positions")}
          >
            Positions
            <span className="ml-1 bg-[#0B0B20] py-1 rounded-full px-2">1</span>
          </button>
        </div>

        <button className="bg-[#1B1C39] rounded-2xl py-3 px-2  ">
          Clear All Positions
        </button>
      </div>
    </div>
  );
}

export default PortfolioTableTop;
