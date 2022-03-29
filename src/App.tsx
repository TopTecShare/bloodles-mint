import React from "react";
import Header from "./components/header";
import { shortenAddress, useEtherBalance, useEthers } from "@usedapp/core";
import { useState } from "react";
import { formatAmount } from "./global/utils";
import WalletConnectionModal from "./components/walletmodal";
import "./App.scss";
import Woman from "./assets/woman.svg";
import Man from "./assets/man.svg";
import Profile from "./assets/profile.svg";

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { account } = useEthers();

  return (
    <div className="app">
      <WalletConnectionModal open={open} onClose={() => setOpen(false)} />
      <Header />
      <div className="man">
        <img src={Man} alt="man" />
      </div>
      <div className="woman">
        <img src={Woman} alt="woman" />
      </div>
      <div className="home">
        <h1>Mint your Bloodle</h1>
        <h3>Pre Sale in 00:10:10:10</h3>
        <div className="profile">
          <img src={Profile} alt="profile" />
        </div>
        <h2>2000/4444</h2>
        <h3>0.0X ETH + GAS</h3>
        <div>
          {account ? (
            <button onClick={() => console.log("dfdf")}>
              Mint your Bloodle
            </button>
          ) : (
            <button onClick={() => setOpen(true)}>Connect Wallet</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
