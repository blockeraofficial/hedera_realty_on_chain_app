import Title from "./Title";
import { useEffect, useState } from "react";
// Hedera
import { useWalletInterface } from "../services/wallets/useWalletInterface";
import { ethers } from "ethers";
// ------------------------------------------------------------------------



const ConfigurationWrapper = ({ children }) => {

  const { accountId } = useWalletInterface() || {};
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setIsConnected(Boolean(accountId));
    console.log("ConfWrapper:", accountId)
  }, [accountId]);

  return (
    <>
      {!isConnected ? (
        <div className="bg-rocWhite-300 w-full h-96 flex justify-center items-center rounded-2xl">
          <div className="space-y-4 flex flex-col items-center">
            <Title>Connect Wallet To Hedera Testnet</Title>
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default ConfigurationWrapper;
