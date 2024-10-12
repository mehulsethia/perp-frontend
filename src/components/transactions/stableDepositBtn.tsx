import { PoolABI } from "../../abi";
import { DEFAULT_DEADLINE } from "../../constants/settings";
import { BaseBtn } from "./baseBtn";

interface IStableDepositBtn {
  contract: `0x${string}`;
  token: `0x${string}`;
  recipient: `0x${string}`;
  amount: bigint;
  autoStake: boolean;
  bgColor?: string;
  hoverColor?: string;
  setUserUpdate: any;
  setDepositLoading?: any;
}

export function StableDepositBtn({
  contract,
  token,
  recipient,
  amount,
  autoStake,
  bgColor,
  hoverColor,
  setUserUpdate,
  setDepositLoading,
}: IStableDepositBtn) {
  const deadline = Math.floor(Date.now() / 1000) + DEFAULT_DEADLINE * 60;

  return (
    <BaseBtn
      contract={contract}
      abi={PoolABI}
      functionName="deposit"
      args={[token, recipient, amount, autoStake, deadline]}
      btnText={autoStake ? "Deposit & Stake" : "Deposit"}
      bgColor={bgColor}
      hoverColor={hoverColor}
      setUserUpdate={setUserUpdate}
      setDepositLoading={setDepositLoading}
    />
  );
}
