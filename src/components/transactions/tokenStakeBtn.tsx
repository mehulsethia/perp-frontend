import { MasterMantisABI } from "../../abi";
import { BaseBtn } from "./baseBtn";

interface ITokenStakeBtn {
  contract: `0x${string}`;
  _user: `0x${string}`;
  _pid: number;
  _amount: bigint;
  bgColor: string;
  hoverColor: string;
  setUserUpdate: any;
}

export function TokenStakeBtn({ contract, _user, _pid, _amount, bgColor, hoverColor, setUserUpdate }: ITokenStakeBtn) {
  return (
    <BaseBtn
      contract={contract}
      abi={MasterMantisABI}
      functionName="deposit"
      args={[_user, BigInt(_pid), _amount]}
      btnText={"Stake"}
      bgColor={bgColor}
      hoverColor={hoverColor}
      setUserUpdate={setUserUpdate}
    />
  );
}
