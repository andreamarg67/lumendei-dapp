'use client';

import React from 'react';
import { WagmiConfig, createConfig } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from 'viem';
import { bsc } from 'wagmi/chains';
import { metaMask, coinbaseWallet, walletConnect } from '@wagmi/connectors';

// Setup wagmi config
const wagmiConfig = createConfig({
  connectors: [
    metaMask(),
    walletConnect({
      projectId: '38780abf9d2e946f9a43c0d9ddc26a7a',
    }),
    coinbaseWallet({
      appName: 'Lumen Dei Investor Portal',
    }),
  ],
  chains: [bsc],
  transports: {
    [bsc.id]: http('https://data-seed-prebsc-1-s1.binance.org:8545/'),
  },
  ssr: true,
  // autoConnect: true, // ❌ Not supported here in your version
});

// Setup React Query client
const queryClient = new QueryClient();

export default function WagmiWrapper({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiConfig>
  );
}
