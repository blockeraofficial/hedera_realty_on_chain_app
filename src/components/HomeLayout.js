import React, { useState, useEffect } from "react";
import { Sidebar, Navbar, Footer } from "components";
import {
  StellarWalletsKit,
  WalletNetwork,
  FREIGHTER_ID,
  FreighterModule,
} from '@creit.tech/stellar-wallets-kit';
import Cookies from "./Cookies";

const HomeLayout = ({ children, onConnect }) => {
  const [isOpen, setOpen] = useState(false);
  const toggleSidebar = () => setOpen(!isOpen);
  const onCloseSidebar = () => setOpen(false);

  
  const [connectedWalletPublicKey, setConnectedWalletPublicKey] = useState(null);
  
    const kit = new StellarWalletsKit({
      network: WalletNetwork.TESTNET,
      selectedWalletId: FREIGHTER_ID,
      modules: [new FreighterModule()],
    });
  
    const connectWallet = async () => {
      await kit.openModal({
        onWalletSelected: async (option) => {
          kit.setWallet(option.id);
          const { address } = await kit.getAddress();
          setConnectedWalletPublicKey(address);
          onConnect({ publicKey: address, kit });
        }
      });
    };
    
    useEffect(() => {
      const fetchConnectedWallet = async () => {
        try {
          const { address } = await kit.getAddress();
          if (address) {
            setConnectedWalletPublicKey(address);
            onConnect({ publicKey: address, kit });
          }
        } catch (error) {
          // Wallet not connected yet
        }
      };
  
      fetchConnectedWallet();
    }, []);

  return (
    <div className="m-2 md:m-4 flex space-x-0 md:space-x-3 font-manrope">
      <Sidebar
        isOpen={isOpen}
        toggle={toggleSidebar}
        onClose={onCloseSidebar}
      />
      <div className="flex flex-col space-y-2 w-full min-h-[calc(100vh_-_1rem)] md:min-h-[calc(100vh_-_2rem)]">
        <Navbar
          toggle={toggleSidebar}
          connectWallet={connectWallet}
          connectedWalletPublicKey={connectedWalletPublicKey}
        />
        <div className="flex-1 mx-auto p-4 w-full lg:max-w-[1300px]">
          {children}
        </div>
        <Footer />
      </div>
      <Cookies />
    </div>
  );
};

export default HomeLayout;
