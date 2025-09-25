import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import assetManagerArtifact from "../../contract-artifacts/HederaAssetManagerContract.json";
import { useWalletInterface } from "../../services/wallets/useWalletInterface";
import { ContractId, ContractFunctionParameters, Hbar } from "@hashgraph/sdk";


// ---- Contract (testnet) ----
const CONTRACT_ID = process.env.REACT_APP_HEDERA_ASSET_CONTRACT_ID
const CONTRACT_EVM_ADDRESS = process.env.REACT_APP_HEDERA_ASSET_CONTRACT_ADDRESS; // 0.0.6873175
const ASSET_TOKEN_EVM_ADDRESS = process.env.REACT_APP_HEDERA_ASSET_TOKEN_ADDRESS; // 0.0.6873059

const ABI = assetManagerArtifact.abi;

const BuyRealtyToken = async (accountId) => {

  console.log("CHECK1",)

    if (!accountId) {
        alert("🚫 Wallet not connected.");
        return;
    }

    try {

      console.log("Click worked!")

    }

    catch(error) {
      // Return the Call Alert
      console.error('❌ Failed to buy tokens:', error.submitResponse?.data || error.message);
    }
    
}

export default BuyRealtyToken;