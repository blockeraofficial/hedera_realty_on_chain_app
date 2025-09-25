import { useState, useEffect } from "react";
import toast from 'react-hot-toast';

import { DollarStatusIcon } from "assets/svgs";
// import { BuyRealtyToken } from "modules/marketplace";

// Hedera Connection
import { useWalletInterface } from '../../services/wallets/useWalletInterface';


// Hedera Buy Logic

import { ethers } from "ethers";
import assetManagerArtifact from "../../contract-artifacts/HederaAssetManagerContract.json";
import { ContractId, ContractFunctionParameters, Hbar } from "@hashgraph/sdk";

// -----------------------------------------------------

const BuyPropertyCard = ({
  isLoading,
  loadingType,
}) => {
  const [propertyToken, setPropertyToken] = useState("");
  const [inputError, setInputError] = useState("");

// ---- Hedera  ----
const CONTRACT_ID = process.env.REACT_APP_HEDERA_ASSET_MANAGER_CONTRACT_ID
const ASSET_TOKEN_EVM_ADDRESS = process.env.REACT_APP_HEDERA_ASSET_TOKEN_ADDRESS; // 0.0.6873059
const TINYBAR_PER_WHOLE = ethers.BigNumber.from("10000000000");

const BuyRealtyToken = async () => {

  if (!accountId) {
      alert("🚫 Wallet not connected.");
      return;
  }

  try {

    // The buy logic is here

    const totalTinybar = TINYBAR_PER_WHOLE.mul(
      ethers.BigNumber.from(String(propertyToken || 0))
    );

    // A) Native Hedera path — same call structure as your ContractCall.jsx
    if (walletInterface?.executeContractFunction) {
      
      const h = Hbar.fromTinybars(totalTinybar.toString());
      const adapterBuilder = {
        // (address assetToken, uint64 assetTokenAmount)
        
      buildHAPIParams: () =>
        new ContractFunctionParameters()
          .addAddress(ASSET_TOKEN_EVM_ADDRESS.replace(/^0x/, "")) // 40-hex, no 0x
          .addUint64(Number(propertyToken))
      };
      // (Optional) quick sanity log
      // console.log("Sending tinybar:", totalTinybar.toString());

      const res = await walletInterface.executeContractFunction(
        ContractId.fromString(CONTRACT_ID),
        "buy_realty_fraction",
        adapterBuilder,
        2_000_000, // gas fee
        (propertyToken * 100)  // paid amount
      )

      return

    }
  }

  catch(error) {
    // Return the Call Alert
    console.error('❌ Failed to buy tokens:', error.submitResponse?.data || error.message);
  }
}

  // Hedera Connection

  const [open, setOpen] = useState(false);
  const { accountId, walletInterface, evmSigner } = useWalletInterface() || {};

  useEffect(() => {
    if (accountId) {
      setOpen(false);
      console.log("Already Connected", accountId)
    }
  }, [accountId]);

  // --------------------------------------

  const BuyRealtyTokenHandler = async () => {

    console.log("TIKLADIM")
    if (!propertyToken || Number(propertyToken) <= 0) {
      setInputError("Please enter a valid token amount.");
    
      // Automatically clear the error after 5 seconds
      setTimeout(() => setInputError(""), 5000);
    
      return;
    }
  
    setInputError("");
  
    await BuyRealtyToken(
      accountId
    );

    console.log("Bu fonkst")
  
    setPropertyToken("");
    toast.success("Realty token purchase request submitted!");
  };

  return (
    <div className="border-2 border-rocPurple-800 rounded-2xl">
      <div className="rounded-t-xl w-full h-12 bg-rocPurple-800 flex space-x-2 items-center justify-center">
        <DollarStatusIcon />
        <h6 className="font-bold font-manrope text-2xl text-rocWhite-900">
          Buy
        </h6>
      </div>
      <div className="p-5 flex flex-col space-y-6 mb-2">
        <div className="w-full border-2 border-rocPurple-800 rounded-full relative flex justify-center h-[80px]">
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 rounded-full flex space-x-2 items-center px-3 py-1 bg-gray-100 text-rocPurple-800">
            <h6 className="text-lg font-bold whitespace-nowrap font-manrope">
              Token Price
            </h6>
          </div>
          <div className="w-1/2 flex justify-center items-center">
            <h6 className="text-rocBlue-100 font-bold text-xl whitespace-nowrap">
              100 Test HBAR
            </h6>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative rounded-xl overflow-hidden w-full md:max-w-[880px]">
            <input
              value={propertyToken}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || (Number(value) > 0 && Number(value) <= 10)) {
                  setPropertyToken(value);
                  setInputError("");
                }
              }}
              onKeyDown={(e) => {
                if (["-", "e", "E", "+"].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              type="number"
              min="1"
              max="10"
              disabled={!accountId}
              className={`w-full p-4 rounded-xl border-2 ${
                !accountId
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "border-rocPurple-300 text-rocPurple-300"
              } focus:outline-none focus:border-rocPurple-300 font-manrope`}
              placeholder={
                !accountId ? "Connect Your Wallet First" : "ENTER TOKEN AMOUNT (MAX 10)"
              }
            />
            {inputError && (
              <p className="text-red-600 text-sm text-center mt-1">{inputError}</p>
            )}
          </div>
        </div>

        <div className="flex space-x-2 items-center">
          {isLoading ? (
            <p className="text-rocPurple-800 font-bold text-xl text-center flex justify-center w-full">
              {loadingType === "approval" ? "Approving ..." : "Minting ..."}
            </p>
          ) : (
            <>
              <button
                className={`font-bold w-56 mx-auto rounded-full py-2 ${
                   accountId 
                     ? "bg-rocBlue-100 text-rocWhite-900 border border-[#1a54da] hover:bg-rocWhite-900 hover:text-rocBlack-100"
                     : "bg-[#808080] text-rocWhite-900 cursor-not-allowed"
                }`}
                onClick={BuyRealtyTokenHandler}
                disabled={!accountId}
              >
                Buy
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyPropertyCard;
