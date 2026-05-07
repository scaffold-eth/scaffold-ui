# @scaffold-ui/debug-contracts

The Scaffold-ETH 2 contract debugger UI as a standalone React component. Drop it into any wagmi-based React app.

**[Documentation](https://ui.scaffoldeth.io/debug-contracts)** · [Repo](https://github.com/scaffold-eth/scaffold-ui)

## Install

```bash
npm install @scaffold-ui/debug-contracts @scaffold-ui/components @scaffold-ui/hooks
# or
yarn add @scaffold-ui/debug-contracts @scaffold-ui/components @scaffold-ui/hooks
# or
pnpm add @scaffold-ui/debug-contracts @scaffold-ui/components @scaffold-ui/hooks
```

`@scaffold-ui/debug-contracts` peer-depends on `@scaffold-ui/components` and `@scaffold-ui/hooks`.

## Usage

```tsx
import "@scaffold-ui/debug-contracts/styles.css";
import { Contract } from "@scaffold-ui/debug-contracts";
import { sepolia } from "viem/chains";

const deployedContract = {
  address: "0xBf6D6faFE5B0C009E5447A27A94E093F490Dd0FC",
  abi: [
    /* ... */
  ],
} as const;

export default function Debug() {
  return (
    <Contract
      contracts={deployedContract}
      chainId={sepolia.id}
    />
  );
}
```

See the [docs](https://ui.scaffoldeth.io/debug-contracts/Contract) for all props.

## License

MIT
