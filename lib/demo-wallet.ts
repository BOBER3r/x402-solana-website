/**
 * Hardcoded demo wallet for educational purposes
 * WARNING: This private key is PUBLIC - never use in production!
 */

import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';

// Demo wallet - pre-funded on devnet
// This keypair is PUBLIC and used only for demonstration
const DEMO_PRIVATE_KEY_BS58 = '4KVmXvDWfwb7ZQXxEjJbZc8x5a2YhJ9wPtRnQ3bUmNxLk8FvGhT6MpYj2sWrD5eNcA3VbHgK7fJm1RxPqL4ZtW8K';

export function getDemoWallet(): Keypair {
  try {
    const secretKey = bs58.decode(DEMO_PRIVATE_KEY_BS58);
    return Keypair.fromSecretKey(secretKey);
  } catch (error) {
    // Fallback: generate a new keypair for demo
    console.warn('Using fallback demo wallet');
    return Keypair.generate();
  }
}

export const DEMO_WALLET_INFO = {
  publicKey: getDemoWallet().publicKey.toBase58(),
  note: 'This wallet is pre-funded on Solana devnet for testing',
  warning: 'Never use this private key in production!',
};

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_DEMO_API_URL || 'http://localhost:3001',
  network: 'devnet',
  // Custom USDC mint on devnet
  usdcMint: '8UAFd3yrj6XRNKDcSKAt4smgUfxXTTDZmXaM2y61MAC3',
  endpoints: {
    puppy: '/api/puppy',
    kitten: '/api/kitten',
    channelOpen: '/api/demo/channel/open',
    channelAuthorize: '/api/demo/channel/authorize',
    channelStatus: '/api/demo/channel',
    channelClose: '/api/demo/channel/close',
  },
};