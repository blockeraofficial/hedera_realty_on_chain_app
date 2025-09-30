import { MetamaskContextProvider } from "../../contexts/MetamaskContext";
import { WalletConnectContextProvider } from "../../contexts/WalletConnectContext";
import { MetaMaskClient } from "./metamask/metamaskClient";
import { WalletConnectClient } from "./walletconnect/walletConnectClient";


// <MetaMaskClient />
//  <MetamaskContextProvider>
//  </MetamaskContextProvider>

export const AllWalletsProvider = (props) => {
  return (
      <WalletConnectContextProvider>
        <WalletConnectClient />
        {props.children}
      </WalletConnectContextProvider>
 
  );
};
