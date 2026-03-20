import { ethers } from "ethers";
import campaignFactoryAbi from "./campaignFactoryAbi";

const factoryAddress = import.meta.env.VITE_CAMPAIGN_FACTORY_ADDRESS;

export async function getFactoryContract() {
  if (!window.ethereum) {
    throw new Error("MetaMask not found");
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const contract = new ethers.Contract(
    factoryAddress,
    campaignFactoryAbi,
    signer
  );

  return contract;
}