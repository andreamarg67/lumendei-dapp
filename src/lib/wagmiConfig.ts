// wagmiConfig.ts
import { createConfig, configureChains } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { supportedChain } from '../utils/chains'; // ✅ NEW SAFE IMPORT
import { MetaMaskConnector } from '@wagmi/connectors/metaMask';
import { WalletConnectConnector } from '@wagmi/connectors/walletConnect';
import { CoinbaseWalletConnector } from '@wagmi/connectors/coinbaseWallet';

const { chains, publicClient } = configureChains(
  [supportedChain],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      }),
    }),
  ]
);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: 'YOUR_WALLETCONNECT_PROJECT_ID',
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'Lumen Dei',
      },
    }),
  ],
  publicClient,
});
