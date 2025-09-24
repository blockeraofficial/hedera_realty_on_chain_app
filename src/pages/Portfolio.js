import { useEffect, useState } from "react";
import {
  ConfigurationWrapper,
  LoadingContainer,
  StatisticCard,
  Title,
} from "components";
import { Properties } from "modules/dashboard";
import { Verified } from "assets/svgs";
import FetchHederaAssets from "modules/dashboard/FetchHederaAssets";

// Hedera
import { useWalletInterface } from "../services/wallets/useWalletInterface";
import { ethers } from "ethers";
// ------------------------------------------------------------------------

// const RPC_URL = process.env.REACT_APP_STELLAR_TESTNET_RPC_URL;

// Hedera
const HEDERA_RPC_URL = process.env.REACT_APP_HEDERA_TESTNET_RPC_URL
// ------------------------------------------------------------------------

const DashboardPage = () => {

  // Hedera
  const [tokenizedAssets, setTokenizedAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const { accountId } = useWalletInterface() || {};
  const [isConnected, setIsConnected] = useState(false);
  const [testnetHBAR, setTestnetHBAR] = useState("0");
  const [tokenizedAssetCount, setTokenizedAssetCount] = useState("0");

  // Always show EXACTLY 3 decimals
  function formatHbarFixed(tinybar) {
    const n = Number(tinybar ?? 0) / 10 ** 8;
    return n.toFixed(3); // <- fixed 3 decimals, never trimmed
  }

  // ------------------------------------------------------------------------


  
  useEffect(() => {
    setIsConnected(Boolean(accountId));
    console.log("Portfolio Page:", accountId)
    const loadAssets = async () => {
      if (!accountId) return;
      setLoading(true);
      try {
      const result = await FetchHederaAssets(HEDERA_RPC_URL, accountId);
      const testnetHbarBalance = formatHbarFixed(result.balance.balance)
      setTestnetHBAR(testnetHbarBalance)
      // Later pass it dynamically
      const tokenizedAssetsFiltered = result.balance.tokens.filter(
        (t) => t.token_id === "0.0.6892385"
      );

      console.log("tokenizedAssetsFiltered:", tokenizedAssetsFiltered)
      // 
      setTokenizedAssets(tokenizedAssetsFiltered);
      // setTestnetXLM(((Number(nativeAsset?.balance)).toFixed(2).toString()) || "0");
      setTokenizedAssetCount(tokenizedAssetsFiltered.length || "0");
      setLoading(false);    
      } catch(error) {
        console.log("error", error);
        console.log("Where are you?")
        setError(true);
        setLoading(false);
      }  
    };
     loadAssets();
  }, [accountId]);

return (
    <LoadingContainer
      isLoading={loading}
      isError={isError}
      errorMessage={"Error loading, please try again later"}
    >
     
      <div className="space-y-4 p-1 pb-10">
        <div className="flex justify-center md:justify-between items-center">
          <Title className={"py-3"}>{`DASHBOARD`}</Title>
          <div className="hidden md:flex border-2 border-rocBlue-100 rounded-full py-1 px-2 space-x-2  items-center justify-center bg-rocBlue-100 text-rocWhite-900">
            <Verified />
            <h6 className="text-sm font-manrope">VERIFIED</h6>
          </div>
        </div>
        <ConfigurationWrapper isConnected={isConnected} accountId={accountId}>
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                <StatisticCard
                  title={"TESTNET HBAR BALANCE"}
                  value={`${testnetHBAR}`}
                />
                <StatisticCard
                  title={"TOKENIZED ASSETS COUNT"}
                  value={`${tokenizedAssetCount}`}
                />
              </div>
            </div>
            <Properties accountNfts={tokenizedAssets} />
            {/*
            <Earnings />
            <Transactions />
            */}
          </div>
        </ConfigurationWrapper>
      </div>

    </LoadingContainer>
      
    )
};

export default DashboardPage;
