import React from "react";
import Header from "./components/header";
import { useEthers } from "@usedapp/core";
import { toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";
import { formatAmount, formatError, convertToDuration } from "./global/utils";
import WalletConnectionModal from "./components/walletmodal";
import {
  usePLMint,
  usePrice,
  useBLMint,
  useBLPrice,
  useOGMint,
  useOGPrice,
  useMaxSupply,
  useTotalSupply,
  useOGMintStart,
  useBLMintStart,
  useMintStart,
} from "./hooks/useBloodlesNFT";
import useEstimateGas from "./hooks/useEstimateGas";
import { getOGproof, getBLproof, getOGroot, getBLroot } from "./utils";

import "./App.scss";
import Woman from "./assets/woman.svg";
import Man from "./assets/man.svg";
import Profile from "./assets/profile.svg";

const App: React.FC = () => {
  const OGmintstart = useOGMintStart();
  const BLmintstart = useBLMintStart();
  const mintstart = useMintStart();
  const maxSupply = useMaxSupply();
  const totalSupply = useTotalSupply();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [message, setMessage] = useState("Sale is not started yet.");
  const [mintAmount, setMintAmount] = useState(1);
  const { account } = useEthers();
  const { PLmintGas, BLmintGas, OGmintGas } = useEstimateGas();
  const { state: PLstate, PLmint } = usePLMint();
  const { state: BLstate, BLmint } = useBLMint();
  const { state: OGstate, OGmint } = useOGMint();
  const OGmintCost = useOGPrice(mintAmount);
  const BLmintCost = useBLPrice(mintAmount);
  const mintCost = usePrice(mintAmount);
  const intervalRef = useRef<Number>();

  useEffect(() => {
    if (!intervalRef.current) {
      intervalRef.current = window.setInterval(
        () => setCurrentTime(Math.floor(new Date().getTime() / 1000)),
        1000
      );
    }
    return () => {
      clearInterval(Number(intervalRef.current));
    };
  }, []);

  useEffect(() => {
    const current = Date.now() / 1000;
    if (totalSupply == maxSupply) setStatus(4);
    else if (current > mintstart) {
      setStatus(3);
      const { days, hours, minutes, seconds } = convertToDuration(
        1649628992,
        currentTime
      );
      setMessage(`Sale for ${days}:${hours}:${minutes}:${seconds}`);
    } else if (current > BLmintstart) {
      setStatus(2);
      const { days, hours, minutes, seconds } = convertToDuration(
        mintstart,
        currentTime
      );
      setMessage(`Pre Sale for ${days}:${hours}:${minutes}:${seconds}`);
    } else if (current > OGmintstart) {
      setStatus(1);
      const { days, hours, minutes, seconds } = convertToDuration(
        BLmintstart,
        currentTime
      );
      setMessage(`OG Sale for ${days}:${hours}:${minutes}:${seconds}`);
    } else {
      setStatus(0);
      const { days, hours, minutes, seconds } = convertToDuration(
        OGmintstart,
        currentTime
      );
      setMessage(`Pre Sale In ${days}:${hours}:${minutes}:${seconds}`);
    }
  }, [
    OGmintstart,
    BLmintstart,
    mintstart,
    totalSupply,
    maxSupply,
    currentTime,
  ]);
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
        <div className="home" style={{ width: status == 4 ? "100%" : "50%" }}>
          {status !== 4 ? (
            <>
              <h1>Mint your Bloodle</h1>
              <h3>{message}</h3>
            </>
          ) : (
            <div className="soldout">SOLD OUT</div>
          )}

          <div className="profile">
            <img src={Profile} alt="profile" />
          </div>
          <h2>
            {Number(totalSupply)}/{Number(maxSupply)}
          </h2>
          {status !== 4 ? (
            <>
              <div className="nomargin">
                {account && status > 0 && status < 4 ? (
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
                    <button
                      onClick={
                        { 1: onOGMint, 2: onBLMint, 3: onPLMint }[status]
                      }
                    >
                      Mint your Bloodle
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setOpen(true)}>Connect Wallet</button>
                )}
              </div>
              <h3>
                {Number(
                  [0, OGmintCost, BLmintCost, mintCost, 0][status] / 10 ** 18
                )}
                X ETH + GAS
              </h3>
            </>
          ) : (
            <>
              <h2>Buy a Bloodle on Opensea</h2>
              <div>
                <a className="opensea" href="https://opensea.io">
                  Opensea
                </a>
              </div>
            </>
          )}
        </div>
        {status != 4 && (
          <div className="description">
            <div>
              <h1>TL;DR</h1>
              <p>
                A unique hand-drawn collection of black-themed doodles, here to
                support the black- and minority community on the blockchain. We
                are not just another PFP NFT, but also a P2E Game in the theme
                of a real-life simulation. Once minted and revealed, holders
                will be able to send their Bloodles to work, to study, or to
                "hustle" and earn $BLM doing so. Bloodles can also start a
                Family by staking a male and a female Bloodle for 9 Bloodle
                months ( 1 Bloodle month = 3 days IRL).
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
