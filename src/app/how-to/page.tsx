'use client';

import { FileText } from "lucide-react";

const guides = [
    {
        title: "How to Connect Your Wallet",
        description: "Step-by-step PDF guide for DEX wallet setup",
        link: "/how-to/How_to_Connect_Your_DEX_Wallet.pdf",
      },
  {
    title: "How to Create a Binance API Key",
    description: "Securely set up your Binance API access",
    link: "/how-to/create-binance-api.pdf",
  },
  {
    title: "How to Find Your ByBit Wallet Address",
    description: "Quick visual walkthrough to locate your address",
    link: "/how-to/bybit-wallet-address.png",
  },
];

export default function HowToGuidesPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      <h1 className="text-3xl font-bold text-center text-yellow-400">How-To Guides</h1>

      {guides.map((guide, index) => (
        <div
          key={index}
          className="flex justify-between items-center p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 shadow-lg"
        >
          <div className="flex items-center gap-4">
            <FileText className="text-yellow-400 w-6 h-6" />
            <div>
              <h2 className="text-lg text-white font-semibold">{guide.title}</h2>
              <p className="text-sm text-zinc-400">{guide.description}</p>
            </div>
          </div>
          <a
            href={guide.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:underline text-sm"
          >
            View
          </a>
        </div>
      ))}
    </div>
  );
}
