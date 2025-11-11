"use client";

import { motion } from "framer-motion";
import { Server, Zap, Code2, Shield, ArrowRight, CheckCircle2, GitBranch } from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import CodeBlock from "@/components/CodeBlock";
import LiveDemo from "@/components/LiveDemo";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-white via-blue-50/30 to-white">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <motion.div
            className="mx-auto max-w-4xl text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary font-medium mb-6"
              variants={fadeInUp}
            >
              <Zap className="h-4 w-4" />
              HTTP 402 Payment Required Protocol on Solana
            </motion.div>

            <motion.h1
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6"
              variants={fadeInUp}
            >
              Two Ways to Pay.<br />
              One Verification API.<br />
              <span className="text-primary">Zero Compromises.</span>
            </motion.h1>

            <motion.p
              className="text-xl text-muted mb-10 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              x402-solana's verification layer now supports both <span className="font-semibold text-foreground">on-chain USDC transactions</span> and <span className="font-semibold text-foreground">instant payment channels</span> through a unified API. Choose your payment scheme, we handle the rest.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
              variants={fadeInUp}
            >
              <Button href="/docs/getting-started" variant="primary">
                Get Started
              </Button>
              <Button href="/payment-channels" variant="secondary">
                Compare Payment Schemes
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white rounded-lg shadow-lg p-1 max-w-3xl mx-auto">
              <CodeBlock
                code={`// Server: ONE method verifies BOTH payment types
import { TransactionVerifier } from '@x402-solana/core';

const result = await verifier.verifyX402Payment(
  req.headers['x-payment'],
  {
    scheme: 'exact',    // ← On-chain USDC (400-800ms)
    // OR
    scheme: 'channel',  // ← Off-chain instant (<10ms)

    network: 'solana-devnet',
    payTo: '...',
    maxAmountRequired: '10000',
    resource: '/api/data',
  }
);

if (result.valid) {
  res.json({ data: 'Premium content' });
}`}
                className="text-left"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <LiveDemo />
          </motion.div>
        </div>
      </section>

      {/* Two Schemes Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Two Payment Schemes, One Verification API
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Choose between on-chain or off-chain payments. Your server uses the same method for both.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full border-2 border-gray-200">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <Server className="h-6 w-6 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">On-Chain (exact)</h3>
                  <div className="text-sm text-muted mb-4 space-y-1">
                    <div className="font-semibold text-foreground">400-800ms</div>
                    <div className="font-semibold text-foreground">~$0.0005/payment</div>
                  </div>
                  <ul className="text-xs text-muted space-y-2 text-left">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-gray-600 mt-0.5 flex-shrink-0" />
                      <span>USDC transactions on Solana</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-gray-600 mt-0.5 flex-shrink-0" />
                      <span>No setup required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-gray-600 mt-0.5 flex-shrink-0" />
                      <span>Works across any API</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-gray-600 mt-0.5 flex-shrink-0" />
                      <span>Best for sporadic use</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full border-2 border-primary/50 bg-primary/5">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Channels (channel)</h3>
                  <div className="text-sm text-muted mb-4 space-y-1">
                    <div className="font-semibold text-primary">&lt;10ms</div>
                    <div className="font-semibold text-primary">$0/payment</div>
                  </div>
                  <ul className="text-xs text-muted space-y-2 text-left">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Ed25519 signatures (instant)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>99.7% cost savings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Requires channel setup</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Best for high-frequency</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full border-2 border-green-200 bg-green-50/50">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Code2 className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-green-700">Your Server Code</h3>
                  <div className="text-sm text-muted mb-4">
                    <code className="font-mono text-xs bg-white px-2 py-1 rounded">
                      verifyX402Payment()
                    </code>
                  </div>
                  <ul className="text-xs text-muted space-y-2 text-left">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>ONE method for both schemes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Automatic scheme detection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Same @x402-solana/core package</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Simple integration</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </motion.div>
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-sm text-primary font-medium">
              Unified verification API • Choose your scheme based on your needs • Zero lock-in
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works Flow */}
      <section className="py-24 bg-gray-50/50 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Unified Verification Flow
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Same API method handles both on-chain and off-chain payments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* On-Chain Flow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full border-2 border-gray-300">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <Server className="h-5 w-5 text-gray-600" />
                  On-Chain Payment Flow
                </h3>
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Client creates USDC transaction", detail: "Uses @x402-solana/client" },
                    { step: "2", title: "X-PAYMENT header with scheme: 'exact'", detail: "Includes transaction signature" },
                    { step: "3", title: "Server calls verifyX402Payment()", detail: "Fetches transaction from Solana RPC" },
                    { step: "4", title: "Verifies USDC transfer amount", detail: "400-800ms verification" },
                    { step: "5", title: "Returns content if valid", detail: "HTTP 200 OK" },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{item.title}</div>
                        <div className="text-xs text-muted">{item.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Off-Chain Flow */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full border-2 border-primary/50 bg-primary/5">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Channel Payment Flow
                </h3>
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Client creates signed claim", detail: "Uses @solana-payment-channel/client" },
                    { step: "2", title: "X-PAYMENT header with scheme: 'channel'", detail: "Includes Ed25519 signature" },
                    { step: "3", title: "Server calls verifyX402Payment()", detail: "Same method, different scheme!" },
                    { step: "4", title: "Verifies signature locally", detail: "<10ms verification" },
                    { step: "5", title: "Returns content if valid", detail: "HTTP 200 OK" },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{item.title}</div>
                        <div className="text-xs text-muted">{item.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-l-4 border-l-blue-500">
              <h4 className="font-semibold mb-2 text-sm">Same Server Code</h4>
              <p className="text-xs text-muted">
                Your server uses <code className="bg-gray-100 px-1 py-0.5 rounded">verifyX402Payment()</code> for both schemes. The method automatically handles verification based on the scheme field.
              </p>
            </Card>
            <Card className="border-l-4 border-l-green-500">
              <h4 className="font-semibold mb-2 text-sm">Client Chooses</h4>
              <p className="text-xs text-muted">
                Clients decide which payment scheme to use. Use on-chain for simplicity, channels for high-frequency needs.
              </p>
            </Card>
            <Card className="border-l-4 border-l-purple-500">
              <h4 className="font-semibold mb-2 text-sm">No Lock-In</h4>
              <p className="text-xs text-muted">
                Switch between schemes anytime. Both use the same X-PAYMENT header format and verification API.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Built for Developers
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Everything you need to implement micropayments in your HTTP APIs
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Card>
                <Server className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Framework Agnostic</h3>
                <p className="text-sm text-muted">
                  Works with Express, NestJS, Fastify, and any Node.js framework
                </p>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card>
                <GitBranch className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Flexible Payment Options</h3>
                <p className="text-sm text-muted">
                  Choose on-chain for simplicity or channels for speed. Same API handles both.
                </p>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card>
                <Code2 className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Developer First</h3>
                <p className="text-sm text-muted">
                  Simple TypeScript API with full type safety and autocomplete
                </p>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card>
                <Shield className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Production Ready</h3>
                <p className="text-sm text-muted">
                  Full lifecycle management with automatic state handling and fallbacks
                </p>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-24 border-t border-border bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Quick Start
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Get up and running in minutes with our TypeScript-first SDK
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold mb-4">Server: Unified Verification</h3>
              <CodeBlock
                code={`import { TransactionVerifier } from '@x402-solana/core';

const verifier = new TransactionVerifier({
  rpcUrl: process.env.SOLANA_RPC_URL,
});

// ONE method handles BOTH payment types
app.post('/api/verify', async (req, res) => {
  const result = await verifier.verifyX402Payment(
    req.headers['x-payment'],
    {
      scheme: 'exact', // or 'channel'
      network: 'solana-devnet',
      payTo: 'YourAddress...',
      maxAmountRequired: '10000',
      resource: '/api/data',
    }
  );

  if (result.valid) {
    res.json({ data: 'Premium content' });
  }
});`}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-4">Client: Choose Your SDK</h3>
              <CodeBlock
                code={`// Option 1: On-chain payments
import { X402Client } from '@x402-solana/client';
const response = await client.pay({
  url: 'https://api.example.com/data',
  // Creates on-chain USDC transaction
});

// Option 2: Channel payments
import { ChannelClient } from
  '@solana-payment-channel/client';

const channelClient = new ChannelClient({
  rpcUrl: process.env.SOLANA_RPC_URL,
  wallet: myWalletKeypair,
});

const response = await channelClient.pay({
  url: 'https://api.example.com/data',
  // Creates signed channel claim
});`}
              />
            </motion.div>
          </div>

          <motion.div
            className="mt-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-blue-50 border-blue-200">
              <h4 className="font-semibold mb-3">Key Points</h4>
              <ul className="text-sm text-muted space-y-2 list-disc list-inside">
                <li><strong>Server-side:</strong> Use @x402-solana/core for verification (handles both schemes)</li>
                <li><strong>Client-side (on-chain):</strong> Use @x402-solana/client for USDC transactions</li>
                <li><strong>Client-side (channels):</strong> Use @solana-payment-channel/client for instant claims</li>
                <li><strong>Same API:</strong> verifyX402Payment() works for both, just different scheme parameter</li>
                <li><strong>No lock-in:</strong> Switch between schemes based on your needs</li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* NPM Packages Section */}
      <section className="py-24 border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Modular NPM Packages
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Choose the packages you need for your architecture
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Card className="h-full">
                <h3 className="text-lg font-semibold mb-4">X402 Protocol Packages</h3>
                <div className="space-y-3">
                  <div>
                    <a
                      href="https://www.npmjs.com/package/@x402-solana/server"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm text-primary mb-1 hover:underline inline-block"
                    >
                      @x402-solana/server
                    </a>
                    <p className="text-xs text-muted">Server middleware with unified payment verification</p>
                  </div>
                  <div>
                    <a
                      href="https://www.npmjs.com/package/@x402-solana/client"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm text-primary mb-1 hover:underline inline-block"
                    >
                      @x402-solana/client
                    </a>
                    <p className="text-xs text-muted">Client SDK for on-chain USDC payments</p>
                  </div>
                  <div>
                    <a
                      href="https://www.npmjs.com/package/@x402-solana/core"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm text-primary mb-1 hover:underline inline-block"
                    >
                      @x402-solana/core
                    </a>
                    <p className="text-xs text-muted">Unified verification for both on-chain and channel payments</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full border-2 border-primary/20">
                <h3 className="text-lg font-semibold mb-4">Payment Channel Packages</h3>
                <div className="space-y-3">
                  <div>
                    <a
                      href="https://www.npmjs.com/package/@solana-payment-channel/server"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm text-primary mb-1 hover:underline inline-block"
                    >
                      @solana-payment-channel/server
                    </a>
                    <p className="text-xs text-muted">Channel management with automatic X402 fallback</p>
                  </div>
                  <div>
                    <a
                      href="https://www.npmjs.com/package/@solana-payment-channel/client"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm text-primary mb-1 hover:underline inline-block"
                    >
                      @solana-payment-channel/client
                    </a>
                    <p className="text-xs text-muted">Client SDK for creating and managing payment channels</p>
                  </div>
                  <div>
                    <a
                      href="https://www.npmjs.com/package/@solana-payment-channel/core"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm text-primary mb-1 hover:underline inline-block"
                    >
                      @solana-payment-channel/core
                    </a>
                    <p className="text-xs text-muted">Channel lifecycle, state management, claim generation</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm text-muted mb-6">
              Use @x402-solana for on-chain only, or add @solana-payment-channel for instant, zero-fee channel payments. Server verification works with both.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="https://github.com/BOBER3r/x402-solana-toolkit" variant="secondary" external>
                X402 Toolkit on GitHub
              </Button>
              <Button href="https://github.com/BOBER3r/solana-payment-channel-kit" variant="secondary" external>
                Payment Channels on GitHub
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Payment Channels Highlight */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-gray-50 border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary font-medium mb-6">
                <Zap className="h-4 w-4" />
                Cost Comparison: On-Chain vs Channels
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                When to Use Payment Channels
              </h2>
              <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
                Payment channels provide instant, zero-fee payments for high-frequency scenarios
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-8">
              <Card className="border-2 border-gray-200">
                <h3 className="text-xl font-semibold mb-4">On-Chain (scheme: 'exact')</h3>
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted">10,000 requests</span>
                    <span className="font-semibold">~$5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Processing time</span>
                    <span className="font-semibold">~1.5 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Transactions needed</span>
                    <span className="font-semibold">10,000</span>
                  </div>
                </div>
                <p className="text-xs text-muted">
                  ✓ Perfect for sporadic usage<br/>
                  ✓ Multi-API access<br/>
                  ✓ No setup required
                </p>
              </Card>

              <Card className="border-2 border-green-500 bg-green-50/50">
                <h3 className="text-xl font-semibold mb-4 text-green-700">Channels (scheme: 'channel')</h3>
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted">10,000 requests</span>
                    <span className="font-semibold text-green-700">~$0.0015</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Processing time</span>
                    <span className="font-semibold text-green-700">~10 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Transactions needed</span>
                    <span className="font-semibold text-green-700">2 (open + close)</span>
                  </div>
                </div>
                <p className="text-xs text-green-700 font-semibold">
                  ✓ Instant off-chain verification<br/>
                  ✓ Zero fees per payment<br/>
                  ✓ 99.7% cost reduction
                </p>
              </Card>
            </div>

            <div className="text-center">
              <Button href="/payment-channels" variant="primary" className="inline-flex items-center gap-2">
                Learn About Payment Channels
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-10">
              One verification API. Two payment schemes. Choose on-chain for simplicity or channels for speed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/docs/getting-started"
                variant="secondary"
                className="bg-white text-primary hover:bg-gray-100"
              >
                Read Documentation
              </Button>
              <Button
                href="/examples"
                variant="secondary"
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                View Examples <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
