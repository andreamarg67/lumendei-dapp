// InvestorOverview.tsx — Updated without Performance Chart

"use client";

import { BrowserProvider, Contract } from "ethers";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import { toast, Toaster } from "react-hot-toast";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import flameLogo from "../assets/lumen-flame.png";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants/connectWallet";
import ConnectWalletButton from './ConnectWalletButton'; // adjust the path as needed

export default function InvestorOverview() {
  const { address, isConnected } = useAccount();

  const [contract, setContract] = useState<Contract | null>(null);
  const [totalInvested, setTotalInvested] = useState("0");
  const [monthlyProfit, setMonthlyProfit] = useState("0");
  const [referralEarnings, setReferralEarnings] = useState("0");
  const [referralCode, setReferralCode] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [email, setEmail] = useState("");
  const [platform, setPlatform] = useState("Binance");
  const [cexWallet, setCexWallet] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [payoutWallet, setPayoutWallet] = useState("");

  useEffect(() => {
    const loadContract = async () => {
      if (typeof window !== "undefined" && window.ethereum && address) {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const instance = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        setContract(instance);
      }
    };
    loadContract();
  }, [address]);

  useEffect(() => {
    if (isConnected && contract) {
      fetchDashboardData();
    }
  }, [isConnected, contract]);

  const fetchDashboardData = async () => {
    if (!contract) return;
    try {
      const [invested, profit, referrals, code] = await Promise.all([
        contract.totalInvested(address),
        contract.monthlyProfit(address),
        contract.referralEarnings(address),
        contract.getReferralCode(address),
      ]);
      setTotalInvested(invested.toString());
      setMonthlyProfit(profit.toString());
      setReferralEarnings(referrals.toString());
      setReferralCode(code);
      setReferralLink(`https://lumen-dei.ai?ref=${code}`);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  const handleGenerateReferral = async () => {
    if (!contract) return;
    try {
      const tx = await contract.register();
      await tx.wait();
      toast.success("Referral link generated successfully!");
      fetchDashboardData();
    } catch (err) {
      console.error("Error generating referral:", err);
      toast.error("Failed to generate referral");
    }
  };

  const handleDeposit = async () => {
    if (!contract) return;
    try {
      const tx = await contract.deposit(referralCode, email, cexWallet, platform);
      await tx.wait();
      toast.success("Details submitted successfully");
    } catch (err) {
      console.error("Deposit error:", err);
      toast.error("Failed to submit");
    }
  };

  const handleWithdraw = async () => {
    if (!contract) return;
    try {
      const tx = await contract.withdraw(withdrawAmount);
      await tx.wait();
      toast.success("Withdrawal successful");
    } catch (err) {
      console.error("Withdraw error:", err);
      toast.error("Withdraw failed");
    }
  };

  const handleUpdatePayoutWallet = async () => {
    if (!contract) return;
    try {
      const tx = await contract.updatePayoutWallet(payoutWallet);
      await tx.wait();
      toast.success("Wallet updated");
    } catch (err) {
      console.error("Update wallet error:", err);
      toast.error("Failed to update wallet");
    }
  };

  return (
    <section className="min-h-screen bg-transparent px-4 py-36">
      <Toaster />

      <div className="flex flex-col items-center mb-8">
      <h2
      className="text-5xl font-normal text-transparent bg-clip-text text-center font-montserrat"
      style={{
      backgroundImage: `linear-gradient(to right, #b0822e, #fee4a3, #925008, #efca81)`,
      }}
    >  Empower Your Wealth with Lumen Dei
    </h2>
   </div>


   <div className="text-center text-white text-sm sm:text-base font-normal tracking-wide uppercase mb-4">
  To begin, connect your DEX wallet and enter your email address.
</div>

{/* Row 1: How to Guides, Wallet Select, Connect Button, Email */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 items-stretch w-full">
  {/* Column 1: How to Guides */}
  <button
     className="bg-lumen-cream/10 border border-white/20 py-3 px-4 rounded-md font-bold text-white w-full text-center
             hover:bg-gradient-to-r hover:from-[#b0822e] hover:via-[#fee4a3] hover:to-[#925008] hover:text-black transition duration-300"
    onClick={() => console.log("Show How To Guides")}
  >
    How to Guides
  </button>

  {/* Column 2: Wallet selection + connect button */}
  <ConnectWalletButton />

  {/* Column 3: Email input */}
  <input
    type="email"
    placeholder="Add Email Address (for updates & security)"
    className="bg-lumen-cream/10 border border-white/20 py-3 px-4 rounded-md font-bold text-white w-full text-center
    placeholder-white hover:placeholder-black
    hover:bg-gradient-to-r hover:from-[#b0822e] hover:via-[#fee4a3] hover:to-[#925008]
    hover:text-black transition duration-300"
    onChange={(e) => setEmail(e.target.value)}
  />
</div>

<div className="text-center text-white text-sm sm:text-base font-normal tracking-wide uppercase mt-8 my-4">
  Now connect your CEX wallet and start investing.
</div>

{/* Row 2: Aligned beneath How to Guides + Wallet + Email */}  
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 w-full items-stretch">
  {/* Column 1: CEX Wallet selection */}
  <select
      className="bg-lumen-cream/10 border border-white/20 py-3 px-4 rounded-md font-bold text-white w-full text-center
             hover:bg-gradient-to-r hover:from-[#b0822e] hover:via-[#fee4a3] hover:to-[#925008] hover:text-black transition duration-300"
    onChange={(e) => setPlatform(e.target.value)}
  >
    <option value="" disabled selected>Choose Your CEX Wallet</option>
    <option value="Binance">Binance</option>
    <option value="ByBit">ByBit</option>
    <option value="OKX">OKX</option>
    <option value="KuCoin">KuCoin</option>
  </select>

  {/* Column 2: CEX Wallet Address */}
  <input
    type="text"
    placeholder="Enter Your CEX Wallet Address"
    className="bg-lumen-cream/10 border border-white/20 py-3 px-4 rounded-md font-bold text-white w-full text-center
    placeholder-white hover:placeholder-black
    hover:bg-gradient-to-r hover:from-[#b0822e] hover:via-[#fee4a3] hover:to-[#925008]
    hover:text-black transition duration-300"
    onChange={(e) => setCexWallet(e.target.value)}
  />

  {/* Column 3: Start Investment Button */}
  <button
    onClick={handleDeposit}
      className="bg-lumen-cream/10 border border-white/20 py-3 px-4 rounded-md font-bold text-white w-full text-center
             hover:bg-gradient-to-r hover:from-[#b0822e] hover:via-[#fee4a3] hover:to-[#925008] hover:text-black transition duration-300"
  >
    Start Investment
  </button>
</div>



      <div className="flex justify-center my-8">
      <Image src={flameLogo} alt="Lumen Dei Flame" width={60} height={60} />
      </div>

      <div className="w-full sm:w-2/3 mx-auto mt-6">
  <button
    onClick={handleGenerateReferral}
    className="w-full py-3 px-4 rounded-md font-bold text-center text-gray-800 border border-white/20"
    style={{
      backgroundImage: 'linear-gradient(to right, #b0822e, #fee4a3, #925008, #efca81)',
    }}
  >
    <ClipboardIcon className="inline-block w-4 h-4 mr-1" />
    Referral Link
  </button>
</div>



<p className="text-white text-center text-sm sm:text-base mt-6 mb-6 uppercase tracking-wide">
  💡 After registering, we will track profits and show them here.
</p>


      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-lumen-cream/10 rounded-xl p-6 border border-lumen-gold/20">
        <p className="text-white font-bold text-sm sm:text-base mb-1">
            Total Invested</p>
          <p className="text-2xl font-bold text-lumen-gold">${totalInvested}</p>
        </div>
        <div className="bg-lumen-cream/10 rounded-xl p-6 border border-lumen-gold/20">
        <p className="text-white font-bold text-sm sm:text-base mb-1">
            Monthly Profit</p>
          <p className="text-2xl font-bold text-lumen-bronze">+${monthlyProfit}</p>
        </div>
        <div className="bg-lumen-cream/10 rounded-xl p-6 border border-lumen-gold/20">
        <p className="text-white font-bold text-sm sm:text-base mb-1">
            Referral Earnings</p>
          <p className="text-2xl font-bold text-lumen-gold">${referralEarnings}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-6">
        <input
          type="number"
          placeholder="Withdraw Amount"
          className="p-2 rounded-md text-black"
          onChange={(e) => setWithdrawAmount(e.target.value)}
        />
        <button onClick={handleWithdraw} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full">
          Withdraw
        </button>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="New Payout Wallet Address"
            className="p-2 rounded-md text-black w-full"
            onChange={(e) => setPayoutWallet(e.target.value)}
          />
          <button onClick={handleUpdatePayoutWallet} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full">
            Update Wallet
          </button>
        </div>
      </div>
    </section>
  );
}
