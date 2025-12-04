import React, { useMemo, useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { bsc } from 'wagmi/chains';
import './ConnectWalletButton.css';

const shortenAddress = (address) =>
  `${address.slice(0, 4)}...${address.slice(-4)}`;

function ConnectWalletButton({ variant = 'primary', compact = false }) {
  const { address, isConnected } = useAccount();
  const { connectAsync, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [error, setError] = useState(null);

  const preferredConnectors = useMemo(() => {
    const preferredOrder = ['metaMask', 'coinbaseWallet', 'injected'];
    return [...connectors].sort((a, b) => {
      return (
        preferredOrder.indexOf(a.id) - preferredOrder.indexOf(b.id)
      );
    });
  }, [connectors]);

  const handleConnect = async (connectorId) => {
    setError(null);
    const target =
      preferredConnectors.find((c) => c.id === connectorId) ||
      preferredConnectors[0];

    if (!target) {
      setError('No available wallet connector');
      return;
    }

    try {
      await connectAsync({ connector: target, chainId: bsc.id });
    } catch (err) {
      console.error('Wallet connect error:', err);
      setError(err?.message || 'Failed to connect wallet');
    }
  };

  if (isConnected && address) {
    return (
      <div className={`wallet-connected ${variant}`}>
        <button
          className="wallet-btn connected"
          onClick={() => disconnect()}
        >
          {shortenAddress(address)} • Disconnect
        </button>
      </div>
    );
  }

  if (compact) {
    return (
      <button
        className={`wallet-btn ${variant}`}
        onClick={() => handleConnect('metaMask')}
        disabled={isPending}
      >
        {isPending ? 'Connecting...' : 'Connect Wallet'}
      </button>
    );
  }

  return (
    <div className={`wallet-list ${variant}`}>
      {preferredConnectors.map((connector) => (
        <button
          key={connector.id}
          className="wallet-btn"
          onClick={() => handleConnect(connector.id)}
          disabled={isPending || !connector.ready}
        >
          {connector.name}
          {!connector.ready && ' (Not installed)'}
        </button>
      ))}
      {error && <p className="wallet-error">{error}</p>}
    </div>
  );
}

export default ConnectWalletButton;


