import { NavLink, useNavigate } from "react-router-dom";
import { Excalamation, HandBurger, HbarConnection } from "assets/svgs";
import { rocPurpleLogo } from "assets/images";

// Hedera Connection
import { useEffect, useState } from "react";
import { useWalletInterface } from "../services/wallets/useWalletInterface";
import { WalletSelectionDialog } from "./WalletSelectionDialog";
import { useAuth } from "contexts/AuthContext";
import toast from "react-hot-toast";

const Navbar = ({ toggle }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user, signOut } = useAuth();
  // Hedera Connection Related

  const [open, setOpen] = useState(false);
  const { accountId, walletInterface } = useWalletInterface();

  const handleConnect = async () => {
    // Auth kontrolü!
    if (!isAuthenticated) {
      toast.error("Please login first to connect your wallet");
      navigate("/auth/login");
      return;
    }
    if (accountId) {
      walletInterface.disconnect();
    } else {
      setOpen(true);
    }
  };

  const handleAuthAction = () => {
    if (isAuthenticated) {
      // User menu (logout vs) - şimdilik basit logout
      if (window.confirm("Do you want to logout?")) {
        signOut();
        navigate("/auth/login");
      }
    } else {
      navigate("/auth/login");
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
            href="./"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            here
          </a>{" "}
          with this quick guide.
        </h6>
      </div>
      <NavLink to={"/"} className={"block lg:hidden pl-2"}>
        <img src={rocPurpleLogo} alt="website-logo" className="h-11" />
      </NavLink>

      <div className="flex items-center space-x-2">
        {/* Auth Status */}
        {!isAuthenticated ? (
          <button
            type="button"
            onClick={() => navigate("/auth/register")}
            className="cursor-pointer bg-rocPurple-300 px-4 py-1 rounded-full text-rocWhite-900 font-manrope border border-[#1a54da] hover:bg-rocWhite-900 hover:text-rocBlack-100 focus:outline-none focus:ring-2 focus:ring-[#1a54da]/60"
          >
            Sign Up / Login
          </button>
        ) : (
          <>
            {/* Wallet Connection (only for authenticated users) */}
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
                Connect Wallet
              </button>
            )}

            {/* User Menu (simple logout for now) */}
            <button
              type="button"
              onClick={handleAuthAction}
              className="cursor-pointer bg-gray-200 px-4 py-1 rounded-full text-rocBlack-100 font-manrope hover:bg-gray-300 focus:outline-none"
            >
              {user?.email?.split("@")[0] || "Account"}
            </button>
          </>
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
