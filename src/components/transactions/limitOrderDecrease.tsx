import { TradeRouterABI } from "../../abi";
import { parseEther } from "viem";
import { BaseBtnCustomToast } from "./baseBtnCustomToast";
import { BaseBtnCustomToastValue } from "./baseBtnCustomToastValue";

interface ILimitOrderDecreaseBtn {
  contract: `0x${string}`;
  assetIndex: number;
  collateral: string;
  executionFee: string;
  slPrice: string;
  tpPrice: string;
  isLong: boolean;
  collateralToken: `0x${string}`;
  profitToken: `0x${string}`;
  setUserUpdate: any;
}

export function LimitOrderDecreaseBtn({
  contract,
  assetIndex,
  collateral,
  executionFee,
  slPrice,
  tpPrice,
  isLong,
  collateralToken,
  profitToken,
  setUserUpdate,
}: ILimitOrderDecreaseBtn) {
  return (
    <BaseBtnCustomToastValue
      contract={contract}
      abi={TradeRouterABI}
      functionName="createDecreasePosition"
      args={[
        assetIndex,
        parseEther(collateral),
        parseEther(executionFee),
        parseEther(slPrice),
        parseEther(tpPrice),
        isLong,
        collateralToken,
        profitToken,
      ]}
      value={parseEther(executionFee)}
      btnText={"Create Trigger Order"}
      toastTitle="Trigger Order Placed"
      toastDesc="Your trigger order was successfully placed."
      toastStatus="success"
      setUserUpdate={setUserUpdate}
    />
  );
}
