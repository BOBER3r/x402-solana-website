"use client";

import { motion } from "framer-motion";
import Card from "@/components/Card";
import Button from "@/components/Button";
import CodeBlock from "@/components/CodeBlock";
import { Trophy, Target, Code, Users, Rocket, CheckCircle2, DollarSign } from "lucide-react";

export default function HackathonPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-sm text-primary font-medium mb-6">
              <Trophy className="h-4 w-4" />
              Solana Hackathon Submission
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              x402 Payment Channels
            </h1>
            <p className="text-lg text-muted">
              Payment Channels Protocol for Solana
            </p>
          </div>

          {/* Project Overview */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
            <Card>
              <p className="text-muted mb-4">
                x402 brings HTTP 402 Payment Required to life with Solana payment channels.
                Our protocol enables micropayments for API requests with 99.8% cost savings
                compared to solana transaction, making true pay-per-use APIs economically viable.
              </p>
              <p className="text-muted">
                Built for developers, x402 provides framework-agnostic TypeScript SDKs that integrate
                seamlessly with Express, NestJS, Fastify, and any Node.js HTTP framework.
              </p>
            </Card>
          </section>

          {/* Problem Statement */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-primary" />
              The Problem This Solves
            </h2>

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

          {/* Solution */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Our Solution</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <Target className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Payment Channels</h3>
                <p className="text-sm text-muted">
                  Adapting x402 to accept unidirectional payment channels.
                </p>
              </Card>

              <Card>
                <Code className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Developer-First</h3>
                <p className="text-sm text-muted">
                  Simple middleware integration with full TypeScript support. Add payment protection
                  to any route in 3 lines of code.
                </p>
              </Card>

              <Card>
                <Rocket className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Framework Agnostic</h3>
                <p className="text-sm text-muted">
                  Works with Express, NestJS, Fastify, and any Node.js framework. No vendor lock-in.
                </p>
              </Card>

            </div>
          </section>

          {/* Technical Implementation */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Technical Implementation</h2>
            <Card>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Solana Program (Rust + Anchor)</h4>
                    <p className="text-sm text-muted">
                      Custom Solana program managing payment channel accounts, state transitions,
                      and settlement logic with cryptographic verification.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm mb-1">TypeScript SDKs</h4>
                    <p className="text-sm text-muted">
                      Server SDK with middleware for Express/NestJS/Fastify. Client SDK for making
                      paid requests with automatic channel management.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Off-Chain Payment Proofs</h4>
                    <p className="text-sm text-muted">
                      HTTP headers carry Ed25519-signed payment proofs with nonce-based replay protection.
                      Verified in &lt;1ms without blockchain transactions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Channel State Machine</h4>
                    <p className="text-sm text-muted">
                      Robust state management handling Open, Closing, Closed, and Disputed states
                      with automatic reconciliation and timeout protection.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Key Achievements */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Key Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">99.8%</div>
                <div className="text-sm text-muted">Cost Reduction</div>
              </Card>
              <Card className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">&lt;1ms</div>
                <div className="text-sm text-muted">Payment Verification</div>
              </Card>
              <Card className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">3</div>
                <div className="text-sm text-muted">NPM Packages</div>
              </Card>
            </div>
          </section>

          {/* Use Cases */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Use Cases</h2>
            <div className="space-y-4">
              <Card>
                <h3 className="font-semibold mb-2">AI/ML API Services</h3>
                <p className="text-sm text-muted">
                  Charge per inference for LLM APIs, image generation, or model predictions.
                  Fair pricing based on actual usage without monthly minimums.
                </p>
              </Card>

              <Card>
                <h3 className="font-semibold mb-2">Data APIs</h3>
                <p className="text-sm text-muted">
                  Real-time financial data, weather information, or analytics APIs with
                  per-request pricing. Pay only for the data you need.
                </p>
              </Card>

              <Card>
                <h3 className="font-semibold mb-2">Compute-as-a-Service</h3>
                <p className="text-sm text-muted">
                  On-demand computation, rendering services, or code execution. Dynamic pricing
                  based on computational complexity.
                </p>
              </Card>

              <Card>
                <h3 className="font-semibold mb-2">Content APIs</h3>
                <p className="text-sm text-muted">
                  Premium content access, research papers, or media streaming. Micropayments
                  enable article-by-article or minute-by-minute pricing.
                </p>
              </Card>
            </div>
          </section>

          {/* Team & Links */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Project Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <h3 className="font-semibold mb-3">x402 Devkit Repository</h3>
                <a
                  href="https://github.com/x402-solana-toolkit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  github.com/x402-solana-toolkit
                </a>
              </Card>

              <Card>
                <h3 className="font-semibold mb-3">Solana Payment Channel Repository</h3>
                <a
                    href="https://github.com/BOBER3r/solana-payment-channel-kit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                >
                  github.com/x402-solana-toolkit
                </a>
              </Card>

              <Card>
                <h3 className="font-semibold mb-3">Documentation</h3>
                <a
                  href="/docs"
                  className="text-sm text-primary hover:underline"
                >
                  Full documentation and guides
                </a>
              </Card>

              <Card>
                <h3 className="font-semibold mb-3">NPM Organization</h3>
                <a
                  href="https://www.npmjs.com/org/x402-solana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  npmjs.com/org/x402-solana
                </a>
              </Card>

            </div>
          </section>

          {/* CTA */}
          <section>
            <Card className="bg-primary text-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Try x402 Today</h3>
                <p className="text-blue-100 mb-6">
                  Start accepting micropayments in your APIs with just a few lines of code
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    href="/docs/getting-started"
                    variant="secondary"
                    className="bg-white text-primary hover:bg-gray-100"
                  >
                    Get Started
                  </Button>
                  <Button
                    href="/demo"
                    variant="secondary"
                    className="bg-transparent border-white text-white hover:bg-white/10"
                  >
                    View Examples
                  </Button>
                </div>
              </div>
            </Card>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
