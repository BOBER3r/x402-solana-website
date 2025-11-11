"use client";

import { ExternalLink, Clock, DollarSign, Zap } from "lucide-react";
import Card from "./Card";

interface TransactionResult {
  type: "on-chain" | "channel";
  signature: string;
  explorerUrl: string;
  amount: string;
  fee: string;
  duration: string;
  timestamp: string;
  nonce?: number;
  accounts?: {
    from?: string;
    to?: string;
    channelId?: string;
  };
}

interface TransactionCardProps {
  result: TransactionResult;
}

export default function TransactionCard({ result }: TransactionCardProps) {
  const isChannel = result.type === "channel";

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isChannel ? (
              <Zap className="h-5 w-5 text-green-600" />
            ) : (
              <Clock className="h-5 w-5 text-orange-600" />
            )}
            <h3 className="font-semibold text-lg">
              {isChannel ? "Channel Payment " : "On-Chain Payment "}
            </h3>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              isChannel
                ? "bg-green-100 text-green-700"
                : "bg-orange-100 text-orange-700"
            }`}
          >
            {isChannel ? "Instant" : "Confirmed"}
          </span>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-muted mb-1">Amount</p>
            <p className="font-semibold">{result.amount}</p>
          </div>
          <div>
            <p className="text-xs text-muted mb-1">Fee</p>
            <p className="font-semibold">{result.fee}</p>
          </div>
          <div>
            <p className="text-xs text-muted mb-1">Duration</p>
            <p className="font-semibold">{result.duration}</p>
          </div>
        </div>

        {/* Signature */}
        <div>
          <p className="text-xs text-muted mb-1">
            {isChannel ? "Signature (off-chain)" : "Transaction Signature"}
          </p>
          <div className="flex items-center gap-2">
            <code className="text-xs bg-gray-100 px-2 py-1 rounded flex-1 truncate">
              {result.signature}
            </code>
            <button
              onClick={() => navigator.clipboard.writeText(result.signature)}
              className="text-xs text-primary hover:underline"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Nonce (for channel payments) */}
        {isChannel && result.nonce && (
          <div>
            <p className="text-xs text-muted mb-1">Nonce</p>
            <p className="text-sm font-mono">#{result.nonce}</p>
          </div>
        )}

        {/* Explorer Link */}
        <a
          href={result.explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-primary hover:underline text-sm"
        >
          <ExternalLink className="h-4 w-4" />
          View on Solana Explorer
        </a>

        {/* Timestamp */}
        <div className="pt-2 border-t border-gray-200">
          <p className="text-xs text-muted">
            {new Date(result.timestamp).toLocaleString()}
          </p>
        </div>
      </div>
    </Card>
  );
}
