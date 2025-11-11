"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Zap, Code2, Play, Info, ExternalLink } from "lucide-react";
import Card from "@/components/Card";
import LiveDemo from "@/components/LiveDemo";
import ChannelPaymentFlow from "@/components/demo/ChannelPaymentFlow";

interface Transaction {
  id: string;
  type: 'on-chain' | 'channel';
  endpoint: string;
  timestamp: number;
  duration: number;
  cost: string;
  signature: string;
  explorerUrl?: string;
  xPaymentHeader?: string;
  response?: any;
}

export default function DemoPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (tx: Transaction) => {
    setTransactions(prev => [tx, ...prev]);
  };

  return (
    <div className="min-h-screen py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary font-medium mb-4">
              <Play className="h-4 w-4" />
              Interactive Demo
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Try X402 Live
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Experience both payment schemes with real Solana devnet transactions.
              See exactly how the X-PAYMENT header is constructed and verified.
            </p>
          </div>

          {/*/!* Demo Wallet Info *!/*/}
          {/*<Card className="mb-12 bg-blue-50/50 border-blue-200">*/}
          {/*  <div className="flex items-start gap-4">*/}
          {/*    <Info className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />*/}
          {/*    <div className="flex-1">*/}
          {/*      <h3 className="text-lg font-semibold mb-2">Demo Wallet</h3>*/}
          {/*      <div className="space-y-2 text-sm">*/}
          {/*        <div>*/}
          {/*          <span className="text-muted">Public Key:</span>{' '}*/}
          {/*          <code className="bg-white px-2 py-1 rounded text-xs">*/}
          {/*            {DEMO_WALLET_INFO.publicKey}*/}
          {/*          </code>*/}
          {/*        </div>*/}
          {/*        <p className="text-muted">{DEMO_WALLET_INFO.note}</p>*/}
          {/*        <p className="text-orange-600 font-medium">{DEMO_WALLET_INFO.warning}</p>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</Card>*/}

          {/* Interactive Playground */}
          <section className="mb-20">
            <div className="max-w-3xl mx-auto">
              <ChannelPaymentFlow onComplete={addTransaction} />
            </div>
          </section>

          {/*/!* Transaction History *!/*/}
          {/*{transactions.length > 0 && (*/}
          {/*  <section className="mb-20">*/}
          {/*    <h2 className="text-2xl font-bold mb-6">Transaction History</h2>*/}
          {/*    <div className="space-y-4">*/}
          {/*      {transactions.map((tx) => (*/}
          {/*        <Card key={tx.id} className="p-4">*/}
          {/*          <div className="flex items-center justify-between">*/}
          {/*            <div className="flex items-center gap-4">*/}
          {/*              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${*/}
          {/*                tx.type === 'channel' ? 'bg-green-100' : 'bg-orange-100'*/}
          {/*              }`}>*/}
          {/*                {tx.type === 'channel' ? (*/}
          {/*                  <Zap className="h-5 w-5 text-green-600" />*/}
          {/*                ) : (*/}
          {/*                  <Code2 className="h-5 w-5 text-orange-600" />*/}
          {/*                )}*/}
          {/*              </div>*/}
          {/*              <div>*/}
          {/*                <div className="font-semibold">{tx.endpoint}</div>*/}
          {/*                <div className="text-sm text-muted">*/}
          {/*                  {new Date(tx.timestamp).toLocaleTimeString()}*/}
          {/*                </div>*/}
          {/*              </div>*/}
          {/*            </div>*/}
          {/*            <div className="text-right">*/}
          {/*              <div className="font-semibold">{tx.duration}ms</div>*/}
          {/*              <div className="text-sm text-muted">{tx.cost}</div>*/}
          {/*            </div>*/}
          {/*          </div>*/}
          {/*        </Card>*/}
          {/*      ))}*/}
          {/*    </div>*/}
          {/*  </section>*/}
          {/*)}*/}

          {/* Batch Performance Test */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Batch Performance Comparison</h2>
            <LiveDemo />
          </section>

          {/* Educational Note */}
          <Card className="bg-gray-50 border-gray-200">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Understanding the Flow</h3>
              <p className="text-muted max-w-2xl mx-auto mb-6">
                Each demo creates real transactions on Solana devnet. The detailed request/response flow shows exactly how X-PAYMENT headers are constructed, sent, and verified by the server.
              </p>
              <div className="flex justify-center gap-4 text-sm">
                <div className="text-muted">
                  <strong>On-Chain:</strong> USDC transaction → X-PAYMENT header → Server verifies on blockchain
                </div>
                <div className="text-muted">
                  <strong>Channel:</strong> Signature → X-PAYMENT header → Server verifies signature
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
