import { useState, useEffect } from "react";
import axios from "axios";
import toast from 'react-hot-toast';

import { DollarStatusIcon } from "assets/svgs";
import { EstablishTrustline, BuyRealtyToken } from "modules/marketplace";

const BuyPropertyCard = ({
  isLoading,
  loadingType,
  publicKey,
  kit
}) => {
  const [propertyToken, setPropertyToken] = useState("");
  const [trustlineStatus, setTrustlineStatus] = useState({
    accountInfo: null,
    isTrusted: false
  });
  const [inputError, setInputError] = useState("");

  const RPC_URL = process.env.REACT_APP_STELLAR_TESTNET_RPC_URL;
  const ASSET_CODE = process.env.REACT_APP_ASSET_CODE;
  const ASSET_ISSUER = process.env.REACT_APP_ASSET_ISSUER;
  const CONTRACT_PUBLIC_KEY = process.env.REACT_APP_STELLAR_ASSET_CONTRACT_MANAGER_PUBLIC_KEY;
  const ASSET_CONTRACT_ADDRESS = process.env.REACT_APP_ASSET_CONTRACT_ADDRESS;

  useEffect(() => {
    const checkTrustlineStatus = async () => {
      if (!publicKey) return;

      const localTrust = localStorage.getItem(`trustline_${publicKey}`);
      let trustFromLocal = null;

      if (localTrust) {
        try {
          trustFromLocal = JSON.parse(localTrust);
          setTrustlineStatus(trustFromLocal);
        } catch {
          console.warn("Corrupt trustline data in localStorage");
        }
      }

      try {
        const accountResponse = await axios.get(`${RPC_URL}/accounts/${publicKey}`);
        const balances = accountResponse.data.balances;
        const isTrustedOnChain = balances.some(
          (balance) =>
            balance.asset_code === ASSET_CODE &&
            balance.asset_issuer === ASSET_ISSUER
        );

        if (!trustFromLocal || trustFromLocal.isTrusted !== isTrustedOnChain) {
          const updatedStatus = {
            accountInfo: accountResponse.data,
            isTrusted: isTrustedOnChain,
          };
          setTrustlineStatus(updatedStatus);
          localStorage.setItem(`trustline_${publicKey}`, JSON.stringify(updatedStatus));
        }
      } catch (err) {
        console.warn("Couldn't verify trustline from chain:", err);
      }
    };

    checkTrustlineStatus();
  }, [publicKey]);

  const EstablishTrustlineHandler = async () => {
    try {
      const result = await EstablishTrustline(RPC_URL, ASSET_CODE, ASSET_ISSUER, publicKey, kit);

      const verifyResponse = await axios.get(`${RPC_URL}/accounts/${publicKey}`);
      const balances = verifyResponse.data.balances;
      const trustExists = balances.some(
        (balance) =>
          balance.asset_code === ASSET_CODE && balance.asset_issuer === ASSET_ISSUER
      );

      const updatedStatus = {
        accountInfo: result,
        isTrusted: trustExists,
      };
      setTrustlineStatus(updatedStatus);
      localStorage.setItem(`trustline_${publicKey}`, JSON.stringify(updatedStatus));

      if (trustExists) {
        toast.success('Trustline established successfully!');
      }
    } catch (error) {
      console.error("Failed to establish trustline", error);
      setTrustlineStatus((prev) => ({
        ...prev,
        isTrusted: false
      }));
      localStorage.setItem(`trustline_${publicKey}`, JSON.stringify({
        ...trustlineStatus,
        isTrusted: false
      }));
      toast.error('Failed to establish trustline.');
    }
  };

  const BuyRealtyTokenHandler = async () => {
    if (!propertyToken || Number(propertyToken) <= 0) {
      setInputError("Please enter a valid token amount.");
    
      // Automatically clear the error after 5 seconds
      setTimeout(() => setInputError(""), 5000);
    
      return;
    }
  
    setInputError("");
  
    await BuyRealtyToken(
      RPC_URL,
      CONTRACT_PUBLIC_KEY,
      ASSET_CONTRACT_ADDRESS,
      propertyToken,
      publicKey,
      kit
    );
  
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
              disabled={!trustlineStatus.isTrusted}
              className={`w-full p-4 rounded-xl border-2 ${
                !trustlineStatus.isTrusted
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "border-rocPurple-300 text-rocPurple-300"
              } focus:outline-none focus:border-rocPurple-300 font-manrope`}
              placeholder={
                !trustlineStatus.isTrusted ? "Build trustline first" : "ENTER TOKEN AMOUNT (MAX 10)"
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
                className={`font-bold w-full rounded-full py-2 flex justify-center items-center ${
                  trustlineStatus.isTrusted
                    ? "rounded-full border-2 border-rocGreen-800 text-rocGreen-800 bg-rocGreen-200 cursor-default"
                    : publicKey
                    ? "bg-rocBlue-100 text-rocWhite-900 border border-[#1a54da] hover:bg-rocWhite-900 hover:text-rocBlack-100"
                    : "bg-[#808080] text-rocWhite-900 cursor-not-allowed"
                }`}
                onClick={EstablishTrustlineHandler}
                disabled={!publicKey || trustlineStatus.isTrusted}
              >
                {trustlineStatus.isTrusted ? "Trusted" : "Build Trustline"}
              </button>

              <button
                className={`font-bold w-full rounded-full py-2 ${
                  publicKey && trustlineStatus.isTrusted
                    ? "bg-rocBlue-100 text-rocWhite-900 border border-[#1a54da] hover:bg-rocWhite-900 hover:text-rocBlack-100"
                    : "bg-[#808080] text-rocWhite-900 cursor-not-allowed"
                }`}
                onClick={BuyRealtyTokenHandler}
                disabled={!publicKey || !trustlineStatus.isTrusted}
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
