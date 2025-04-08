'use client';

import { FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const guides = [
  {
    title: 'How to Connect Your Wallet',
    description: 'Step-by-step PDF guide for DEX wallet setup',
    link: '/how-to/How_to_Connect_Your_DEX_Wallet.pdf',
  },
  {
    title: 'How to Create a Binance API Key',
    description: 'Securely set up your Binance API access',
    link: '/how-to/create-binance-api.pdf',
  },
  {
    title: 'How to Find Your ByBit Wallet Address',
    description: 'Quick visual walkthrough to locate your address',
    link: '/how-to/bybit-wallet-address.png',
  },
  // Add more guides here
];

export default function HowToGuidesPage() {
  return (
<div className="max-w-7xl mx-auto px-6 py-12">
  <h1
    className="text-3xl md:text-4xl font-bold text-center font-minion bg-clip-text text-transparent mt-4 mb-10"
    style={{
      backgroundImage: 'linear-gradient(to right, #b0822e, #fee4a3, #925008, #efca81)',
    }}
  >
    How-To Guides
  </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {guides.map((guide, index) => (
          <motion.a
            key={index}
            href={guide.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group block p-6 bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl shadow-md hover:scale-[1.02] transition-transform"
          >
            <div className="flex items-center gap-4 mb-4">
              <FileText className="text-lumen softgold w-6 h-6 flex-shrink-0" />
              <h2 className="text-white font-semibold text-lg group-hover:text-yellow-300 transition-colors">
                {guide.title}
              </h2>
            </div>
            <p className="text-sm text-zinc-400">{guide.description}</p>
            <span className="block mt-4 text-right text-lumen-gold font-bold text-sm">
              View →
            </span>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
