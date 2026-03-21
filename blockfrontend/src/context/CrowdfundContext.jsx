import { createContext, useContext, useState } from "react";
import { ethers } from "ethers";
import { getFactoryContract } from "../contracts/getFactoryAdress";
import campaignFactoryAbi from "../contracts/campaignFactoryAbi";

const CrowdfundContext = createContext();

const networks = {
  sepolia: {
    chainId: "0xaa36a7",
    chainName: "Sepolia",
    nativeCurrency: {
      name: "Sepolia ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://ethereum-sepolia-rpc.publicnode.com"],
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
  },
};

const CAMPAIGN_DURATION_DAYS = 30;
const SEPOLIA_RPC_URL = "https://ethereum-sepolia-rpc.publicnode.com";
const CAMPAIGN_ABI = ["function receivedAmount() view returns (uint256)"];
const CAMPAIGN_DETAILS_ABI = [
  "function getCampaignDetails() view returns (string,uint256,string,string,string,address,uint256)",
];
const CREATED_EVENT_NAMES = ["CampaignCreated", "campaignCreated"];

export const CrowdfundProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [balance, setBalance] = useState("");

  const factoryAddress = import.meta.env.VITE_CAMPAIGN_FACTORY_ADDRESS;
  const ipfsToGatewayUrl = (value) => {
    if (!value) return "";
    if (value.startsWith("http")) return value;
    return `https://${import.meta.env.VITE_PINATA_GATEWAY}/ipfs/${value}`;
  };

  const normalizeCampaign = (raw, amountCollectedWei = 0n) => {
    const target = ethers.formatEther(raw.requiredAmount);
    const amountCollected = ethers.formatEther(amountCollectedWei);

    const createdAtSecondsRaw = Number(raw.timeStamp);
    const createdAtSeconds =
      Number.isFinite(createdAtSecondsRaw) && createdAtSecondsRaw > 0
        ? createdAtSecondsRaw
        : Math.floor(Date.now() / 1000);
    const deadline = new Date(
      (createdAtSeconds + CAMPAIGN_DURATION_DAYS * 24 * 60 * 60) * 1000
    ).toISOString();

    const normalizedCategory =
      typeof raw.category === "string" ? raw.category : "Community";

    return {
      id: raw.campaignAddress,
      owner: raw.owner,
      title: raw.title,
      description: raw.campaignStory,
      target,
      deadline,
      amountCollected,
      image: ipfsToGatewayUrl(raw.imgUrl),
      category: normalizedCategory,
      campaignAddress: raw.campaignAddress,
      timeStamp: createdAtSeconds,
      txHash: raw.txHash,

      // Keep old keys too so existing components don't break.
      requiredAmount: target,
      story: raw.campaignStory,
      imgUrl: ipfsToGatewayUrl(raw.imgUrl),
    };
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask");
        return;
      }

      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: networks.sepolia.chainId }],
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [networks.sepolia],
          });
        } else {
          throw switchError;
        }
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const userAddress = await signer.getAddress();
      const userBalance = await provider.getBalance(userAddress);

      setAddress(userAddress);
      setBalance(ethers.formatEther(userBalance));
    } catch (error) {
      console.error("Wallet connection error:", error);
    }
  };

  const createCampaign = async (formData) => {
    try {
      const contract = await getFactoryContract();

      const tx = await contract.createCampaign(
        formData.campaignTitle,
        ethers.parseEther(formData.requireCampaignAmount.toString()),
        formData.imgUrl,
        formData.campaignCategory,
        formData.campaignStory
      );

      const receipt = await tx.wait();

      const log = receipt.logs.find((oneLog) => {
        try {
          const parsed = contract.interface.parseLog(oneLog);
          return parsed && CREATED_EVENT_NAMES.includes(parsed.name);
        } catch {
          return false;
        }
      });

      if (!log) {
        console.log("No campaign creation event found in receipt");
        return null;
      }

      const decoded = contract.interface.parseLog(log);
      const args = decoded.args;

      let receivedAmount = 0n;
      try {
        const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);
        const campaignContract = new ethers.Contract(
          args.campaignAddress,
          CAMPAIGN_ABI,
          provider
        );
        receivedAmount = await campaignContract.receivedAmount();
      } catch (amountError) {
        console.warn("Could not fetch received amount for new campaign", amountError);
      }

      const campaign = normalizeCampaign(
        {
          title: args.title,
          requiredAmount: args.requiredAmount,
          owner: args.owner,
          campaignAddress: args.campaignAddress,
          imgUrl: args.imgUrl,
          category: formData.campaignCategory || args.category,
          campaignStory: args.campaignStory,
          timeStamp: Number(args.timeStamp),
          txHash: tx.hash,
        },
        receivedAmount
      );

      setCampaigns((prev) => [campaign, ...prev]);
      return campaign;
    } catch (error) {
      console.error("Create campaign error:", error);
      throw error;
    }
  };

  const getCampaigns = async () => {
    try {
      if (!factoryAddress) {
        console.error("VITE_CAMPAIGN_FACTORY_ADDRESS is missing");
        return [];
      }

      const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);
      const contract = new ethers.Contract(factoryAddress, campaignFactoryAbi, provider);

      const deployedCampaignAddresses = await contract.getDeployedCampaigns();
      const latestFirstAddresses = [...deployedCampaignAddresses].reverse();

      const campaignsFromChain = await Promise.all(
        latestFirstAddresses.map(async (campaignAddress, index) => {
          const campaignContract = new ethers.Contract(
            campaignAddress,
            CAMPAIGN_DETAILS_ABI,
            provider
          );

          const details = await campaignContract.getCampaignDetails();
          const title = details[0];
          const requiredAmount = details[1];
          const image = details[2];
          const category = details[3];
          const story = details[4];
          const owner = details[5];
          const receivedAmount = details[6];

          return normalizeCampaign(
            {
              title,
              requiredAmount,
              owner,
              campaignAddress,
              imgUrl: image,
              category,
              campaignStory: story,
              timeStamp: Math.floor(Date.now() / 1000) - index,
              txHash: null,
            },
            receivedAmount
          );
        })
      );

      setCampaigns(campaignsFromChain);
      return campaignsFromChain;
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      return [];
    }
  };

  const donate = async (pId, amount) => {
    console.log("Donating", amount, "to campaign", pId);
  };

  const getDonations = async (pId) => {
    return [];
  };

  return (
    <CrowdfundContext.Provider
      value={{
        address,
        balance,
        connectWallet,
        createCampaign,
        getCampaigns,
        donate,
        getDonations,
        campaigns,
        setCampaigns,
      }}
    >
      {children}
    </CrowdfundContext.Provider>
  );
};

export const useCrowdfund = () => useContext(CrowdfundContext);
