import { XSwapWidget, Config, Theme } from "@xyfinance/widget";

const config: Config = {
  disabledChains: [],
  fromInput: "100",
  fromToken: {
    address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    chainId: "137",
  },
  toToken: {
    address: "0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035",
    chainId: "1101",
  },
  referrer: "0x535A2B0c20DC6E37f61652e7E19E9D9884954c40",
  featuredTokens: [
    {
      address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      chainId: "137",
    },
    {
      address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
      chainId: "137",
    },
    {
      address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
      chainId: "137",
    },
    {
      address: "0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035",
      chainId: "1101",
    },
    {
      address: "0x1E4a5963aBFD975d8c9021ce480b42188849D41d",
      chainId: "1101",
    },
    {
      address: "0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4",
      chainId: "1101",
    },
  ],
};
const theme: Theme = {
  mode: "dark",
  fontFamily: "proxima-nova",
  borderRadius: {
    container: "12px",
    inner: "8px",
    button: "32px",
  },
  colors: {
    primary: "#8653fc",
    gradient: ["#8653fc", "#7128ed"],
  },
  components: {
    button: {
      variant: "gradient",
    },
  },
};

export default function XYSwap() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        margin: "0px auto",
      }}
    >
      <div
        style={{
          width: "480px",
        }}
      >
        <XSwapWidget config={config} theme={theme} />
      </div>
    </div>
  );
}
