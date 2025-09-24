import { MarketCard, MarketCard2, Banner, Slider } from "modules/marketplace";
import PropertDetail from "modules/marketplace/PropertyDetail";
import { LoadingContainer } from "components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMarketPlace } from "hooks";
import { DamacCavalli1, DamacCavalli2, DamacCavalli3, DamacCavalli4 } from "assets/images";


const { Title } = require("components");

const MarketplacePage = () => {
  const { loading, isError, highlightedHederaMarketplaceAssets } =
    useMarketPlace();
  const [filter, setFilter] = useState("all");
  const onChangeFilter = (filter) => setFilter(filter);
  const navigator = useNavigate();

  /* Hedera Deneme 
  
  const denemeFunc = async () => {

    const TARGET_TOKEN = "0.0.6873059";

    const fetchHederaAssets = await axios.get("https://testnet.mirrornode.hedera.com/api/v1/accounts/0.0.6873175")
    const hederaContractAssetsFetched = fetchHederaAssets.data.balance.tokens
    console.log("MARKETPLACEPAGE1:", hederaContractAssetsFetched)

    const hederaContractAllTokens = hederaContractAssetsFetched?.map((item, index) => ({
      ...item,
      type: "OPEN",
      location: "Dubai",
      media: "",
      collected:
        ((10000 * Math.pow(10, 7) - item?.balance) / Math.pow(10, 7)) / 100,
      price: Math.pow(10, 6),
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


    })

    console.log("1:", hederaContractTokenizedAsset.slice(0))
    console.log("2:", hederaContractTokenizedAsset[0])
    console.log("3:", hederaContractTokenizedAsset)
  }

  
  console.log("What is going on?")

  useEffect(() => {
    denemeFunc(); // will run once after component mounts
  }, []);


  */









  // ---------------------------------------------

  console.log("highlightedHederaMarketplaceAssets123:", highlightedHederaMarketplaceAssets)

  // console.log("highlightedMarketplaceAssetsOnMarketplace", highlightedMarketplaceAssets)

  return (
    <LoadingContainer
      isLoading={loading}
      isError={isError}
      errorMessage={"Error loading, please try again later"}
    >
      <div className="space-y-6">
       <Title
         className={"text-center md:text-left pt-2"}
       >{`MARKETPLACE`}</Title>
        <div className="block md:flex flex-col md:flex-col lg:flex-row space-x-4 md:space-x-0 lg:space-x-4 space-y-0 md:space-y-6 lg:space-y-0 h-full rounded-2xl bg-rocWhite-300 p-2">
          <div className="h-full md:w-full lg:w-[68%] space-y-4">
            <Slider
              onClick={() =>
                navigator(`/property/1`)
              }
              title={"Cavalli Apartment 1"}
              location={highlightedHederaMarketplaceAssets?.location}
              images={
                [
                  DamacCavalli1,
                  DamacCavalli2,
                  DamacCavalli3,
                  DamacCavalli4
                ]
              }
              type={highlightedHederaMarketplaceAssets?.type}
            />
          </div>
            <div className="pt-10 md:pt-0 h-full md:w-full lg:w-[32%] space-y-6">
            <PropertDetail
              id={"1"}
              price={highlightedHederaMarketplaceAssets?.price}
              apr={15}
              irr={12}
              bedrooms={1}
              bathrooms={1}
              area={86}
              collected={highlightedHederaMarketplaceAssets.collected}
            />
          </div>
        </div>
      </div>
    </LoadingContainer>
  );
};

export default MarketplacePage;
