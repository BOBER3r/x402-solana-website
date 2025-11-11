"use client";

import { motion } from "framer-motion";
import { Zap, Server, Code2, TrendingDown, CheckCircle2, ArrowRight } from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import CodeBlock from "@/components/CodeBlock";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function PaymentChannelsPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-sm text-primary font-medium mb-6">
            <Zap className="h-4 w-4" />
            Next-Generation Micropayments
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            Solana Payment Channels
          </h1>
          <p className="text-xl text-muted max-w-3xl mx-auto mb-8">
            Off-chain micropayments with on-chain settlement. Reduce API payment costs by 99.8%
            while maintaining instant verification and automatic x402 fallback.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="https://github.com/BOBER3r/solana-payment-channel-kit"
              variant="primary"
              external
            >
              View on GitHub
            </Button>
            <Button href="#how-it-works" variant="secondary">
              How It Works
            </Button>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="text-center h-full">
                <div className="text-4xl font-bold text-green-600 mb-2">99.8%</div>
                <div className="text-sm text-muted mb-2">Cost Reduction</div>
                <p className="text-xs text-muted">
                  10,000 requests: $0.002 vs $10
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="text-center h-full">
                <div className="text-4xl font-bold text-primary mb-2">&lt;10ms</div>
                <div className="text-sm text-muted mb-2">Payment Verification</div>
                <p className="text-xs text-muted">
                  Instant off-chain validation
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="text-center h-full">
                <div className="text-4xl font-bold text-primary mb-2">2</div>
                <div className="text-sm text-muted mb-2">On-Chain Transactions</div>
                <p className="text-xs text-muted">
                  Only open and close (vs thousands)
                </p>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">How Payment Channels Work</h2>
            <p className="text-lg text-muted mb-12 max-w-3xl">
              Payment channels enable unlimited micropayments between two parties with only
              two on-chain transactions, dramatically reducing costs and latency.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {[
              {
                step: "1",
                title: "Open Channel",
                description: "Client deposits funds into on-chain escrow account",
                detail: "1 on-chain transaction (~$0.0005)",
              },
              {
                step: "2",
                title: "Sign Proofs",
                description: "Client signs off-chain payment proofs for each request",
                detail: "Ed25519 signatures, instant",
              },
              {
                step: "3",
                title: "Verify Instantly",
                description: "Server validates signatures without blockchain",
                detail: "< 10ms verification time",
              },
              {
                step: "4",
                title: "Claim Payments",
                description: "Server claims accumulated funds when desired",
                detail: "Batch multiple payments",
              },
              {
                step: "5",
                title: "Close & Refund",
                description: "Client closes channel and receives unused balance",
                detail: "1 on-chain transaction",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full relative">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold mb-3">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2 text-sm">{item.title}</h3>
                  <p className="text-xs text-muted mb-2">{item.description}</p>
                  <p className="text-xs text-primary">{item.detail}</p>
                  {index < 4 && (
                    <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-300" />
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Cost Comparison */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Dramatic Cost Savings</h2>
            <p className="text-lg text-muted mb-12 max-w-3xl">
              Comparison for 10,000 API requests over 1 hour
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card>
              <div className="text-center">
                <div className="text-sm font-medium text-red-600 mb-2">Standard x402</div>
                <div className="text-4xl font-bold mb-4 text-red-600">~$10</div>
                <div className="space-y-2 text-left text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted">Transactions</span>
                    <span className="font-semibold">10,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Processing Time</span>
                    <span className="font-semibold">~6.7 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Latency/Request</span>
                    <span className="font-semibold">400-800ms</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2">
                    <span className="text-muted">Cost per Request</span>
                    <span className="font-semibold">$0.001</span>
                  </div>
                </div>
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-xs text-red-700">Slow and expensive at scale</p>
                </div>
              </div>
            </Card>

            <Card className="border-2 border-primary">
              <div className="text-center">
                <div className="text-sm font-medium text-primary mb-2">Payment Channels</div>
                <div className="text-4xl font-bold mb-4 text-green-600">~$0.002</div>
                <div className="space-y-2 text-left text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted">Transactions</span>
                    <span className="font-semibold">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Processing Time</span>
                    <span className="font-semibold">~1 second</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Latency/Request</span>
                    <span className="font-semibold">&lt;10ms</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2">
                    <span className="text-muted">Cost per Request</span>
                    <span className="font-semibold text-green-600">$0.0002</span>
                  </div>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-xs font-semibold text-green-700">
                    99.8% cost reduction, 400x faster
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Framework Integration */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Framework Integration</h2>
            <p className="text-lg text-muted mb-12 max-w-3xl">
              Middleware examples for Express, NestJS, and Fastify
            </p>
          </motion.div>

          <div className="space-y-8">
            {/* Express */}
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <Server className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">Express Middleware</h3>
              </div>
              <CodeBlock
                code={`import { channelAuthMiddleware } from '@solana-payment-channel/server';

// Fixed price endpoint
app.get('/api/markets',
  channelAuthMiddleware(paymentService, {
    amount: 1_000_000n  // 1 USDC
  }),
  (req, res) => res.json({ markets, payment: req.payment })
);

// Dynamic pricing
app.post('/api/process',
  channelAuthMiddleware(paymentService, {
    amount: async (req) => BigInt(req.body.items.length * 100_000)
  }),
  handler
);`}
              />
            </Card>

            {/* NestJS */}
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <Code2 className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">NestJS Guards & Decorators</h3>
              </div>
              <CodeBlock
                code={`import { RequirePayment, Payment } from '@solana-payment-channel/server';

@Controller('markets')
export class MarketsController {
  @Get('stream')
  @RequirePayment(100n) // 0.0001 USDC per request
  getStream(@Payment() payment: PaymentResult) {
    return {
      markets: this.getMarkets(),
      paymentMethod: payment.method, // 'channel' or 'x402'
      remainingBalance: payment.channelBalance
    };
  }

  // Dynamic pricing
  @Post('process')
  @RequirePayment((context) => {
    const items = context.switchToHttp().getRequest().body.items;
    return BigInt(items.length * 100_000);
  })
  processData() { /* ... */ }
}`}
              />
            </Card>

            {/* Fastify */}
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">Fastify Plugin</h3>
              </div>
              <CodeBlock
                code={`import { channelPaymentPlugin } from '@solana-payment-channel/server';

// Register plugin
await fastify.register(channelPaymentPlugin, {
  rpcUrl: process.env.SOLANA_RPC_URL,
  network: 'devnet',
  programId: new PublicKey(PROGRAM_ID)
});

// Protected route
fastify.get('/api/premium', {
  preHandler: fastify.requirePayment({ amount: 1_000_000n })
}, async (request, reply) => {
  return { data: 'premium', payment: request.payment };
});`}
              />
            </Card>
          </div>
        </section>

        {/* Features */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-12">Key Features</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Automatic x402 Fallback",
                description: "Seamlessly falls back to standard x402 when channels aren't optimal"
              },
              {
                title: "Replay Protection",
                description: "Nonce-based system prevents payment replay attacks"
              },
              {
                title: "Ed25519 Signatures",
                description: "Fast cryptographic verification without blockchain calls"
              },
              {
                title: "Dispute Resolution",
                description: "On-chain dispute system protects both parties"
              },
              {
                title: "Batch Claiming",
                description: "Server can claim multiple payments in single transaction"
              },
              {
                title: "Balance Management",
                description: "Automatic balance tracking and refund handling"
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* NPM Packages */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">NPM Packages</h2>
            <p className="text-lg text-muted mb-12">
              Modular packages for client and server integration
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <div className="font-mono text-sm text-primary mb-3">@solana-payment-channel/server</div>
              <p className="text-sm text-muted mb-4">
                Express, NestJS, and Fastify middleware for payment channel protection
              </p>
              <Button
                href="https://www.npmjs.com/package/@solana-payment-channel/server"
                variant="secondary"
                external
                className="w-full text-xs"
              >
                View on NPM
              </Button>
            </Card>

            <Card>
              <div className="font-mono text-sm text-primary mb-3">@solana-payment-channel/client</div>
              <p className="text-sm text-muted mb-4">
                Client SDK for making paid requests and managing channel lifecycle
              </p>
              <Button
                href="https://www.npmjs.com/package/@solana-payment-channel/client"
                variant="secondary"
                external
                className="w-full text-xs"
              >
                View on NPM
              </Button>
            </Card>

            <Card>
              <div className="font-mono text-sm text-primary mb-3">@solana-payment-channel/core</div>
              <p className="text-sm text-muted mb-4">
                Shared types, utilities, and Solana program interactions
              </p>
              <Button
                href="https://www.npmjs.com/package/@solana-payment-channel/core"
                variant="secondary"
                external
                className="w-full text-xs"
              >
                View on NPM
              </Button>
            </Card>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-12">Ideal Use Cases</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-green-500/20 bg-green-50/5">
              <h3 className="font-semibold mb-3 text-green-700">Perfect For</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>High-frequency streaming (market data, live scores)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Real-time updates and interactive applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Gaming and multiplayer interactions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>AI/ML inference with per-request pricing</span>
                </li>
              </ul>
            </Card>

            <Card>
              <h3 className="font-semibold mb-3 text-muted">Less Ideal For</h3>
              <ul className="space-y-2 text-sm text-muted">
                <li className="flex items-start gap-2">
                  <TrendingDown className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Low-frequency requests (use standard x402)</span>
                </li>
                <li className="flex items-start gap-2">
                  <TrendingDown className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Expensive operations (channel setup overhead)</span>
                </li>
                <li className="flex items-start gap-2">
                  <TrendingDown className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Sporadic API access (not worth opening channel)</span>
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section>
          <Card className="bg-primary text-white">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Reduce Your API Costs by 99.8%?
              </h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Start integrating Solana payment channels into your APIs today
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="https://github.com/BOBER3r/solana-payment-channel-kit"
                  variant="secondary"
                  external
                  className="bg-white text-primary hover:bg-gray-100"
                >
                  View on GitHub
                </Button>
                <Button
                  href="/docs/getting-started"
                  variant="secondary"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                >
                  Documentation
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
