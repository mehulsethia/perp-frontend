import { MasterMantisABI, TradeRouterABI } from "../../abi";
import { BaseBtn } from "./baseBtn";
import { BaseBtnCustomToast } from "./baseBtnCustomToast";

interface ICancelDecreaseBtn {
  contract: `0x${string}`;
  orderKey: string;
  setUserUpdate: any;
}

export function CancelDecreaseBtn({ contract, orderKey, setUserUpdate }: ICancelDecreaseBtn) {
  return (
    <BaseBtnCustomToast
      contract={contract}
      abi={TradeRouterABI}
      functionName="cancelDecreasePosition"
      args={[orderKey]}
      btnText={"Cancel"}
      toastTitle="Trigger Cancelled"
      toastDesc="Your trigger order has been removed."
      toastStatus="info"
      setUserUpdate={setUserUpdate}
    />
  );
}
