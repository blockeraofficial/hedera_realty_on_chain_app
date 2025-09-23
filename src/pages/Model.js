import { BmMap } from "assets/images";

const Paragraphs = 
[
  `The State of Wyoming has introduced a unique regulatory framework specifically designed for Decentralized
  Autonomous Organizations (DAOs). Under these regulations, Wyoming allows the formation of a DAO as a
  Limited Liability Company (LLC) with distinct attributes. Governance of a Wyoming DAO LLC can be managed
  by its members, which is similar to a traditional LLC or, in the case of algorithmically managed DAOs, by smart
  contracts that encode decision-making processes, reflecting the typical DAO model. A key advantage of the
  Wyoming DAO LLC structure is its ability to limit personal liability, ensuring that members are not personally
  responsible for the financial obligations or legal liabilities of the organization.`,

  `The ROC decentralized application benefits from the crypto laws adopted in Wyoming. Each tokenized
  real estate asset sold is owned and managed by a DAO LLC incorporated in Wyoming. For every asset, we
  establish a dedicated DAO LLC and add the individual investors as members. This structure grants them
  ownership, profit-sharing rights, and the ability to participate in governance decisions. The entire process
  is transparently recorded on the blockchain, including key details such as the property title deed, which is
  held by the DAO LLC.`,

  `A DAO LLC is also a great way to ensure the opinions of all investors 
  are considered. Each member within the DAO possesses the ability to 
  impact the organisation’s governance by presenting proposals during 
  the DAO’s all-inclusive membership gathering. Once a proposal is sub-
  mitted by a DAO member, all members are empowered to participate in 
  a vote that will decide its outcome.`,
];

const ModelPage = () => {
  return (
    <div className="space-y-6">
      <div className="p-4 md:p-6 text-center">
        <h1 className="font-bold font-prompt text-3xl md:text-2xl lg:text-4xl text-rocPurple-800 font-prompt">{`COMPLIANCE`}</h1>
      </div>
      <div className="rounded-2xl bg-rocWhite-300 p-4 space-y-4 font-manrope">
        {Paragraphs.map((item, index) => (
          <p
            key={index}
            className="text-lg font-light text-rocPurple-800 text-justify"
          >
            {item}
          </p>
        ))}
        {/* 
        <div className="flex justify-center items-center">
          <img src={BmMap} alt="illustration" />
        </div>
        */}
      </div>
    </div>
  );
};

export default ModelPage;
