import { Title } from "components";

const ASSET_CONTRACT_ADDRESS = process.env.REACT_APP_ASSET_CONTRACT_ADDRESS;
const STELLAR_ASSET_CONTRACT_MANAGER_PUBLIC_KEY = process.env.REACT_APP_STELLAR_ASSET_CONTRACT_MANAGER_PUBLIC_KEY

const documents = [
  {
    id: 1,
    name: "Stellar Asset Contract",
    url: `https://stellar.expert/explorer/testnet/contract/${ASSET_CONTRACT_ADDRESS}`,
  },
  {
    id: 2,
    name: "Stellar Asset Manager Contract",
    url: `https://stellar.expert/explorer/testnet/contract/${STELLAR_ASSET_CONTRACT_MANAGER_PUBLIC_KEY}`,
  },
];

const Documents = () => {
  return (
    <div className="space-y-3">
      <Title className={"pt-2 pb-4"}>DOCUMENTS</Title>
      <div className="space-y-4">
        {documents.map((item) => {
          return (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-rocWhite-900 flex justify-between rounded-full bg-rocBlue-100 shadow py-3 px-4 items-center border border-[#1a54da] hover:bg-rocWhite-900 hover:text-rocBlack-100"
            >
              <div className="flex space-x-1 items-center">
                <h6 className="font-xl font-bold">
                  {item.name}
                </h6>
              </div>
              {/* <Browser /> */}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Documents;
