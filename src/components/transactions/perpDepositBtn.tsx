import { LiquidityManagerABI, PoolABI } from "../../abi";
import { BaseBtn } from "./baseBtn";

interface IPerpDepositBtn {
  contract: `0x${string}`;
  token: `0x${string}`;
  recipient: `0x${string}`;
  amount: bigint;
  stake: boolean;
  isLp: boolean;
  bgColor: string;
  hoverColor: string;
  setUserUpdate: any;
}

export function PerpDepositBtn({
  contract,
  token,
  recipient,
  amount,
  stake,
  isLp,
  bgColor,
  hoverColor,
  setUserUpdate,
}: IPerpDepositBtn) {
  return (
    <BaseBtn
      contract={contract}
      abi={LiquidityManagerABI}
      functionName="deposit"
      args={[token, recipient, amount, stake, isLp]}
      btnText={stake ? "Deposit & Stake" : "Deposit"}
      bgColor={bgColor}
      hoverColor={hoverColor}
      setUserUpdate={setUserUpdate}
    />
  );
}
