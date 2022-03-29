import { BigNumber } from "@ethersproject/bignumber";

export const BIG_ZERO = BigNumber.from("0");

// === Addresses ===
export const BloodlesNFT = "0x0c7ed209543bbfa87e4d8876986a936ec207cc48";

// === Merkle Tree ===
export const MERKLE_TREE_DATA_3 = {
  "0x2c275FD35065EBbCa5682Df7ca95C482383eda24": {
    leaf: "0xec0f0c4d69b3608846a535f8798d02ffb578f1bcbdbba770c75e43a2423c42ff",
    proof: [
      "0x2c9da3c613250b1b4db72f1518205eaa37c7eaadf123f68dc6a1968184eba3e3",
    ],
  },
  "0x2831BC51569A2a606609CC6162Af3147C6c37193": {
    leaf: "0x2c9da3c613250b1b4db72f1518205eaa37c7eaadf123f68dc6a1968184eba3e3",
    proof: [
      "0xec0f0c4d69b3608846a535f8798d02ffb578f1bcbdbba770c75e43a2423c42ff",
    ],
  },
};

export const MERKLE_TREE_DATA_1 = {
  "0x51087Fb146C4983AF55e520C6b927acEf391511C": {
    leaf: "0x3e953d7e9d888c62039653b3f98eb826ae3bc153a272bd28d14bed6565bdd199",
    proof: [
      "0x47b5ebfb0e7d82fc3c3cf1e6952c011be7b9d9a7039db76fd119ae7c1be90ac2",
      "0xc6394276cbe2c33deef535585be5f01035f7641273cc87edd95ea215e8a868f9",
    ],
  },
  "0x98e82f6484f446F6F3a81971bdd9d68121E747AE": {
    leaf: "0x47b5ebfb0e7d82fc3c3cf1e6952c011be7b9d9a7039db76fd119ae7c1be90ac2",
    proof: [
      "0x3e953d7e9d888c62039653b3f98eb826ae3bc153a272bd28d14bed6565bdd199",
      "0xc6394276cbe2c33deef535585be5f01035f7641273cc87edd95ea215e8a868f9",
    ],
  },
  "0x8011B2696e654fcB268A8877f4A7574800bBde76": {
    leaf: "0x74af80de55e33babb154ec0ee83e5381b3a5c14e2775fb97ad3d64c85c1a5e2e",
    proof: [
      "0xd08d74c9e2af30150e767eac58d0a4dd3529b033de0cd067d0b72ca90b88a8c7",
      "0x1a8ff4e9cbab46cee280e144d4d28b1972111cd4c6ba0d591fa298bbd5cbe47a",
    ],
  },
  "0xaC8223FEeE85508319FdA40a230Ffb23F935dcbb": {
    leaf: "0xd08d74c9e2af30150e767eac58d0a4dd3529b033de0cd067d0b72ca90b88a8c7",
    proof: [
      "0x74af80de55e33babb154ec0ee83e5381b3a5c14e2775fb97ad3d64c85c1a5e2e",
      "0x1a8ff4e9cbab46cee280e144d4d28b1972111cd4c6ba0d591fa298bbd5cbe47a",
    ],
  },
};
