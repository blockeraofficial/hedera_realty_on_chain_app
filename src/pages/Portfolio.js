import { useEffect, useState } from "react";
import {
  ConfigurationWrapper,
  LoadingContainer,
  StatisticCard,
  Title,
} from "components";
import { Properties } from "modules/dashboard";
import { Verified } from "assets/svgs";
import FetchAssets from "modules/dashboard/FetchAssets";



const RPC_URL = process.env.REACT_APP_STELLAR_TESTNET_RPC_URL;

const DashboardPage = ({ publicKey }) => {
  const [tokenizedAssets, setTokenizedAssets] = useState([]);
  const [tokenizedAssetCount, setTokenizedAssetCount] = useState("0");
  const [testnetXLM, setTestnetXLM] = useState("0");
  const [loading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const loadAssets = async () => {
      if (!publicKey) return;
      setLoading(true);
      try {
      const result = await FetchAssets(RPC_URL, publicKey);
      // console.log("Where is result?", result)
      
      const nativeAsset = result.find(item => item.asset_type === "native");
      const tokenizedAssetsFiltered = result.filter(item => item.asset_type !== "native");
      
      setTokenizedAssets(tokenizedAssetsFiltered);
      setTestnetXLM(((Number(nativeAsset?.balance)).toFixed(2).toString()) || "0");
      setTokenizedAssetCount(tokenizedAssetsFiltered.length || "0");
      setLoading(false);    
      } catch(error) {
        console.log("error", error);
        setError(true);
        setLoading(false);
      }  
    };
    loadAssets();
  }, [publicKey]);

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
        <ConfigurationWrapper publicKey={publicKey}>
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                <StatisticCard
                  title={"TESTNET XLM BALANCE"}
                  value={`${testnetXLM}`}
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
