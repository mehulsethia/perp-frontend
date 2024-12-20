import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Input,
  HStack,
  VStack,
  Text,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";
import { Search2Icon } from "@chakra-ui/icons";
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
type TabName = "allPools" | "stableCoins" | "lsts" | "lrts" | "myPools";

function PoolSearchBar() {
  // State for active tab and search term
  const [activeTab, setActiveTab] = useState<TabName>("allPools");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Function to handle tab click
  const handleTabClick = (tabName: TabName) => {
    setActiveTab(tabName);
  };

  // Filter data based on the active tab and search term
  const filteredData = poolsData[activeTab].filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col  w-full max-w-7xl md:flex-row justify-between items-center py-3 gap-4 md:gap-14">
        {/* Button Group for Tabs */}
        <HStack
          className="bg-[#28294B] px-2 py-1.5 rounded-xl w-full md:w-auto flex-wrap md:flex-nowrap justify-center space-x-1"
          spacing={["0", "1"]} // Remove spacing on very small screens, then add it back
        >
          <Button
            fontSize={["xs", "sm"]} // Smaller font size on mobile
            color="white"
            bg={activeTab === "allPools" ? "#0B0B20" : ""}
            _hover={{ bg: "#0B0B20" }}
            borderRadius="lg"
            whiteSpace="nowrap"
            flexShrink={0}
            onClick={() => handleTabClick("allPools")}
          >
            All Pools
          </Button>
          <Button
            fontSize={["xs", "sm"]}
            color="white"
            bg={activeTab === "stableCoins" ? "#0B0B20" : ""}
            _hover={{ bg: "#0B0B20" }}
            borderRadius="lg"
            whiteSpace="nowrap"
            flexShrink={0}
            onClick={() => handleTabClick("stableCoins")}
          >
            Stable Coins
          </Button>
          <Button
            fontSize={["xs", "sm"]}
            color="white"
            bg={activeTab === "lsts" ? "#0B0B20" : ""}
            _hover={{ bg: "#0B0B20" }}
            borderRadius="lg"
            whiteSpace="nowrap"
            flexShrink={0}
            onClick={() => handleTabClick("lsts")}
          >
            LSTs
          </Button>
          <Button
            fontSize={["xs", "sm"]}
            color="white"
            bg={activeTab === "lrts" ? "#0B0B20" : ""}
            _hover={{ bg: "#0B0B20" }}
            borderRadius="lg"
            whiteSpace="nowrap"
            flexShrink={0}
            onClick={() => handleTabClick("lrts")}
          >
            LRTs
          </Button>
          <Button
            fontSize={["xs", "sm"]}
            color="white"
            bg={activeTab === "myPools" ? "#0B0B20" : ""}
            _hover={{ bg: "#0B0B20" }}
            borderRadius="lg"
            whiteSpace="nowrap"
            flexShrink={0}
            onClick={() => handleTabClick("myPools")}
          >
            My Pools
          </Button>
        </HStack>

        {/* Search Bar */}
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="white" className="mt-2" />
          </InputLeftElement>
          <Input
            placeholder="Search by name or address"
            bg="#28294B"
            color="white"
            borderRadius={"0.8rem"}
            py={6}
            className="w-full md:w-auto border"
            _placeholder={{ color: "whiteAlpha.600" }}
            _focus={{ outline: "none", boxShadow: "none" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </div>

      {/* Displaying filtered content */}
      {/* <VStack
        alignItems="flex-start"
        p={4}
        bg="#131127"
        borderRadius="8px"
        w="full"
      >
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <Text key={index} color="white">
              {item}
            </Text>
          ))
        ) : (
          <Text color="whiteAlpha.700">No results found</Text>
        )}
      </VStack> */}
    </div>
  );
}

export default PoolSearchBar;
