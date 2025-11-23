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
      console.log('🔵 [1/4] Starting login...');
      const walletAddress = publicKey.toBase58();
      console.log('🔵 Wallet address:', walletAddress);
      
      // Get nonce
      console.log('🔵 [2/4] Getting nonce from backend...');
      const startNonce = Date.now();
      const { data: { nonce } } = await getNonce(walletAddress);
      console.log(`✅ Nonce received in ${Date.now() - startNonce}ms`);
      
      // Sign message
      console.log('🔵 [3/4] Requesting signature from wallet...');
      console.log('🔵 [3.1] Encoding message...');
      const messageBytes = new TextEncoder().encode(nonce);
      console.log('🔵 [3.2] Message bytes:', messageBytes);
      console.log('🔵 [3.3] Checking signMessage function:', typeof signMessage);
      
      console.log('🔵 [3.4] Calling signMessage() - WALLET POPUP SHOULD APPEAR NOW...');
      const startSign = Date.now();
      const signatureBytes = await signMessage(messageBytes);
      console.log(`✅ [3.5] Signature received in ${Date.now() - startSign}ms`);
      
      console.log('🔵 [3.6] Encoding signature to base58...');
      const signature = bs58.encode(signatureBytes);
      console.log('✅ [3.7] Signature encoded:', signature.substring(0, 20) + '...');
      
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

