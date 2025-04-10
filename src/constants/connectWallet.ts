import { BrowserProvider, Contract, JsonRpcSigner } from "ethers";
import LumenDeiFundABI from "./LumenDeiFundABI.json"; // Make sure the ABI is directly JSON (not .abi nested)

// ✅ Verified Proxy Contract Address on BSC Mainnet
export const CONTRACT_ADDRESS = "0xA01c717EB14f786d6a92aF2511DAF93D39E7a342";

// ✅ Reusable function to get contract instance
export const getLumenDeiContract = (
  providerOrSigner: BrowserProvider | JsonRpcSigner
) => {
  return new Contract(CONTRACT_ADDRESS, LumenDeiFundABI, providerOrSigner);
};
export const fetchReferralLink = async (
  provider: BrowserProvider,
  userAddress: string
): Promise<string> => {
  try {
    const signer = await provider.getSigner();
    const contract = getLumenDeiContract(signer);
    const link = await contract.getReferralLink(userAddress);
    return link;
  } catch (error) {
    console.error("Failed to fetch referral link:", error);
    throw error;
  }

};
export const CONTRACT_ABI = LumenDeiFundABI;