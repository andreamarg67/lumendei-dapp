//connectWallet.ts

import { BrowserProvider, Contract } from "ethers";
import LumenDeiFundABI from "../constants/LumenDeiFundABI.json"; // ✅ Import ABI JSON if available

// ✅ Correctly export contract address and ABI
export const CONTRACT_ADDRESS = '0x3584A30cE9043eABD8d676c74d1B8E9a0d1C4f0';  // Replace with actual address

// ✅ Export ABI from JSON or directly add it here
export const CONTRACT_ABI = LumenDeiFundABI.abi || [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "investor",
        type: "address",
      },
    ],
    name: "APIKeyRequested",
    type: "event",
  },
  // Add more ABI elements here if necessary
];

// ✅ Connect Wallet and Get Contract Instance
export const connectWallet = async () => {
  // Check if MetaMask is installed
  if (!window.ethereum) {
    alert("MetaMask is not installed. Please install it to use this DApp.");
    return null;
  }

  // Create a provider from MetaMask
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  try {
    // Request wallet connection
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const userAddress = accounts[0];

    // Connect to the smart contract
    const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    console.log("✅ Wallet connected and contract loaded!");
    return { userAddress, contract };
  } catch (error) {
    console.error("Error connecting wallet:", error);
    return null;
  }
};
