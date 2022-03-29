import React from "react";
import Header from "./components/header";
import { shortenAddress, useEtherBalance, useEthers } from "@usedapp/core";
import { toast } from "react-toastify";
import { useState } from "react";
import { formatAmount, formatError } from "./global/utils";
import WalletConnectionModal from "./components/walletmodal";
import {
  usePLMint,
  usePrice,
  useBLMint,
  useBLPrice,
} from "./hooks/useBloodlesNFT";
import useEstimateGas from "./hooks/useEstimateGas";

import "./App.scss";
import Woman from "./assets/woman.svg";
import Man from "./assets/man.svg";
import Profile from "./assets/profile.svg";

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [mintAmount, setMintAmount] = useState(1);
  const { account } = useEthers();
  const { PLmintGas, BLmintGas } = useEstimateGas();
  const { state: PLstate, PLmint } = usePLMint();
  const { state: BLstate, BLmint } = useBLMint();
  const [mintCost] = usePrice(mintAmount);
  const [BLmintCost] = useBLPrice(mintAmount);

  const onPLMint = async () => {
    try {
      const estimatedGas = await PLmintGas(mintAmount, { value: mintCost });
      PLmint(mintAmount, { value: mintCost, gasLimit: estimatedGas });
    } catch (error: any) {
      toast.error(formatError(error.error.message), {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
      });
    }
  };

  const onBLMint = async () => {
    try {
      const estimatedGas = await BLmintGas(
        ["0x2c9da3c613250b1b4db72f1518205eaa37c7eaadf123f68dc6a1968184eba3e3"],
        mintAmount,
        {
          value: BLmintCost,
        }
      );
      BLmint(
        ["0x2c9da3c613250b1b4db72f1518205eaa37c7eaadf123f68dc6a1968184eba3e3"],
        mintAmount,
        { value: BLmintCost, gasLimit: estimatedGas }
      );
    } catch (error: any) {
      toast.error(formatError(error.error.message), {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
      });
    }
  };

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
            <button onClick={onBLMint}>Mint your Bloodle</button>
          ) : (
            <button onClick={() => setOpen(true)}>Connect Wallet</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
