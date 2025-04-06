//connectwalletbutton.tsx
// This component allows users to connect their wallets using MetaMask, WalletConnect, or Coinbase Wallet.
'use client';

import { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { MetaMaskConnector } from '@wagmi/connectors/metaMask';
import { WalletConnectConnector } from '@wagmi/connectors/walletConnect';
import { CoinbaseWalletConnector } from '@wagmi/connectors/coinbaseWallet';

export default function ConnectWalletButton() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const [wallet, setWallet] = useState('MetaMask');

  const getConnector = () => {
    switch (wallet) {
      case 'WalletConnect':
        return new WalletConnectConnector({
          options: {
            projectId: '38780abf9d2e946f9a43c0d9ddc26a7a', // ✅ Your actual WalletConnect project ID
          },
        });
      case 'Coinbase':
        return new CoinbaseWalletConnector({
          options: {
            appName: 'Lumen Dei',
          },
        });
      case 'MetaMask':
      default:
        return new MetaMaskConnector();
    }
  };

  return (
    <div className="w-full text-white">
      {!isConnected ? (
        <div className="flex flex-row gap-2 w-full">
          <select
            className="p-2 rounded-md text-black w-1/2"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
          >
            <option value="" disabled selected>Choose Your DEX Wallet</option>
            <option value="MetaMask">MetaMask</option>
            <option value="WalletConnect">WalletConnect</option>
            <option value="Coinbase">Coinbase</option>
          </select>
          <button
            onClick={() => connect({ connector: getConnector() })}
            className="bg-lumen-cream/10 border border-white/20 py-2 px-4 rounded-md font-bold text-white w-1/2 hover:bg-white/10 transition"
          >
            Connect Your Wallet
          </button>
        </div>
      ) : (
        <div className="bg-lumen-cream/10 border border-white/20 rounded-md px-4 py-2 font-bold text-center w-full">
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
