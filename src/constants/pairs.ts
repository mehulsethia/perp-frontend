import { OptionBase } from "chakra-react-select";
import SolanaIcon from "../assets/networks/solana-logo.svg";
import MaticIcon from "../assets/networks/matic-icon.png";
import EthereumIcon from "../assets/networks/ethereum.svg";
import BitcoinIcon from "../assets/networks/bitcoin.svg";

export interface PairOption extends OptionBase {
  index: number;
  assetIndex: number;
  label: string;
  binanceSymbol: string;
  tvSymbol: string;
  borrowFee: number;
  icon: string;
  feedId: string[];
  isPair: boolean;
}

export const pairOptions: PairOption[] = [
  {
    index: 0,
    assetIndex: 1,
    label: "BTC/USD",
    binanceSymbol: "BTCUSDT",
    tvSymbol: "PYTH:BTCUSD",
    borrowFee: 0.0036,
    icon: BitcoinIcon,
    feedId: ["0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43"],
    isPair: false,
  },
  {
    index: 1,
    assetIndex: 2,
    label: "ETH/USD",
    binanceSymbol: "ETHUSDT",
    tvSymbol: "PYTH:ETHUSD",
    borrowFee: 0.0036,
    icon: EthereumIcon,
    feedId: ["0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace"],
    isPair: false,
  },
  {
    index: 2,
    assetIndex: 3,
    label: "MATIC/USD",
    binanceSymbol: "MATICUSDT",
    tvSymbol: "PYTH:MATICUSD",
    borrowFee: 0.0036,
    icon: MaticIcon,
    feedId: ["0x5de33a9112c2b700b8d30b8a3402c103578ccfa2765696471cc672bd5cf6ac52"],
    isPair: false,
  },
  {
    index: 3,
    assetIndex: 4,
    label: "SOL/USD",
    binanceSymbol: "SOLUSDT",
    tvSymbol: "PYTH:SOLUSD",
    borrowFee: 0.0036,
    icon: SolanaIcon,
    feedId: ["0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d"],
    isPair: false,
  },
  {
    index: 4,
    assetIndex: 5,
    label: "ETH/SOL",
    binanceSymbol: "ETHUSDT,SOLUSDT",
    tvSymbol: "PYTH:ETHUSD/PYTH:SOLUSD",
    borrowFee: 0.0036,
    icon: EthereumIcon,
    feedId: [
      "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
      "0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d",
    ],
    isPair: true,
  },
];
