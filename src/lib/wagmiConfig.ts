// src/lib/wagmiConfig.ts
import { createConfig, http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
// @ts-ignore
import { MetaMaskConnector } from '@wagmi/connectors/dist/esm/metaMask'
// @ts-ignore
import { WalletConnectConnector } from '@wagmi/connectors/dist/esm/walletConnect'
// @ts-ignore
import { CoinbaseWalletConnector } from '@wagmi/connectors/dist.esm/coinbaseWallet'

export const wagmiConfig = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http('https://rpc.ankr.com/eth'),
  },
  connectors: [
    new MetaMaskConnector(),
    new WalletConnectConnector({
      options: {
        projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // You can get this from cloud.walletconnect.com
        showQrModal: true,
      },
    }),
    new CoinbaseWalletConnector({
      options: {
        appName: 'Lumen Dei',
      },
    }),
  ],
  ssr: true,
})
