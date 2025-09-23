import { createContext, useState } from "react";

const defaultValue = {
  metamaskAccountAddress: '',
  setMetamaskAccountAddress: () => {},
};

export const MetamaskContext = createContext(defaultValue);

export const MetamaskContextProvider = (props) => {
  const [metamaskAccountAddress, setMetamaskAccountAddress] = useState('');

  return (
    <MetamaskContext.Provider
      value={{
        metamaskAccountAddress,
        setMetamaskAccountAddress,
      }}
    >
      {props.children}
    </MetamaskContext.Provider>
  );
};
