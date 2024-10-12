import { LiquidityManagerABI, PoolABI } from "../../abi";
import { DEFAULT_DEADLINE } from "../../constants/settings";
import { BaseBtn } from "./baseBtn";

interface IStableWithdrawBtn {
  contract: `0x${string}`;
  token: `0x${string}`;
  otherToken: `0x${string}`;
  recipient: `0x${string}`;
  lpAmount: bigint;
  minAmount: bigint;
  bgColor: string;
  hoverColor: string;
  setUserUpdate: any;
}

export function StableWithdrawBtn({
  contract,
  token,
  otherToken,
  recipient,
  lpAmount,
  minAmount,
  bgColor,
  hoverColor,
  setUserUpdate,
}: IStableWithdrawBtn) {
  const deadline = Math.floor(Date.now() / 1000) + DEFAULT_DEADLINE * 60;
  const txnArgs =
    otherToken == token
      ? [token, recipient, lpAmount, minAmount, deadline]
      : [token, otherToken, recipient, lpAmount, minAmount, deadline];
  return (
    <BaseBtn
      contract={contract}
      abi={PoolABI}
      functionName={otherToken == token ? "withdraw" : "withdrawOther"}
      args={txnArgs}
      btnText={"Withdraw"}
      bgColor={bgColor}
      hoverColor={hoverColor}
      setUserUpdate={setUserUpdate}
    />
  );
}
