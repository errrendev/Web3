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

export const CrowdfundProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [balance, setBalance] = useState("");

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

      await window.ethereum.request({
        method: "eth_requestAccounts",
      });

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

  const testContract = async () => {
    try {
      const contract = await getFactoryContract();
      console.log("Contract connected:", contract);
      alert("Contract connected successfully");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const createCampaign = async (formData) => {
    try {
      const contract = await getFactoryContract();

      console.log(
        "Factory address from env:",
        import.meta.env.VITE_CAMPAIGN_FACTORY_ADDRESS
      );
      console.log("Contract target:", contract.target);

      const tx = await contract.createCampaign(
        formData.campaignTitle,
        ethers.parseEther(formData.requireCampaignAmount.toString()),
        formData.imgUrl,
        formData.campaignCategory,
        formData.campaignStory
      );

      console.log("Transaction sent:", tx.hash);
      console.log("Transaction to:", tx.to);

      const receipt = await tx.wait();

      console.log("Campaign created successfully");
      console.log("Receipt:", receipt);

      const log = receipt.logs.find((log) => {
        try {
          const parsed = contract.interface.parseLog(log);
          return parsed && parsed.name === "campaignCreated";
        } catch {
          return false;
        }
      });

      if (!log) {
        console.log("No campaignCreated event found in receipt");
        return null;
      }

      const decoded = contract.interface.parseLog(log);
      const a = decoded.args;

      const campaign = {
        title: a.title,
        requiredAmount: ethers.formatEther(a.requiredAmount),
        owner: a.owner,
        campaignAddress: a.campaignAddress,
        imgUrl: a.imgUrl?.startsWith("http")
          ? a.imgUrl
          : `https://${import.meta.env.VITE_PINATA_GATEWAY}/ipfs/${a.imgUrl}`,
        category: a.category,
        story: a.campaignStory,
        timeStamp: a.timeStamp.toString(),
        txHash: tx.hash,
      };

      setCampaigns((prev) => [campaign, ...prev]);

      console.log("Decoded campaign:", campaign);

      return campaign;
    } catch (error) {
      console.error("Create campaign error:", error);
      throw error;
    }
  };

  const getCampaigns = async () => {
    try {
      const provider = new ethers.JsonRpcProvider(
        "https://ethereum-sepolia-rpc.publicnode.com"
      );

      const txHash = "0xc1beb738fbaaf94a2bbd096d465b9db3b359ff289a9612c5f375d8e4d722f33d";

      const receipt = await provider.getTransactionReceipt(txHash);

      if (!receipt) {
        console.log("Transaction not found");
        return [];
      }

      const iface = new ethers.Interface(campaignFactoryAbi);
      const factoryAddress =
        import.meta.env.VITE_CAMPAIGN_FACTORY_ADDRESS.toLowerCase();

      const log = receipt.logs.find((log) => {
        if (log.address.toLowerCase() !== factoryAddress) return false;

        try {
          const parsed = iface.parseLog(log);
          return parsed && parsed.name === "campaignCreated";
        } catch {
          return false;
        }
      });

      if (!log) {
        console.log("No campaignCreated event found for this transaction");
        return [];
      }

      const decoded = iface.parseLog(log);
      const a = decoded.args;

      const campaign = {
        title: a.title,
        requiredAmount: ethers.formatEther(a.requiredAmount),
        owner: a.owner,
        campaignAddress: a.campaignAddress,
        imgUrl: a.imgUrl?.startsWith("http")
          ? a.imgUrl
          : `https://${import.meta.env.VITE_PINATA_GATEWAY}/ipfs/${a.imgUrl}`,
        category: a.category,
        story: a.campaignStory,
        timeStamp: a.timeStamp.toString(),
        txHash,
      };

      console.log("Campaign:", campaign);

      setCampaigns([campaign]);
      return [campaign];
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
        testContract,
        campaigns,
        setCampaigns,
      }}
    >
      {children}
    </CrowdfundContext.Provider>
  );
};

export const useCrowdfund = () => useContext(CrowdfundContext);