"use client";

import Card from "./Card";
import { TrendingDown, TrendingUp, Zap, ExternalLink } from "lucide-react";

interface Transaction {
  index: number;
  signature: string;
  duration: number;
  explorerUrl: string;
  status: string;
}

interface ChannelTransaction {
  step: string;
  duration: number;
  signature?: string;
  channelId?: string;
  explorerUrl: string;
}

interface Stats {
  onChain: {
    count: number;
    avgDuration: number;
    totalCost: string;
    transactions?: Transaction[];
  };
  channel: {
    count: number;
    avgDuration: number;
    totalCost: string;
    note?: string;
    transactions?: any[];
    channelTx?: {
      open: ChannelTransaction;
      addFunds: ChannelTransaction;
      close: ChannelTransaction;
    };
  };
}

interface StatsComparisonProps {
  stats: Stats | null;
  loading?: boolean;
}

export default function StatsComparison({ stats, loading }: StatsComparisonProps) {
  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (!stats || (stats.onChain.count === 0 && stats.channel.count === 0)) {
    return (
      <Card className="p-6">
        <p className="text-muted text-center">
          No transactions yet. Click the buttons above to test!
        </p>
      </Card>
    );
  }

  const speedImprovement =
    stats.onChain.avgDuration && stats.channel.avgDuration
      ? Math.round(
          ((stats.onChain.avgDuration - stats.channel.avgDuration) /
            stats.onChain.avgDuration) *
            100
        )
      : 0;

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Live Performance Comparison</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-3">Metric</th>
              <th className="text-left py-2 px-3">On-Chain</th>
              <th className="text-left py-2 px-3">Channel</th>
              <th className="text-left py-2 px-3">Improvement</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-3 px-3 font-medium">Transactions</td>
              <td className="py-3 px-3">{stats.onChain.count}</td>
              <td className="py-3 px-3">{stats.channel.count}</td>
              <td className="py-3 px-3">-</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 px-3 font-medium">Avg Duration</td>
              <td className="py-3 px-3 text-orange-600">
                {stats.onChain.avgDuration}ms
              </td>
              <td className="py-3 px-3 text-green-600">
                {stats.channel.avgDuration}ms
              </td>
              <td className="py-3 px-3">
                {speedImprovement > 0 && (
                  <span className="flex items-center gap-1 text-green-600 font-semibold">
                    <TrendingDown className="h-4 w-4" />
                    {speedImprovement}% faster
                  </span>
                )}
              </td>
            </tr>
            <tr>
              <td className="py-3 px-3 font-medium">Total Cost</td>
              <td className="py-3 px-3 text-orange-600">
                ${stats.onChain.totalCost}
              </td>
              <td className="py-3 px-3 text-green-600">
                {stats.channel.totalCost}
              </td>
              <td className="py-3 px-3">
                {stats.onChain.count > 0 && stats.channel.count > 0 && (
                  <span className="flex items-center gap-1 text-green-600 font-semibold">
                    <Zap className="h-4 w-4" />
                    Free!
                  </span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {stats.channel.note && stats.channel.count > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-800">
            <strong>Note:</strong> {stats.channel.note}
          </p>
        </div>
      )}

      {speedImprovement > 0 && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-green-600" />
            <p className="text-sm font-semibold text-green-900">
              Payment channels are {speedImprovement}% faster with $0 per-transaction fees!
            </p>
          </div>
        </div>
      )}

      {/* Transaction Details */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* On-Chain Transactions */}
        {stats.onChain.transactions && stats.onChain.transactions.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-3 text-orange-700">
              On-Chain Transactions ({stats.onChain.transactions.length})
            </h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {stats.onChain.transactions.map((tx) => (
                <a
                  key={tx.signature}
                  href={tx.explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-orange-50 hover:bg-orange-100 rounded border border-orange-200 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-orange-700">
                          TX #{tx.index}
                        </span>
                        <span className="text-xs text-muted">
                          {tx.duration}ms
                        </span>
                      </div>
                      <p className="text-xs font-mono text-muted truncate">
                        {tx.signature.substring(0, 16)}...
                      </p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-orange-600 flex-shrink-0" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Channel Transactions */}
        {stats.channel.channelTx && (
          <div>
            <h4 className="text-sm font-semibold mb-3 text-green-700">
              Channel Lifecycle Transactions (3 on-chain)
            </h4>
            <div className="space-y-2">
              {/* Open Channel */}
              <a
                href={stats.channel.channelTx.open.explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-green-50 hover:bg-green-100 rounded border border-green-200 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-green-700">
                        1. Open Channel
                      </span>
                      <span className="text-xs text-muted">
                        {stats.channel.channelTx.open.duration}ms
                      </span>
                    </div>
                    <p className="text-xs font-mono text-muted truncate">
                      {stats.channel.channelTx.open.channelId?.substring(0, 24)}...
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-green-600 flex-shrink-0" />
                </div>
              </a>

              {/* Add Funds */}
              <a
                href={stats.channel.channelTx.addFunds.explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-green-50 hover:bg-green-100 rounded border border-green-200 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-green-700">
                        2. Add Funds
                      </span>
                      <span className="text-xs text-muted">
                        {stats.channel.channelTx.addFunds.duration}ms
                      </span>
                    </div>
                    <p className="text-xs font-mono text-muted truncate">
                      {stats.channel.channelTx.addFunds.signature?.substring(0, 16)}...
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-green-600 flex-shrink-0" />
                </div>
              </a>

              {/* Close Channel */}
              <a
                href={stats.channel.channelTx.close.explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-green-50 hover:bg-green-100 rounded border border-green-200 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-green-700">
                        3. Close Channel
                      </span>
                      <span className="text-xs text-muted">
                        {stats.channel.channelTx.close.duration}ms
                      </span>
                    </div>
                    <p className="text-xs font-mono text-muted truncate">
                      {stats.channel.channelTx.close.signature?.substring(0, 16)}...
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-green-600 flex-shrink-0" />
                </div>
              </a>

              {/* Off-chain payments note */}
              <div className="p-3 bg-blue-50 rounded border border-blue-200">
                <p className="text-xs text-blue-800">
                  <strong>+{stats.channel.count} off-chain payments</strong> (verified via Ed25519 signatures, $0 fees)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}