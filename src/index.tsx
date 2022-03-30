import { Buffer } from "buffer";

import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { ChainId, DAppProvider, Mainnet, Rinkeby } from "@usedapp/core";
import { ToastContainer } from "react-toastify";
import reportWebVitals from "./reportWebVitals";

import { infuraUrl } from "./global/utils";
import "./index.scss";
import "react-toastify/dist/ReactToastify.css";

const config = {
  readOnlyChainId: ChainId.Mainnet,
  networks: [Mainnet, Rinkeby],
  readOnlyUrls: {
    [ChainId.Mainnet]: infuraUrl(ChainId.Mainnet),
    [ChainId.Rinkeby]: infuraUrl(ChainId.Rinkeby),
  },
  pollingInterval: 1000,
};

if (typeof window !== "undefined") if (!window.Buffer) window.Buffer = Buffer;

ReactDOM.render(
  <Router>
    <ToastContainer />
    <DAppProvider config={config} children={<App />} />
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
