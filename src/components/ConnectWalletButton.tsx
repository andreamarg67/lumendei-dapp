// src/components/ConnectWalletButton.tsx
'use client';

import { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import {
  metaMask,
  walletConnect,
  coinbaseWallet,
} from '@wagmi/connectors';

export default function ConnectWalletButton() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const [wallet, setWallet] = useState('');

  const getConnector = () => {
    switch (wallet) {
      case 'WalletConnect':
        return walletConnect({
          projectId: '38780abf9d2e946f9a43c0d9ddc26a7a', // ✅ Replace with your actual projectId
        });
      case 'Coinbase':
        return coinbaseWallet({
          appName: 'Lumen Dei',
        });
      case 'MetaMask':
      default:
        return metaMask();
    }
  };

  return (
    <div className="w-full text-white">
      {!isConnected ? (
        <div className="flex flex-col sm:flex-row gap-2 w-full items-stretch">
          <select
            className="bg-lumen-cream/10 border border-white/20 py-3 px-4 rounded-md font-bold text-white w-full text-center
            hover:bg-gradient-to-r hover:from-[#b0822e] hover:via-[#fee4a3] hover:to-[#925008] hover:text-black transition duration-300"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
          >
            <option value="" disabled>Choose Your DEX Wallet</option>
            <option value="MetaMask">MetaMask</option>
            <option value="WalletConnect">WalletConnect</option>
            <option value="Coinbase">Coinbase</option>
          </select>

          <button
            onClick={() => connect({ connector: getConnector() })}
            className="bg-lumen-cream/10 border border-white/20 py-3 px-4 rounded-md font-bold text-white w-full text-center
            hover:bg-gradient-to-r hover:from-[#b0822e] hover:via-[#fee4a3] hover:to-[#925008] hover:text-black transition duration-300"
          >
            Connect Your Wallet
          </button>
        </div>
      ) : (
        <div className="bg-lumen-cream/10 border border-white/20 rounded-md px-4 py-3 font-bold text-center w-full min-h-[52px]">
          <p className="text-sm leading-tight">Connected</p>
          <p className="text-sm">{address?.slice(0, 6)}...{address?.slice(-4)}</p>
          <button
            onClick={() => disconnect()}
            className="mt-2 text-xs text-red-400 hover:underline"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}
