import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { bsc, bscTestnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { 
  RainbowKitProvider, 
  connectorsForWallets, 
  darkTheme, 
  lightTheme 
} from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  trustWallet,
  walletConnectWallet,
  coinbaseWallet,
  braveWallet,
  rainbowWallet
} from '@rainbow-me/rainbowkit/wallets';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import AppLayout from './components/AppLayout';
import '@rainbow-me/rainbowkit/styles.css';

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo';
const chains = [bsc, bscTestnet];

const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      metaMaskWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      coinbaseWallet({ appName: 'Grass - Touch Grass', chains }),
      walletConnectWallet({ projectId, chains }),
      braveWallet({ chains }),
      rainbowWallet({ projectId, chains })
    ],
  },
]);

const config = createConfig({
  chains,
  connectors,
  transports: {
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
  },
});

const queryClient = new QueryClient();

function AppContent() {
  const { theme } = useTheme();
  
  return (
    <RainbowKitProvider 
      theme={theme === 'dark' ? darkTheme() : lightTheme()}
      chains={chains}
      locale="en"
      modalSize="compact"
    >
      <AuthProvider>
        <TaskProvider>
          <Router>
            <Routes>
              <Route path="/*" element={<AppLayout />} />
            </Routes>
          </Router>
        </TaskProvider>
      </AuthProvider>
    </RainbowKitProvider>
  );
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
