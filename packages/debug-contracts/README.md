# @scaffold-ui/debug-contracts

Debug contracts component.

## Installation

```bash
npm install @scaffold-ui/debug-contracts
# or
yarn add @scaffold-ui/debug-contracts
# or
pnpm add @scaffold-ui/debug-contracts
```

#### Props

- `contracts` (required): An object containing deployed contracts organized by chain ID, where each contract includes address and ABI
- `chainId` (required): The chain ID to use for debugging contracts (number)

## Usage

```tsx
import { DebugContracts } from "@scaffold-ui/debug-contracts";
import "@scaffold-ui/debug-contracts/styles.css";
import { sepolia } from "viem/chains";

// Define your deployed contracts
const deployedContracts = {
  11155111: {
    YourContract: {
      address: "0xBf6D6faFE5B0C009E5447A27A94E093F490Dd0FC",
      abi: [
        // ... your contract ABI
      ],
    },
  },
} as const;

function App() {
  return <DebugContracts contracts={deployedContracts} chainId={sepolia.id} />;
}
```
