import React, { useState } from "react";

const CryptoDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCoin, setSelectedCoin] = useState("Select Market");

  // Dummy data for multiple cryptocurrencies
  const cryptoData = [
    { name: "Bitcoin", percentChange: "0.3%", price: "$580K", change24h: "30%", volume: "$580K", openInterest: "$580K" },
    { name: "Ethereum", percentChange: "0.5%", price: "$2K", change24h: "20%", volume: "$900K", openInterest: "$1M" },
    { name: "Cardano", percentChange: "1.2%", price: "$1.2", change24h: "10%", volume: "$400K", openInterest: "$500K" },
    { name: "Dogecoin", percentChange: "-0.1%", price: "$0.1", change24h: "-5%", volume: "$300K", openInterest: "$400K" },
    { name: "Solana", percentChange: "0.7%", price: "$35", change24h: "15%", volume: "$250K", openInterest: "$350K" },
    { name: "Solana", percentChange: "0.7%", price: "$35", change24h: "15%", volume: "$250K", openInterest: "$350K" },
    { name: "Solana", percentChange: "0.7%", price: "$35", change24h: "15%", volume: "$250K", openInterest: "$350K" },
    { name: "Solana", percentChange: "0.7%", price: "$35", change24h: "15%", volume: "$250K", openInterest: "$350K" },
  ];

  const categories = [
    "All", "Recently Listed", "AI", "Meme", "DeFi", "RWA", "Gaming", "Layer 0", "Layer 1",
    "Layer 2", "Layer 3", "Layer 4", "Layer 5", "Layer 6", "Layer 8"
  ];

  // Handler to set selected coin
  const handleCoinSelect = (coinName:string) => {
    setSelectedCoin(coinName);
    setIsOpen(false); // Close the dropdown when a coin is selected
  };

  return (
    <div className="relative w-full max-w-[68rem] z-50 h-fit">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between  p-3 rounded-lg text-gray-100 hover:bg-[#0B0B20]"
      >
        <span className="font-bold">{selectedCoin}</span>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="fixed md:top-[19.5%] top-[14.5%] left-[50%] md:left-[28%] transform -translate-x-1/2 w-full max-w-[65rem] bg-[#2F3055] rounded-3xl border shadow-lg z-50 ">
          {/* Search Bar */}
          <div className="relative p-4">
            <input
              type="text"
              className="w-full bg-[#1B1C39] px-4 py-2 rounded-lg pl-10 text-gray-100"
              placeholder="Search by name or address"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute left-7 top-[20px] md:top-[27px] h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-1.5 px-4 pb-4">
            {categories.map((category) => (
              <button
                key={category}
                className="px-3 py-1.5 text-sm rounded-md bg-[#1B1C39] text-gray-400 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 px-4 py-4 border-b rounded-t-2xl bg-[#1B1C39] border-gray-800 text-sm text-gray-400">
            <div>Market</div>
            <div>Price</div>
            <div>24h</div>
            <div>Volume (24hrs)</div>
            <div>Open Interest</div>
          </div>

          {/* Table Content */}
          <div className="max-h-[25rem] overflow-y-auto">
            {cryptoData
              .filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleCoinSelect(item.name)}
                  className="grid grid-cols-5 gap-4 px-4 py-4 border-b border-gray-800 bg-[#0B0B20] items-center hover:bg-gray-800/50 text-gray-100 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                      <span className="text-xl">₿</span>
                    </div>
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-green-400 text-sm">
                        {item.percentChange}
                      </div>
                    </div>
                  </div>
                  <div>{item.price}</div>
                  <div className="text-green-400">{item.change24h}</div>
                  <div>{item.volume}</div>
                  <div>{item.openInterest}</div>
                </div>
              ))}
          </div>

          {/* Load More Button */}
          <button className="w-full text-center py-3 text-gray-400 hover:text-gray-300 border-t border-gray-800">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default CryptoDropdown;
