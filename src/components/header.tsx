import React from "react";
import "../styles/header.scss";
import Twitter from "../assets/twitter.svg";
import Discord from "../assets/discord.svg";
import { shortenAddress, useEthers } from "@usedapp/core";

interface CounterProps {
  open: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<CounterProps> = ({ open }) => {
  const { account } = useEthers();
  return (
    <div className="flex">
      <div className="header">
        <a href="https://twitter.com/BloodlesNFT">
          <img src={Twitter} alt="twitter" />
        </a>
        <a href="https://discord.gg/XR7SYfcB">
          <img src={Discord} alt="discord" />
        </a>
      </div>
      {account && (
        <div
          className="wallet"
          onClick={() => {
            open(true);
          }}
        >
          <div className="address">{shortenAddress(account)}</div>
        </div>
      )}
    </div>
  );
};

export default Header;
