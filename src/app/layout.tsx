// src/app/layout.tsx

import '../styles/globals.css';
import Image from 'next/image';
import logo from '../assets/lumen-dei-logo3.png';
import { Cinzel } from 'next/font/google';
import type { Metadata } from 'next';
import WagmiWrapper from '@/components/WagmiWrapper';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-cinzel',
});

export const metadata: Metadata = {
  title: 'Lumen Dei | Investor Dashboard',
  description: 'Empower your wealth through the Lumen Dei Investor Portal.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${cinzel.className} bg-[url('/backgrounds/lumen-bg.png')] bg-cover bg-center bg-no-repeat bg-fixed min-h-screen text-white`}
      >
        <WagmiWrapper>
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
                <p>© 2025 lumen-dei.com — All rights reserved.</p>
              </div>
            </footer>
          </div>
        </WagmiWrapper>
      </body>
    </html>
  );
}
