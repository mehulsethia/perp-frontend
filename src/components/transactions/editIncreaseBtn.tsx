import { parseEther } from "viem";
import { MasterMantisABI, TradeRouterABI } from "../../abi";
import { BaseBtn } from "./baseBtn";
import { BaseBtnCustomToast } from "./baseBtnCustomToast";

interface IEditIncreaseBtn {
  contract: `0x${string}`;
  orderKey: string;
  newPrice: string;
  setUserUpdate: any;
}

export function EditIncreaseBtn({ contract, orderKey, newPrice, setUserUpdate }: IEditIncreaseBtn) {
  return (
    <BaseBtnCustomToast
      contract={contract}
      abi={TradeRouterABI}
      functionName="editIncreasePosition"
      args={[orderKey, parseEther(newPrice)]}
      btnText={"Update"}
      toastTitle="Order Updated"
      toastDesc="Your limit order has been updated."
      toastStatus="success"
      setUserUpdate={setUserUpdate}
    />
  );
}
