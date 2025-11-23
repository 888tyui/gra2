import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import { getNonce, verifyWallet, setAuthHeader } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const { publicKey, signMessage, connected, disconnect } = useWallet();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async () => {
    if (!publicKey || !signMessage) {
      setError('Wallet not connected');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const walletAddress = publicKey.toBase58();
      
      // Get nonce
      const { data: { nonce } } = await getNonce(walletAddress);
      
      // Sign message
      const messageBytes = new TextEncoder().encode(nonce);
      const signatureBytes = await signMessage(messageBytes);
      const signature = bs58.encode(signatureBytes);
      
      // Verify with backend
      const { data } = await verifyWallet(walletAddress, signature, nonce);
      
      if (data.success) {
        setUser(data.user);
        setAuthHeader(walletAddress);
        localStorage.setItem('walletAddress', walletAddress);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setAuthHeader(null);
    localStorage.removeItem('walletAddress');
    disconnect();
  };

  const refreshUser = (updatedUser) => {
    setUser(prev => ({ ...prev, ...updatedUser }));
  };

  useEffect(() => {
    if (connected && publicKey && !user) {
      login();
    }
  }, [connected, publicKey]);

  useEffect(() => {
    if (!connected && user) {
      logout();
    }
  }, [connected]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        refreshUser,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

