import { LiquidityManagerABI, PoolABI } from "../../abi";
import { BaseBtn } from "./baseBtn";

interface IPerpWithdrawBtn {
  contract: `0x${string}`;
  token: `0x${string}`;
  otherToken: `0x${string}`;
  recipient: `0x${string}`;
  plpAmount: bigint;
  minAmount: bigint;
  bgColor: string;
  hoverColor: string;
  setUserUpdate: any;
}

export function PerpWithdrawBtn({
  contract,
  token,
  otherToken,
  recipient,
  plpAmount,
  minAmount,
  bgColor,
  hoverColor,
  setUserUpdate,
}: IPerpWithdrawBtn) {
  return (
    <BaseBtn
      contract={contract}
      abi={LiquidityManagerABI}
      functionName="withdraw"
      args={[token, otherToken, recipient, plpAmount, minAmount]}
      btnText={"Withdraw"}
      bgColor={bgColor}
      hoverColor={hoverColor}
      setUserUpdate={setUserUpdate}
    />
  );
}
