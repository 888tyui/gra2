import React, { useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import DocsPage from './pages/DocsPage';
import AppPage from './pages/AppPage';
import '@solana/wallet-adapter-react-ui/styles.css';

function App() {
  // Use faster RPC endpoint - QuickNode or custom RPC
  const endpoint = useMemo(() => 
    import.meta.env.VITE_SOLANA_RPC || 'https://api.mainnet-beta.solana.com',
    []
  );
  
  // Connection config for faster initialization
  const config = useMemo(
    () => ({
      commitment: 'confirmed',
      wsEndpoint: undefined, // Disable WebSocket for faster init
    }),
    []
  );
  
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter()
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint} config={config}>
      <WalletProvider wallets={wallets} autoConnect={false}>
        <WalletModalProvider>
          <AuthProvider>
            <TaskProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/docs" element={<DocsPage />} />
                  <Route path="/app" element={<AppPage />} />
                </Routes>
              </Router>
            </TaskProvider>
          </AuthProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
