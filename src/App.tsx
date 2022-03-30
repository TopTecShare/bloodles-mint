import React from "react";
import Header from "./components/header";
import { useEthers } from "@usedapp/core";
import { toast } from "react-toastify";
import { useState } from "react";
import { formatAmount, formatError } from "./global/utils";
import WalletConnectionModal from "./components/walletmodal";
import {
  usePLMint,
  usePrice,
  useBLMint,
  useBLPrice,
  useOGMint,
  useOGPrice,
} from "./hooks/useBloodlesNFT";
import useEstimateGas from "./hooks/useEstimateGas";
import { getOGproof, getBLproof, getOGroot, getBLroot } from "./utils";

import "./App.scss";
import Woman from "./assets/woman.svg";
import Man from "./assets/man.svg";
import Profile from "./assets/profile.svg";

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(4);
  const [mintAmount, setMintAmount] = useState(1);
  const { account } = useEthers();
  const { PLmintGas, BLmintGas, OGmintGas } = useEstimateGas();
  const { state: PLstate, PLmint } = usePLMint();
  const { state: BLstate, BLmint } = useBLMint();
  const { state: OGstate, OGmint } = useOGMint();
  const [mintCost] = usePrice(mintAmount);
  const [BLmintCost] = useBLPrice(mintAmount);
  const [OGmintCost] = useBLPrice(mintAmount);

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
      // console.log(getBLproof(account));
      getBLroot();
      const estimatedGas = await BLmintGas(getBLproof(account), mintAmount, {
        value: BLmintCost,
      });
      BLmint(getBLproof(account), mintAmount, {
        value: BLmintCost,
        gasLimit: estimatedGas,
      });
    } catch (error: any) {
      toast.error(formatError(error.error.message), {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
      });
    }
  };

  const onOGMint = async () => {
    try {
      // console.log(getOGproof(account));
      getOGroot();
      const estimatedGas = await OGmintGas(getOGproof(account), mintAmount, {
        value: OGmintCost,
      });
      OGmint(getOGproof(account), mintAmount, {
        value: OGmintCost,
        gasLimit: estimatedGas,
      });
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
      <Header open={setOpen} />
      <div className="man">
        <img src={Man} alt="man" />
      </div>
      <div className="woman">
        <img src={Woman} alt="woman" />
      </div>
      <div className="container">
        <div className="home">
          <h1>Mint your Bloodle</h1>
          <h3>Pre Sale in 00:10:10:10</h3>
          <div className="profile">
            <img src={Profile} alt="profile" />
          </div>
          <h2>2000/4444</h2>
          <div className="nomargin">
            {account ? (
              <div className="block">
                <div className="between">
                  <button
                    className="minus"
                    onClick={() => {
                      if (mintAmount > 1) setMintAmount(mintAmount - 1);
                    }}
                  >
                    -
                  </button>
                  <div className="amount">{mintAmount}</div>
                  <button
                    className="plus"
                    onClick={() => {
                      setMintAmount(mintAmount + 1);
                    }}
                  >
                    +
                  </button>
                </div>
                <button onClick={onOGMint}>Mint your Bloodle</button>
              </div>
            ) : (
              <button onClick={() => setOpen(true)}>Connect Wallet</button>
            )}
          </div>
          <h3>0.0X ETH + GAS</h3>
        </div>
        <div className="description">
          <div>
            <h1>TL;DR</h1>
            <p>
              A unique hand-drawn collection of black-themed doodles, here to
              support the black- and minority community on the blockchain. We
              are not just another PFP NFT, but also a P2E Game in the theme of
              a real-life simulation. Once minted and revealed, holders will be
              able to send their Bloodles to work, to study, or to "hustle" and
              earn $BLM doing so. Bloodles can also start a Family by staking a
              male and a female Bloodle for 9 Bloodle months ( 1 Bloodle month =
              3 days IRL).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
