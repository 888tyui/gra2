import React, { useEffect, useMemo, useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { bsc } from 'wagmi/chains';
import './ConnectWalletButton.css';

const shortenAddress = (address) =>
  `${address.slice(0, 4)}...${address.slice(-4)}`;

const detectEnvSignals = () => {
  if (typeof window === 'undefined') {
    return {
      hasEthereum: false,
      metaMaskDetected: false,
      coinbaseDetected: false,
      phantomDetected: false,
      binanceDetected: false,
      providerCount: 0
    };
  }

  const { ethereum } = window;
  const providers = ethereum?.providers || [];
  const isMetaMaskProvider = (provider) => provider?.isMetaMask;
  const isCoinbaseProvider = (provider) =>
    provider?.isCoinbaseWallet || provider?.isCoinbaseWalletBrowser;
  const isPhantomProvider = (provider) => provider?.isPhantom;
  const isBinanceProvider = (provider) =>
    provider?.isBinance || provider?.isBinanceChain;

  return {
    hasEthereum: Boolean(ethereum),
    metaMaskDetected:
      Boolean(ethereum?.isMetaMask) || providers.some(isMetaMaskProvider),
    coinbaseDetected:
      Boolean(ethereum?.isCoinbaseWallet) ||
      providers.some(isCoinbaseProvider),
    phantomDetected:
      Boolean(ethereum?.isPhantom) || providers.some(isPhantomProvider),
    binanceDetected:
      Boolean(window.BinanceChain) || providers.some(isBinanceProvider),
    providerCount: providers.length
  };
};

const resolveDebugFlag = () => {
  if (typeof window !== 'undefined' && typeof window.__WALLET_DEBUG__ === 'boolean') {
    return window.__WALLET_DEBUG__;
  }
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    const envFlag = import.meta.env.VITE_WALLET_DEBUG;
    if (envFlag === 'false') return false;
    if (envFlag === 'true') return true;
  }
  return true;
};

const shouldDebug = resolveDebugFlag();

function ConnectWalletButton({ variant = 'primary', compact = false }) {
  const { address, isConnected } = useAccount();
  const { connectAsync, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [envSignals, setEnvSignals] = useState(() => detectEnvSignals());

  const preferredConnectors = useMemo(() => {
    const preferredOrder = ['metaMask', 'coinbaseWallet', 'injected'];
    return [...connectors].sort((a, b) => {
      return (
        preferredOrder.indexOf(a.id) - preferredOrder.indexOf(b.id)
      );
    });
  }, [connectors]);
  const connectorAvailability = useMemo(() => {
    return preferredConnectors.reduce((acc, connector) => {
      let manualDetection = false;
      if (connector.id === 'metaMaskSDK') {
        manualDetection = envSignals.metaMaskDetected;
      } else if (connector.id === 'coinbaseWalletSDK') {
        manualDetection = envSignals.coinbaseDetected;
      } else if (connector.id === 'app.phantom') {
        manualDetection = envSignals.phantomDetected;
      } else if (connector.id === 'com.binance.wallet') {
        manualDetection = envSignals.binanceDetected;
      } else if (connector.id === 'injected') {
        manualDetection = envSignals.hasEthereum;
      }

      acc[connector.id] = connector.ready || manualDetection;
      return acc;
    }, {});
  }, [preferredConnectors, envSignals]);

  const hasReadyConnector = preferredConnectors.some(
    (connector) => connectorAvailability[connector.id]
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const updateSignals = () => {
      const snapshot = detectEnvSignals();
      setEnvSignals(snapshot);
      if (shouldDebug) {
        console.groupCollapsed('[Wallet Debug] Environment signals');
        console.log('Step 6: provider count', snapshot.providerCount);
        console.log('Step 7: detections', snapshot);
        console.groupEnd();
      }
    };

    updateSignals();

    const onEthereumInit = () => updateSignals();
    window.addEventListener('ethereum#initialized', onEthereumInit, {
      once: true
    });

    const interval = setInterval(updateSignals, 2000);

    return () => {
      window.removeEventListener('ethereum#initialized', onEthereumInit);
      clearInterval(interval);
    };
  }, [shouldDebug]);

  useEffect(() => {
    if (!shouldDebug) {
      return;
    }

    console.groupCollapsed('[Wallet Debug] Connector snapshot');
    console.log(
      'Step 3: connectors detected',
      connectors.map((connector) => ({
        id: connector.id,
        name: connector.name,
        ready: connector.ready,
      }))
    );
    console.log(
      'Step 4: preferredConnectors order',
      preferredConnectors.map((c) => c.id)
    );
    console.log('Step 5: hasReadyConnector?', hasReadyConnector);
    console.log('Step 8: availabilityMap', connectorAvailability);
    console.groupEnd();
  }, [connectors, preferredConnectors, hasReadyConnector, connectorAvailability, shouldDebug]);

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
      if (shouldDebug) {
        console.log('[Wallet Debug] Attempting connect via', target.id);
      }
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
                  disabled={isPending || !connectorAvailability[connector.id]}
                >
                  {connector.name}
                  {!connectorAvailability[connector.id] && ' (Not detected)'}
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


