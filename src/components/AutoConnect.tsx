'use client';

import { useEffect } from 'react';
import { useConnect, useAccount } from 'wagmi';

export default function AutoConnect() {
  const { connectors, connect } = useConnect();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected) {
      const lastUsed = localStorage.getItem('lastUsedConnector');
      const connector = connectors.find((c) => c.id === lastUsed);
      if (connector) {
        connect({ connector });
      }
    }
  }, [isConnected, connectors, connect]);

  return null;
}
