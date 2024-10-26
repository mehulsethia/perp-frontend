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

function TableTop() {
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
    <div className="w-full  px-3 py-1.5">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
        {/* Tab buttons container */}
        <div className="flex flex-wrap justify-center bg-[#0B0B20] px-4 py-1.5 rounded-lg text-white space-x-2 md:space-x-4">
          {/* Positions Tab */}
          <button
            className={`px-4 py-1.5 rounded-lg ${
              activeTab === "positions" ? "bg-[#1B1C39]" : ""
            }`}
            onClick={() => setActiveTab("positions")}
          >
            Positions
            <span className="ml-1 bg-[#0B0B20] py-1 rounded-full px-2">1</span>
          </button>

          {/* Open Orders Tab */}
          <button
            className={`px-4 py-1.5 rounded-lg ${
              activeTab === "orders" ? "bg-[#1B1C39]" : ""
            }`}
            onClick={() => setActiveTab("orders")}
          >
            Open Orders
            <span className="ml-1 bg-[#0B0B20] rounded-full py-1 px-2">0</span>
          </button>

          {/* History Tab */}
          <button
            className={`px-4 py-1.5 rounded-lg ${
              activeTab === "history" ? "bg-[#1B1C39]" : ""
            }`}
            onClick={() => setActiveTab("history")}
          >
            History
          </button>

          {/* Realized PnL Tab */}
          <button
            className={`px-4 py-1.5 rounded-lg ${
              activeTab === "realized" ? "bg-[#1B1C39]" : ""
            }`}
            onClick={() => setActiveTab("realized")}
          >
            RealizedPnL
          </button>
        </div>

        {/* Clear All Positions Button */}
        <button className="bg-[#28294B] rounded-lg p-2 w-full md:w-auto">
          Clear All Positions
        </button>
      </div>
    </div>
  );
}

export default TableTop;
