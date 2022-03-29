import { Interface } from "@ethersproject/abi";
import { Contract } from "@ethersproject/contracts";
import {
  useContractCall,
  // useContractCalls,
  useContractFunction,
} from "@usedapp/core";

import BloodlesNFTABI from "../global/abis/BloodlesNFT.json";
import { BIG_ZERO, BloodlesNFT } from "../global/constants";

export function useOGMint() {
  const abi = new Interface(BloodlesNFTABI);
  const contract : any = new Contract(BloodlesNFT, abi);
  const { send, state } = useContractFunction(contract, "OGmint");
  return {
    state,
    OGmint: send,
  };
}

export function useBLMint() {
  const abi = new Interface(BloodlesNFTABI);
  const contract : any = new Contract(BloodlesNFT, abi);
  const { send, state } = useContractFunction(contract, "BLmint");
  return {
    state,
    BLmint: send,
  };
}

export function usePLMint() {
  const abi = new Interface(BloodlesNFTABI);
  const contract : any = new Contract(BloodlesNFT, abi);
  const { send, state } = useContractFunction(contract, "PLmint");
  return {
    state,
    PLmint: send,
  };
}

export function useOGMintStart() {
  const abi = new Interface(BloodlesNFTABI);
  const startTime = useContractCall({
    abi,
    address: BloodlesNFT,
    method: "OGmintStart",
    args: [],
  }) ?? [BIG_ZERO];

  return Number(startTime.toString());
}

export function useWLMintStart() {
  const abi = new Interface(BloodlesNFTABI);
  const startTime = useContractCall({
    abi,
    address: BloodlesNFT,
    method: "WLmintStart",
    args: [],
  }) ?? [BIG_ZERO];

  return Number(startTime.toString());
}

export function useMintStart() {
  const abi = new Interface(BloodlesNFTABI);
  const startTime = useContractCall({
    abi,
    address: BloodlesNFT,
    method: "mintStart",
    args: [],
  }) ?? [BIG_ZERO];

  return Number(startTime.toString());
}

export function useOGPrice() {
  const abi = new Interface(BloodlesNFTABI);
  const price = useContractCall({
    abi,
    address: BloodlesNFT,
    method: "OGPRICE",
    args: [],
  }) ?? [BIG_ZERO];

  return price;
}

export function useWLPrice() {
  const abi = new Interface(BloodlesNFTABI);
  const price = useContractCall({
    abi,
    address: BloodlesNFT,
    method: "WLPRICE",
    args: [],
  }) ?? [BIG_ZERO];

  return price;
}

export function usePrice() {
  const abi = new Interface(BloodlesNFTABI);
  const price = useContractCall({
    abi,
    address: BloodlesNFT,
    method: "PRICE",
    args: [],
  }) ?? [BIG_ZERO];

  return price;
}

// export function useTokens(address) {
//   const abi = new Interface(BloodlesNFTABI);
//   const balance = useBalance(address);
//   const tokens = useContractCalls(
//     [...Array(balance).keys()].map((idx) => ({
//       abi,
//       address: BloodlesNFT,
//       method: "tokenOfOwnerByIndex",
//       args: [address, idx],
//     }))
//   );
//   return tokens.map((token) => Number((token ?? [BIG_ZERO]).toString()));
// }
