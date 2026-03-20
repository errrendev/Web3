// Minimal ABI for `campaignFactory` (factory contract that creates Campaign contracts)
// Source: blockchain/out/campaign.sol/campaignFactory.json (abi field)
const campaignFactoryAbi = [
  {
    type: "function",
    name: "createCampaign",
    inputs: [
      { name: "campaignTitle", type: "string", internalType: "string" },
      { name: "requireCampaignAmount", type: "uint256", internalType: "uint256" },
      { name: "imgUrl", type: "string", internalType: "string" },
      { name: "campaignCategory", type: "string", internalType: "string" },
      { name: "campaignStory", type: "string", internalType: "string" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "deployedCampaigns",
    inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "campaignCreated",
    anonymous: false,
    inputs: [
      { name: "title", type: "string", internalType: "string", indexed: false },
      { name: "requiredAmount", type: "uint256", internalType: "uint256", indexed: false },
      { name: "owner", type: "address", internalType: "address", indexed: true },
      { name: "campaignAddress", type: "address", internalType: "address", indexed: false },
      { name: "imgUrl", type: "string", internalType: "string", indexed: false },
      { name: "timeStamp", type: "uint256", internalType: "uint256", indexed: true },
      { name: "category", type: "string", internalType: "string", indexed: true },
      { name: "campaignStory", type: "string", internalType: "string", indexed: false },
    ],
  },
];

export default campaignFactoryAbi;

