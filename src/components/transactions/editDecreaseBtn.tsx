import { parseEther } from "viem";
import { MasterMantisABI, TradeRouterABI } from "../../abi";
import { BaseBtn } from "./baseBtn";
import { BaseBtnCustomToast } from "./baseBtnCustomToast";

interface IEditDecreaseBtn {
  contract: `0x${string}`;
  orderKey: string;
  newPrice: string;
  setUserUpdate: any;
}

export function EditDecreaseBtn({ contract, orderKey, newPrice, setUserUpdate }: IEditDecreaseBtn) {
  return (
    <BaseBtnCustomToast
      contract={contract}
      abi={TradeRouterABI}
      functionName="editDecreasePosition"
      args={[orderKey, parseEther(newPrice)]}
      btnText={"Update"}
      toastTitle="Trigger Updated"
      toastDesc="Your trigger order has been updated."
      toastStatus="success"
      setUserUpdate={setUserUpdate}
    />
  );
}
