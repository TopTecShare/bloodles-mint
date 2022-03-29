import { ChainId } from "@usedapp/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

import { infuraUrl } from "./utils";

export const injected = new InjectedConnector({
  supportedChainIds: [ChainId.Mainnet, ChainId.Rinkeby],
});

export const walletconnect = new WalletConnectConnector({
  rpc: {
    [ChainId.Mainnet]: infuraUrl(ChainId.Mainnet),
    [ChainId.Rinkeby]: infuraUrl(ChainId.Rinkeby),
  },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  supportedChainIds: [ChainId.Mainnet, ChainId.Rinkeby],
});
