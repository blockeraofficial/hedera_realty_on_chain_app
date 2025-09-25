import { NavLink } from "react-router-dom";
import { Excalamation, HandBurger, PropertyHBAR, PropertyHBARBlack, HbarConnection } from "assets/svgs";
import { rocPurpleLogo } from 'assets/images';

// Hedera Connection
import { useEffect, useState } from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { useWalletInterface } from '../services/wallets/useWalletInterface';
import { WalletSelectionDialog } from './WalletSelectionDialog';

const Navbar = ({toggle}) => {

  // Hedera Connection Related

  const [open, setOpen] = useState(false);
  const { accountId, walletInterface } = useWalletInterface();

  const handleConnect = async () => {
    if (accountId) {
      walletInterface.disconnect();
    } else {
      setOpen(true);
    }
  };

  useEffect(() => {
    if (accountId) {
      setOpen(false);
    }
  }, [accountId]);

  // ------------------------------------
  
  const abbreviate = (addr) => `${addr.slice(0, 3)}...${addr.slice(-5)}`;

  return (
    <div className="bg-white w-full rounded-full flex items-center justify-between p-2">
      <div className="hidden lg:flex space-x-2 items-center ml-3">
        <Excalamation />
        <h6 className="font-semibold text-rocBlack-100 font-manrope">
          Welcome to the Realty on Chain Beta on Hedera Testnet. Start{" "}
          <a
          href="https://medium.com/@blockera_online/buy-your-first-realty-token-on-roc-beta-stellar-testnet-guide-ce11f3117566"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
          >
          here 
          </a>
          {" "}
          with this quick guide.
        </h6>
      </div>
      <NavLink to={"/"} className={"block lg:hidden pl-2"}>
        <img src={rocPurpleLogo} alt="website-logo" className="h-11" />
      </NavLink>

      <div className="flex items-center space-x-2">
        {accountId ? (
          <div className="flex items-center space-x-2 bg-rocPurple-300 px-1 lg:px-2 py-1 rounded-full cursor-pointer">
            <p className="bg-white text-black text-[16px] rounded-full px-4 font-manrope">
              {accountId}
            </p>
            <HbarConnection />
          </div>
        ) : (
          <button
            type="button"
            onClick={handleConnect}
            className="cursor-pointer bg-rocPurple-300 px-4 py-1 rounded-full text-rocWhite-900 font-manrope border border-[#1a54da] hover:bg-rocWhite-900 hover:text-rocBlack-100 focus:outline-none focus:ring-2 focus:ring-[#1a54da]/60"
          >
            {accountId ? `Connected: ${accountId}` : "Connect Wallet"}
          </button>
        )}
        <HandBurger
          onClick={toggle}
          className="cursor-pointer block lg:hidden"
        />

        <WalletSelectionDialog
          open={open}
          setOpen={setOpen}
          onClose={() => setOpen(false)}
        />
      </div>
    </div>
  );
};

export default Navbar;
