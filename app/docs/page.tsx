"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Rocket, Code, Blocks, ArrowRight } from "lucide-react";
import Card from "@/components/Card";

const docSections = [
  {
    title: "Getting Started",
    description: "Quick start guide to implementing x402 payment channels in your API",
    icon: Rocket,
    href: "/docs/getting-started",
    items: ["Installation", "Server Setup", "Client Setup", "First Payment"],
  },
  {
    title: "Core Concepts",
    description: "Understanding payment channels and the x402 protocol",
    icon: BookOpen,
    href: "/docs/concepts",
    items: ["Payment Channels", "Channel Lifecycle", "State Management", "Security"],
  },
  {
    title: "API Reference",
    description: "Complete API documentation for all packages",
    icon: Code,
    href: "/docs/api",
    items: ["Server SDK", "Client SDK", "Core Library", "Types"],
  },
  {
    title: "Architecture",
    description: "Technical architecture and implementation details",
    icon: Blocks,
    href: "/architecture",
    items: ["System Design", "Solana Program", "State Machine", "Error Handling"],
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Documentation
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Everything you need to integrate x402 payment channels into your HTTP APIs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {docSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={section.href}>
                  <Card className="h-full cursor-pointer hover:border-primary transition-all">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                          {section.title}
                          <ArrowRight className="h-4 w-4 text-muted" />
                        </h3>
                        <p className="text-sm text-muted mb-4">{section.description}</p>
                        <ul className="space-y-1">
                          {section.items.map((item) => (
                            <li key={item} className="text-sm text-muted flex items-center gap-2">
                              <span className="w-1 h-1 bg-primary rounded-full" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="border-t border-border pt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-8">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/examples">
              <Card className="cursor-pointer hover:border-primary">
                <h3 className="font-semibold mb-2">Examples</h3>
                <p className="text-sm text-muted">Working examples for common use cases</p>
              </Card>
            </Link>
            <Link href="/architecture">
              <Card className="cursor-pointer hover:border-primary">
                <h3 className="font-semibold mb-2">Architecture</h3>
                <p className="text-sm text-muted">Technical implementation details</p>
              </Card>
            </Link>
            <Link href="https://github.com/x402-solana" target="_blank">
              <Card className="cursor-pointer hover:border-primary">
                <h3 className="font-semibold mb-2">GitHub</h3>
                <p className="text-sm text-muted">View source code and contribute</p>
              </Card>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
