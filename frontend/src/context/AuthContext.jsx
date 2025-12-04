import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAccount, useSignMessage, useDisconnect } from 'wagmi';
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
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { disconnect } = useDisconnect();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async () => {
    if (!address || !signMessageAsync) {
      setError('Wallet not connected');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('🔵 [1/4] Starting login...');
      const walletAddress = address;
      console.log('🔵 Wallet address:', walletAddress);
      
      // Get nonce
      console.log('🔵 [2/4] Getting nonce from backend...');
      const startNonce = Date.now();
      const { data: { nonce } } = await getNonce(walletAddress);
      console.log(`✅ Nonce received in ${Date.now() - startNonce}ms`);
      
      // Sign message
      console.log('🔵 [3/4] Requesting signature from wallet...');
      const startSign = Date.now();
      const signature = await signMessageAsync({ message: nonce });
      console.log(`✅ Signature received in ${Date.now() - startSign}ms`);
      
      // Verify with backend
      console.log('🔵 [4/4] Verifying with backend...');
      const startVerify = Date.now();
      const { data } = await verifyWallet(walletAddress, signature, nonce);
      console.log(`✅ Verified in ${Date.now() - startVerify}ms`);
      
      if (data.success) {
        setUser(data.user);
        setAuthHeader(walletAddress);
        localStorage.setItem('walletAddress', walletAddress);
        console.log('✅ Login successful!');
      }
    } catch (err) {
      console.error('❌ Login error:', err);
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
    if (isConnected && address && !user) {
      login();
    }
  }, [isConnected, address]);

  useEffect(() => {
    if (!isConnected && user) {
      logout();
    }
  }, [isConnected]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        refreshUser,
        isAuthenticated: !!user,
        walletAddress: address
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
