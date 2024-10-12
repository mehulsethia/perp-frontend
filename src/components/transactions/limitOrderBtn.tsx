import { TradeRouterABI } from "../../abi";
import { parseEther } from "viem";
import { BaseBtnCustomToast } from "./baseBtnCustomToast";
import { BaseBtnCustomToastValue } from "./baseBtnCustomToastValue";

interface ILimitOrderBtn {
  contract: `0x${string}`;
  assetIndex: number;
  collateral: string;
  multiplier: number;
  executionPrice: string;
  executionFee: string;
  slPrice: string;
  tpPrice: string;
  isLong: boolean;
  collateralToken: `0x${string}`;
  profitToken: `0x${string}`;
  setUserUpdate: any;
}

export function LimitOrderBtn({
  contract,
  assetIndex,
  collateral,
  multiplier,
  executionPrice,
  executionFee,
  slPrice,
  tpPrice,
  isLong,
  collateralToken,
  profitToken,
  setUserUpdate,
}: ILimitOrderBtn) {
  return (
    <BaseBtnCustomToastValue
      contract={contract}
      abi={TradeRouterABI}
      functionName="createIncreasePosition"
      args={[
        assetIndex,
        parseEther(collateral),
        BigInt((multiplier * 100).toFixed(0)),
        parseEther(executionPrice),
        parseEther(executionFee),
        parseEther(slPrice),
        parseEther(tpPrice),
        isLong,
        collateralToken,
        profitToken,
      ]}
      value={parseEther(executionFee)}
      btnText={isLong ? "CREATE LONG ORDER" : "CREATE SHORT ORDER"}
      toastTitle="Limit Order Placed"
      toastDesc="Your limit order was successfully placed."
      toastStatus="success"
      setUserUpdate={setUserUpdate}
    />
  );
}
