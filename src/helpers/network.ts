export function getTxnLink(hash: string | undefined, networkID: number | undefined) {
  if (networkID === 137) return "https://polygonscan.com/tx/" + hash;
  else if (networkID === 1101) return "https://zkevm.polygonscan.com/tx/" + hash;
  else if (networkID === 80001) return "https://mumbai.polygonscan.com/tx/" + hash;
  else if (networkID === 168587773) return "https://testnet.blastscan.io/tx/" + hash;
  else if (networkID === 80084) return "https://bartio.beratrail.io/tx/" + hash;
  else return "#";
}

export const getExecutionFee = (gasPrice: string | null | undefined, numItems: number) => {
  if (gasPrice) {
    let gasInGwei = Number(gasPrice);
    const premiumMultiplier = 1 + Number(localStorage.getItem("mantis_perp_fee_buffer") || "20") / 100;
    const executionFee = 1200 * numItems; // Units of 10^3
    return (executionFee * gasInGwei * premiumMultiplier) / 1000000;
  } else {
    return 1;
  }
};
