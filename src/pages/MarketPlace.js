import { Slider } from "modules/marketplace";
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
