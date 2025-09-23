import { Bedroom, Bathroom, YearBuilt, Area } from "assets/svgs/property";
import { LoadingContainer, Title } from "components";
import { useMarketPlace } from "hooks";
import {
  Slider,
  SaleTimer,
  PropertyPriceCard,
  BuyPropertyCard,
  Documents,
} from "modules/marketplace";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { DamacLogo } from "assets/images";

const imageURL1 = 
  [
    "https://mma.prnasia.com/media2/1629472/DAMAC_Properties.jpg?p=publish",
    "https://rangewebsite2023.s3.ap-south-1.amazonaws.com/projects/2453/DAMAC-Cavalli-Tower-Exteriors-5-%281%29.jpg",
    "https://i.ytimg.com/vi/8NrH14M3zdk/maxresdefault.jpg",
    "https://dubai-luxury.property/uploads/images/2021-08/36397ed90c409fbf3443407418241568.jpg"
    
  ]

const MarketPlaceDetailPage = ({publicKey, kit}) => {
  const [isLoading, setLoading] = useState(false);
  const [loadingType, setLoadingType] = useState("");

  const { stellarContractAllAssets } = useMarketPlace();
  const params = useParams();  

  const currentAsset = stellarContractAllAssets[Number(params.id) - 1]

  return (
    <LoadingContainer
      isLoading={false}
      isError={false}
      errorMessage={"Error loading marketplace details data"}
    >
      <div className="flex flex-col lg:flex-row space-x-4 py-2">
        <div className="h-full w-full lg:w-[68%] space-y-8">
          <div className="hidden lg:flex justify-between items-center">
            <Title>DETAILS</Title>
            <h6 className="font-bold text-5xl font-prompt text-rocPurple-800">
              <img
                src={DamacLogo}
                alt={"Damac"}
                className="object-fill h-4.5 w-auto"
              />
            </h6>
          </div>
          <Slider
            title={currentAsset?.name}
            location={currentAsset?.location}
            images={currentAsset?.images || [imageURL1]}
            type={currentAsset?.type}
            hideTopBar
          />
          <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-2 space-y-6 lg:space-y-0 items-center">
            <div className="w-full border-2 border-rocPurple-800 rounded-xl px-3 py-7 relative flex justify-center items-center">
              <div className="absolute -top-4 rounded-3xl flex space-x-2 items-center px-8 lg:px-2 py-1 bg-rocPurple-800 text-rocWhite-900 ">
                <h6 className="text-sm lg:text-lg font-bold whitespace-nowrap font-manrope">{`BEDROOMS`}</h6>
              </div>
              <div className="flex space-x-2 items-center p-1 justify-center">
                <Bedroom />
                <h6 className="text-rocPurple-800 font-bold text-lg">{`${
                  currentAsset?.bedrooms || 0
                }`}</h6>
              </div>
            </div>
            <div className="w-full border-2 border-rocPurple-800 rounded-xl px-3 py-7 relative flex justify-center items-center">
              <div className="absolute -top-4 rounded-3xl flex space-x-2 items-center px-8 lg:px-2 py-1 bg-rocPurple-800 text-rocWhite-900 ">
                <h6 className="text-sm lg:text-lg font-bold whitespace-nowrap font-manrope">{`BATHROOMS`}</h6>
              </div>
              <div className="flex space-x-2 items-center p-1 justify-center">
                <Bathroom />
                <h6 className="text-rocPurple-800 font-bold text-lg">{`${
                  currentAsset?.bathrooms || 0
                }`}</h6>
              </div>
            </div>
            <div className="w-full border-2 border-rocPurple-800 rounded-xl px-3 py-7 relative flex justify-center items-center">
              <div className="absolute -top-4 rounded-3xl flex space-x-2 items-center px-8 lg:px-2 py-1 bg-rocPurple-800 text-rocWhite-900 ">
                <h6 className="text-sm lg:text-lg font-bold whitespace-nowrap font-manrope">{`AREA`}</h6>
              </div>
              <div className="flex space-x-2 items-center p-1 justify-center">
                <Area />
                <h6 className="text-rocPurple-800 font-bold text-lg whitespace-nowrap">
                  {`${currentAsset?.area} sqft`}
                </h6>
              </div>
            </div>
            <div className="w-full border-2 border-rocPurple-800 rounded-xl px-3 py-7 relative flex justify-center items-center">
              <div className="absolute -top-4 rounded-3xl flex space-x-2 items-center px-8 lg:px-2 py-1 bg-rocPurple-800 text-rocWhite-900 ">
                <h6 className="text-sm lg:text-lg font-bold whitespace-nowrap font-manrope">{`YEAR BUILT`}</h6>
              </div>
              <div className="flex space-x-2 items-center p-1 justify-center">
                <YearBuilt />
                <h6 className="text-rocPurple-800 font-bold text-lg">{`${
                  currentAsset?.yearBuilt || 2024
                }`}</h6>
              </div>
            </div>
          </div>
          {/* For Mobile Part*/}
          <div className="block lg:hidden space-y-4">
            <SaleTimer />
            <PropertyPriceCard
              apr={15}
              price={currentAsset?.price | 1000000}
              irr={12}
              percentage={20}
              collected={currentAsset?.collected || 0}
            />
            <BuyPropertyCard
              isLoading={isLoading}
              loadingType={loadingType}
              publicKey={publicKey}
              kit={kit}
            />
            <Documents />
          </div>
        </div>
        {/* For Desktop Part*/}
        <div className="hidden lg:block h-full w-full  lg:w-[32%] space-y-6">
          <SaleTimer />
          <PropertyPriceCard
            apr={15}
            price={currentAsset?.price | 1000000}
            irr={12}
            percentage={20}
            collected={currentAsset?.collected || 0}
          />
          <BuyPropertyCard
            isLoading={isLoading}
            loadingType={loadingType}
            publicKey={publicKey}
            kit={kit}
          />
          <Documents />
        </div>
      </div>
    </LoadingContainer>
  );
};

export default MarketPlaceDetailPage;
