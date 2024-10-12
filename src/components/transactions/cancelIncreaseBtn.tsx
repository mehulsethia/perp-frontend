import { MasterMantisABI, TradeRouterABI } from "../../abi";
import { BaseBtn } from "./baseBtn";
import { BaseBtnCustomToast } from "./baseBtnCustomToast";

interface ICancelIncreaseBtn {
  contract: `0x${string}`;
  orderKey: string;
  setUserUpdate: any;
}

export function CancelIncreaseBtn({ contract, orderKey, setUserUpdate }: ICancelIncreaseBtn) {
  return (
    <BaseBtnCustomToast
      contract={contract}
      abi={TradeRouterABI}
      functionName="cancelIncreasePosition"
      args={[orderKey]}
      btnText={"Cancel"}
      toastTitle="Order Cancelled"
      toastDesc="Your limit order has been cancelled."
      toastStatus="info"
      setUserUpdate={setUserUpdate}
    />
  );
}
