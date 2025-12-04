/**
 * Some browser wallets (e.g. Phantom) also inject an EVM provider and can
 * register themselves before MetaMask. When this happens wagmi's injected
 * connectors think MetaMask isn't installed because `window.ethereum`
 * points to the wrong provider. This helper promotes MetaMask (then other
 * EVM wallets) to be the default `window.ethereum`.
 */
const resolveDebugFlag = () => {
  if (typeof window !== 'undefined' && typeof window.__WALLET_DEBUG__ === 'boolean') {
    return window.__WALLET_DEBUG__;
  }
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    const envFlag = import.meta.env.VITE_WALLET_DEBUG;
    if (envFlag === 'false') return false;
    if (envFlag === 'true') return true;
  }
  return true; // default to true so live envs emit logs for troubleshooting
};

const shouldDebug = resolveDebugFlag();

const prioritizeInjectedProvider = () => {
  if (typeof window === 'undefined') {
    return;
  }

  const pickPreferredProvider = () => {
    const { ethereum } = window;
    const candidates = ethereum?.providers;

    if (shouldDebug) {
      console.groupCollapsed('[Wallet Debug] Provider prioritization');
      console.log('Step 1: window.ethereum detected?', Boolean(ethereum));
      console.log(
        'Step 2: window.ethereum.providers length',
        candidates?.length || 0
      );
      console.groupEnd();
    }

    if (!candidates || !candidates.length) {
      return;
    }

    const matchers = [
      (provider) => provider?.isMetaMask,
      (provider) => provider?.isCoinbaseWallet || provider?.isCoinbaseWalletBrowser,
      (provider) => provider?.isBraveWallet,
    ];

    for (const matcher of matchers) {
      const provider = candidates.find(matcher);
      if (provider && provider !== window.ethereum) {
        window.ethereum = provider;
        if (shouldDebug) {
          console.log('[Wallet Debug] Promoted provider:', provider);
        }
        return;
      }
    }
  };

  if (window.ethereum?.providers?.length) {
    pickPreferredProvider();
    return;
  }

  window.addEventListener('ethereum#initialized', pickPreferredProvider, {
    once: true,
  });

  // metaMask docs recommend running a fallback after a timeout
  setTimeout(pickPreferredProvider, 3000);
};

prioritizeInjectedProvider();

export default prioritizeInjectedProvider;

