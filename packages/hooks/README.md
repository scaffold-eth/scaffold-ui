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
          <img src={ensAvatar ?? blockieUrl} alt="Avatar" />
          <div>ENS Name: {ens ?? "No ENS name"}</div>
          <div>Address: {checkSumAddress}</div>
          <div>Short Address: {shortAddress}</div>
          <a href={blockExplorerAddressLink} target="_blank" rel="noopener noreferrer">
            View on Block Explorer
          </a>
          {isValidAddress && <div>✓ Valid Address</div>}
        </div>
      )}
    </div>
  );
}
```

## License

MIT
