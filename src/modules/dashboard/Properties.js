import { LocationPointer, Home } from "assets/svgs";
import { Title } from "components";
import { DamacCavalli1 } from "assets/images";

const assetIssuer = process.env.REACT_APP_ASSET_ISSUER

const Properties = ({ accountNfts }) => {
  
  // Necessary step to add front-end features on the tokens

  // For POC, keep 1 tokenized assets

  console.log("accountNfts:", accountNfts)

  // const enrichedAssets = accountNfts.slice(0,1).map((item) => {
  //   if (item.asset_code === "T001" && item.asset_issuer=== "GBBMT2OIPVZKBWTCVXATGZ25RPFRU6EBPC4PIOXLEYR5W3GCNVRYIOAX") {
  //     return {
  //       ...item,
  //       asset_name: "Cavalli Apartment 1",
  //       asset_location: "Dubai",
  //       asset_image_link: "https://mma.prnasia.com/media2/1629472/DAMAC_Properties.jpg?p=publish",
  //       total_assets_available: "10000",
  //     };
  //   } // else if (item.asset_code === "T002") {
  //     // return {
  //     //   ...item,
  //     //   asset_name: "Aykon City Tower B",
  //     //   asset_location: "Dubai",
  //     //   asset_image_link: "https://ipfs.io/ipfs/QmS8sW4sH1wMqkfPZHHMoFni4BKu82e5riVibQh6JB5GZB",
  //     //   total_assets_available: "2000",
  //     // };
  //   // } 
  //   else  {
  //     return item; 
  //   }
  // });

  const enrichedAssets = accountNfts
  .filter(
    (item) =>
      parseFloat(item?.balance) > 0 &&
      item.asset_code === "T001" &&
      item.asset_issuer === assetIssuer.toString()
  )
  .map((item) => ({
    ...item,
    asset_name: "Cavalli Apartment 1",
    asset_location: "Dubai",
    asset_image_link: DamacCavalli1,
    total_assets_available: "10000",
  }));

  console.log("enrichedAssets", enrichedAssets)

  const onClickClaim = () => {};

  return (
    <>
      <div className="flex justify-center md:justify-between items-center mb-4">
        <Title className={"py-3"}>{`MY PROPERTIES`}</Title>
        <div className="text-rocWhite-900 rounded-full py-2 px-4 bg-rocBlue-100 cursor-pointer items-center space-x-2 hidden md:flex">
          <h6 className="text-sm font-manrope font-bold">
            {`CLAIM ALL RENTS ($0)`}
          </h6>
        </div>
      </div>
      <div className="overflow-x-auto pb-10">
        <div className="w-[800px] lg:w-full">
          <div className="flex justify-between items-center">
            <h6 className="w-3/12 border-r border-rocPurple-800 text-md text-rocPurple-800 font-bold h-16 flex justify-center items-center font-manrope">
              Property
            </h6>
            <h6 className="w-3/12 border-r border-rocPurple-800 text-md text-rocPurple-800 font-bold h-16 flex justify-center items-center  font-manrope">
              Location
            </h6>
            <div className="w-2/12 border-r border-rocPurple-800 text-md text-rocPurple-800 font-bold h-16 flex justify-center items-center  font-manrope">
              <h6 className="w-20 text-center">Asset Balance</h6>
            </div>
            <div className="w-2/12 border-r border-rocPurple-800 text-md text-rocPurple-800 font-bold h-16 flex justify-center items-center  font-manrope">
              <h6 className="w-40 text-center">Total Asset Tokens Available</h6>
            </div>
            <h6 className="w-2/12 text-md text-rocPurple-800 font-bold h-16 flex justify-center items-center font-manrope">
              Claim Rent
            </h6>
          </div>
          <div className="space-y-2 mt-4">
            {enrichedAssets?.length === 0 && (
              <div className="flex items-center justify-center h-40">
                <h6 className="font-bold text-3xl text-rocRed-800 uppercase">
                  You don't have any properties yet
                </h6>
              </div>
            )}
            {enrichedAssets.map((item) => {
              return (
                <div
                  key={item.asset_code}
                  className="flex justify-between items-center bg-rocWhite-900 border-4 border-rocWhite-300 rounded-2xl"
                >
                  <h6 className="w-3/12 h-20 relative">
                    <img
                      src={item.asset_image_link}
                      className="w-full h-full rounded-l-2xl object-cover"
                      alt="house"
                    />
                    <div className="flex items-center absolute top-2 left-2 space-x-2 text-rocWhite-900 font-bold px-2 py-1 rounded-lg bg-[#290E4180]">
                      <Home />
                      <h6 className=" font-manrope">
                        {`${item?.asset_code}`}
                      </h6>
                    </div>
                  </h6>
                  <h6 className="w-3/12 px-2 py-6 flex space-x-2 items-center justify-center border-r-4 border-rocWhite-300">
                    <h6 className="font-bold text-md text-rocPurple-800 font-manrope">
                      {`${item?.asset_name}, ${item?.asset_location}` }
                    </h6>
                    <LocationPointer />
                  </h6>
                  <h6 className="w-2/12 px-4 py-6 text-center font-bold border-r-4 border-rocWhite-300 font-manrope">
                    {Number(item.balance)} (%
                    {((Number(item.balance) / Number(item.total_assets_available)) * 100).toFixed(2)})
                  </h6>
                  <h6 className="w-2/12 px-4 py-6 text-center font-bold border-r-4 border-rocWhite-300 font-manrope">
                    {Number(item.total_assets_available)}
                  </h6>
                  <di className="w-2/12 px-4 py-6 text-center">
                    <div
                      className="text-rocWhite-900 flex justify-center rounded-full py-2 px-4 bg-rocBlue-100 items-center space-x-2 cursor-pointer"
                      onClick={() => onClickClaim(item)}
                    >
                      <h6 className="text-sm font-manrope font-bold">
                        CLAIM ($0)
                      </h6>
                    </div>
                  </di>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Properties;
