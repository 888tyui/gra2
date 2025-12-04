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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const preferredConnectors = useMemo(() => {
    const preferredOrder = ['metaMask', 'coinbaseWallet', 'injected'];
    return [...connectors].sort((a, b) => {
      return (
        preferredOrder.indexOf(a.id) - preferredOrder.indexOf(b.id)
      );
    });
  }, [connectors]);
  const hasReadyConnector = preferredConnectors.some(
    (connector) => connector.ready
  );

  const closeModal = () => {
    setIsModalOpen(false);
    setError(null);
  };

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
      closeModal();
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

  return (
    <>
      <button
        className={`wallet-btn trigger ${variant} ${
          compact ? 'compact' : ''
        }`}
        onClick={() => setIsModalOpen(true)}
        disabled={isPending}
      >
        {isPending ? 'Connecting...' : 'Connect Wallet'}
      </button>

      {isModalOpen && (
        <div
          className="wallet-modal-overlay"
          onClick={closeModal}
          role="presentation"
        >
          <div
            className="wallet-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="wallet-modal-header">
              <h3>Select a wallet</h3>
              <button
                className="wallet-modal-close"
                onClick={closeModal}
                aria-label="Close wallet selector"
              >
                ×
              </button>
            </div>

            <div className="wallet-list modal">
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
            </div>

            {!hasReadyConnector && (
              <div className="wallet-helper">
                <p className="wallet-error">
                  MetaMask or another EVM wallet is not detected.
                </p>
                <a
                  href="https://metamask.io/download/"
                  target="_blank"
                  rel="noreferrer"
                  className="wallet-link"
                >
                  Install MetaMask
                </a>
              </div>
            )}

            {error && <p className="wallet-error">{error}</p>}
          </div>
        </div>
      )}
    </>
  );
}

export default ConnectWalletButton;


