import React from 'react';
import '../styles/header.scss';
import Twitter from '../assets/twitter.svg'
import Discord from '../assets/discord.svg'
const Header: React.FC = () => {
  return (
    <div className="header">
         <a href="https://twitter.com/BloodlesNFT"><img src={Twitter} alt="twitter"/></a>
         <a href="https://discord.gg/XR7SYfcB"><img src={Discord} alt="discord"/></a>
    </div>
  );
}

export default Header;
