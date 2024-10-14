import * as React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Trade from "./pages/Trade";
import Navbar from "./components/navbar";
import Pools from "./pages/Pools";
import Lock from "./pages/Lock";
import TokenDetail from "./pages/TokenDetail";
import Swap from "./pages/Swap";
import Vote from "./pages/Vote";
import Bridge from "./pages/Bridge";
import Faucet from "./pages/Faucet";
import Footer from "./components/footer";
import Perps from "./pages/Perps";
import PoolsRebalance from "./pages/PoolsRebalance";
import DepositLiquidity from "./pages/DepositLiquidity";
import WithdrawLiquidity from "./pages/WithdrawLiquidity";

export const App = () => {
  const bg = useColorModeValue("whiteAlpha.900", "#0B0B20");

  return (
    <BrowserRouter>
      <Box minHeight={"100vh"} display={"grid"} gridTemplateRows={"auto 1fr auto"} bgColor={bg}>
        <Navbar />
        <Routes>
          <Route path="/swap" element={<Swap />} />
          <Route path="/pools" element={<Pools />} />
          <Route path="/pools-rebalance" element={<PoolsRebalance />} />
          <Route path="/deposit-liquidity" element={<DepositLiquidity />} />
          <Route path="/withdraw-liquidity" element={<WithdrawLiquidity />} />
          <Route path="/pools/:token" element={<TokenDetail />} />
          <Route path="/lock" element={<Lock />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/bridge" element={<Bridge />} />
          <Route path="/faucet" element={<Faucet />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/perps" element={<Perps />} />
          <Route path="/*" element={<Swap />} />
        </Routes>
        <Footer />
      </Box>
    </BrowserRouter>
  );
};
