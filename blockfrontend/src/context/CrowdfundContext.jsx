import { createContext, useContext, useState } from "react";
import { ethers } from 'ethers'

const CrowdfundContext = createContext();



const networks = {
    polygonAmoy: {
        chainId: "0x13882", // 80002 in hex
        chainName: "Polygon Amoy Testnet",
        nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
        },
        rpcUrls: ["https://rpc-amoy.polygon.technology"],
        blockExplorerUrls: ["https://amoy.polygonscan.com"],
    },
};

export const CrowdfundProvider = ({ children }) => {
    const [address, setAddress] = useState(null);
    const [campaigns, setCampaigns] = useState([]);
    const [balance, setBalance] = useState([])

    // Connect wallet
    const connectWallet = async () => {
        try {
            if (!window.ethereum) return alert("Please install MetaMask");

            await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [networks.polygonAmoy],
            });

            const provider = new ethers.BrowserProvider(window.ethereum);

            // Getting the signer (the connected account)
            const signer = await provider.getSigner();

            // Getting the address and balance
            const userAddress = await signer.getAddress();
            const userBalance = await signer.provider.getBalance(userAddress);

            setAddress(userAddress);
            setBalance(ethers.formatEther(userBalance));
        } catch (error) {
            console.error(error);
        }
    };

    // Placeholder: create campaign
    const createCampaign = async (form) => {
        console.log("Creating campaign:", form);
    };

    // Placeholder: get campaigns
    const getCampaigns = async () => {
        return [];
    };

    // Placeholder: donate to campaign
    const donate = async (pId, amount) => {
        console.log("Donating", amount, "to campaign", pId);
    };

    // Placeholder: get donations
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
