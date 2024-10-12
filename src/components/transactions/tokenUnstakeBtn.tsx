import { MasterMantisABI } from "../../abi";
import { BaseBtn } from "./baseBtn";

interface ITokenUnstakeBtn {
  contract: `0x${string}`;
  _pid: number;
  _amount: bigint;
  bgColor: string;
  hoverColor: string;
  setUserUpdate: any;
}

export function TokenUnstakeBtn({ contract, _pid, _amount, bgColor, hoverColor, setUserUpdate }: ITokenUnstakeBtn) {
  return (
    <BaseBtn
      contract={contract}
      abi={MasterMantisABI}
      functionName="withdraw"
      args={[BigInt(_pid), _amount]}
      btnText={"Unstake"}
      bgColor={bgColor}
      hoverColor={hoverColor}
      setUserUpdate={setUserUpdate}
    />
  );
}
