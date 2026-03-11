# @scaffold-ui/hooks

A collection of React hooks for managing UI state.

## Installation

```bash
npm install @scaffold-ui/hooks
# or
yarn add @scaffold-ui/hooks
```

## Hooks

### useAddress

A hook for managing Ethereum addresses with ENS support.

```tsx
import { useAddress } from "@scaffold-ui/hooks";
import { useAccount } from "wagmi";

function AddressInfo() {
  const { address } = useAccount();

  const {
    checkSumAddress,
    ens,
    ensAvatar,
    isEnsNameLoading,
    blockExplorerAddressLink,
    isValidAddress,
    shortAddress,
    blockieUrl,
  } = useAddress({
    address,
    chain: mainnet, // Optional chain parameter
  });

  return (
    <div>
      {isEnsNameLoading ? (
        <div>Loading ENS name...</div>
      ) : (
        <div>
          <img
            src={ensAvatar ?? blockieUrl}
            alt="Avatar"
          />
          <div>ENS Name: {ens ?? "No ENS name"}</div>
          <div>Address: {checkSumAddress}</div>
          <div>Short Address: {shortAddress}</div>
          <a
            href={blockExplorerAddressLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Block Explorer
          </a>
          {isValidAddress && <div>✓ Valid Address</div>}
        </div>
      )}
    </div>
  );
}
```

## Hedera

### useHederaAccountId

Resolves a Hedera account ID (e.g. `0.0.8041897`) for an EVM address. Used by components like `HederaAddress`.

```tsx
import { useHederaAccountId } from "@scaffold-ui/hooks";

const { accountId, isLoading } = useHederaAccountId(evmAddress, chainId);
```

### Configuring account-ID resolution

The library does not call mirror-node directly. Your app owns the data source. Configure once at startup (e.g. in root layout or a provider):

- **Same-origin API (default):** If your app serves `/api/hedera/account`, you don’t need to do anything—the default base is `""`. To be explicit: `setHederaAccountIdApiBase('')`.
- **Custom base URL:** `setHederaAccountIdApiBase('https://your-api.com')` so the default fetch uses that origin.
- **Custom resolver:** `setHederaAccountIdResolver((evmAddress, network) => Promise<string | null>)` to call your own API or server-side logic. Takes precedence over the endpoint.

```tsx
import {
  setHederaAccountIdApiBase,
  setHederaAccountIdResolver,
} from "@scaffold-ui/hooks";

// Option A: use same-origin /api/hedera/account (default)
setHederaAccountIdApiBase("");

// Option B: custom resolver (e.g. your API client)
setHederaAccountIdResolver(async (evmAddress, network) => {
  const res = await fetch(`/api/hedera/account?evm=${evmAddress}&network=${network}`);
  const data = await res.json();
  return data.accountId ?? null;
});
```

## License

MIT
