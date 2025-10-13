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

  const [userMenuOpen, setUserMenuOpen] = useState(false);

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
  const handleLogout = async () => {
    setUserMenuOpen(false);
    const result = await signOut();
    if (result.success) {
      toast.success("Logged out successfully!");
      navigate("/auth/login");
    } else {
      toast.error("Logout failed. Please try again.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuOpen && !event.target.closest(".user-menu-container")) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuOpen]);

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
          <>
            <button
              type="button"
              onClick={() => navigate("/auth/register")}
              className="cursor-pointer bg-rocPurple-300 px-4 py-1 rounded-full text-rocWhite-900 font-manrope border border-[#1a54da] hover:bg-rocWhite-900 hover:text-rocBlack-100 focus:outline-none focus:ring-2 focus:ring-[#1a54da]/60"
            >
              Sign Up
            </button>

            <button
              type="button"
              onClick={() => navigate("/auth/login")}
              className="cursor-pointer bg-rocPurple-300 px-4 py-1 rounded-full text-rocWhite-900 font-manrope border border-[#1a54da] hover:bg-rocWhite-900 hover:text-rocBlack-100 focus:outline-none focus:ring-2 focus:ring-[#1a54da]/60"
            >
              Login
            </button>
          </>
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
            <div className="relative user-menu-container">
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="cursor-pointer bg-gradient-to-br from-rocPurple-300 to-rocBlue-300 w-10 h-10 rounded-full text-white font-manrope font-bold hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-rocPurple-300 flex items-center justify-center text-lg transition-all transform hover:scale-105"
                title={user?.email || "Account"}
              >
                {user?.email?.[0]?.toUpperCase() || "A"}
              </button>

              {/* Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-rocBlack-100 font-manrope">
                      Signed in as
                    </p>
                    <p className="text-sm text-rocBlack-200 font-manrope truncate">
                      {user?.email || "user@example.com"}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      navigate("/dashboard");
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-rocBlack-100 hover:bg-gray-50 font-manrope transition-colors"
                  >
                    Dashboard
                  </button>

                  {/* Divider */}
                  <div className="border-t border-gray-100 my-1"></div>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-manrope transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
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
