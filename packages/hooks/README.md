# @scaffold-ui/hooks

React hooks for building custom Ethereum UI — ENS resolution, balance fetching with USD conversion, address validation, ETH-amount input handling.

**[Documentation](https://ui.scaffoldeth.io/hooks)** · [Repo](https://github.com/scaffold-eth/scaffold-ui)

## Install

```bash
npm install @scaffold-ui/hooks
# or
yarn add @scaffold-ui/hooks
# or
pnpm add @scaffold-ui/hooks
```

You also need `react`, `viem`, `wagmi`, and `@tanstack/react-query` configured in your app.

## Usage

```tsx
import { useAddress } from "@scaffold-ui/hooks";
import { useAccount } from "wagmi";

export function Profile() {
  const { address } = useAccount();
  const { ens, ensAvatar, shortAddress, blockExplorerAddressLink } = useAddress({ address });

  return (
    <a
      href={blockExplorerAddressLink}
      target="_blank"
      rel="noreferrer"
    >
      <img
        src={ensAvatar ?? undefined}
        alt=""
      />
      {ens ?? shortAddress}
    </a>
  );
}
```

See the [docs](https://ui.scaffoldeth.io/hooks) for every hook and return value.

## License

MIT
