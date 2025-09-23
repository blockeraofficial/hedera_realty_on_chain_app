// Runtime constants to replace the TypeScript literal types

export const NetworkName = {
  TESTNET: "testnet",
};

export const ChainId = {
  TESTNET: "0x128",
};

// Optional: show the "shape" of a network config in JS
// (not enforced, but works as documentation)
export const ExampleNetworkConfig = {
  network: NetworkName.TESTNET,
  jsonRpcUrl: "https://testnet.hashio.io/api",
  mirrorNodeUrl: "https://testnet.mirrornode.hedera.com",
  chainId: ChainId.TESTNET,
};
