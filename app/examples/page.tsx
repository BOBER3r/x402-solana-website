"use client";

import { motion } from "framer-motion";
import { ExternalLink, Star, Zap, Server, Code2 } from "lucide-react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import CodeBlock from "@/components/CodeBlock";

const examples = [
  {
    id: "01-basic-api",
    title: "Basic API",
    framework: "Express.js",
    badge: "Express",
    badgeColor: "bg-gray-100 text-gray-700",
    description: "Simplest integration - add payments in 5 lines",
    features: [
      "FREE + $0.001 endpoints",
      "~50 lines of code",
      "Perfect for learning"
    ],
    complexity: "Beginner",
    lines: 78,
    performance: "~30k req/s",
    link: "https://github.com/BOBER3r/x402-solana-toolkit/tree/main/examples/01-basic-api"
  },
  {
    id: "02-solex-betting",
    title: "Solex Betting Platform",
    framework: "Express.js",
    badge: "Showcase",
    badgeColor: "bg-primary/10 text-primary border border-primary/20",
    description: "Complete betting API with AI agent integration",
    features: [
      "4 endpoints (1 free, 3 paid)",
      "Dynamic pricing ($0.10 + 2%)",
      "AI agent integration",
      "~900 lines production code"
    ],
    complexity: "Advanced",
    lines: 900,
    performance: "~30k req/s",
    featured: true,
    link: "https://github.com/BOBER3r/x402-solana-toolkit/tree/main/examples/02-solex-betting"
  },
  {
    id: "03-weather-api",
    title: "Weather API",
    framework: "Express.js",
    badge: "Express",
    badgeColor: "bg-gray-100 text-gray-700",
    description: "Tiered pricing with 3 access levels",
    features: [
      "FREE, $0.001, $0.01 tiers",
      "Query parameters",
      "Real-world pricing pattern"
    ],
    complexity: "Beginner",
    lines: 120,
    performance: "~30k req/s",
    link: "https://github.com/BOBER3r/x402-solana-toolkit/tree/main/examples/03-weather-api"
  },
  {
    id: "04-nestjs-api",
    title: "NestJS Microservice",
    framework: "NestJS",
    badge: "NestJS",
    badgeColor: "bg-red-100 text-red-700",
    isNew: true,
    description: "Enterprise-grade with decorators and guards",
    features: [
      "@RequirePayment() decorator",
      "Guards & Dependency Injection",
      "3 endpoints (FREE, $0.001, $0.005)",
      "Production-ready architecture"
    ],
    complexity: "Intermediate",
    lines: 125,
    performance: "~25k req/s",
    link: "https://github.com/BOBER3r/x402-solana-toolkit/tree/main/examples/04-nestjs-api"
  },
  {
    id: "05-fastify-api",
    title: "Fastify High-Performance",
    framework: "Fastify",
    badge: "Fastify",
    badgeColor: "bg-blue-100 text-blue-700",
    isNew: true,
    description: "70k+ req/s with x402 plugin architecture",
    features: [
      "Plugin-based architecture",
      "70k+ requests/second",
      "3 endpoints (FREE, $0.001, $0.005)",
      "Perfect for high-frequency APIs"
    ],
    complexity: "Intermediate",
    lines: 95,
    performance: "~70k req/s",
    link: "https://github.com/BOBER3r/x402-solana-toolkit/tree/main/examples/05-fastify-api"
  }
];

export default function ExamplesPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Working Examples
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              5 complete, production-ready examples demonstrating x402 integration across different frameworks
            </p>
          </div>

          {/* Examples Grid */}
          <section className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {examples.map((example, index) => (
                <motion.div
                  key={example.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={example.featured ? "md:col-span-2 lg:col-span-1" : ""}
                >
                  <Card className={`h-full ${example.featured ? "border-2 border-primary" : ""}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${example.badgeColor}`}>
                        {example.badge}
                      </span>
                      {example.isNew && (
                        <span className="text-xs font-medium px-2 py-1 rounded bg-green-100 text-green-700">
                          NEW
                        </span>
                      )}
                      {example.featured && (
                        <Star className="h-4 w-4 text-primary fill-primary" />
                      )}
                    </div>

                    <h3 className="text-lg font-semibold mb-2">{example.title}</h3>
                    <p className="text-sm text-muted mb-4">{example.description}</p>

                    <ul className="space-y-1 mb-6">
                      {example.features.map((feature, i) => (
                        <li key={i} className="text-xs text-muted flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-4 border-t border-border">
                      <a
                        href={example.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline flex items-center gap-1 font-medium"
                      >
                        View Code <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Framework Comparison */}
          <section className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4">Framework Comparison</h2>
              <p className="text-lg text-muted mb-12">
                Choose the framework that best fits your needs
              </p>
            </motion.div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                      Feature
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                      Express
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                      NestJS
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                      Fastify
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-border">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Complexity</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">Beginner</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">Intermediate</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">Intermediate</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Performance</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">~30k req/s</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">~25k req/s</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="font-semibold text-primary">~70k req/s</span>
                      <Zap className="inline h-3 w-3 text-primary ml-1" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Code Lines</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">78</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">125</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">95</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Best For</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">Learning</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">Enterprise</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">High-perf</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Integration</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">Middleware</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">Decorators</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">Plugin</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Type Safety</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">✅</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">✅✅</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">✅</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">DI Pattern</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">❌</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">✅</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">❌</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Code Examples */}
          <section className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-12">Quick Integration Examples</h2>
            </motion.div>

            <div className="space-y-8">
              {/* Express */}
              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <Server className="h-6 w-6 text-gray-600" />
                  <h3 className="text-xl font-semibold">Express.js Middleware</h3>
                </div>
                <CodeBlock
                  code={`import express from 'express';
import { X402Server } from '@x402-solana/server';

const app = express();
const x402 = new X402Server({
  rpcUrl: process.env.SOLANA_RPC_URL,
  channelAccount: myChannelKeypair,
});

// Protected route - $0.001 per request
app.get('/api/data',
  x402.middleware({ price: 0.001 }),
  (req, res) => {
    res.json({ data: 'Premium content' });
  }
);`}
                />
              </Card>

              {/* NestJS */}
              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <Code2 className="h-6 w-6 text-red-600" />
                  <h3 className="text-xl font-semibold">NestJS Decorators</h3>
                  <span className="text-xs font-medium px-2 py-1 rounded bg-green-100 text-green-700">
                    NEW
                  </span>
                </div>
                <CodeBlock
                  code={`import { Controller, Get } from '@nestjs/common';
import { RequirePayment, Payment } from '@x402-solana/server';

@Controller('api')
export class ApiController {
  @Get('data')
  @RequirePayment(0.001) // $0.001 per request
  getData(@Payment() payment: PaymentResult) {
    return {
      data: 'Premium content',
      payment: payment.amount
    };
  }
}`}
                />
              </Card>

              {/* Fastify */}
              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-semibold">Fastify Plugin</h3>
                  <span className="text-xs font-medium px-2 py-1 rounded bg-green-100 text-green-700">
                    NEW
                  </span>
                </div>
                <CodeBlock
                  code={`import Fastify from 'fastify';
import { x402Plugin } from '@x402-solana/server';

const fastify = Fastify();

// Register x402 plugin
await fastify.register(x402Plugin, {
  rpcUrl: process.env.SOLANA_RPC_URL,
  channelAccount: myChannelKeypair,
});

// Protected route - $0.001 per request
fastify.get('/api/data', {
  x402: { price: 0.001 }
}, async (request, reply) => {
  return { data: 'Premium content' };
});`}
                />
              </Card>
            </div>
          </section>

          {/* Repository Links */}
          <section>
            <Card className="bg-gradient-to-br from-blue-50 to-gray-50 border-2 border-primary/20">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Explore All Examples
                </h3>
                <p className="text-muted mb-8 max-w-2xl mx-auto">
                  Browse the complete repository with 5 working examples, detailed READMEs,
                  client code, and setup instructions for all frameworks
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    href="https://github.com/BOBER3r/x402-solana-toolkit/tree/main/examples"
                    variant="primary"
                    external
                    className="inline-flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Examples on GitHub
                  </Button>
                  <Button
                    href="/docs/getting-started"
                    variant="secondary"
                  >
                    Documentation
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