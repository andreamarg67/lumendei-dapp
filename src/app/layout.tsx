'use client';

import '../styles/globals.css';
import Image from 'next/image';
import logo from '../assets/lumen-dei-logo3.png';
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { bscTestnet } from 'wagmi/chains';
import { MetaMaskConnector } from '@wagmi/connectors/metaMask';
import { WalletConnectConnector } from '@wagmi/connectors/walletConnect';
import { CoinbaseWalletConnector } from '@wagmi/connectors/coinbaseWallet';
import { Cinzel } from 'next/font/google';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-cinzel',
});

const projectId = '38780abf9d2e946f9a43c0d9ddc26a7a';

const { chains, publicClient } = configureChains(
  [bscTestnet],
  [jsonRpcProvider({ rpc: () => ({ http: 'https://data-seed-prebsc-1-s1.binance.org:8545/' }) })]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId,
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Lumen Dei | Investor Dashboard</title>
        <meta
          name="description"
          content="Empower your wealth through the Lumen Dei Investor Portal."
        />
      </head>
      <body
        className={`${cinzel.className} bg-[url('/backgrounds/lumen-bg.png')] bg-cover bg-center bg-no-repeat bg-fixed min-h-screen text-white`}
      >
        <WagmiConfig config={config}>
          <QueryClientProvider client={queryClient}>
            <div className="relative">
              <div className="absolute top-4 left-4">
                <Image src={logo} alt="Lumen Dei Logo" width={360} height={120} />
              </div>
              <main className="flex items-center justify-center min-h-screen">
                {children}
              </main>
              <footer className="bg-transparent text-center py-6 text-sm text-white opacity-80">
                <div className="flex flex-col items-center space-y-2">
                  <Image src={logo} alt="Lumen Dei Logo" width={80} height={30} />
<<<<<<< HEAD
                  <p>© 2025 lumen-dei.com — All rights reserved.</p>
=======
                  <p>© 2025 lumen-dei.ai — All rights reserved.</p>
>>>>>>> 61552c8b37582eb76a0a920c4b1396b75d1cf425
                </div>
              </footer>
            </div>
          </QueryClientProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
