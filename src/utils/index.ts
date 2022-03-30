global.Buffer = global.Buffer || require("buffer").Buffer;

const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

const OGlist = [
  "0x2c275FD35065EBbCa5682Df7ca95C482383eda24",
  "0xb5f87829555D703075B4c001877f2F7eC904f8D8",
  "0x2831BC51569A2a606609CC6162Af3147C6c37193",
  // Community Wallet
  "0x45DEea9BBeF61f2aAe96399697eAa8bbA1AFdAB8",
  // Founder - Artist
  "0xBe99BaE9f418Dc6Cd6E254382546a1EE4fC2031e",
  // Founder - Dev
  "0x2831BC51569A2a606609CC6162Af3147C6c37193",
  // Advisor Wallet
  "0xB5669B620F7A5eCDC078304400930133dD5E07b7",
  // Marketing Wallet
  "0x3Fd92f4604c8b700dE26d04da22C6f114dd10358",
  // Development Wallet
  "0xa41174cFb113A3AC9A29BE13554b28509D9Fbad5",
];

const BLlist = [
  "0x2c275FD35065EBbCa5682Df7ca95C482383eda24",
  "0xb5f87829555D703075B4c001877f2F7eC904f8D8",
  "0x2831BC51569A2a606609CC6162Af3147C6c37193",
  // Community Wallet
  "0x45DEea9BBeF61f2aAe96399697eAa8bbA1AFdAB8",
  // Founder - Artist
  "0xBe99BaE9f418Dc6Cd6E254382546a1EE4fC2031e",
  // Founder - Dev
  "0x2831BC51569A2a606609CC6162Af3147C6c37193",
  // Advisor Wallet
  "0xB5669B620F7A5eCDC078304400930133dD5E07b7",
  // Marketing Wallet
  "0x3Fd92f4604c8b700dE26d04da22C6f114dd10358",
  // Development Wallet
  "0xa41174cFb113A3AC9A29BE13554b28509D9Fbad5",
];

const leafNodesOG = OGlist.map(keccak256);
const merkleTreeOG = new MerkleTree(leafNodesOG, keccak256, {
  sortPairs: true,
});

const leafNodesBL = BLlist.map(keccak256);
const merkleTreeBL = new MerkleTree(leafNodesBL, keccak256, {
  sortPairs: true,
});

export const getOGproof: any = (address = "") => {
  const addressHash = keccak256(address);
  const hexProof = merkleTreeOG.getHexProof(addressHash);

  return hexProof;
};

export const getBLproof: any = (address = "") => {
  const addressHash = keccak256(address);
  const hexProof = merkleTreeBL.getHexProof(addressHash);

  return hexProof;
};

export const getOGroot = () => {
  return merkleTreeOG.getRoot(); //.toString("hex");
};

export const getBLroot = () => {
  return merkleTreeBL; //.getRoot().toString("hex");
};
