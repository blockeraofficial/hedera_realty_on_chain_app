import { MetamaskContextProvider } from "../../contexts/MetamaskContext";
import { WalletConnectContextProvider } from "../../contexts/WalletConnectContext";
import { MetaMaskClient } from "./metamask/metamaskClient";
import { WalletConnectClient } from "./walletconnect/walletConnectClient";


// <MetaMaskClient />

export const AllWalletsProvider = (props) => {
  return (
    <MetamaskContextProvider>
      <WalletConnectContextProvider>
 
        <WalletConnectClient />
        {props.children}
      </WalletConnectContextProvider>
    </MetamaskContextProvider>
  );
};
