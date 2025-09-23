import Title from "./Title";

const ConfigurationWrapper = ({ publicKey, children }) => {

  return (
    <>
      {!publicKey ? (
        <div className="bg-rocWhite-300 w-full h-96 flex justify-center items-center rounded-2xl">
          <div className="space-y-4 flex flex-col items-center">
            <Title>Connect Wallet To Stellar Testnet</Title>
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default ConfigurationWrapper;
