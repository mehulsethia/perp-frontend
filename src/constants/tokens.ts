import USDCICON from "../assets/icons/tokens/USDC.svg"
import HONEYICON from "../assets/icons/tokens/HONEY.svg"
import NECTICON from "../assets/icons/tokens/NECT.svg"
import DAIICON from "../assets/tokens/DAI.svg"
import { BERA_CONSTANTS, BLAST_SEPOLIA_CONSTANTS } from "./addresses";
import { ERC20ABI } from "../abi";
// import { OptionBase } from "chakra-react-select";
// import USDCIcon from "../assets/tokens/USDC.svg";
// import USDTIcon from "../assets/tokens/USDT.svg";
// import DAIIcon from "../assets/tokens/DAI.svg";

// export interface TokenOption extends OptionBase {
//   label: string;
//   value: string;
//   icon: string;
// }

// export const tokenOptions: TokenOption[] = [
//   {
//     label: "USDC",
//     value: "usdc",
//     icon: USDCIcon,
//   },
//   {
//     label: "USDT",
//     value: "usdt",
//     icon: USDTIcon,
//   },
//   {
//     label: "DAI",
//     value: "dai",
//     icon: DAIIcon,
//   },
// ];

export const tokenList = ["usdc", "usdt", "dai",];

export interface Token {
    id: number;
    lpId: number;
    plpId: number;
    balance: number;
    allowance: number;
    name: string;
    fullName: string;
    img: string | undefined;
    address: `0x${string}`,
    lpAddress: `0x${string}`,
    plpAddress: `0x${string}`,
    mmAddress: `0x${string}`,
    abi: any
}
interface Tokens {
    [key: number]: Token[];
}

export const tokens: Tokens = {
    80084: [
        {
            id: 0,
            lpId: 1,
            plpId: 4,
            balance: 0,
            allowance: 0,
            name: 'HONEY',
            img: HONEYICON,
            address: BERA_CONSTANTS.HONEY_ADDRESS,
            lpAddress: BERA_CONSTANTS.LP_HONEY_ADDRESS,
            plpAddress: BERA_CONSTANTS.PLP_HONEY_ADDRESS,
            mmAddress: BERA_CONSTANTS.MASTER_MANTIS_ADDRESS,
            abi: ERC20ABI,
            fullName: "Berachain Honey"
        },
        {
            id: 1,
            lpId: 0,
            plpId: 3,
            balance: 0,
            allowance: 0,
            name: 'USDC',
            img: USDCICON,
            address: BERA_CONSTANTS.USDC_ADDRESS,
            lpAddress: BERA_CONSTANTS.LP_USDC_ADDRESS,
            plpAddress: BERA_CONSTANTS.PLP_USDC_ADDRESS,
            mmAddress: BERA_CONSTANTS.MASTER_MANTIS_ADDRESS,
            abi: ERC20ABI,
            fullName: "USD Coin"
        },
        // {
        //     id: 2,
        //     lpId: 2,
        //     plpId: 5,
        //     balance: 0,
        //     allowance: 0,
        //     name: 'NECT',
        //     img: NECTICON,
        //     address: BERA_CONSTANTS.NECT_ADDRESS,
        //     lpAddress: BERA_CONSTANTS.LP_NECT_ADDRESS,
        //     plpAddress: BERA_CONSTANTS.PLP_NECT_ADDRESS,
        //     mmAddress: BERA_CONSTANTS.MASTER_MANTIS_ADDRESS,
        //     abi: ERC20ABI,
        //     fullName: "Beraborrow Nectar"
        // }
    ],
    168587773: [
        {
            id: 0,
            lpId: 1,
            plpId: 4,
            balance: 0,
            allowance: 0,
            name: 'USDT',
            img: USDCICON,
            address: BLAST_SEPOLIA_CONSTANTS.USDT_ADDRESS,
            lpAddress: BLAST_SEPOLIA_CONSTANTS.LP_USDT_ADDRESS,
            plpAddress: BLAST_SEPOLIA_CONSTANTS.PLP_USDT_ADDRESS,
            mmAddress: BLAST_SEPOLIA_CONSTANTS.MASTER_MANTIS_ADDRESS,
            abi: ERC20ABI,
            fullName: 'USDT Coin'
        },
        {
            id: 1,
            lpId: 0,
            plpId: 3,
            balance: 0,
            allowance: 0,
            name: 'USDC',
            img: USDCICON,
            address: BLAST_SEPOLIA_CONSTANTS.USDC_ADDRESS,
            lpAddress: BLAST_SEPOLIA_CONSTANTS.LP_USDC_ADDRESS,
            plpAddress: BLAST_SEPOLIA_CONSTANTS.PLP_USDC_ADDRESS,
            mmAddress: BLAST_SEPOLIA_CONSTANTS.MASTER_MANTIS_ADDRESS,
            abi: ERC20ABI,
            fullName: 'USDC Coin'
        },
        {
            id: 2,
            lpId: 2,
            plpId: 5,
            balance: 0,
            allowance: 0,
            name: 'DAI',
            img: DAIICON,
            address: BLAST_SEPOLIA_CONSTANTS.DAI_ADDRESS,
            lpAddress: BLAST_SEPOLIA_CONSTANTS.LP_DAI_ADDRESS,
            plpAddress: BLAST_SEPOLIA_CONSTANTS.PLP_DAI_ADDRESS,
            mmAddress: BLAST_SEPOLIA_CONSTANTS.MASTER_MANTIS_ADDRESS,
            abi: ERC20ABI,
            fullName: 'DAI Coin'
        },
    ]
}

export const getTokensList = (networkId: number): Token[] => {
    return networkId ? tokens[networkId] : tokens[80084]
}