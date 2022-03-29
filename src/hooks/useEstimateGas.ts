import { Interface } from "@ethersproject/abi";
import { Contract } from "@ethersproject/contracts";
import { useEthers } from "@usedapp/core";
import BloodlesNFTABI from "../global/abis/BloodlesNFT.json";
import { BloodlesNFT } from "../global/constants";

export default function useEstimateGas() {
  const abi = new Interface(BloodlesNFTABI);
  const { library } = useEthers();

  const OGmintGas = async (...args : any) => {
    const contract = new Contract(BloodlesNFT, abi, library?.getSigner());
    const estimatedGas = await contract.estimateGas.OGmintMint(
      ...args
    );

    return estimatedGas;
  };

  const BLmintGas = async (...args : any) => {
    const contract = new Contract(BloodlesNFT, abi, library?.getSigner());
    const estimatedGas = await contract.estimateGas.BLmintMint(
      ...args
    );

    return estimatedGas;
  };

  const PLmintGas = async (...args : any) => {
    const contract = new Contract(BloodlesNFT, abi, library?.getSigner());
    const estimatedGas = await contract.estimateGas.PLmint(...args);

    return estimatedGas;
  };

  return { OGmintGas, BLmintGas, PLmintGas };
}
