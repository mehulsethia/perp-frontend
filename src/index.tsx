import "./polyfills";
import {
  ChakraProvider,
  ColorModeScript,
  extendTheme,
  theme as base,
  type ThemeConfig,
  defineStyleConfig,
} from "@chakra-ui/react";

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider, darkTheme, Chain } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygon, polygonZkEvm, modeTestnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import "./index.css";
import beraImg from "./assets/icons/tokens/bera.png";

const blastSepolia: Chain = {
  id: 168587773,
  name: "Blast Sepolia",
  network: "blast_sepolia",
  iconUrl: "",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: ["https://sepolia.blast.io"] },
    default: { http: ["https://sepolia.blast.io"] },
  },
  blockExplorers: {
    default: { name: "Blastscan", url: "https://testnet.blastscan.io" },
    etherscan: { name: "Blastscan", url: "https://testnet.blastscan.io" },
  },
  contracts: {
    multicall3: {
      address: "0xb30957a0A0A1a179673DbDD860b0b9b05298F155",
      blockCreated: 742682,
    },
  },
  testnet: true,
};

const beraTestnet: Chain = {
  id: 80084,
  name: "Bartio Testnet",
  network: "bera_testnet",
  iconUrl: beraImg,
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Bera",
    symbol: "BERA",
  },
  rpcUrls: {
    public: { http: ["https://bartio.rpc.berachain.com/"] },
    default: { http: ["https://bartio.rpc.berachain.com/"] },
  },
  blockExplorers: {
    default: { name: "Blastscan", url: "https://bartio.beratrail.io" },
    etherscan: { name: "Blastscan", url: "https://bartio.beratrail.io" },
  },
  contracts: {
    multicall3: {
      address: "0x7aC31D179e255dCE14592C1B8481B6206Fe0A6c9",
      blockCreated: 5139693,
    },
  },
  testnet: true,
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    beraTestnet,
    //  polygon, polygonZkEvm, modeTestnet,
    // blastSepolia,
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Mantissa Finance",
  projectId: "7a51c26cd362b628a0a2e68532ee9eb7",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  // webSocketPublicClient,
});

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const tooltipTheme = defineStyleConfig({
  baseStyle: {
    bgColor: "#28294B",
    color: "white",
  },
});

const theme = extendTheme({
  components: {
    Tooltip: tooltipTheme,
  },
  fonts: {
    heading: `'SF PRO', ${base.fonts?.heading}, sans-serif`,
    body: `'SF PRO', ${base.fonts?.body}, sans-serif`,
  },
  config,
});

root.render(
  <React.StrictMode>
    <ColorModeScript />
    <WagmiConfig config={wagmiConfig}>
      <ChakraProvider theme={theme}>
        <RainbowKitProvider chains={chains} theme={darkTheme()}>
          <App />
        </RainbowKitProvider>
      </ChakraProvider>
    </WagmiConfig>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
