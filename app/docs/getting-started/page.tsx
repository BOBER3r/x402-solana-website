"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import CodeBlock from "@/components/CodeBlock";
import Card from "@/components/Card";
import { CheckCircle2, Zap, DollarSign, Clock } from "lucide-react";

const sections = [
  { id: "overview", title: "Overview" },
  { id: "quick-start", title: "Quick Start" },
  { id: "packages", title: "Package Ecosystem" },
  { id: "performance", title: "Performance" },
  { id: "program-features", title: "Program Features" },
  { id: "client-example", title: "Complete Example" },
  { id: "tutorials", title: "Tutorials" },
  { id: "monitoring", title: "Monitoring" },
  { id: "troubleshooting", title: "Troubleshooting" },
  { id: "resources", title: "Resources" },
];

export default function GettingStartedPage() {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex gap-12">
          {/* Sidebar Navigation */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block w-64 flex-shrink-0"
          >
            <div className="sticky top-24">
              <h3 className="text-sm font-semibold text-foreground mb-4">On This Page</h3>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                      activeSection === section.id
                        ? "bg-primary text-white font-medium"
                        : "text-muted hover:bg-gray-100 hover:text-foreground"
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </motion.aside>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 max-w-4xl"
          >
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              X402 Protocol + Payment Channels
            </h1>
            <p className="text-lg text-muted mb-12">
              Complete Integration Guide: Transform HTTP 402 from theory to reality with instant,
              cost-effective micropayments on Solana
            </p>

            {/* Overview */}
            <section id="overview" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Zap className="h-6 w-6 text-primary" />
                Overview
              </h2>

              <Card className="mb-6">
                <p className="mb-4">A complete payment system that combines:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>x402 Protocol</strong>: HTTP 402 Payment Required standard for micropayments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Payment Channels</strong>: Off-chain scaling solution for instant, gasless payments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Solana</strong>: High-performance blockchain for settlement</span>
                  </li>
                </ul>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-semibold text-blue-900">
                    Result: APIs that accept payments as naturally as they handle authentication, with &lt;10ms latency and $0 fees per payment.
                  </p>
                </div>
              </Card>

              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                The Problem This Solves
              </h3>

              <div className="space-y-4">
                <Card>
                  <h3 className="text-lg font-semibold mb-3 text-red-600">Traditional On-Chain Payments (scheme: 'exact')</h3>
                  <CodeBlock
                    code={`Every API call → Blockchain transaction → 400-800ms latency → $0.0005 fee
❌ Too slow for real-time APIs
❌ Too expensive for sub-cent payments
❌ Can't scale to 100+ requests/minute`}
                    language="text"
                  />
                </Card>

                <Card>
                  <h3 className="text-lg font-semibold mb-3 text-green-600">Payment Channels Solution (scheme: 'channel')</h3>
                  <CodeBlock
                    code={`Setup: 1 on-chain transaction (open channel)
Usage: Unlimited off-chain payments → <10ms latency → $0 fees
Settle: 1 on-chain transaction (claim batch)

✅ 91% faster than on-chain
✅ 94% cheaper overall
✅ Scales to thousands of req/min`}
                    language="text"
                  />
                </Card>
              </div>
            </section>

            {/* Quick Start */}
            <section id="quick-start" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Clock className="h-6 w-6 text-primary" />
                Quick Start: Add Payment Channels to Your x402 API
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Step 1: Install the Package</h3>
                  <CodeBlock
                    code={`npm install @x402-solana/core@latest`}
                    language="bash"
                  />
                  <p className="text-sm text-muted mt-2">Version requirement: &gt;= 0.3.0 (payment channels support)</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Step 2: Update Your Server Code</h3>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Before (On-Chain Only):</p>
                    <CodeBlock
                      code={`import { TransactionVerifier } from '@x402-solana/core';

const verifier = new TransactionVerifier({
  rpcUrl: 'https://api.devnet.solana.com',
  commitment: 'confirmed',
});

// Only supports scheme: 'exact' (on-chain)`}
                      language="typescript"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">After (Hybrid: On-Chain + Channels):</p>
                    <CodeBlock
                      code={`import {
  TransactionVerifier,
  ChannelPaymentVerifier,  // ✨ NEW
  parseX402Payment,         // ✨ NEW
} from '@x402-solana/core';

// For on-chain payments (scheme: 'exact')
const onChainVerifier = new TransactionVerifier({
  rpcUrl: 'https://api.devnet.solana.com',
  commitment: 'confirmed',
});

// For payment channel payments (scheme: 'channel') ✨
const channelVerifier = new ChannelPaymentVerifier({
  connection: new Connection('https://api.devnet.solana.com'),
  programId: 'H8SsYx7Z8qp12AvaX8oEWDCHWo8JYmEK21zWLWcfW4Zc',
});

// Now your API supports BOTH payment methods!`}
                      language="typescript"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Step 3: Handle Both Payment Types</h3>
                  <CodeBlock
                    code={`app.get('/api/premium-data', async (req, res) => {
  const paymentHeader = req.headers['x-payment'];

  if (!paymentHeader) {
    // Return 402 with BOTH payment options
    return res.status(402).json({
      x402Version: 1,
      accepts: [
        {
          // Option 1: On-chain (slower, per-payment fees)
          scheme: 'exact',
          network: 'solana-devnet',
          payTo: 'YourUSDCTokenAccount...',
          maxAmountRequired: '100000', // $0.10
          asset: 'USDC',
        },
        {
          // Option 2: Payment channel (instant, zero fees) ✨
          scheme: 'channel',
          network: 'solana-devnet',
          payTo: 'YourServerWallet...',
          maxAmountRequired: '100000',
          asset: 'USDC',
          programId: 'H8SsYx7Z8qp12AvaX8oEWDCHWo8JYmEK21zWLWcfW4Zc',
        },
      ],
    });
  }

  // Parse the payment header
  const parsed = parseX402Payment(paymentHeader);
  if (!parsed.success || !parsed.payment) {
    return res.status(400).json({ error: 'Invalid payment header' });
  }

  // Route to appropriate verifier based on scheme
  let verificationResult;

  if (parsed.payment.scheme === 'exact') {
    // On-chain verification (400-800ms)
    const payload = parsed.payment.payload as any;
    verificationResult = await onChainVerifier.verifyPayment({
      signature: payload.transactionSignature,
      expectedRecipient: 'YourUSDCTokenAccount...',
      expectedAmountUSD: 0.10,
    });
  }
  else if (parsed.payment.scheme === 'channel') {
    // Channel verification (<10ms) ✨
    const payload = parsed.payment.payload as any;
    verificationResult = await channelVerifier.verifyChannelPayment(
      {
        channelId: payload.channelId,
        amount: payload.amount,
        nonce: payload.nonce,
        signature: payload.channelSignature,
        expiry: payload.expiry,
      },
      'YourServerWallet...',
      { minClaimIncrement: 1000n }
    );
  }

  if (!verificationResult.valid) {
    return res.status(402).json({ error: verificationResult.error });
  }

  // Payment verified! Return the premium data
  res.json({ data: 'Your premium API response' });
});`}
                    language="typescript"
                  />
                  <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm font-semibold text-green-900">
                      That's it! Your API now supports both payment methods, and clients can choose based on their usage pattern.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Package Ecosystem */}
            <section id="packages" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">Package Ecosystem</h2>
              <p className="text-muted mb-6">
                Our payment channel solution consists of 4 packages that work together:
              </p>

              <Card className="mb-6">
                <CodeBlock
                  code={`┌─────────────────────────────────────────────────────────────┐
│  Package Ecosystem                                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. @x402-solana/core (npm) ← Foundation                    │
│     └─ HTTP 402 protocol + on-chain payment verification    │
│                                                             │
│  2. @solana-payment-channel/core (local) ← Core Logic       │
│     └─ Payment channel management + off-chain signatures    │
│                                                             │
│  3. @solana-payment-channel/client (local) ← Browser SDK    │
│     └─ Automatic payment client + wallet integration        │
│                                                             │
│  4. @solana-payment-channel/server (local) ← Server SDK     │
│     └─ Express/Fastify/NestJS middleware                    │
└─────────────────────────────────────────────────────────────┘`}
                  language="text"
                />
              </Card>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3">@x402-solana/core (Foundation)</h3>
                  <p className="text-muted mb-3">
                    Basic HTTP 402 protocol with on-chain USDC verification.
                  </p>
                  <CodeBlock
                    code={`npm install @x402-solana/core`}
                    language="bash"
                  />
                  <p className="text-sm text-muted mt-2">
                    <strong>When to use:</strong> Simple APIs with low request frequency (&lt;10 req/min), or as fallback.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">@solana-payment-channel/core (Core Logic)</h3>
                  <p className="text-muted mb-3">
                    Payment channel management, off-chain signatures, state management.
                  </p>
                  <CodeBlock
                    code={`npm install @solana-payment-channel/core @solana/web3.js @coral-xyz/anchor`}
                    language="bash"
                  />
                  <p className="text-sm text-muted mt-2">
                    <strong>When to use:</strong> Building custom integrations, need full control over channel lifecycle.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">@solana-payment-channel/client (Browser SDK)</h3>
                  <p className="text-muted mb-3">
                    Automatic payment client for browsers with wallet integration.
                  </p>
                  <CodeBlock
                    code={`npm install @solana-payment-channel/client @solana/wallet-adapter-react`}
                    language="bash"
                  />
                  <p className="text-sm text-muted mt-2">
                    <strong>When to use:</strong> Building frontend apps, need automatic payment handling.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">@solana-payment-channel/server (Server SDK)</h3>
                  <p className="text-muted mb-3">
                    Express/Fastify/NestJS middleware for automatic payment verification.
                  </p>
                  <CodeBlock
                    code={`npm install @solana-payment-channel/server`}
                    language="bash"
                  />
                  <p className="text-sm text-muted mt-2">
                    <strong>When to use:</strong> Building Node.js servers, need plug-and-play payment protection.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Package Comparison</h3>
                <Card>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-3">Package</th>
                          <th className="text-left py-2 px-3">Use Case</th>
                          <th className="text-left py-2 px-3">Complexity</th>
                          <th className="text-left py-2 px-3">Setup Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 px-3 font-mono text-xs">@x402-solana/core</td>
                          <td className="py-2 px-3">Basic on-chain payments</td>
                          <td className="py-2 px-3">Low</td>
                          <td className="py-2 px-3">5 min</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-3 font-mono text-xs">@solana-payment-channel/core</td>
                          <td className="py-2 px-3">Custom channel logic</td>
                          <td className="py-2 px-3">Medium</td>
                          <td className="py-2 px-3">30 min</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-3 font-mono text-xs">@solana-payment-channel/client</td>
                          <td className="py-2 px-3">Browser auto-pay</td>
                          <td className="py-2 px-3">Low</td>
                          <td className="py-2 px-3">10 min</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-mono text-xs">@solana-payment-channel/server</td>
                          <td className="py-2 px-3">Server middleware</td>
                          <td className="py-2 px-3">Very Low</td>
                          <td className="py-2 px-3">3 min</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            </section>

            {/* Performance */}
            <section id="performance" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">Real-World Performance Comparison</h2>
              <p className="text-muted mb-4">Based on test suite: 50 API Payments × $0.10 = $5.00 Total</p>

              <Card>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-3">Metric</th>
                        <th className="text-left py-2 px-3">On-Chain (exact)</th>
                        <th className="text-left py-2 px-3">Channel (channel)</th>
                        <th className="text-left py-2 px-3">Improvement</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 px-3 font-semibold">Total Cost</td>
                        <td className="py-2 px-3">$0.0250</td>
                        <td className="py-2 px-3">$0.0015</td>
                        <td className="py-2 px-3 text-green-600 font-semibold">94% cheaper</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-3 font-semibold">Cost/Payment</td>
                        <td className="py-2 px-3">$0.0005</td>
                        <td className="py-2 px-3">$0.0000</td>
                        <td className="py-2 px-3 text-green-600 font-semibold">100% savings</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-3 font-semibold">Avg Latency</td>
                        <td className="py-2 px-3">2,019ms</td>
                        <td className="py-2 px-3">175ms</td>
                        <td className="py-2 px-3 text-green-600 font-semibold">91% faster</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-3 font-semibold">RPC Calls</td>
                        <td className="py-2 px-3">150</td>
                        <td className="py-2 px-3">6</td>
                        <td className="py-2 px-3 text-green-600 font-semibold">96% fewer</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold">On-Chain Txs</td>
                        <td className="py-2 px-3">50</td>
                        <td className="py-2 px-3">3</td>
                        <td className="py-2 px-3 text-green-600 font-semibold">94% reduction</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </section>

            {/* Program Features */}
            <section id="program-features" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">Payment Channel Program Features</h2>
              <p className="text-muted mb-4">
                Program ID: <code className="text-xs bg-gray-100 px-2 py-1 rounded">H8SsYx7Z8qp12AvaX8oEWDCHWo8JYmEK21zWLWcfW4Zc</code>
              </p>

              <div className="space-y-6">
                <Card>
                  <h3 className="text-lg font-semibold mb-2">1. open_channel - Lock funds, establish trust</h3>
                  <CodeBlock
                    code={`pub fn open_channel(
    channel_id: [u8; 32],
    initial_deposit: u64,     // Micro-USDC (e.g., 5_000_000 = $5)
    expiry: i64,              // Unix timestamp
    credit_limit: u64,        // Optional overdraft (0-1000 USDC)
)`}
                    language="rust"
                  />
                  <ul className="mt-3 text-sm space-y-1">
                    <li>• Minimum deposit: 1 USDC (prevents spam)</li>
                    <li>• Maximum credit limit: 1000 USDC</li>
                    <li>• USDC locked in program-controlled PDA</li>
                    <li>• Emits ChannelOpened event</li>
                  </ul>
                </Card>

                <Card>
                  <h3 className="text-lg font-semibold mb-2">2. claim_payment - Server claims accumulated payments</h3>
                  <CodeBlock
                    code={`pub fn claim_payment(
    amount: u64,              // Total claimed so far (cumulative)
    nonce: u64,               // Must increase monotonically
    client_signature: [u8; 64], // Ed25519 signature
)`}
                    language="rust"
                  />
                  <ul className="mt-3 text-sm space-y-1">
                    <li>• Ed25519 signature verification using domain separator</li>
                    <li>• Nonce protection: prevents replay (max increment: 10,000)</li>
                    <li>• Overdraft support: can claim up to deposit + credit_limit</li>
                    <li>• Batch claiming: 100s of payments → 1 transaction</li>
                  </ul>
                </Card>

                <Card>
                  <h3 className="text-lg font-semibold mb-2">3. add_funds - Top up without closing</h3>
                  <CodeBlock
                    code={`pub fn add_funds(
    amount: u64,
)`}
                    language="rust"
                  />
                  <ul className="mt-3 text-sm space-y-1">
                    <li>• Auto debt settlement: if client has overdraft debt, payment goes to server first</li>
                    <li>• Remaining funds added to channel balance</li>
                    <li>• No need to close/reopen channel</li>
                  </ul>
                </Card>

                <Card>
                  <h3 className="text-lg font-semibold mb-2">4. close_channel - Reclaim remaining funds</h3>
                  <CodeBlock
                    code={`pub fn close_channel()`}
                    language="rust"
                  />
                  <ul className="mt-3 text-sm space-y-1">
                    <li>• Client can close anytime (gets refund of unused funds)</li>
                    <li>• Anyone can close after expiry</li>
                    <li>• Cannot close with outstanding debt (must settle first)</li>
                    <li>• Returns remaining USDC to client</li>
                  </ul>
                </Card>
              </div>
            </section>

            {/* Complete Client Example */}
            <section id="client-example" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">Complete Client Example</h2>
              <p className="text-muted mb-4">
                Client opens a channel, makes 50 payments, server claims once
              </p>
              <CodeBlock
                code={`import { ChannelManager, createPaymentAuthorizationV2 } from '@solana-payment-channel/core';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';

const connection = new Connection('https://api.devnet.solana.com');
const clientWallet = Keypair.fromSecretKey(/* your secret */);
const serverPubkey = new PublicKey('ServerWallet...');

// Step 1: Open channel (1 on-chain tx, ~$0.0005)
const manager = new ChannelManager({
  rpcUrl: 'https://api.devnet.solana.com',
  programId: new PublicKey('H8SsYx7Z8qp12AvaX8oEWDCHWo8JYmEK21zWLWcfW4Zc'),
  usdcMint: new PublicKey('Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr'),
  network: 'devnet',
}, clientWallet);

const channelId = await manager.openChannel({
  serverPubkey,
  initialDeposit: BigInt(5_000_000), // $5.00
  // Optional: creditLimit: BigInt(1_000_000) // $1 overdraft
});

console.log('Channel opened:', channelId);

// Step 2: Make 50 API calls (all off-chain, $0 fees, <10ms each)
for (let i = 1; i <= 50; i++) {
  const cumulativeAmount = BigInt(i * 100_000); // $0.10 per call
  const nonce = BigInt(i);

  // Create signed authorization (off-chain, <1ms)
  const authorization = await createPaymentAuthorizationV2(
    new PublicKey(channelId),
    serverPubkey,
    cumulativeAmount,
    nonce,
    BigInt(Math.floor(Date.now() / 1000) + 3600), // 1 hour expiry
    clientWallet
  );

  // Make API call with X-PAYMENT header
  const response = await fetch('https://your-api.com/premium-data', {
    headers: {
      'X-Payment': createChannelPaymentHeader(
        channelId,
        cumulativeAmount.toString(),
        nonce.toString(),
        authorization.signature.toString('base64'),
        'solana-devnet',
      ),
    },
  });

  const data = await response.json();
  console.log(\`Call \${i}/50: \${response.status}\`, data);
}

// Step 3: Close channel when done (1 on-chain tx, ~$0.0005)
await manager.closeChannel(channelId);
console.log('Channel closed, unused funds returned');`}
                language="typescript"
              />
            </section>

            {/* Tutorials */}
            <section id="tutorials" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">Step-by-Step Integration Tutorials</h2>

              <div className="space-y-6">
                <Card>
                  <h3 className="text-lg font-semibold mb-3">Tutorial 1: Add Channels to Existing x402 API</h3>
                  <p className="text-sm text-muted mb-3">
                    <strong>Current state:</strong> You have an API using @x402-solana/core for on-chain payments<br />
                    <strong>Goal:</strong> Support payment channels without breaking existing clients
                  </p>
                  <CodeBlock
                    code={`// 1. Install latest version
npm install @x402-solana/core@latest

// 2. Import channel verifier
import { ChannelPaymentVerifier, parseX402Payment } from '@x402-solana/core';

// 3. Initialize verifier
const channelVerifier = new ChannelPaymentVerifier({
  connection: new Connection(process.env.SOLANA_RPC_URL),
  programId: process.env.CHANNEL_PROGRAM_ID,
});

// 4. Update payment endpoint
app.post('/api/verify-payment', async (req, res) => {
  const paymentHeader = req.headers['x-payment'];
  const parsed = parseX402Payment(paymentHeader);

  // Route based on scheme
  if (parsed.payment.scheme === 'channel') {
    // Use channel verifier (<10ms)
    const result = await channelVerifier.verifyChannelPayment(/*...*/);
  } else {
    // Use existing on-chain verifier (400-800ms)
    const result = await onChainVerifier.verifyPayment(/*...*/);
  }
});`}
                    language="typescript"
                  />
                </Card>

                <Card>
                  <h3 className="text-lg font-semibold mb-3">Tutorial 2: Deploy Your Own Payment Channel Program</h3>
                  <CodeBlock
                    code={`# 1. Clone the repo
git clone https://github.com/yourusername/solana-payment-channels
cd solana-payment-channels

# 2. Build the Anchor program
anchor build

# 3. Deploy to devnet
anchor deploy --provider.cluster devnet

# 4. Copy the program ID
# Output: Program Id: H8SsYx7Z8qp12AvaX8oEWDCHWo8JYmEK21zWLWcfW4Zc

# 5. Update your .env
echo "CHANNEL_PROGRAM_ID=H8SsYx7Z..." >> .env

# 6. Test it
npm test`}
                    language="bash"
                  />
                </Card>
              </div>
            </section>

            {/* Monitoring */}
            <section id="monitoring" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">Monitoring & Observability</h2>

              <Card>
                <h3 className="text-lg font-semibold mb-3">Track Channel Performance</h3>
                <CodeBlock
                  code={`import { ChannelPaymentVerifier } from '@x402-solana/core';

const verifier = new ChannelPaymentVerifier(/*...*/);

// Add metrics tracking
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const scheme = req.headers['x-payment'] ?
      parseX402Payment(req.headers['x-payment']).payment.scheme :
      'none';

    // Log to your metrics service
    metrics.histogram('api.payment.latency', duration, { scheme });
    metrics.increment('api.payment.count', { scheme });
  });
  next();
});`}
                  language="typescript"
                />
              </Card>

              <Card className="mt-4">
                <h3 className="text-lg font-semibold mb-3">Solana Explorer Links</h3>
                <CodeBlock
                  code={`// Monitor channel state on-chain
const channelPDA = PublicKey.findProgramAddressSync(
  [Buffer.from('channel'), Buffer.from(channelId, 'hex')],
  new PublicKey(programId)
);

console.log(\`View channel: https://explorer.solana.com/address/\${channelPDA}?cluster=devnet\`);

// Monitor claim transactions
console.log(\`View claim: https://explorer.solana.com/tx/\${claimSignature}?cluster=devnet\`);`}
                  language="typescript"
                />
              </Card>
            </section>

            {/* Troubleshooting */}
            <section id="troubleshooting" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">Common Issues & Solutions</h2>

              <div className="space-y-4">
                <Card>
                  <h3 className="font-semibold mb-2">Issue: "Channel not found on-chain"</h3>
                  <p className="text-sm text-muted mb-2"><strong>Cause:</strong> Channel not opened yet or wrong program ID</p>
                  <p className="text-sm"><strong>Solution:</strong> Verify program ID matches deployment, ensure open_channel succeeded</p>
                </Card>

                <Card>
                  <h3 className="font-semibold mb-2">Issue: "Invalid signature"</h3>
                  <p className="text-sm text-muted mb-2"><strong>Cause:</strong> Message format mismatch between client signing and server verification</p>
                  <p className="text-sm"><strong>Solution:</strong> Both must use same message structure (109 bytes with domain separator)</p>
                </Card>

                <Card>
                  <h3 className="font-semibold mb-2">Issue: "Nonce increment too large"</h3>
                  <p className="text-sm text-muted mb-2"><strong>Cause:</strong> Nonce jumped &gt;10,000 (anti-griefing protection)</p>
                  <p className="text-sm"><strong>Solution:</strong> Use sequential nonces (1, 2, 3...), don't skip</p>
                </Card>

                <Card>
                  <h3 className="font-semibold mb-2">Issue: "Cannot close with debt"</h3>
                  <p className="text-sm text-muted mb-2"><strong>Cause:</strong> Client has overdraft debt</p>
                  <p className="text-sm"><strong>Solution:</strong> Call add_funds to settle debt before close_channel</p>
                </Card>
              </div>
            </section>

            {/* Resources */}
            <section id="resources" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">Resources</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <h3 className="font-semibold mb-2">View Examples</h3>
                  <p className="text-sm text-muted mb-4">
                    Check out working examples for different frameworks
                  </p>
                  <a href="/demo" className="text-sm text-primary hover:underline">
                    View Examples →
                  </a>
                </Card>

                <Card>
                  <h3 className="font-semibold mb-2">Architecture</h3>
                  <p className="text-sm text-muted mb-4">
                    Learn about the technical implementation
                  </p>
                  <a href="/architecture" className="text-sm text-primary hover:underline">
                    Read Architecture →
                  </a>
                </Card>

                <Card>
                  <h3 className="font-semibold mb-2">Payment Channels</h3>
                  <p className="text-sm text-muted mb-4">
                    Deep dive into payment channels on Solana
                  </p>
                  <a href="/payment-channels" className="text-sm text-primary hover:underline">
                    Learn More →
                  </a>
                </Card>

                <Card>
                  <h3 className="font-semibold mb-2">Hackathon Info</h3>
                  <p className="text-sm text-muted mb-4">
                    x402 Protocol in Solana Hackathon
                  </p>
                  <a href="/hackathon" className="text-sm text-primary hover:underline">
                    Hackathon Details →
                  </a>
                </Card>
              </div>

              <Card className="mt-6">
                <h3 className="font-semibold mb-3">Program on Solana Explorer</h3>
                <p className="text-sm text-muted mb-2">
                  View the deployed payment channel program:
                </p>
                <a
                  href="https://explorer.solana.com/address/H8SsYx7Z8qp12AvaX8oEWDCHWo8JYmEK21zWLWcfW4Zc?cluster=devnet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline font-mono"
                >
                  H8SsYx7Z8qp12AvaX8oEWDCHWo8JYmEK21zWLWcfW4Zc
                </a>
              </Card>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
