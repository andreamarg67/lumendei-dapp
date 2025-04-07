import { BrowserProvider, Contract } from "ethers";
import LumenDeiFundABI from "../constants/LumenDeiFundABI.json"; // ✅ Import ABI JSON if available

// ✅ Correctly export contract address and ABI
export const CONTRACT_ADDRESS = '0x3584A30cE9043eABD8d676c74d1B8E9a0d1C4f0'; // Replace with actual address

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
  // ✅ Add more ABI elements here if necessary
];
