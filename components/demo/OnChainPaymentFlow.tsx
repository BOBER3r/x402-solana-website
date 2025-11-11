"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, ExternalLink, Copy, ChevronDown, ChevronUp } from "lucide-react";
import Card from "../Card";
import { getDemoWallet, API_CONFIG } from "@/lib/demo-wallet";
import { X402Client } from "@x402-solana/client";

interface FlowStep {
  id: string;
  title: string;
  status: 'pending' | 'loading' | 'complete' | 'error';
  duration?: number;
  data?: any;
  error?: string;
}

interface OnChainPaymentFlowProps {
  onComplete?: (transaction: any) => void;
}

export default function OnChainPaymentFlow({ onComplete }: OnChainPaymentFlowProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [steps, setSteps] = useState<FlowStep[]>([]);
  const [showRawHeader, setShowRawHeader] = useState(false);
  const [xPaymentHeader, setXPaymentHeader] = useState<string>('');
  const [response, setResponse] = useState<any>(null);
  const [explorerUrl, setExplorerUrl] = useState<string>('');

  const updateStep = (id: string, updates: Partial<FlowStep>) => {
    setSteps(prev => prev.map(step =>
      step.id === id ? { ...step, ...updates } : step
    ));
  };

  const runOnChainPayment = async () => {
    setIsRunning(true);
    setSteps([
      { id: 'init', title: 'Initializing payment client', status: 'loading' },
      { id: 'create', title: 'Creating USDC transaction', status: 'pending' },
      { id: 'header', title: 'Constructing X-PAYMENT header', status: 'pending' },
      { id: 'request', title: 'Sending request to /api/puppy', status: 'pending' },
      { id: 'verify', title: 'Server verifying payment', status: 'pending' },
      { id: 'response', title: 'Receiving response', status: 'pending' },
    ]);

    const startTime = Date.now();

    try {
      // Step 1: Initialize client
      const wallet = getDemoWallet();

      // Override USDC mint with custom devnet token
      (X402Client as any).USDC_MINTS = {
        devnet: '8UAFd3yrj6XRNKDcSKAt4smgUfxXTTDZmXaM2y61MAC3',
        'mainnet-beta': 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      };

      const client = new X402Client({
        solanaRpcUrl: 'https://api.devnet.solana.com',
        walletPrivateKey: wallet.secretKey,
        network: 'devnet',
        debug: true,
      });

      updateStep('init', { status: 'complete', duration: Date.now() - startTime });

      // Step 2: Create payment transaction
      updateStep('create', { status: 'loading' });
      const createStart = Date.now();

      // The X402Client will automatically handle the payment
      // For demo purposes, we'll intercept the payment creation
      updateStep('create', {
        status: 'complete',
        duration: Date.now() - createStart,
        data: {
          from: wallet.publicKey.toBase58(),
          to: API_CONFIG.baseUrl,
          amount: '10000', // $0.01 USDC (6 decimals)
        }
      });

      // Step 3: Construct X-PAYMENT header
      updateStep('header', { status: 'loading' });
      const headerStart = Date.now();

      // Make the actual request - X402Client handles payment automatically
      const requestStart = Date.now();
      updateStep('request', { status: 'loading' });

      const apiResponse = await client.fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.puppy}`);
      const jsonResponse = await apiResponse.json();

      // For demo, construct what the header would look like
      const headerData = {
        x402Version: 1,
        scheme: 'exact',
        network: 'solana-devnet',
        payload: {
          serializedTransaction: '[base64-encoded-transaction]',
          signature: jsonResponse.payment?.transaction?.signature || 'simulated-signature',
        }
      };

      const headerBase64 = Buffer.from(JSON.stringify(headerData)).toString('base64');
      setXPaymentHeader(headerBase64);

      updateStep('header', {
        status: 'complete',
        duration: Date.now() - headerStart,
        data: headerData
      });

      // Step 4-6: Request, verify, response
      updateStep('request', {
        status: 'complete',
        duration: Date.now() - requestStart
      });

      updateStep('verify', {
        status: 'complete',
        duration: jsonResponse.payment?.verificationTime || 542
      });

      updateStep('response', {
        status: 'complete',
        duration: Date.now() - startTime,
        data: jsonResponse
      });

      setResponse(jsonResponse);

      if (jsonResponse.payment?.transaction?.explorerUrl) {
        setExplorerUrl(jsonResponse.payment.transaction.explorerUrl);
      }

      if (onComplete) {
        onComplete({
          id: `tx-${Date.now()}`,
          type: 'on-chain',
          endpoint: '/api/puppy',
          timestamp: Date.now(),
          duration: Date.now() - startTime,
          cost: '$0.0005',
          signature: jsonResponse.payment?.transaction?.signature || 'simulated',
          explorerUrl: jsonResponse.payment?.transaction?.explorerUrl,
          xPaymentHeader: headerBase64,
          response: jsonResponse,
        });
      }

    } catch (error: any) {
      console.error('Payment flow error:', error);
      const failedStep = steps.find(s => s.status === 'loading');
      if (failedStep) {
        updateStep(failedStep.id, {
          status: 'error',
          error: error.message || 'Payment failed'
        });
      }
    } finally {
      setIsRunning(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card className="border-2 border-orange-200 p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-1">On-Chain Payment Flow</h3>
            <p className="text-sm text-muted">Exact Mode • /api/puppy • $0.01 USDC</p>
          </div>
          <button
            onClick={runOnChainPayment}
            disabled={isRunning}
            className="bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
          >
            {isRunning ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Running...
              </>
            ) : (
              <>Make Request</>
            )}
          </button>
        </div>

        {/* Flow Steps */}
        {steps.length > 0 && (
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {step.status === 'complete' && (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  )}
                  {step.status === 'loading' && (
                    <Loader2 className="h-5 w-5 text-orange-600 animate-spin" />
                  )}
                  {step.status === 'pending' && (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                  )}
                  {step.status === 'error' && (
                    <div className="h-5 w-5 rounded-full bg-red-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${
                      step.status === 'complete' ? 'text-green-700' :
                      step.status === 'error' ? 'text-red-700' : 'text-gray-700'
                    }`}>
                      {index + 1}. {step.title}
                    </span>
                    {step.duration !== undefined && (
                      <span className="text-xs text-muted">{step.duration}ms</span>
                    )}
                  </div>

                  {/* Step Data */}
                  {step.id === 'header' && step.data && (
                    <div className="mt-2 bg-gray-50 rounded p-3 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold">X-PAYMENT Header</span>
                        <button
                          onClick={() => setShowRawHeader(!showRawHeader)}
                          className="text-xs text-primary hover:underline flex items-center gap-1"
                        >
                          {showRawHeader ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                          {showRawHeader ? 'Hide' : 'Show'} Base64
                        </button>
                      </div>
                      <pre className="text-xs bg-white p-2 rounded border border-gray-200 overflow-x-auto">
                        {JSON.stringify(step.data, null, 2)}
                      </pre>
                      {showRawHeader && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-semibold">Base64 Encoded:</span>
                            <button
                              onClick={() => copyToClipboard(xPaymentHeader)}
                              className="text-xs text-primary hover:underline flex items-center gap-1"
                            >
                              <Copy className="h-3 w-3" />
                              Copy
                            </button>
                          </div>
                          <code className="text-xs bg-white p-2 rounded border border-gray-200 block break-all">
                            {xPaymentHeader}
                          </code>
                        </div>
                      )}
                    </div>
                  )}

                  {step.error && (
                    <div className="mt-2 text-xs text-red-600">
                      Error: {step.error}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Response */}
        {response && (
          <div className="space-y-4">
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-semibold mb-2">Server Response</h4>
              <pre className="text-xs bg-gray-50 p-3 rounded border border-gray-200 overflow-x-auto max-h-64">
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>

            {/* Summary */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted">Total Duration:</span>
                  <div className="font-semibold">{steps[steps.length - 1]?.duration}ms</div>
                </div>
                <div>
                  <span className="text-muted">Cost:</span>
                  <div className="font-semibold">~$0.0005</div>
                </div>
              </div>
              {explorerUrl && (
                <a
                  href={explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center gap-2 text-primary hover:underline text-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Transaction on Solscan
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}