import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { bsc, bscTestnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { injected, metaMask, coinbaseWallet } from 'wagmi/connectors';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { ThemeProvider } from './context/ThemeContext';
import AppLayout from './components/AppLayout';

const chains = [bsc, bscTestnet];

const config = createConfig({
  chains,
  connectors: [
    metaMask({ dappMetadata: { name: 'Grass - Touch Grass' } }),
    coinbaseWallet({ appName: 'Grass - Touch Grass', chains }),
    injected({ shimDisconnect: true }),
  ],
  transports: {
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <TaskProvider>
              <Router>
                <Routes>
                  <Route path="/*" element={<AppLayout />} />
                </Routes>
              </Router>
            </TaskProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
