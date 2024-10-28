import React, { useState } from 'react';

interface DropdownProps {
  options: string[]; // Array of options to be passed
  defaultOption?: string; // Optional default option
}

const Dropdown: React.FC<DropdownProps> = ({ options, defaultOption = 'All Markets' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Handle option selection
  const handleOptionClick = (option: string) => {
    console.log(`Selected: ${option}`);
    setSelectedOption(option); // Update selected option
    setIsOpen(false); // Close dropdown after selecting an option
  };

  return (
    <div className="relative inline-block text-left">
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="text-white   font-bold focus:outline-none rounded-lg text-sm px-1 py-2.5 text-center inline-flex items-center"
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {selectedOption}
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
      {isOpen && (
        <div
          id="dropdown"
          className="absolute border left-0 z-10  divide-y  rounded-3xl mt-2 shadow w-[8rem] bg-[#28294B] mb-1"
        >
          <ul className="py-2 px-2 space-y-4 text-sm text-gray-300 " aria-labelledby="dropdownDefaultButton">
            {options.map((option, index) => (
              <li key={index}>
                <a
                  href="#"
                  onClick={() => handleOptionClick(option)}
                  className="flex justify-center items-center py-2  bg-[#1C1D3A] text-center font-semibold hover:bg-[#0B0B20] hover:text-white rounded-xl"
                >
                  {option}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
