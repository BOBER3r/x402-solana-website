"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, ExternalLink, Copy, Zap, Wallet, XCircle } from "lucide-react";
import Card from "../Card";
import { API_CONFIG } from "@/lib/demo-wallet";

interface FlowStep {
  id: string;
  title: string;
  status: 'pending' | 'loading' | 'complete' | 'error';
  duration?: number;
  data?: any;
  error?: string;
}

interface Channel {
  id: string;
  pda: string;
  status: string;
  balance: any;
  nonce: number;
  cumulativeSpent: number;
  explorerUrl?: string;
}

interface ChannelPaymentFlowProps {
  onComplete?: (transaction: any) => void;
}

export default function ChannelPaymentFlow({ onComplete }: ChannelPaymentFlowProps) {
  const [channel, setChannel] = useState<Channel | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [steps, setSteps] = useState<FlowStep[]>([]);
  const [paymentCount, setPaymentCount] = useState(0);
  const [xPaymentHeader, setXPaymentHeader] = useState<string>('');
  const [response, setResponse] = useState<any>(null);
  const [unauthorizedResponse, setUnauthorizedResponse] = useState<any>(null);
  const [isTryingUnauthorized, setIsTryingUnauthorized] = useState(false);

  const updateStep = (id: string, updates: Partial<FlowStep>) => {
    setSteps(prev => prev.map(step =>
      step.id === id ? { ...step, ...updates } : step
    ));
  };

  const openChannel = async () => {
    setIsOpening(true);
    setSteps([
      { id: 'open-init', title: 'Creating payment channel', status: 'loading' },
      { id: 'open-deposit', title: 'Depositing $10.00 USDC', status: 'pending' },
      { id: 'open-complete', title: 'Channel ready', status: 'pending' },
    ]);

    const startTime = Date.now();

    try {
      const openResponse = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.channelOpen}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          initialDeposit: '10000000', // $10.00 USDC
          creditLimit: '0000000', // $5.00 credit
        }),
      });

      if (!openResponse.ok) {
        throw new Error(`Failed to open channel: ${openResponse.statusText}`);
      }

      const data = await openResponse.json();

      updateStep('open-init', { status: 'complete', duration: Date.now() - startTime });
      updateStep('open-deposit', { status: 'complete', data: data.channel?.balance });
      updateStep('open-complete', {
        status: 'complete',
        data: {
          channelId: data.channel?.id,
          pda: data.channel?.pda,
          explorerUrl: data.channel?.explorerUrl,
        }
      });

      setChannel(data.channel);

    } catch (error: any) {
      console.error('Channel open error:', error);
      const failedStep = steps.find(s => s.status === 'loading' || s.status === 'pending');
      if (failedStep) {
        updateStep(failedStep.id, {
          status: 'error',
          error: error.message || 'Failed to open channel'
        });
      }
    } finally {
      setIsOpening(false);
    }
  };

  const makePayment = async () => {
    if (!channel) return;

    setIsPaying(true);
    setSteps([
      { id: 'pay-auth', title: 'Creating payment authorization', status: 'loading' },
      { id: 'pay-sign', title: 'Signing payment claim', status: 'pending' },
      { id: 'pay-header', title: 'Building X-PAYMENT header', status: 'pending' },
      { id: 'pay-request', title: 'Sending request to /api/kitten', status: 'pending' },
      { id: 'pay-verify', title: 'Server verifying signature', status: 'pending' },
      { id: 'pay-response', title: 'Receiving response', status: 'pending' },
    ]);

    const startTime = Date.now();

    try {
      // Step 1: Authorize payment
      const authResponse = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.channelAuthorize}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channelId: channel.id,
          amount: '10000', // $0.01 USDC
        }),
      });

      if (!authResponse.ok) {
        throw new Error(`Failed to authorize payment: ${authResponse.statusText}`);
      }

      const authData = await authResponse.json();

      updateStep('pay-auth', {
        status: 'complete',
        duration: Date.now() - startTime,
        data: authData.authorization
      });

      updateStep('pay-sign', { status: 'complete', duration: 2 });
      updateStep('pay-header', {
        status: 'complete',
        duration: 1,
        data: {
          x402Version: 1,
          scheme: 'channel',
          network: 'solana-devnet',
          payload: {
            channelId: authData.authorization.channelId,
            amount: authData.authorization.amount.cumulative,
            nonce: authData.authorization.nonce,
            channelSignature: authData.authorization.signature,
            expiry: authData.authorization.expiry,
          }
        }
      });

      setXPaymentHeader(authData.xPaymentHeader);

      // Step 2: Make request to /api/kitten
      updateStep('pay-request', { status: 'loading' });
      const requestStart = Date.now();

      const kittenResponse = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.kitten}`, {
        headers: {
          'X-PAYMENT': authData.xPaymentHeader,
        },
      });

      if (!kittenResponse.ok) {
        throw new Error(`Request failed: ${kittenResponse.statusText}`);
      }

      const kittenData = await kittenResponse.json();

      updateStep('pay-request', {
        status: 'complete',
        duration: Date.now() - requestStart
      });

      updateStep('pay-verify', {
        status: 'complete',
        duration: kittenData.payment?.verificationTime || 7
      });

      updateStep('pay-response', {
        status: 'complete',
        duration: Date.now() - startTime,
        data: kittenData
      });

      setResponse(kittenData);
      setPaymentCount(prev => prev + 1);

      // Update channel state
      if (kittenData.payment?.amount?.cumulativeTotal) {
        setChannel(prev => prev ? {
          ...prev,
          cumulativeSpent: kittenData.payment.amount.cumulativeTotal,
          nonce: parseInt(kittenData.payment.channel.nonce)
        } : null);
      }

      if (onComplete) {
        onComplete({
          id: `tx-${Date.now()}`,
          type: 'channel',
          endpoint: '/api/kitten',
          timestamp: Date.now(),
          duration: kittenData.payment?.verificationTime || 7,
          cost: '$0.00',
          signature: kittenData.payment?.channel?.id,
          xPaymentHeader: authData.xPaymentHeader,
          response: kittenData,
        });
      }

    } catch (error: any) {
      console.error('Payment error:', error);
      const failedStep = steps.find(s => s.status === 'loading');
      if (failedStep) {
        updateStep(failedStep.id, {
          status: 'error',
          error: error.message || 'Payment failed'
        });
      }
    } finally {
      setIsPaying(false);
    }
  };

  const closeChannel = async () => {
    if (!channel) return;

    setIsClosing(true);
    try {
      const closeResponse = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.channelClose}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channelId: channel.id }),
      });

      if (!closeResponse.ok) {
        throw new Error(`Failed to close channel: ${closeResponse.statusText}`);
      }

      const closeData = await closeResponse.json();
      console.log('Channel closed:', closeData);

      // Reset state
      setChannel(null);
      setPaymentCount(0);
      setSteps([]);
      setResponse(null);

    } catch (error: any) {
      console.error('Channel close error:', error);
      alert(`Failed to close channel: ${error.message}`);
    } finally {
      setIsClosing(false);
    }
  };

  const tryWithoutPayment = async () => {
    setIsTryingUnauthorized(true);
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.kitten}`);
      const data = await response.json();
      setUnauthorizedResponse({
        status: response.status,
        statusText: response.statusText,
        data: data
      });
    } catch (error: any) {
      console.error('Unauthorized request error:', error);
      setUnauthorizedResponse({
        status: 0,
        statusText: 'Network Error',
        data: { error: error.message }
      });
    } finally {
      setIsTryingUnauthorized(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card className="border-2 border-green-200 bg-green-50/30 p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-green-700 mb-1">Payment Channel Flow</h3>
            <p className="text-sm text-muted">Channel Mode • /api/kitten • $0.01 per request</p>
          </div>
          <div className="flex items-center gap-2">
            {!channel ? (
              <>
                <button
                  onClick={tryWithoutPayment}
                  disabled={isTryingUnauthorized}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                >
                  {isTryingUnauthorized ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Trying...
                    </>
                  ) : (
                    <>Try Without x402</>
                  )}
                </button>
                <button
                  onClick={openChannel}
                  disabled={isOpening}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
                >
                  {isOpening ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Opening...
                    </>
                  ) : (
                    <>Open Channel</>
                  )}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={makePayment}
                  disabled={isPaying || isClosing}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
                >
                  {isPaying ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Paying...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4" />
                      Make Payment
                    </>
                  )}
                </button>
                <button
                  onClick={closeChannel}
                  disabled={isClosing || isPaying}
                  className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                >
                  {isClosing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Closing...
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4" />
                      Close Channel
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        {/* 402 Unauthorized Response */}
        {unauthorizedResponse && (
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-600 font-bold text-sm">{unauthorizedResponse.status}</span>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-red-900 mb-1">
                  {unauthorizedResponse.status} {unauthorizedResponse.statusText}
                </h4>
                <p className="text-sm text-red-700 mb-3">
                  Payment Required - This endpoint requires payment to access
                </p>
              </div>
            </div>
            <pre className="text-xs bg-white p-3 rounded border border-red-200 overflow-x-auto font-mono leading-relaxed">
              {JSON.stringify(unauthorizedResponse.data, null, 2)}
            </pre>
            <p className="text-xs text-red-700 mt-3">
              💡 <strong>Tip:</strong> Open a payment channel above to access this endpoint with off-chain payments (&lt;10ms verification)
            </p>
          </div>
        )}

        {/* Channel Status */}
        {channel && (
          <div className="bg-white rounded-lg border border-green-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-green-700">Channel Active</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                {paymentCount} payments made
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-muted">Available Balance:</span>
                <div className="font-semibold">{channel.balance?.availableFormatted || '$10.00'}</div>
              </div>
              <div>
                <span className="text-muted">Cumulative Spent:</span>
                <div className="font-semibold">${(channel.cumulativeSpent / 1000000).toFixed(2)}</div>
              </div>
            </div>
            {channel.explorerUrl && (
              <a
                href={channel.explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center gap-1 text-xs text-primary hover:underline"
              >
                <ExternalLink className="h-3 w-3" />
                View Channel on Solscan
              </a>
            )}
          </div>
        )}

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
                    <Loader2 className="h-5 w-5 text-green-600 animate-spin" />
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
                      <span className="text-xs text-green-600 font-semibold">{step.duration}ms</span>
                    )}
                  </div>

                  {/* Step Data */}
                  {step.id === 'pay-header' && step.data && (
                    <div className="mt-2 bg-white rounded p-3 border border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold">X-PAYMENT Header</span>
                        <button
                          onClick={() => copyToClipboard(xPaymentHeader)}
                          className="text-xs text-primary hover:underline flex items-center gap-1"
                        >
                          <Copy className="h-3 w-3" />
                          Copy Base64
                        </button>
                      </div>
                      <pre className="text-xs bg-gray-50 p-3 rounded border border-gray-200 overflow-x-auto font-mono leading-relaxed whitespace-pre-wrap break-all max-w-full">
                        {JSON.stringify(step.data, null, 2)}
                      </pre>
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
            <div className="border-t border-green-200 pt-4">
              <h4 className="text-sm font-semibold mb-2">Server Response</h4>
              <pre className="text-xs bg-white p-3 rounded border border-green-200 overflow-x-auto max-h-64">
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>

            {/* Summary */}
            <div className="bg-green-100 border border-green-300 rounded-lg p-4">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted">Verification:</span>
                  <div className="font-semibold text-green-700">{response.payment?.verificationTime || 7}ms</div>
                </div>
                <div>
                  <span className="text-muted">Cumulative:</span>
                  <div className="font-semibold text-green-700">
                    {response.payment?.amount?.cumulativeTotalFormatted || '$0.01'}
                  </div>
                </div>
                <div>
                  <span className="text-muted">TX Cost:</span>
                  <div className="font-semibold text-green-700">$0.00</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Educational Note */}
        {channel && (
          <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs text-muted">
            <strong>Note:</strong> Payments are verified off-chain via Ed25519 signatures (&lt;10ms).
            Only channel open/close transactions hit the blockchain.
            {paymentCount > 0 && ` You've saved ${paymentCount * 500}ms and $${(paymentCount * 0.0005).toFixed(4)} in fees!`}
          </div>
        )}
      </div>
    </Card>
  );
}
