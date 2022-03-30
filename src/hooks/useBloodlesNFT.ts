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
  const contract: any = new Contract(BloodlesNFT, abi);
  const { send, state } = useContractFunction(contract, "OGmint");
  return {
    state,
    OGmint: send,
  };
}

export function useBLMint() {
  const abi = new Interface(BloodlesNFTABI);
  const contract: any = new Contract(BloodlesNFT, abi);
  const { send, state } = useContractFunction(contract, "BLmint");
  return {
    state,
    BLmint: send,
  };
}

export function usePLMint() {
  const abi = new Interface(BloodlesNFTABI);
  const contract: any = new Contract(BloodlesNFT, abi);
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

export function useBLMintStart() {
  const abi = new Interface(BloodlesNFTABI);
  const startTime = useContractCall({
    abi,
    address: BloodlesNFT,
    method: "BLmintStart",
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

export function useOGPrice(amount: Number) {
  const abi = new Interface(BloodlesNFTABI);
  const [price] = useContractCall({
    abi,
    address: BloodlesNFT,
    method: "OGprice",
    args: [amount],
  }) ?? [BIG_ZERO];

  return price;
}

export function useBLPrice(amount: Number) {
  const abi = new Interface(BloodlesNFTABI);
  const [price] = useContractCall({
    abi,
    address: BloodlesNFT,
    method: "BLprice",
    args: [amount],
  }) ?? [BIG_ZERO];

  return price;
}

export function usePrice(amount: Number) {
  const abi = new Interface(BloodlesNFTABI);
  const [price] = useContractCall({
    abi,
    address: BloodlesNFT,
    method: "price",
    args: [amount],
  }) ?? [BIG_ZERO];

  return price;
}

export function useMaxSupply() {
  const abi = new Interface(BloodlesNFTABI);
  const [MAX_ELEMENTS] = useContractCall({
    abi,
    address: BloodlesNFT,
    method: "MAX_ELEMENTS",
    args: [],
  }) ?? [BIG_ZERO];

  return MAX_ELEMENTS;
}

export function useTotalSupply() {
  const abi = new Interface(BloodlesNFTABI);
  const [totalSupply] = useContractCall({
    abi,
    address: BloodlesNFT,
    method: "totalSupply",
    args: [],
  }) ?? [BIG_ZERO];

  return totalSupply;
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
