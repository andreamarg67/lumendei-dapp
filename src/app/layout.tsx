"use client";

import "../styles/globals.css";
import Image from "next/image";
import logo from "../assets/lumen-dei-logo3.png";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { bscTestnet } from "wagmi/chains";
import { Cinzel } from 'next/font/google';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-cinzel',
});

const projectId = "38780abf9d2e946f9a43c0d9ddc26a7a";

const config = getDefaultConfig({
  appName: "Lumen Dei Investor Portal",
  projectId,
  chains: [bscTestnet],
});

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Lumen Dei | Investor Dashboard</title>
        <meta name="description" content="Empower your wealth through the Lumen Dei Investor Portal." />
      </head>
      <body className={`${cinzel.className} bg-[url('/backgrounds/lumen-bg.png')] bg-cover bg-center bg-no-repeat bg-fixed min-h-screen text-white`}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider modalSize="compact">
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
                    <p>© 2025 lumen-dei.ai — All rights reserved.</p>
                  </div>
                </footer>
              </div>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}