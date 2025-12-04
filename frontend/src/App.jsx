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
import LoginPage from './components/LoginPage';
import AboutPage from './pages/AboutPage';
import DocsPage from './pages/DocsPage';
import './utils/selectPreferredProvider';

const chains = [bsc, bscTestnet];

const config = createConfig({
  chains,
  connectors: [
    metaMask({
      dappMetadata: { name: 'Grass - Touch Grass' },
      shimDisconnect: true,
    }),
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
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/docs" element={<DocsPage />} />
                  <Route path="/app/*" element={<AppLayout />} />
                  <Route path="/today" element={<Navigate to="/app/today" replace />} />
                  <Route path="/calendar" element={<Navigate to="/app/calendar" replace />} />
                  <Route path="/profile" element={<Navigate to="/app/profile" replace />} />
                  <Route path="/settings" element={<Navigate to="/app/settings" replace />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
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
