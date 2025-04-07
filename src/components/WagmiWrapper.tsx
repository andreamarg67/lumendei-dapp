// src/components/WagmiWrapper.tsx

'use client';

import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { supportedChain } from '@/utils/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';

const { chains, publicClient } = configureChains(
  [supportedChain],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      }),
    }),
  ]
);

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: '38780abf9d2e946f9a43c0d9ddc26a7a',
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'Lumen Dei Investor Portal',
      },
    }),
  ],
});

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
