import React from "react";
import { useParams } from "react-router-dom";

const WalletDetails: React.FC = () => {
  const { walletAddress } = useParams<{ walletAddress: string }>();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Wallet Details</h1>
      <p>Wallet Address: {walletAddress}</p>
    </div>
  );
};

export default WalletDetails;
