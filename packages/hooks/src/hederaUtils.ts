export type HederaNetwork = "testnet" | "mainnet";

/**
 * Resolver that returns the Hedera account ID for an EVM address.
 * The host app can inject this to use its own mirror-node or API.
 */
export type HederaAccountIdResolver = (
  evmAddress: string,
  network: HederaNetwork,
) => Promise<string | null>;

type AccountIdResponse = { accountId: string | null } | { error: string };

const CHAIN_ID_TO_NETWORK: Record<number, HederaNetwork> = {
  295: "mainnet",
  296: "testnet",
};

let customResolver: HederaAccountIdResolver | undefined;
let apiBase = "";

/**
 * Inject a custom resolver for Hedera account ID lookup (e.g. calling your app's API or mirror-node).
 * When set, this is used instead of the configurable endpoint.
 */
export function setHederaAccountIdResolver(resolver: HederaAccountIdResolver | undefined): void {
  customResolver = resolver;
}

/**
 * Get the currently set custom resolver, if any.
 */
export function getHederaAccountIdResolver(): HederaAccountIdResolver | undefined {
  return customResolver;
}

/**
 * Set the base URL for the default account-ID API (e.g. "" for same-origin, or "https://your-app.com").
 * The default fetch implementation will call `${apiBase}/api/hedera/account?evm=...&network=...`.
 * Ignored if a custom resolver is set via setHederaAccountIdResolver.
 */
export function setHederaAccountIdApiBase(base: string): void {
  apiBase = base;
}

/**
 * Get the current API base URL used by the default fetch implementation.
 */
export function getHederaAccountIdApiBase(): string {
  return apiBase;
}

/** Maps a viem/wagmi chain ID to "testnet" | "mainnet". Defaults to "testnet". */
export function chainIdToHederaNetwork(chainId: number): HederaNetwork {
  return CHAIN_ID_TO_NETWORK[chainId] ?? "testnet";
}

/**
 * Returns the Hedera account ID (e.g. "0.0.8041897") for an EVM address.
 * Uses the injected resolver if set, otherwise calls the configurable endpoint
 * (default same-origin /api/hedera/account). Mirror-node access stays in the host app.
 *
 * @param evmAddress - EVM address (0x...)
 * @param network - "testnet" (default) or "mainnet"
 * @returns Hedera account ID or null if not found
 */
export async function getHederaAccountId(
  evmAddress: string,
  network: HederaNetwork = "testnet",
): Promise<string | null> {
  if (customResolver) {
    return customResolver(evmAddress, network);
  }

  const path = "/api/hedera/account";
  const base = apiBase.replace(/\/$/, "");
  const url = base ? `${base}${path}` : path;
  const params = new URLSearchParams({ evm: evmAddress, network });
  const res = await fetch(`${url}?${params}`);

  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as AccountIdResponse;
    if ("error" in body) throw new Error(body.error);
    return null;
  }

  const data = (await res.json()) as AccountIdResponse;
  if ("error" in data) throw new Error(data.error);
  return data.accountId;
}
