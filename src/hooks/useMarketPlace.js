import { useEffect, useState } from "react";
import { DamacCavalli1, DamacCavalli2, DamacCavalli3, DamacCavalli4 } from "assets/images";
import axios from "axios";


const API_HEDERA_MIRRORNODE = process.env.REACT_APP_API_HEDERA_MIRRORNODE

const useMarketPlace = () => {
  const [marketPlaceAssets, setMarketPlaceAssets] = useState([]);
  const [highlightedMarketplaceAssets, setHighlightedMarketplaceAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setErrorFetching] = useState(false);

  // Hedera

    // Hedera Implementation

    const TARGET_TOKEN = process.env.REACT_APP_HEDERA_ASSET_CONTRACT_ID;

    function extractTargetToken(obj) {
      const tokens = obj?.tokens ?? obj?.balance?.tokens ?? [];
      return tokens.filter((t) => t.token_id === TARGET_TOKEN);
    }

    // Always show EXACTLY 3 decimals
    function formatHbarFixed(tinybar) {
      const n = Number(tinybar ?? 0) / 10 ** 8;
      return n.toFixed(3); // <- fixed 3 decimals, never trimmed
    }

    const [HederaMarketplaceAssets, setHederaMarketplaceAssets] = useState([]);
    const [highlightedHederaMarketplaceAssets, setHederaHighlightedMarketplaceAssets] = useState([]);
    const [hederaContractAllAssets, setHederaContractAllAssets] = useState([]);

    const FetchHederaContractAllAssets = async () => {
    setLoading(true)

    try {

      const fetchHederaAssets = await axios.get(API_HEDERA_MIRRORNODE)
      const hederaContractAssetsFetched = fetchHederaAssets.data.balance.tokens

      console.log("hederaContractAssetsFetched:", hederaContractAssetsFetched)
      // console.log("cleanHederaAssets:", cleanHederaAssets);
      // const assetContractCurrentTokenAmount = extractTargetToken(cleanHederaAssets)[0].balance / (10**8);
      // 
      // console.log("fetchHederaAssets", assetContractCurrentTokenAmount);

      // Map the fetched tokens into structured objects
      const hederaContractAllTokens = hederaContractAssetsFetched?.map((item, index) => ({
        ...item,
        type: "OPEN",
        location: "Dubai",
        media: "",
        // If the collected is 0, the app breaks
        collected:
          ((10000 * Math.pow(10, 8) - item?.balance) / Math.pow(10, 8)) / 100,
        price: Math.pow(10, 6),  // Price is hard coded, change this later.
      }));

      console.log("hederaContractAllTokens:", hederaContractAllTokens)

      const hederaContractTokenizedAsset = hederaContractAllTokens.slice(0,1).map((item) => {
        if (item.token_id.startsWith(TARGET_TOKEN)) {
          return {
            ...item,
            name: "Cavalli Apartment 1",
            location: "Dubai",
            images:
                [
                  DamacCavalli1,
                  DamacCavalli2,
                  DamacCavalli3,
                  DamacCavalli4
                ],
            total_assets_available: "10000",
            bedrooms: 1,
            bathrooms: 1,
            area: 86,
            yearBuilt: 2025
          };
    
      // const hederaTokenAmount = formatHbarFixed(cleanHederaAssets.balance?.balance)
      // console.log("hederaTokenAmount", hederaTokenAmount);
      }

      console.log("1:", hederaContractTokenizedAsset.slice(0))
      // console.log("2:", hederaContractTokenizedAsset[0])
      // console.log("3:", hederaContractTokenizedAsset)
    
    })

    setHederaMarketplaceAssets(hederaContractTokenizedAsset.slice(0))
    setHederaHighlightedMarketplaceAssets(hederaContractTokenizedAsset.slice(0)[0])
    setHederaContractAllAssets(hederaContractTokenizedAsset)

    const dataToStore = {
      HederaMarketplaceAssets: hederaContractTokenizedAsset.slice(0),
      HederaHighlightedMarketplaceAssets: hederaContractTokenizedAsset[0],
      HederaContractAllAssets: hederaContractTokenizedAsset,
    };

    const currentTime = new Date().getTime();
    sessionStorage.setItem("marketPlaceData2", JSON.stringify(dataToStore));
    sessionStorage.setItem("marketPlaceTimestamp2", currentTime.toString());
// 
// 
  
      setLoading(false);
    } catch(error) {
      console.log("error:", error)
      setLoading(false);
      setErrorFetching(true);
    }

  }

  // ------------------------------------------------

  // Hedera Fetch

  useEffect(() => {
    const storedData = sessionStorage.getItem("marketPlaceData2");
    const storedTimestamp = sessionStorage.getItem("marketPlaceTimestamp2");
    const currentTime = new Date().getTime();
    if (
    storedData &&
    storedTimestamp &&
    currentTime - parseInt(storedTimestamp) < 600000
    
    ) {
    const parsedData = JSON.parse(storedData);
    setHederaMarketplaceAssets(parsedData.HederaMarketplaceAssets)
    setHederaHighlightedMarketplaceAssets(parsedData.HederaHighlightedMarketplaceAssets)
    setHederaContractAllAssets(parsedData.HederaContractAllAssets)

    console.log("HederaMarketplaceAssets STORAGEDATA1:", parsedData.HederaMarketplaceAssets)
    console.log("HederaHighlightedMarketplaceAssets STORAGEDATA2:", parsedData.HederaHighlightedMarketplaceAssets)
    console.log("HederaContractAllAssets STORAGEDATA3:", parsedData.HederaContractAllAssets)

    } else {
      FetchHederaContractAllAssets();
    }
  }, []);

  return { loading, isError, marketPlaceAssets, highlightedMarketplaceAssets,
    // Hedera
    HederaMarketplaceAssets, highlightedHederaMarketplaceAssets, hederaContractAllAssets
   };
};

export { useMarketPlace };
