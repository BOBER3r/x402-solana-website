"use client";

import { motion } from "framer-motion";
import CodeBlock from "@/components/CodeBlock";
import Card from "@/components/Card";
import { Database, Workflow, Shield, Zap } from "lucide-react";

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight mb-4">Technical Architecture</h1>
          <p className="text-lg text-muted mb-12">
            Deep dive into the x402 payment channel implementation on Solana
          </p>

          {/* Overview */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">System Overview</h2>
            <p className="text-muted mb-6">
              x402 implements unidirectional payment channels on Solana, optimized for HTTP API micropayments.
              The protocol minimizes on-chain transactions while maintaining security and trustlessness.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <Database className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">On-Chain State</h3>
                <p className="text-sm text-muted">
                  Payment channel accounts store channel state, balances, and participant keys on Solana
                </p>
              </Card>
              <Card>
                <Workflow className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Off-Chain Flow</h3>
                <p className="text-sm text-muted">
                  HTTP requests include payment proofs that update channel state without blockchain transactions
                </p>
              </Card>
              <Card>
                <Shield className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Security Model</h3>
                <p className="text-sm text-muted">
                  Cryptographic signatures ensure payment authenticity and prevent double-spending
                </p>
              </Card>
              <Card>
                <Zap className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Performance</h3>
                <p className="text-sm text-muted">
                  Sub-millisecond payment verification with only 2 on-chain transactions per channel lifecycle
                </p>
              </Card>
            </div>
          </section>

          {/* Channel Lifecycle */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Payment Channel Lifecycle</h2>

            <div className="space-y-6">
              <Card>
                <h3 className="font-semibold mb-3">1. Channel Opening (with USDC & Credit Limit)</h3>
                <p className="text-sm text-muted mb-4">
                  Client opens a channel by depositing USDC and setting optional credit limit for overdraft protection
                </p>
                <CodeBlock
                  code={`// Generate unique channel ID
const channelId = Buffer.from(randomBytes(32));

// Derive channel PDA
const [channelPDA] = PublicKey.findProgramAddressSync(
  [Buffer.from("channel"), channelId],
  programId
);

// Derive token account PDA for channel's USDC
const [channelTokenAccount] = PublicKey.findProgramAddressSync(
  [Buffer.from("channel_token"), channelId],
  programId
);

const tx = await program.methods
  .openChannel(
    Array.from(channelId),
    new BN(1000000),    // initialDeposit: 1 USDC (min: 1 USDC)
    new BN(expiry),     // expiry: Unix timestamp
    new BN(1000000000)  // creditLimit: 1000 USDC (max: 1000 USDC)
  )
  .accounts({
    channel: channelPDA,
    channelToken: channelTokenAccount,
    client: clientPublicKey,
    server: serverPublicKey,
    clientTokenAccount: clientUSDCAccount,
    mint: usdcMintAddress,
    tokenProgram: TOKEN_PROGRAM_ID,
    systemProgram: SystemProgram.programId,
  })
  .rpc();

// Channel now exists on-chain with:
// - channel_id: unique 32-byte identifier
// - client: client public key
// - server: server public key
// - client_deposit: 1 USDC
// - server_claimed: 0
// - nonce: 0
// - status: ChannelStatus::Open
// - debt_owed: 0
// - credit_limit: 1000 USDC`}
                />
              </Card>

              <Card>
                <h3 className="font-semibold mb-3">2. Off-Chain Payments</h3>
                <p className="text-sm text-muted mb-4">
                  Each HTTP request includes a signed payment proof updating channel state
                </p>
                <CodeBlock
                  code={`// Client generates payment proof for each request
const payment = {
  channelId: channelAccount.publicKey,
  amount: 0.001,
  nonce: currentNonce + 1,
  timestamp: Date.now(),
};

// Sign the payment
const signature = await wallet.signMessage(
  Buffer.from(JSON.stringify(payment))
);

// Include in HTTP request headers
headers: {
  'X-Payment-Channel': channelId,
  'X-Payment-Amount': amount,
  'X-Payment-Nonce': nonce,
  'X-Payment-Signature': signature,
}

// Server verifies signature and updates internal state
// No on-chain transaction needed!`}
                />
              </Card>

              <Card>
                <h3 className="font-semibold mb-3">3. Channel Closing</h3>
                <p className="text-sm text-muted mb-4">
                  Either party can close the channel, settling final balance on-chain
                </p>
                <CodeBlock
                  code={`// Server or client initiates close
const tx = await program.methods
  .closeChannel(finalNonce, totalPaid)
  .accounts({
    channel: channelAccount.publicKey,
    sender: wallet.publicKey,
    recipient: serverPublicKey,
  })
  .rpc();

// Settlement logic:
// - Verify final payment signature
// - Transfer totalPaid to recipient
// - Return remaining balance to sender
// - Close channel account`}
                />
              </Card>
            </div>
          </section>

          {/* State Machine */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Channel State Machine</h2>
            <Card>
              <CodeBlock
                code={`#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum ChannelStatus {
  Open,      // Channel is active, accepting off-chain payments
  Closed,    // Channel settled and closed (funds distributed)
  Disputed,  // Dispute initiated, 24-hour resolution period active
}

// State transitions:
// Open -> Closed: close_channel() called (only if debt_owed == 0)
// Open -> Disputed: dispute_channel() called by either party
// Disputed -> Closed: dispute_close() or resolve_dispute() called
//
// Note: No "Closing" state exists - channels close immediately`}
                language="rust"
              />
            </Card>
          </section>

          {/* Data Structures */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Core Data Structures</h2>

            <div className="space-y-6">
              <Card>
                <h3 className="font-semibold mb-3">Channel Account (On-Chain) - 162 Bytes</h3>
                <CodeBlock
                  code={`#[account]
pub struct PaymentChannel {
    /// Unique channel identifier
    pub channel_id: [u8; 32],      // 32 bytes

    /// Client public key (who funds the channel)
    pub client: Pubkey,             // 32 bytes

    /// Server public key (who provides the service)
    pub server: Pubkey,             // 32 bytes

    /// Total USDC deposited by client
    pub client_deposit: u64,        // 8 bytes

    /// Cumulative USDC claimed by server
    pub server_claimed: u64,        // 8 bytes

    /// Monotonically increasing payment nonce
    pub nonce: u64,                 // 8 bytes

    /// Channel expiration timestamp (Unix)
    pub expiry: i64,                // 8 bytes

    /// Current channel status
    pub status: ChannelStatus,      // 1 byte + padding

    /// Channel creation timestamp
    pub created_at: i64,            // 8 bytes

    /// Last state update timestamp
    pub last_update: i64,           // 8 bytes

    /// Outstanding debt owed by client (overdraft)
    pub debt_owed: u64,             // 8 bytes

    /// Maximum allowed overdraft amount
    pub credit_limit: u64,          // 8 bytes

    /// PDA bump seed
    pub bump: u8,                   // 1 byte
}
// Total: 162 bytes`}
                  language="rust"
                />
              </Card>

              <Card>
                <h3 className="font-semibold mb-3">Payment Proof (Off-Chain) - 109 Byte Message</h3>
                <CodeBlock
                  code={`// Client constructs 109-byte message for Ed25519 signing
const message = Buffer.concat([
  Buffer.from("x402-channel-claim-v1"),  // Domain separator (21 bytes)
  channelPDA.toBuffer(),                  // Channel PDA address (32 bytes)
  serverPubkey.toBuffer(),                // Server public key (32 bytes)
  amountBuffer,                           // Claimed amount u64 LE (8 bytes)
  nonceBuffer,                            // Nonce u64 LE (8 bytes)
  expiryBuffer,                           // Expiry timestamp i64 LE (8 bytes)
]);
// Total: 21 + 32 + 32 + 8 + 8 + 8 = 109 bytes

// Client signs with Ed25519 (NOT keccak256!)
const signature = nacl.sign.detached(message, clientKeypair.secretKey);

// Verification on Solana uses Ed25519 instruction sysvar pattern
// Two instructions are created:
// 1. Ed25519Program.createInstructionWithPublicKey()
// 2. claim_payment() instruction that verifies signature via sysvar`}
                />
              </Card>
            </div>
          </section>

          {/* Security Considerations */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Security Features</h2>

            <div className="space-y-4">
              <Card>
                <h3 className="font-semibold mb-2">1. Ed25519 Signature Verification</h3>
                <p className="text-sm text-muted mb-2">
                  All payment claims use Ed25519 signatures (NOT keccak256). On-chain verification via Ed25519 instruction sysvar:
                </p>
                <CodeBlock
                  code={`// Construct exact 109-byte message
const message = Buffer.concat([
  Buffer.from("x402-channel-claim-v1"),  // Domain separator
  channelPDA.toBuffer(),
  serverPubkey.toBuffer(),
  amountBuffer,   // u64 little-endian
  nonceBuffer,    // u64 little-endian
  expiryBuffer,   // i64 little-endian
]);

// Verify using Ed25519 sysvar instruction
// Program checks: ed25519_instruction_index == 0
require!(message.len() == 109, "InvalidMessageLength");`}
                  language="rust"
                />
              </Card>

              <Card>
                <h3 className="font-semibold mb-2">2. Domain Separator (Replay Protection)</h3>
                <p className="text-sm text-muted">
                  "x402-channel-claim-v1" domain separator prevents cross-protocol replay attacks. Signatures from other systems cannot be reused.
                </p>
              </Card>

              <Card>
                <h3 className="font-semibold mb-2">3. Nonce Increment Limits</h3>
                <p className="text-sm text-muted">
                  Nonce can only increase by max 10,000 per claim. Prevents griefing attacks where malicious client skips billions of nonces to DoS channel.
                </p>
              </Card>

              <Card>
                <h3 className="font-semibold mb-2">4. Balance & Credit Enforcement</h3>
                <p className="text-sm text-muted mb-2">
                  On-chain program enforces balance constraints with overdraft protection:
                </p>
                <CodeBlock
                  code={`// Check if claim exceeds available balance
if claim_amount > available_balance {
    let overdraft = claim_amount - available_balance;
    require!(
        channel.debt_owed + overdraft <= channel.credit_limit,
        ErrorCode::ExceedsCreditLimit
    );
}

// Minimum deposit: 1 USDC (1,000,000 microunits)
// Maximum credit: 1,000 USDC per channel`}
                  language="rust"
                />
              </Card>

              <Card>
                <h3 className="font-semibold mb-2">5. Expiry & Timeout Protection</h3>
                <p className="text-sm text-muted">
                  Channels have expiry timestamps. Expired channels can be force-closed by either party, preventing fund lockup from unresponsive counterparties.
                </p>
              </Card>

              <Card>
                <h3 className="font-semibold mb-2">6. Dispute Resolution (24-Hour Challenge Period)</h3>
                <p className="text-sm text-muted">
                  Either party can initiate a dispute. During 24-hour challenge period, parties can submit latest signed state. After timeout, funds distributed according to highest valid claim.
                </p>
              </Card>
            </div>
          </section>

          {/* Complete Instruction Handlers */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Complete Instruction Handlers (7 Total)</h2>

            <div className="space-y-6">
              <Card>
                <h3 className="font-semibold mb-3">1. open_channel</h3>
                <p className="text-sm text-muted mb-2">
                  Creates a new payment channel with USDC deposit and optional credit limit
                </p>
                <CodeBlock
                  code={`pub fn open_channel(
    ctx: Context<OpenChannel>,
    channel_id: [u8; 32],
    initial_deposit: u64,  // Min: 1 USDC (1,000,000 microunits)
    expiry: i64,           // Unix timestamp
    credit_limit: u64      // Max: 1000 USDC (1,000,000,000 microunits)
) -> Result<()>`}
                  language="rust"
                />
              </Card>

              <Card>
                <h3 className="font-semibold mb-3">2. add_funds</h3>
                <p className="text-sm text-muted mb-2">
                  Client adds more USDC to channel. Automatically settles debt first if any exists.
                </p>
                <CodeBlock
                  code={`pub fn add_funds(
    ctx: Context<AddFunds>,
    amount: u64
) -> Result<()>

// Debt settlement logic:
// 1. debt_payment = min(amount, debt_owed)
// 2. net_deposit = amount - debt_payment
// 3. debt_owed -= debt_payment
// 4. client_deposit += net_deposit`}
                  language="rust"
                />
              </Card>

              <Card>
                <h3 className="font-semibold mb-3">3. claim_payment</h3>
                <p className="text-sm text-muted mb-2">
                  Server claims USDC using client's Ed25519 signature. Supports overdraft up to credit limit.
                </p>
                <CodeBlock
                  code={`pub fn claim_payment(
    ctx: Context<ClaimPayment>,
    amount: u64,
    nonce: u64,
    ed25519_instruction_index: u8  // Must be 0
) -> Result<()>

// Overdraft logic:
// if amount > available_balance {
//     overdraft = amount - available_balance
//     require!(debt_owed + overdraft <= credit_limit)
//     debt_owed += overdraft
// }`}
                  language="rust"
                />
              </Card>

              <Card>
                <h3 className="font-semibold mb-3">4. close_channel</h3>
                <p className="text-sm text-muted mb-2">
                  Closes channel and returns remaining funds. Cannot close if debt exists.
                </p>
                <CodeBlock
                  code={`pub fn close_channel(
    ctx: Context<CloseChannel>
) -> Result<()>

// Requirements:
// - debt_owed must be 0
// - Returns: (client_deposit - server_claimed) to client
// - Sets status = ChannelStatus::Closed`}
                  language="rust"
                />
              </Card>

              <Card>
                <h3 className="font-semibold mb-3">5. dispute_channel</h3>
                <p className="text-sm text-muted mb-2">
                  Either party initiates a dispute, starting 24-hour challenge period.
                </p>
                <CodeBlock
                  code={`pub fn dispute_channel(
    ctx: Context<DisputeChannel>,
    reason: String  // Optional dispute reason
) -> Result<()>

// Sets status = ChannelStatus::Disputed
// Starts 24-hour timer for challenge period`}
                  language="rust"
                />
              </Card>

              <Card>
                <h3 className="font-semibold mb-3">6. dispute_close</h3>
                <p className="text-sm text-muted mb-2">
                  During dispute period, submit latest signed state with higher nonce.
                </p>
                <CodeBlock
                  code={`pub fn dispute_close(
    ctx: Context<DisputeClose>,
    latest_amount: u64,
    latest_nonce: u64,
    ed25519_instruction_index: u8
) -> Result<()>

// Updates channel to latest valid state
// Resets 24-hour challenge period`}
                  language="rust"
                />
              </Card>

              <Card>
                <h3 className="font-semibold mb-3">7. resolve_dispute</h3>
                <p className="text-sm text-muted mb-2">
                  After 24-hour period expires, finalize dispute and distribute funds.
                </p>
                <CodeBlock
                  code={`pub fn resolve_dispute(
    ctx: Context<ResolveDispute>,
    to_client: u64,
    to_server: u64
) -> Result<()>

// Requirements:
// - 24 hours elapsed since last dispute_close
// - to_client + to_server == total channel funds
// - Distributes funds and closes channel`}
                  language="rust"
                />
              </Card>
            </div>
          </section>

          {/* Overdraft Feature */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Overdraft Feature (Credit System)</h2>

            <Card>
              <p className="text-sm text-muted mb-4">
                Payment channels support overdraft protection, allowing servers to claim more than the current balance up to a credit limit. This prevents service disruption while client tops up funds.
              </p>

              <CodeBlock
                code={`// When opening channel, set credit limit
open_channel(channelId, initialDeposit: 1 USDC, expiry, creditLimit: 1000 USDC)

// Server can claim beyond available balance
available = client_deposit - server_claimed = 0.5 USDC
claim_payment(amount: 2 USDC, nonce, signature)
// ✅ Allowed! Creates 1.5 USDC debt

// Debt tracking
channel.debt_owed = 1.5 USDC  // Overdraft amount
channel.credit_limit = 1000 USDC  // Max allowed

// Client settles debt when adding funds
add_funds(10 USDC)
// Automatic settlement:
// - 1.5 USDC pays off debt
// - 8.5 USDC added to balance
// - debt_owed = 0

// Cannot close channel with outstanding debt
close_channel()  // ❌ Error: CannotCloseWithDebt

// Constraints:
// - Maximum credit_limit: 1000 USDC per channel
// - debt_owed + new_overdraft <= credit_limit
// - Cannot close until debt_owed == 0`}
              />
            </Card>
          </section>

          {/* SPL Token Implementation */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">SPL Token (USDC) Implementation</h2>

            <div className="space-y-4">
              <Card>
                <h3 className="font-semibold mb-2">USDC, Not SOL</h3>
                <p className="text-sm text-muted">
                  All payment channels use USDC (SPL Token), NOT native SOL. Channels hold funds in Program Derived Address (PDA) token accounts.
                </p>
              </Card>

              <Card>
                <h3 className="font-semibold mb-2">Token Account Structure</h3>
                <CodeBlock
                  code={`// Channel PDA seeds
seeds = [b"channel", channel_id]

// Token account PDA seeds
token_seeds = [b"channel_token", channel_id]

// Transfers use SPL Token Program
token::transfer(
    CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        Transfer {
            from: client_token_account,
            to: channel_token_account,
            authority: client,
        }
    ),
    amount  // USDC microunits (1 USDC = 1,000,000)
)`}
                  language="rust"
                />
              </Card>

              <Card>
                <h3 className="font-semibold mb-2">Amount Precision</h3>
                <p className="text-sm text-muted">
                  - 1 USDC = 1,000,000 microunits (6 decimals)<br/>
                  - Minimum deposit: 1,000,000 microunits (1 USDC)<br/>
                  - Maximum credit limit: 1,000,000,000 microunits (1000 USDC)
                </p>
              </Card>
            </div>
          </section>

          {/* Performance Metrics */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Performance Metrics</h2>

            <Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-muted mb-1">Payment Verification</div>
                  <div className="text-2xl font-bold text-primary">&lt; 1ms</div>
                </div>
                <div>
                  <div className="text-sm text-muted mb-1">On-Chain Transactions</div>
                  <div className="text-2xl font-bold text-primary">2 per channel</div>
                </div>
                <div>
                  <div className="text-sm text-muted mb-1">Transaction Cost</div>
                  <div className="text-2xl font-bold text-primary">~$0.0005</div>
                </div>
                <div>
                  <div className="text-sm text-muted mb-1">Throughput</div>
                  <div className="text-2xl font-bold text-primary">1000+ req/s</div>
                </div>
              </div>
            </Card>
          </section>

          {/* Events System */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Events System (9 Events)</h2>
            <p className="text-muted mb-6">
              The program emits events for all state changes, enabling off-chain indexing and monitoring:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <h3 className="font-semibold mb-2 text-sm">ChannelOpened</h3>
                <code className="text-xs text-muted">channel_id, client, server, deposit, expiry, credit_limit</code>
              </Card>
              <Card>
                <h3 className="font-semibold mb-2 text-sm">FundsAdded</h3>
                <code className="text-xs text-muted">amount, debt_settled, net_deposit, remaining_debt, new_balance</code>
              </Card>
              <Card>
                <h3 className="font-semibold mb-2 text-sm">DebtSettled</h3>
                <code className="text-xs text-muted">amount_settled, remaining_debt</code>
              </Card>
              <Card>
                <h3 className="font-semibold mb-2 text-sm">PaymentClaimed</h3>
                <code className="text-xs text-muted">amount, total_claimed, nonce, overdraft_incurred</code>
              </Card>
              <Card>
                <h3 className="font-semibold mb-2 text-sm">DebtIncurred</h3>
                <code className="text-xs text-muted">overdraft_amount, total_debt, credit_limit</code>
              </Card>
              <Card>
                <h3 className="font-semibold mb-2 text-sm">DisputeInitiated</h3>
                <code className="text-xs text-muted">channel_id, disputer, reason</code>
              </Card>
              <Card>
                <h3 className="font-semibold mb-2 text-sm">ChannelDisputeClosed</h3>
                <code className="text-xs text-muted">channel_id, to_server, to_client</code>
              </Card>
              <Card>
                <h3 className="font-semibold mb-2 text-sm">DisputeResolved</h3>
                <code className="text-xs text-muted">channel_id, to_client, to_server, resolver</code>
              </Card>
              <Card>
                <h3 className="font-semibold mb-2 text-sm">ChannelClosed</h3>
                <code className="text-xs text-muted">channel_id, remaining_returned</code>
              </Card>
            </div>
          </section>

          {/* Error Codes */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Error Codes (19 Total)</h2>

            <Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                <div><code className="text-primary">InvalidExpiry</code> - Expiry timestamp invalid/past</div>
                <div><code className="text-primary">InvalidDeposit</code> - Deposit below minimum (1 USDC)</div>
                <div><code className="text-primary">ChannelClosed</code> - Channel already closed</div>
                <div><code className="text-primary">InvalidNonce</code> - Nonce not greater than current</div>
                <div><code className="text-primary">InsufficientFunds</code> - Insufficient balance for operation</div>
                <div><code className="text-primary">CannotClose</code> - Generic close prevention</div>
                <div><code className="text-primary">InvalidSignature</code> - Ed25519 signature verification failed</div>
                <div><code className="text-primary">UnauthorizedAccess</code> - Caller not authorized</div>
                <div><code className="text-primary">InvalidAmount</code> - Amount is zero or invalid</div>
                <div><code className="text-primary">InvalidMint</code> - Token mint mismatch (not USDC)</div>
                <div><code className="text-primary">ChannelExpired</code> - Channel past expiry timestamp</div>
                <div><code className="text-primary">ArithmeticOverflow</code> - Math operation overflow</div>
                <div><code className="text-primary">NonceIncrementTooLarge</code> - Nonce jumped by &gt;10,000</div>
                <div><code className="text-primary">DepositTooSmall</code> - Below 1 USDC minimum</div>
                <div><code className="text-primary">ChannelNotDisputed</code> - Dispute operation on non-disputed channel</div>
                <div><code className="text-primary">InvalidResolution</code> - Dispute resolution amounts invalid</div>
                <div><code className="text-primary font-semibold">ExceedsCreditLimit</code> - Overdraft exceeds credit limit</div>
                <div><code className="text-primary font-semibold">CannotCloseWithDebt</code> - Cannot close while debt_owed &gt; 0</div>
                <div><code className="text-primary font-semibold">InvalidCreditLimit</code> - Credit limit exceeds max (1000 USDC)</div>
              </div>
            </Card>
          </section>

          {/* Implementation Details */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Implementation Stack</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <h3 className="font-semibold mb-3">Solana Program</h3>
                <ul className="text-sm text-muted space-y-2">
                  <li>• Anchor framework v0.29+</li>
                  <li>• Rust 1.75+</li>
                  <li>• Program derived addresses (PDAs)</li>
                  <li>• Cross-program invocations (CPIs)</li>
                </ul>
              </Card>

              <Card>
                <h3 className="font-semibold mb-3">TypeScript SDK</h3>
                <ul className="text-sm text-muted space-y-2">
                  <li>• @solana/web3.js v2.0+ (latest)</li>
                  <li>• @coral-xyz/anchor v0.30+</li>
                  <li>• 109-byte message serialization utilities</li>
                  <li>• Ed25519 transaction builder</li>
                  <li>• Channel state caching (30-second TTL)</li>
                  <li>• All 7 instruction wrappers</li>
                  <li>• Generated IDL types from Anchor</li>
                  <li>• Full TypeScript type safety</li>
                </ul>
              </Card>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
