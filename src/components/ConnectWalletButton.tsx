'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

export default function ConnectWalletButton() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div className="flex flex-col space-y-1 w-full text-white">
      {!isConnected ? (
        <>
          <span className="text-sm text-gray-400">Connect your DEX wallet here</span>
          <button
            onClick={() => connect({ connector: injected() })}
            className="bg-lumen-cream/10 border border-white/20 py-2 px-4 rounded-md font-bold text-white w-full hover:bg-white/10 transition"
          >
            Connect Wallet
          </button>
        </>
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
