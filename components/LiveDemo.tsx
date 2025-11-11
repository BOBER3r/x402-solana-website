"use client";

import { useState, useEffect, useRef } from "react";
import StatsComparison from "./StatsComparison";
import { Loader2, Play, Zap, TrendingDown, Wifi, WifiOff, ExternalLink, CheckCircle2 } from "lucide-react";
import Card from "./Card";

const DEMO_API_URL = process.env.NEXT_PUBLIC_DEMO_API_URL || "http://localhost:3001";
const WS_URL = DEMO_API_URL.replace("http", "ws");

interface BatchProgress {
  completed: number;
  total: number;
  errors: number;
  totalDuration: number;
  totalCost: number;
}

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

interface ChannelLifecycleStep {
  step: string;
  message: string;
  timestamp: number;
}

interface TestComparison {
  speedImprovement: string;
  costSavings: string;
  timeSaved: number;
}

export default function LiveDemo() {
  const [batchSize, setBatchSize] = useState(10);
  const [stats, setStats] = useState<Stats | null>(null);

  const [onChainProgress, setOnChainProgress] = useState<BatchProgress>({
    completed: 0,
    total: 0,
    errors: 0,
    totalDuration: 0,
    totalCost: 0,
  });

  const [channelProgress, setChannelProgress] = useState<BatchProgress>({
    completed: 0,
    total: 0,
    errors: 0,
    totalDuration: 0,
    totalCost: 0,
  });

  const [channelSteps, setChannelSteps] = useState<ChannelLifecycleStep[]>([]);
  const [channelOpened, setChannelOpened] = useState(false);
  const [channelOpenDuration, setChannelOpenDuration] = useState(0);
  const [channelExplorerUrl, setChannelExplorerUrl] = useState("");

  const [onChainRunning, setOnChainRunning] = useState(false);
  const [channelRunning, setChannelRunning] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);

  const [testComparison, setTestComparison] = useState<TestComparison | null>(null);
  const [wsConnected, setWsConnected] = useState(false);
  const [channelError, setChannelError] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);

  // WebSocket connection
  useEffect(() => {
    const connectWebSocket = () => {
      try {
        const ws = new WebSocket(WS_URL);

        ws.onopen = () => {
          console.log('WebSocket connected');
          setWsConnected(true);
        };

        ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            handleWebSocketMessage(message);
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };

        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
          console.log('WebSocket disconnected');
          setWsConnected(false);
          setTimeout(connectWebSocket, 3000);
        };

        wsRef.current = ws;
      } catch (error) {
        console.error('Error connecting to WebSocket:', error);
        setTimeout(connectWebSocket, 3000);
      }
    };

    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  // Handle WebSocket messages
  const handleWebSocketMessage = (message: any) => {
    switch (message.type) {
      case 'connected':
        // Backend sends this on connection - just acknowledge
        console.log('Connected to backend:', message.message);
        break;

      case 'onchain-start':
        setOnChainRunning(true);
        break;

      case 'onchain-tx':
        setOnChainProgress((prev) => ({
          ...prev,
          completed: message.progress,
          total: message.total,
          totalDuration: prev.totalDuration + message.duration,
          totalCost: message.progress * 0.0005,
        }));

        if (message.progress === message.total) {
          setOnChainRunning(false);
        }
        break;

      case 'onchain-complete':
        setOnChainRunning(false);
        break;

      case 'channel-start':
        setChannelRunning(true);
        break;

      case 'channel-step':
        setChannelSteps((prev) => [
          ...prev,
          {
            step: message.step,
            message: message.message,
            timestamp: Date.now(),
          },
        ]);
        break;

      case 'channel-opened':
        setChannelOpened(true);
        setChannelOpenDuration(message.duration);
        setChannelExplorerUrl(message.explorerUrl);
        break;

      case 'channel-payment':
      case 'off-chain': // Backend sends this instead of 'channel-payment' due to spread operator
        console.log('📦 Channel payment received:', {
          type: message.type,
          progress: message.progress,
          total: message.total,
          duration: message.duration,
          index: message.index
        });
        setChannelProgress((prev) => ({
          ...prev,
          completed: message.progress,
          total: message.total,
          totalDuration: prev.totalDuration + message.duration,
          totalCost: 0,
        }));

        if (message.progress === message.total) {
          setChannelRunning(false);
        }
        break;

      case 'channel-funded':
        setChannelSteps((prev) => [
          ...prev,
          {
            step: 'funded',
            message: `Added funds (${message.duration}ms)`,
            timestamp: Date.now(),
          },
        ]);
        break;

      case 'channel-closed':
        setChannelSteps((prev) => [
          ...prev,
          {
            step: 'closed',
            message: `Channel closed (${message.duration}ms)`,
            timestamp: Date.now(),
          },
        ]);
        setChannelRunning(false);
        break;

      case 'channel-complete':
        setChannelRunning(false);
        break;

      case 'channel-error':
        console.error('Channel error:', message.error);
        setChannelError(message.error);
        setChannelRunning(false);
        setChannelSteps((prev) => [
          ...prev,
          {
            step: 'error',
            message: `Error: ${message.error}`,
            timestamp: Date.now(),
          },
        ]);
        break;

      case 'test-complete':
        console.log('🏁 Test complete - Full message:', JSON.stringify(message, null, 2));
        console.log('🏁 Channel total from backend:', message.channelResults?.totalDuration);
        console.log('🏁 On-chain total from backend:', message.onChainResults?.totalDuration);
        console.log('🏁 Comparison:', message.comparison);

        setTestComparison(message.comparison);

        // Update final durations from backend's actual totals
        if (message.channelResults) {
          console.log('🔧 Updating channel duration to:', message.channelResults.totalDuration);
          setChannelProgress((prev) => ({
            ...prev,
            totalDuration: message.channelResults.totalDuration,
          }));
        }

        if (message.onChainResults) {
          setOnChainProgress((prev) => ({
            ...prev,
            totalDuration: message.onChainResults.totalDuration,
          }));
        }

        // Populate stats for display with transaction details
        if (message.onChainResults && message.channelResults) {
          const avgOnChain = message.onChainResults.totalDuration / message.onChainResults.transactions.length;
          const avgChannel = message.channelResults.totalDuration / message.channelResults.transactions.length;

          setStats({
            onChain: {
              count: message.onChainResults.transactions.length,
              avgDuration: Math.round(avgOnChain),
              totalCost: message.onChainResults.totalCost.toFixed(4),
              transactions: message.onChainResults.transactions,
            },
            channel: {
              count: message.channelResults.transactions.length,
              avgDuration: Math.round(avgChannel),
              totalCost: message.channelResults.totalCost.toFixed(4),
              transactions: message.channelResults.transactions,
              channelTx: message.channelResults.channelTx,
              note: `Includes ${message.channelResults.transactions.length} off-chain payments + 3 on-chain transactions (open, fund, close)`,
            },
          });
        }

        setOnChainRunning(false);
        setChannelRunning(false);
        break;

      case 'test-error':
        console.error('Test error:', message.error);
        setOnChainRunning(false);
        setChannelRunning(false);
        break;

      default:
        console.log('Unknown message type:', message.type);
    }
  };

  // Fetch stats via REST (fallback)
  const fetchStats = async () => {
    setStatsLoading(true);
    try {
      const response = await fetch(`${DEMO_API_URL}/api/stats`);
      if (!response.ok) throw new Error("Failed to fetch stats");
      const data = await response.json();
      setStats(data);
    } catch (error: any) {
      console.error("Error fetching stats:", error);
    } finally {
      setStatsLoading(false);
    }
  };

  // Start batch test via REST API
  const startBatchTest = async () => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      alert('WebSocket not connected. Please wait...');
      return;
    }

    // Reset all state
    setOnChainProgress({
      completed: 0,
      total: batchSize,
      errors: 0,
      totalDuration: 0,
      totalCost: 0,
    });

    setChannelProgress({
      completed: 0,
      total: batchSize,
      errors: 0,
      totalDuration: 0,
      totalCost: 0,
    });

    setChannelSteps([]);
    setChannelOpened(false);
    setTestComparison(null);
    setChannelError(null);
    setOnChainRunning(true);
    setChannelRunning(true);

    try {
      // Start the batch test via REST API
      const response = await fetch(`${DEMO_API_URL}/api/run-batch-test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ count: batchSize }),
      });

      if (!response.ok) {
        throw new Error('Failed to start batch test');
      }

      const result = await response.json();
      console.log('Batch test started:', result);

      // Real-time updates will come via WebSocket
    } catch (error: any) {
      console.error('Error starting batch test:', error);
      alert(`Failed to start test: ${error.message}`);
      setOnChainRunning(false);
      setChannelRunning(false);
    }
  };

  // Note: Stats endpoint not implemented on backend yet
  // Uncomment when backend adds /api/stats endpoint
  // useEffect(() => {
  //   fetchStats();
  // }, []);

  const avgOnChain = onChainProgress.completed > 0
    ? Math.round(onChainProgress.totalDuration / onChainProgress.completed)
    : 0;

  const avgChannel = channelProgress.completed > 0
    ? Math.round(channelProgress.totalDuration / channelProgress.completed)
    : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Live Performance Test</h2>
        <p className="text-lg text-muted mb-4">
          Run batch transactions in parallel to see the speed and cost difference
        </p>

        {/* WebSocket Status */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium" style={{
          backgroundColor: wsConnected ? '#dcfce7' : '#fee2e2',
          color: wsConnected ? '#166534' : '#991b1b'
        }}>
          {wsConnected ? (
            <>
              <Wifi className="h-3 w-3" />
              Connected to demo server
            </>
          ) : (
            <>
              <WifiOff className="h-3 w-3" />
              Connecting to demo server...
            </>
          )}
        </div>
      </div>

      {/* Batch Size Control */}
      <div className="max-w-md mx-auto">
        <Card className="p-6">
          <label className="block text-sm font-semibold mb-2">
            Number of Transactions per Test
          </label>
          <input
            type="number"
            min="1"
            max="20"
            value={batchSize}
            onChange={(e) => setBatchSize(Number(e.target.value))}
            disabled={onChainRunning || channelRunning}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
          />
          <p className="text-xs text-muted mt-2">
            Both tests will run {batchSize} transactions simultaneously
          </p>
        </Card>
      </div>

      {/* Run Batch Button */}
      <div className="text-center">
        <button
          onClick={startBatchTest}
          disabled={onChainRunning || channelRunning || !wsConnected}
          className="bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white font-bold py-4 px-8 rounded-lg transition-colors flex items-center justify-center gap-3 mx-auto text-lg"
        >
          {onChainRunning || channelRunning ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin" />
              Running Tests...
            </>
          ) : !wsConnected ? (
            <>
              <WifiOff className="h-6 w-6" />
              Waiting for Connection...
            </>
          ) : (
            <>
              <Play className="h-6 w-6" />
              Run Both Tests ({batchSize} transactions each)
            </>
          )}
        </button>
      </div>

      {/* Side-by-side Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* On-Chain Progress */}
        <Card className="p-6 border-2 border-orange-200">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">On-Chain Payments </h3>
              {onChainRunning && (
                <Loader2 className="h-5 w-5 animate-spin text-orange-600" />
              )}
            </div>

            {/* Progress Bar */}
            {onChainProgress.total > 0 && (
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted">Progress</span>
                  <span className="font-semibold">
                    {onChainProgress.completed}/{onChainProgress.total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-orange-600 h-3 rounded-full transition-all duration-300"
                    style={{
                      width: `${(onChainProgress.completed / onChainProgress.total) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            )}

            {/* Stats */}
            {onChainProgress.completed > 0 && (
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-sm text-muted">Total Duration</span>
                  <span className="font-semibold">{onChainProgress.totalDuration}ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted">Avg per Transaction</span>
                  <span className="font-semibold">{avgOnChain}ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted">Total Cost</span>
                  <span className="font-semibold text-orange-600">
                    ${onChainProgress.totalCost.toFixed(4)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Channel Progress */}
        <Card className="p-6 border-2 border-green-200 bg-green-50/30">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-green-700">
                Payment Channels ⚡
              </h3>
              {channelRunning && (
                <Loader2 className="h-5 w-5 animate-spin text-green-600" />
              )}
            </div>

            {/* Channel Lifecycle Steps */}
            {channelSteps.length > 0 && (
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <p className="text-xs font-semibold text-green-700 mb-2">Channel Setup</p>
                <div className="space-y-2">
                  {channelSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-muted">{step.message}</span>
                    </div>
                  ))}
                </div>
                {channelOpened && channelExplorerUrl && (
                  <a
                    href={channelExplorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-primary hover:underline mt-2"
                  >
                    <ExternalLink className="h-3 w-3" />
                    View Channel on Explorer ({channelOpenDuration}ms)
                  </a>
                )}
              </div>
            )}

            {/* Progress Bar */}
            {channelProgress.total > 0 && (
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted">Payments</span>
                  <span className="font-semibold">
                    {channelProgress.completed}/{channelProgress.total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-600 h-3 rounded-full transition-all duration-300"
                    style={{
                      width: `${(channelProgress.completed / channelProgress.total) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            )}

            {/* Stats */}
            {channelProgress.completed > 0 && (
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-sm text-muted">Total Duration</span>
                  <span className="font-semibold text-green-700">
                    {channelProgress.totalDuration}ms
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted">Avg per Payment</span>
                  <span className="font-semibold text-green-700">{avgChannel}ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted">Total Cost</span>
                  <span className="font-semibold text-green-600">
                    $0.00
                  </span>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Comparison Summary */}
      {testComparison && (
        <Card className="p-8 bg-gradient-to-r from-blue-50 to-green-50 border-2 border-primary/30">
          <h3 className="text-2xl font-bold text-center mb-6">Batch Test Results</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-sm text-muted mb-1">Speed Improvement</div>
              <div className="text-3xl font-bold text-green-600 flex items-center justify-center gap-2">
                <TrendingDown className="h-8 w-8" />
                {testComparison.speedImprovement}%
              </div>
              <div className="text-xs text-muted mt-1">faster with channels</div>
            </div>

            <div className="text-center">
              <div className="text-sm text-muted mb-1">Cost Savings</div>
              <div className="text-3xl font-bold text-green-600 flex items-center justify-center gap-2">
                <Zap className="h-8 w-8" />
                ${testComparison.costSavings}
              </div>
              <div className="text-xs text-muted mt-1">saved with channels</div>
            </div>

            <div className="text-center">
              <div className="text-sm text-muted mb-1">Time Saved</div>
              <div className="text-3xl font-bold text-green-600">
                {testComparison.timeSaved}s
              </div>
              <div className="text-xs text-muted mt-1">for {batchSize} transactions</div>
            </div>
          </div>

          <div className="text-center text-sm text-muted">
            Channel payments are <strong className="text-green-700">{testComparison.speedImprovement}% faster</strong> and cost{" "}
            <strong className="text-green-700">$0</strong> in transaction fees compared to on-chain payments.
          </div>
        </Card>
      )}

      {/* Live Stats */}
      <div>
        <StatsComparison stats={stats} loading={statsLoading} />
      </div>

      {/* Info */}
      <div className="text-center">
        <p className="text-sm text-muted">
          All transactions are real and verified on Solana Devnet.
          Real-time updates via WebSocket.
        </p>
      </div>
    </div>
  );
}
