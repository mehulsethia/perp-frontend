import {
  Box,
  Image,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  Text,
  Spacer,
  Input,
} from "@chakra-ui/react";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { PairOption } from "../constants/pairs";
import { useEffect, useRef, useState } from "react";

interface IPairSelect {
  options: PairOption[];
  pair: PairOption;
  setPairIndex: any;
  minW?: any;
}

const SearchInput = ({ query, setQuery }: { query: string; setQuery: any }) => {
  return (
    <HStack key={"search"}>
      <SearchIcon />
      <Input
        autoFocus={true}
        value={query}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => {
          e.stopPropagation();
          setQuery(e.target.value.toLowerCase());
        }}
      />
    </HStack>
  );
};

export default function PairSelect({ options, pair, setPairIndex, minW }: IPairSelect) {
  const [query, setQuery] = useState<string>("");

  const selectMenuItem = (index: number) => {
    setQuery("");
    setPairIndex(index);
  };

  return (
    <Menu autoSelect={false}>
      <MenuButton minW={minW ? minW : "108px"} as={Button} px={"2px"} bgColor={"#0d152c"}>
        <HStack w={"90%"} ml={1}>
          <Image boxSize={"24px"} src={pair.icon} />
          <Text>{pair.label}</Text>
          <Spacer />
          <ChevronDownIcon />
        </HStack>
      </MenuButton>
      <MenuList>
        <MenuItem closeOnSelect={false}>
          <SearchInput query={query} setQuery={setQuery} />
        </MenuItem>
        {options
          .filter((item) => item.label.toLowerCase().includes(query))
          .map((item, index) => (
            <MenuItem key={index} onClick={(e) => selectMenuItem(item.index)}>
              <Image boxSize={"28px"} src={item.icon} mr={"10px"} />
              <span>{item.label}</span>
            </MenuItem>
          ))}
      </MenuList>
    </Menu>
  );
}
