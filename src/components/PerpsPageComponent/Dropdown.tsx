import React, { useState } from 'react';

const Dropdown = () => {
  // State to control dropdown visibility
  const [isOpen, setIsOpen] = useState(false);
  // State to hold the selected option
  const [selectedOption, setSelectedOption] = useState('All Markets');

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Function to handle option selection
  const handleOptionClick = (option:any) => {
    console.log(`Selected: ${option}`);
    setSelectedOption(option); // Update selected option
    setIsOpen(false); // Close dropdown after selecting an option
  };

  return (
    <div className="relative inline-block text-left">
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown} // Toggle dropdown on button click
        className="text-white bg-[#2F3055] font-bold focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen} // Control aria-expanded based on state
      >
        {selectedOption} {/* Display selected option */}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && ( // Render dropdown menu based on state
        <div
          id="dropdown"
          className="absolute border left-0 z-10 bg-white divide-y divide-gray-100 rounded-3xl mt-2 shadow w-28 dark:bg-[#28294B] mb-1"
        >
          <ul className="py-2 px-2 space-y-4 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            <li>
              <a
                href="#"
                onClick={() => handleOptionClick('Market 01')}
                className="flex justify-center items-center py-2 hover:bg-gray-100 bg-[#1C1D3A] text-center font-semibold dark:hover:bg-gray-600 dark:hover:text-white rounded-xl"
              >
                Market 01
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => handleOptionClick('Market 02')}
                className="block px-2 py-2 hover:bg-gray-100 bg-[#1C1D3A] text-center font-semibold dark:hover:bg-gray-600 dark:hover:text-white rounded-xl"
              >
                Market 02
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => handleOptionClick('Market 03')}
                className="block px-2 py-2 hover:bg-gray-100 bg-[#1C1D3A] text-center font-semibold dark:hover:bg-gray-600 dark:hover:text-white rounded-xl"
              >
                Market 03
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
