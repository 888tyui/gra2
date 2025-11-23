import nacl from 'tweetnacl';
import bs58 from 'bs58';
import { prisma } from '../server.js';

export const verifySignature = (message, signature, publicKey) => {
  try {
    const messageBytes = new TextEncoder().encode(message);
    const signatureBytes = bs58.decode(signature);
    const publicKeyBytes = bs58.decode(publicKey);
    
    return nacl.sign.detached.verify(messageBytes, signatureBytes, publicKeyBytes);
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
};

export const authenticate = async (req, res, next) => {
  try {
    const { walletAddress, signature, message } = req.body;
    
    if (!walletAddress || !signature || !message) {
      return res.status(401).json({ error: 'Missing authentication credentials' });
    }
    
    const isValid = verifySignature(message, signature, walletAddress);
    
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid signature' });
    }
    
    // Find or create user
    let user = await prisma.user.findUnique({
      where: { walletAddress }
    });
    
    if (!user) {
      user = await prisma.user.create({
        data: {
          walletAddress,
          username: `User_${walletAddress.slice(0, 8)}`
        }
      });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

// Simplified auth for protected routes (assumes wallet address in header)
export const requireAuth = async (req, res, next) => {
  try {
    const walletAddress = req.headers['x-wallet-address'];
    
    if (!walletAddress) {
      return res.status(401).json({ error: 'Wallet address required' });
    }
    
    const user = await prisma.user.findUnique({
      where: { walletAddress }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};
