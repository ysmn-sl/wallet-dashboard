import React, { useState, useEffect } from "react";
import data from "../data/valuable_wallets_sample.json"; // Import mock data

interface Wallet {
  walletAddress: string;
  netProfit: number;
}

const HomePage = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setWallets(data);
    } else {
      console.error("Invalid data format", data);
    }
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        {wallets.map((wallet, index) => (
          <li key={index}>
            <p>Address: {wallet.walletAddress}</p>
            <p>Net Profit: {wallet.netProfit}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
