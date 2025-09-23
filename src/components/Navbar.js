import { NavLink } from "react-router-dom";
import { Excalamation, HandBurger, StellarConnection } from "assets/svgs";
import { rocPurpleLogo } from 'assets/images';

const Navbar = ({toggle, connectWallet, connectedWalletPublicKey}) => {
  
  const abbreviate = (addr) => `${addr.slice(0, 3)}...${addr.slice(-5)}`;

  return (
    <div className="bg-white w-full rounded-full flex items-center justify-between p-2">
      <div className="hidden lg:flex space-x-2 items-center ml-3">
        <Excalamation />
        <h6 className="font-semibold text-rocBlack-100 font-manrope">
          Welcome to the Realty on Chain Beta on Stellar Testnet. Start{" "}
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
      <div className="space-x-2 flex items-center">
        {connectedWalletPublicKey ? (
          <div className="flex items-center space-x-2 bg-rocPurple-300 px-1 lg:px-2 py-1 rounded-full cursor-pointer">
            <p className="bg-white text-black text-[16px] rounded-full px-4 font-manrope">
              {abbreviate(connectedWalletPublicKey)}
            </p>
            <StellarConnection />
          </div>
        ) : (
          <button
            className="bg-rocPurple-300 px-4 lg:px-4 py-1 rounded-full text-rocWhite-900 font-manrope border border-[#1a54da] hover:bg-rocWhite-900 hover:text-rocBlack-100"
            onClick={connectWallet}
          >
            Connect
          </button>
        )}
        <HandBurger
          onClick={toggle}
          className="cursor-pointer block lg:hidden"
        />
      </div>
    </div>
  );
};

export default Navbar;
