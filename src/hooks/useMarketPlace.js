import { useEffect, useState } from "react";
// Stellar
// import { FetchStellarContractAssets } from "modules/marketplace"; // Front-end Call
import { getStellarContractAssets } from "api"; // Backend Call
import { DamacCavalli1, DamacCavalli2, DamacCavalli3, DamacCavalli4 } from "assets/images";

// Stellar

const API_STELLAR_EXPERT = process.env.REACT_APP_API_STELLAR_EXPERT

const useMarketPlace = () => {
  const [marketPlaceAssets, setMarketPlaceAssets] = useState([]);
  const [highlightedMarketplaceAssets, setHighlightedMarketplaceAssets] = useState([]);
  const [stellarContractAllAssets, setStellarContractAllAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setErrorFetching] = useState(false);
  

  const FetchStellarContractAllAssets = async () => {
    setLoading(true);
    try {

      // Stellar
      const fetchStellarAssets = await getStellarContractAssets(API_STELLAR_EXPERT)
      const stellarContractAssetsFetched = fetchStellarAssets.result

      // Stellar

      const stellarContractAllTokens = stellarContractAssetsFetched?.map((item, index) => ({
        ...item,
        type: "OPEN",
        location: "Dubai",
        media: "",
        collected: (
          ((10000 * Math.pow(10,7) - item?.balance ) / Math.pow(10,7))
        ) / 100,
        price: Math.pow(10,6),
      }));

      let stellarContractAllAssets = stellarContractAllTokens.filter(item => item.asset !== "XLM");

      // For Property Details Page Update - POC 1 Tokenized Asset
      stellarContractAllAssets = stellarContractAllAssets.slice(0,1).map((item) => {
        if (item.asset.startsWith("T001")) {
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
        } // else if (item.asset.startsWith("T002")) {
          // return {
          //   ...item,
          //   asset_name: "Aykon City Tower B",
          //   asset_location: "Dubai",
          //   asset_image_link: "https://ipfs.io/ipfs/QmS8sW4sH1wMqkfPZHHMoFni4BKu82e5riVibQh6JB5GZB",
          //   total_assets_available: "2000",
          // };
        // } 
        else  {
          return item; 
        }
      });

      setMarketPlaceAssets(stellarContractAllAssets.slice(1))         // Everything except the highligted asset
      setHighlightedMarketplaceAssets(stellarContractAllAssets[0]);   // Highligted asset
      setStellarContractAllAssets(stellarContractAllAssets);          // All Assets

      const dataToStore = {
        marketplaceAssets: stellarContractAllAssets.slice(1),
        highlightedMarketplaceAssets: stellarContractAllAssets[0],
        stellarContractAllAssets: stellarContractAllAssets,
      };

      const currentTime = new Date().getTime();
      sessionStorage.setItem("marketPlaceData", JSON.stringify(dataToStore));
      sessionStorage.setItem("marketPlaceTimestamp", currentTime.toString());
      
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      setErrorFetching(true);
    }
  };

  useEffect(() => {
    const storedData = sessionStorage.getItem("marketPlaceData");
    const storedTimestamp = sessionStorage.getItem("marketPlaceTimestamp");
    const currentTime = new Date().getTime();
    if (
      storedData &&
      storedTimestamp &&
      currentTime - parseInt(storedTimestamp) < 600000
    ) {
      const parsedData = JSON.parse(storedData);
      setMarketPlaceAssets(parsedData.marketplaceAssets);
      setHighlightedMarketplaceAssets(parsedData.highlightedMarketplaceAssets);
      setStellarContractAllAssets(parsedData.stellarContractAllAssets);
    } else {
      FetchStellarContractAllAssets();
    }
  }, []);

  return { loading, isError, marketPlaceAssets, highlightedMarketplaceAssets, stellarContractAllAssets };
};

export { useMarketPlace };
